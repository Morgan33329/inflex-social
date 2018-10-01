import { authConfig } from 'inflex-authentication';

import { getConfig } from './config';
import { middleware } from './social';

export function facebookLogin (app, options) {
    options = options || {};

    let facebookConfig = getConfig('facebook');

    if (facebookConfig.clientId) {
        let middle = middleware('facebook');

        app.post(
            '/api/login/facebook', 
            middle, 
            (req, res, next) => {
                let action = options.action || authConfig('actions.login');

                action(req, res, next);
            }
        );
    }
}

export function googlePlusLogin (app, options) {
    options = options || {};

    let googlePlusConfig = getConfig('google-plus');

    if (googlePlusConfig.clientId) {
        let middle = middleware('google-plus');

        app.post(
            '/api/login/google-plus', 
            middle, 
            (req, res, next) => {
                let action = options.action || authConfig('actions.login');

                action(req, res, next);
            }
        );
    }
}