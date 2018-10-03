import facebook from "./middleware/facebook";
import googlePlus from "./middleware/google-plus";

import {
    facebookLogin,
    googlePlusLogin
} from './route';

export function socialRoutes (app, version, options) {
    if (typeof version === 'object' && !options) {
        options = version;
        version = null;
    }

    version = version || '';
    options = options || {};

    facebookLogin(app, options.facebook || {}, version);

    googlePlusLogin(app, options.googlePlus || {}, version);
}

export function middleware (type, options, middlewares) {
    switch (type) {
        case 'facebook':
            return facebook(options, middlewares);
        case 'google-plus':
            return googlePlus(options, middlewares);
    }
}