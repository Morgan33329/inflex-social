import facebook from "./middleware/facebook";
import googlePlus from "./middleware/google-plus";

import {
    facebookLogin,
    googlePlusLogin
} from './route';

export function socialRoutes (app, options) {
    options = options || {};

    facebookLogin(app, options.facebook || {});

    googlePlusLogin(app, options.googlePlus || {});
}

export function middleware (type, options, middlewares) {
    switch (type) {
        case 'facebook':
            return facebook(options, middlewares);
        case 'google-plus':
            return googlePlus(options, middlewares);
    }
}