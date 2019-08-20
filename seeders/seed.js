const request = require('request');
const cheerio = require('cheerio');
const db = require('../models');

request('http://www.visitseattle.org/things-to-do/neighborhoods/', function(err, response, data) {
    var $ = cheerio.load(data);
    var neighborhoods = $('.info-window-content');

    neighborhoods = neighborhoods.map((index, element) => {
        var name = $(element).find('h4').text();
        var link = $(element).find('a').attr('href');
        var description = $(element).find('p').text();
        var photo = $(element).find('div').attr('style');
        
        if(photo) {
            photo = photo.split("\'")[1]
        } else {
            photo = "";
        }

        return {
            name, 
            link,
            description,
            photo
        }
    }).get();

    // console.log(neighborhoods)
    db.neighborhood.bulkCreate(neighborhoods)
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err);
    })

})

