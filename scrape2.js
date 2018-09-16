const request = require('request');
const cheerio = require('cheerio');
//node file system module
const fs = require('fs');
//writes our scraped data to a csv file
const writeStream = fs.createWriteStream('post.csv');

//Write Headers
writeStream.write(`Title,Link,Date \n`);

request('http://codedemos.com/sampleblog', (error, response,html) => {
    //check for errors and a successful http response(200)
    if(!error && response.statusCode == 200) {
        //target all the html contained on the request target
        const $ = cheerio.load(html);

        $('.post-preview').each((i, el) => {
            const title = $(el)
            //find the text of .post-title in the 'post-preview' element
                .find('.post-title')
                .text()
                //use a regular expression to replace the white space
                .replace(/\s\s+/g, '');
                
                //find all 'a' elements and log the links
            const link = $(el)
                .find('a')
                .attr('href');
            //find the post-date of the post in post-preview
            const date = $(el)
                .find('.post-date')
                .text()
                //use regex to replace the comma
                .replace(/,/,'');

                //Write Row to CSV using variables defined above
                writeStream.write(`${title}, ${link}, ${date} \n`);
        });
 
        console.log('Scraping Done...');
    }
});