import { getManager } from 'typeorm';

import { model } from './../../database';

var identityRepository;

class IdentityRepository {
    insert (data) {
        let identity    = model('identity'),
            newIdentity = new identity();

        newIdentity.setData(data);

        return getManager()
            .save([ newIdentity ])
            .then(() => {
                return newIdentity;
            });
    }
}

export default function () {
    if (!identityRepository)
        identityRepository = new IdentityRepository();

    return identityRepository;
}