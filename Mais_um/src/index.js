import {request} from './request.js';

( async () => {console.log( await request({
    url: `https://www.sportinglife.com/api/horse-racing/racing/racecards/2019-11-13`,
    method: 'GET',
}))})();