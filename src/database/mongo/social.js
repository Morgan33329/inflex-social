import Promise from 'bluebird';

import { model } from './../../database';

var socialRepository;

class SocialRepository {
    insert (data) {
        return new Promise((resolve) => {
            model('social')
                .create(data, (err, result) => {
                    resolve(result);
                });
        });
    }

    findByIdAndType (socialId, type) {
        return new Promise((resolve) => {
            model('social')
                .findOne({ 
                    social_type : type,
                    social_id : socialId
                })
                .exec((err, result) => {
                    resolve(result);
                });
        });
    }
}

export default function () {
    if (!socialRepository)
        socialRepository = new SocialRepository();

    return socialRepository;
}