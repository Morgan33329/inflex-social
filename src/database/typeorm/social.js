import { getManager } from 'typeorm';

import { model } from './../../database';

var socialRepository;

class SocialRepository {
    insert (data) {
        let social    = model('social'),
            newSocial = new social(0, data.identity_id, data.social_type, data.social_id);

        return getManager()
            .save([ newSocial ])
            .then(() => {
                return newSocial;
            });
    }

    findByIdAndType (socialId, type) {
        return getManager()
            .getRepository(model('social'))
            .createQueryBuilder('social')
            .where('social.social_type = :type', { type : type })
            .where('social.social_id = :id', { id : socialId })
            .getOne();
    }
}

export default function () {
    if (!socialRepository)
        socialRepository = new SocialRepository();

    return socialRepository;
}