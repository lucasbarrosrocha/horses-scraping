const fetch = require("node-fetch");

export const request = (options) => {
    return new Promise((resolve, reject) => {
        fetch(options.url, options).then(resp => {
            if (resp.ok)
                resp.json().then(response => {
                    resolve(response);
                });
            else {
                resp.json().then(response => {
                    reject(response);
                });
            }
        })
    })
};


(() => {
    console.log('AGORA VAI');
})();