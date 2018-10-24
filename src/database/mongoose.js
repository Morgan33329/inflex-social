import identityRepository from './mongoose/identity';
import socialRepository from './mongoose/social';

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