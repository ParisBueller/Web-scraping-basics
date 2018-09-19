//Web scraping in Node


const rp = require('request-promise');
const cheerio = require('cheerio');
const Table = require('cli-table');

let users = [];
let table = new Table({
    head: ['username', '<3', 'challenges'],
    colWidths: [15, 5, 10]
})

const options = {
    url: `https://forum.freecodecamp.org/directory_items?period=weekly&order=likes_received&_=1518604435748`,
    json: true
}
//Once the info from the above url is gathered, .then we...
rp(options)
    .then((data) => {
        let userData = [];
        //loop through directory items of each user
        for(let user of data.directory_items) {
            //push our looped through results to our userData array
            userData.push({name: user.user.userName, likes_received: user.likes_received});
        }
        process.stdout.write('loading')
        //Define our function to be triggered below
        getChallengesCompletedAndPushToUserArray(userData);
    })
    .catch((err) => {
        console.log(err);
    })
    //Go through each user and make another request for each user on the list
    function getChallengesCompletedAndPushToUserArray(userData) {
        var i = 0;
        function next() {
            if(i < userData.length)  {
                var options = {
                    url: `https://www.freecodecamp.org/` + userData[i].name,
                    transform: body => cheerio.load(body)
                }
                rp(options)
                    .then(function ($) {
                        process.stdout.write(`.`);
                        //Boolean, Checks if the user has an account
                        const fccAccount = $('h1.landing-heading').length == 0;
                        const challengesPassed = fccAccount ? $('tbody tr').length : 'unknown';
                        table.push([userData[i].name, userData[i].likes_received, challengesPassed]);
                        ++i;
                        return next();
                    })
            } else {
                printData();
            }
        }
        return next();
    };

    function printData() {
        console.log("check");
        console.log(table);
    }