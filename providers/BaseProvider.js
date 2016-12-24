import {compare, hash} from '../utils/bcrypt';

export default class BaseProvider {

    constructor(name, options) {
        this.name = name;
        this.options = Object.assign({},options);

        this.options.user_field = this.options.user_field || 'username';
        this.options.password_field = this.options.password_field || 'password';
        this.options.password_encryption = this.options.password_encryption || 'plain';
    }

    async _hash_password(password) {
        switch (this.options.password_encryption) {
            case 'plain':
                return password;
                break;
            case  'bcrypt':
                return await hash(password);
                break;
        }
    }

    async _check_password(password, hash) {
        switch (this.options.password_encryption) {
            case 'plain':
                return password === hash;
            case  'bcrypt':
                return await compare(password, hash);
            default:
                return false;
        }
    }

    async login(creds) {
        // This script should authenticate a user against the credentials stored in
        // your database.
        // It is executed when a user attempts to log in or immediately after signing
        // up (as a verification that the user was successfully signed up).
        // The `password` parameter of this function is in plain text. It must be
        // hashed/salted to match whatever is stored in your database. For example:
        //
        //     var bcrypt = require('bcrypt@0.8.5');
        //     bcrypt.compare(password, dbPasswordHash, function(err, res)) { ... }
        //
        // There are three ways this script can finish:
        // 1. The user's credentials are valid. The returned user profile should be in
        // the following format: https://auth0.com/docs/user-profile
        //     callback(null, profile);
        // 2. The user's credentials are invalid
        //     callback(new WrongUsernameOrPasswordError(email, "my error message"));
        // 3. Something went wrong while trying to reach your database
        //     callback(new Error("my error message"));
        //
        // A list of Node.js modules which can be referenced is available here:
        //
        //    https://tehsis.github.io/webtaskio-canirequire/

        let msg = "Please implement the Login script for this database connection ";
        return callback(new Error(msg));
    }

    // async create(user) {
    //     // This script should create a user entry in your existing database. It will
    //     // be executed when a user attempts to sign up, or when a user is created
    //     // through the Auth0 dashboard or API.
    //     // When this script has finished executing, the Login script will be
    //     // executed immediately afterwards, to verify that the user was created
    //     // successfully.
    //     //
    //     // The user object will always contain the following properties:
    //     // * email: the user's email
    //     // * password: the password entered by the user, in plain text
    //     // * tenant: the name of this Auth0 account
    //     // * client_id: the client ID of the application where the user signed up, or
    //     //              API key if created through the API or Auth0 dashboard
    //     // * connection: the name of this database connection
    //     //
    //     // There are three ways this script can finish:
    //     // 1. A user was successfully created
    //     //     callback(null);
    //     // 2. This user already exists in your database
    //     //     callback(new ValidationError("user_exists", "my error message"));
    //     // 3. Something went wrong while trying to reach your database
    //     //     callback(new Error("my error message"));
    //
    //     let msg = "Please implement the Create script for this database connection ";
    //     return callback(new Error(msg));
    // }
    //
    // async verify(email) {
    //     // This script should mark the current user's email address as verified in
    //     // your database.
    //     // It is executed whenever a user clicks the verification link sent by email.
    //     // These emails can be customized at https://manage.auth0.com/#/emails.
    //     // It is safe to assume that the user's email already exists in your database,
    //     // because verification emails, if enabled, are sent immediately after a
    //     // successful signup.
    //     //
    //     // There are two ways that this script can finish:
    //     // 1. The user's email was verified successfully
    //     //     callback(null);
    //     // 2. Something went wrong while trying to reach your database:
    //     //     callback(new Error("my error message"));
    //     //
    //     // If an error is returned, it will be passed to the query string of the page
    //     // where the user is being redirected to after clicking the verification link.
    //     // For example, returning `callback(new Error("error"))` and redirecting to
    //     // https://example.com would redirect to the following URL:
    //     //     https://example.com?email=alice%40example.com&message=error&success=false
    //
    //     let msg = "Please implement the Verify script for this database connection ";
    //     return callback(new Error(msg));
    // }
    //
    // async changePassword(email, newPassword) {
    //     // This script should change the password stored for the current user in your
    //     // database. It is executed when the user clicks on the confirmation link
    //     // after a reset password request.
    //     // The content and behavior of password confirmation emails can be customized
    //     // here: https://manage.auth0.com/#/emails
    //     // The `newPassword` parameter of this function is in plain text. It must be
    //     // hashed/salted to match whatever is stored in your database.
    //     //
    //     // There are three ways that this script can finish:
    //     // 1. The user's password was updated successfully:
    //     //     callback(null, true);
    //     // 2. The user's password was not updated:
    //     //     callback(null, false);
    //     // 3. Something went wrong while trying to reach your database:
    //     //     callback(new Error("my error message"));
    //     //
    //     // If an error is returned, it will be passed to the query string of the page
    //     // where the user is being redirected to after clicking the confirmation link.
    //     // For example, returning `callback(new Error("error"))` and redirecting to
    //     // https://example.com would redirect to the following URL:
    //     //     https://example.com?email=alice%40example.com&message=error&success=false
    //
    //     let msg = "Please implement the Change Password script for this database ";
    //     return callback(new Error(msg));
    // }
    //
    // async remove(id) {
    //     // This script remove a user from your existing database.
    //     // It is executed whenever a user is deleted from the API or Auth0 dashboard.
    //     //
    //     // There are two ways that this script can finish:
    //     // 1. The user was removed successfully:
    //     //     callback(null);
    //     // 2. Something went wrong while trying to reach your database:
    //     //     callback(new Error("my error message"));
    //
    //     let msg = "Please implement the Delete script for this database ";
    //     return callback(new Error(msg));
    // }

};

export function WrongUsernameOrPasswordError(username) {
    return {error: 'wrong username or password: ' + username}
}