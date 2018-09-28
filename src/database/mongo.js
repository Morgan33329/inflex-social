import identityRepository from './mongo/identity';
import socialRepository from './mongo/social';

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