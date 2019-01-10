import crypto from 'crypto';
const mysalt = 'fastcampus';

export default function(password){
    return crypto.createHash('sha512').update(password+mysalt).digest('base64');
}