import facebook from "./middleware/facebook";

import {
    facebookLogin
} from './route';

export function socialRoutes (app, options) {
    options = options || {};

    facebookLogin(app, options.facebook || {});
}

export function facebookMiddleware (options, middlewares) {
    return facebook(options, middlewares);
}