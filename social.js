'use strict';

const dir = process.env.DEVELOPER === true ? 'src' : 'build'; 

const registration = require('./' + dir + '/social');

exports.socialRoutes = registration.socialRoutes;