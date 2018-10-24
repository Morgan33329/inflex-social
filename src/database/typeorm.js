import identityRepository from './typeorm/identity';
import socialRepository from './typeorm/social';

export default function (type) {
    switch (type) {
        case 'identity':
            return identityRepository();
        case 'social':
            return socialRepository();
        default:
            console.log('Invalid repository type: ' + type);
    }
}