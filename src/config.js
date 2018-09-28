import _ from 'lodash';

const defaultSettings = {
    'facebook' : {
        'client_id' : process.env.FB_ID || null,
        'client_secret' : process.env.FB_SECRET || null
    }
};
var settings = defaultSettings;

export function setConfig (cnf) {
    settings = _.merge(defaultSettings, cnf);
}

export function getConfig (key) {
    return _.get(settings, key);
}