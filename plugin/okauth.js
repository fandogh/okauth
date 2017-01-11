import AuthPlugin from './token'
import AuthController from '../controllers/auth'


exports.register = (server, options, next) => {
    // Define our auth scheme
    server.auth.scheme('okauth', AuthPlugin);

    // Register as default strategy
    server.auth.strategy('auth', 'okauth', 'required', options);

    // Register Auth API Routes
    const authController = new AuthController(options);
    server.route(authController.routes);

    // Enforce roles, if options provided
    if (options.acl) {
        server.register({
            register: require('hapi-rbac'),
            options: options.acl,
        }, function (err) {
            if (err) throw err;
            next();
        });
    }

    // Go on
    next();
};

exports.register.attributes = {
    pkg: {
        name: 'OkAuth',
        version: '0.0.0',
    }
};