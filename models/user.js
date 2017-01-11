import Model from 'bak/modules/mongoose/model';
import {Schema} from 'mongoose';

class User extends Model {
    static $options = {strict: false};
    static $hidden = ['password','roles','is_banned','meta','avatar_etag'];

    static $schema = {
        username: {type: String, index: true, sparse: true},
        email: {type: String, index: true, sparse: true},
        password: {type: String},
        avatar_etag: {type: String},
        name: {type: String},
        is_banned: {type: Boolean},
        meta: {type: Object},
        roles: {type: Array},
    };

}

export default User.$model;
