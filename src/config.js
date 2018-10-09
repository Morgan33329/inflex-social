import _ from 'lodash';

const defaultSettings = {
    'facebook' : {
        'clientId' : process.env.FACEBOOK_ID || null,
        'clientSecret' : process.env.FACEBOOK_SECRET || null
    },

    'google-plus' : {
        'clientId' : process.env.GOOGLEPLUS_ID || null,
        'clientSecret' : process.env.GOOGLEPLUS_SECRET || null,
    },

    'google' : {
        'clientId' : process.env.GOOGLE_ID || null,
        'clientSecret' : process.env.GOOGLE_SECRET || null,
    }
};
var settings = defaultSettings;

export function setConfig (cnf) {
    settings = _.merge(defaultSettings, cnf);
}

export function getConfig (key) {
    return _.get(settings, key);
}