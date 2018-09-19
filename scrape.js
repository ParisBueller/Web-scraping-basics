// const request = require('request');
// const cheerio = require('cheerio');

// request('https://www.draftkings.com/contest/gamecenter/59586539', (error, response,html) => {
//     //check for errors and a successful http response(200)
//     if(!error && response.statusCode == 200) {
//         //target all the html contained on the request target
//         const $ = cheerio.load(html);
//         //target the 'main' element 
//         //const main = $('.main');

//         //target the html in the 'main' element
//         //console.log(main.html());

//         //console.log the text the 'main' element
//         //console.log(main.text());

//         const gamecenter = $('.gamecenter');
//         //const output = gamecenter.find('gamecenter').html();

//         //look into 'gamecenter' for the children elements
//         //const output = gamecenter.children('h1').text();

//         //use next() to target the next element after the targeted element, in this case 'grit'
//         // const output = gamecenter
//         //     .children('grit')
//         //     .next()
//         //     .text();

//         //Target the parent of the original target 'grit' which in this case is 'gamecenter'
//         //     const output = gamecenter
//         //     .children('grit')
//         //     .parent()
//         //     .text();

//         // console.log(output);

//         //Loop over items, this targets the a tags in .nav-item
//         // and loops over them with .each(index,element) 
//         $('.nav-item a').each((i, el) => {
//             //get the text of the given element
//             const item = $(el).text();
//             //get the link of the element by targeting attribute 'href'
//             const link = $(el).attr('href');

//             console.log(link);
//         });
//     }
// });