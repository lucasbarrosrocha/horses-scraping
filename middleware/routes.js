import {request} from './request.js';

import {
    URL_DAY,
    URL_RACE,
} from './configs.js';

export function getRacesToDay() {
    return request({
        url: `${URL_DAY}`,
        method: 'GET',
    });
}

export function getRaceDetails() {
    return request({
        url: `${URL_RACE}`,
        method: 'GET',
    });
}
