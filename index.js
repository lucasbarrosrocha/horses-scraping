const request = require('postman-request');

const URL_DAY = 'https://www.sportinglife.com/api/horse-racing/racing/racecards/2019-11-13';
const URL_RACE = 'https://www.sportinglife.com/api/horse-racing/race/';

let bodyCorridas = []
let idCorridas = []

async function get(url) {
    await request('https://www.sportinglife.com/api/horse-racing/racing/racecards/2019-11-13', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        bodyCorridas = JSON.parse(body);
        select()
    });
}

function select() {
    for (var i = 0; i < bodyCorridas.length; i++) {
        // console.log(`----------------->`, bodyCorridas[i].races);
        filtraIds(bodyCorridas[i].races)
    }

    idCorridas.forEach(id => {
        getDetails(id);
    });

}

function filtraIds(lista) {
    const ids = lista.map(e => e.race_summary_reference.id);
    idCorridas = [...idCorridas, ...ids];
}

async function getDetails(idRace) {
    await request(URL_RACE + idRace, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', JSON.parse(body).race_summary.name); // Print the HTML for the Google homepage.
        //nameCorrida.push(JSON.parse(body).race_summary.name);
    });
}

function parseDate(amountDays) {
    var day = new Date();
    for (let i = 0; i < amountDays; i++){
        day.setDate(day.getDate() -1);
        console.log(day);
    }
}

async function soteste(){

    const response = await request.get(URL_DAY).then(e => {
        console.log(e);
    });
}

(() => {
    // get();
    // parseDate(3000);
    soteste();
})();