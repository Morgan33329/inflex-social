'use strict';

const dir = process.env.DEVELOPER ? 'src' : 'build'; 

const registration = require('./' + dir + '/social');

exports.socialRoutes = registration.socialRoutes;