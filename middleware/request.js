export const request = (options) => {
    if(!options.headers){
        options.headers = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
    }
    
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