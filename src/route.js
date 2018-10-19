import { routeAction } from 'inflex-authentication/helpers';

import { getConfig } from './config';
import { middleware } from './social';

export function facebookLogin (app, options, version) {
    options = options || {};

    let facebookConfig = getConfig('facebook');

    if (facebookConfig.clientId) {
        let middle = middleware('facebook', { 'version' : version }, options.middleware);

        app.post(
            (version ? '/' + version : '') + '/api/login/facebook', 
            middle, 
            (req, res, next) => {
                routeAction('login', req, options.action)(req, res, next);
            }
        );
    }
}

export function googlePlusLogin (app, options, version) {
    return;

    options = options || {};

    let googlePlusConfig = getConfig('google-plus');

    if (googlePlusConfig.clientId) {
        let middle = middleware('google-plus', { 'version' : version }, options.middleware);

        app.post(
            (version ? '/' + version : '') + '/api/login/google-plus', 
            middle, 
            (req, res, next) => {
                routeAction('login', req, options.action)(req, res, next);
            }
        );
    }
}

export function googleLogin (app, options, version) {
    options = options || {};

    let googleConfig = getConfig('google');

    if (googleConfig.clientId) {
        let middle = middleware('google', { 'version' : version }, options.middleware);

        app.post(
            (version ? '/' + version : '') + '/api/login/google', 
            middle, 
            (req, res, next) => {
                routeAction('login', req, options.action)(req, res, next);
            }
        );
    }
}