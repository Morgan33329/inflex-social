import Promise from 'bluebird';

import { model } from './../../database';

var identityRepository;

class IdentityRepository {
    insert (data) {
        return new Promise((resolve) => {
            model('identity')
                .create(data, (err, result) => {
                    resolve(result);
                });
        });
    }
}

export default function () {
    if (!identityRepository)
        identityRepository = new IdentityRepository();

    return identityRepository;
}