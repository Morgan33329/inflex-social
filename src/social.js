import facebook from './middleware/facebook';
import googlePlus from './middleware/google-plus';
import google from './middleware/google';

import {
    facebookLogin,
    googlePlusLogin,
    googleLogin
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

    googleLogin(app, options.googlePlus || {}, version);
}

export function middleware (type, options, middleware) {
    switch (type) {
        case 'facebook':
            return facebook(options, middleware);
        case 'google-plus':
            return googlePlus(options, middleware);
        case 'google':
            return google(options, middleware);
    }
}