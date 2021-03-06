import _ from 'lodash';
import Bluebird from 'bluebird';

import { repository, getId } from './../database';

function createIdentity() {
    return repository('identity')
        .insert({
            'activated' : true,
            'enabled' : true,
            'blocked' : false
        })
        .then(identity => {
            console.log('Identity uploaded');

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
            console.log('Social uploaded');

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
                console.log(err);
            });
    }
}
