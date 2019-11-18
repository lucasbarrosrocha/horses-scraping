const request = require('postman-request');
const atm = require('atmosphere.js');
const _ = require('lodash');

const url = "https://www.bumbet.com/services/sports/event/events/under/A/next?status=O&status=H&status=U&status=C&maxHours=24&liveOnly=true";

function bumbet() {
    const socket = atm;
    const req = new atm.AtmosphereRequest();
    req.url = url;
    
    req.onClose = function (data) {
        console.log('close');
    };

    req.onOpen = function (data) {
        console.log(data);
    };

    let mensagemAnterior = {};

    req.onMessage = function (message) {
        // console.log('message', Object.keys(message));
        const itens = JSON.parse(message.responseBody).items;
        // console.log(itens.items);

        // console.log('q', itens.length);
        console.log('ao vivo bumbet', itens.filter(item => _.some(item.flags, flag => flag.name === 'LIVE' && flag.value)).length);

        const futebol = itens.filter(
            item => item.sport === 'SOCC' && _.some(item.flags, flag => flag.name === 'LIVE' && flag.value)
        );

        console.log('futebol', futebol.length);

        console.log(JSON.stringify(mensagemAnterior) === JSON.stringify(message));
        mensagemAnterior = message;
    };

    return socket.subscribe(req);
}

const body = {
    "search": {
        "type": "EVENT_TYPE",
        "ids": [1]
    },
    "filters": {
        "selectBy": "TIME",
        "timeFrame": "ALL",
        "marketType": "MATCH_ODDS"
    },
    "limits": {
        "maxEventsPerEventType": 100
    }
};

const headers = {
    "X-Application": "nzIFcwyWhrlwYMrh"
};

const URI_AO_VIVO = "https://strands.betfair.com/api/eds/coupon/v1";

function betfair() {

    const request = require('postman-request');

    const socket = atm;
    const req = new atm.AtmosphereRequest();
    req.url = URI_AO_VIVO;
    req.method = 'POST';
    req.headers = headers;
    req.contentType = 'application/json';
    req.data = JSON.stringify(body);
    
    req.onClose = function (data) {
        console.log('close', data);
    };

    req.onError = function (err) {
        console.log('err');
    };

    req.onReconnect = function (data) {
        console.log('reconnect');
    };

    req.onOpen = function (data) {
        console.log('open', data);
    };

    let mensagemAnterior = {};

    req.onMessage = function (message) {
        // console.log('message', Object.keys(message));
        const itens = JSON.parse(message.responseBody).items;
        // console.log(itens.items);

        const futebol = itens.filter(
            item => item.sport === 'SOCC' && _.some(item.flags, flag => flag.name === 'LIVE' && flag.value)
        );

        console.log('futebol', futebol.length);

        console.log(JSON.stringify(mensagemAnterior) === JSON.stringify(message));
        mensagemAnterior = message;
    };

    function teste() {
        request({
            uri: URI_AO_VIVO,
            body,
            headers,
            json: true,
            method: 'POST',
            callback: function(err, res) {
                const competicoes = _.first(res.body).competitions;

                const jogosAoVivo = [];
                competicoes.forEach(competicao => {
                    jogosAoVivo.push(...competicao.events.filter(jogo => jogo.inplay));
                });
                console.log('yey', jogosAoVivo.length);
                setTimeout(teste, 1000);
            }
        });
    }

    teste();
    // return socket.subscribe(req);
}

(() => {
    bumbet();
    betfair();
})();