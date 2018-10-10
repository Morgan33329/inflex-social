import _ from 'lodash';
import Bluebird from 'bluebird';
import { authConfig } from 'inflex-authentication';

import { repository, getId } from './../database';

function log (data) {
    let l = authConfig('log');

    l(data);
}

function createIdentity() {
    return repository('identity')
        .insert({
            'activated' : true,
            'enabled' : true,
            'blocked' : false
        })
        .then(identity => {
            log('Identity uploaded');

            return identity;
        });
}

function createSocial(identityId, id, type) {
    return repository('social')
        .insert({
            'identity_id' : identityId,

            'social_type' : type,
            'social_id' : id
        })
        .then(social => {
            log('Social uploaded');

            return social;
        });
}

export default class {
    createWithSocial (id, type) {
        return createIdentity()
            .then(identity => {
                return createSocial(getId(identity), id, type)
                    .then(social => {
                        return {
                            'identity' : identity,
                            'social' : social 
                        };
                    });
            })
            .catch(err => {
                log(err);
            });
    }
}
