var connectionString = 'mongodb://127.0.0.1:27017/test';
if(process.env['MLAB_USERNAME']) {
    var username = process.env['MLAB_USERNAME'];
    var password = process.env['MLAB_PASSWORD'];
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137271.mlab.com:37271/heroku_95pqxbsw';
}

var sessionPassword = process.env.MLAB_SESSION_PASSWORD || 'local_password';

var googleConfig = {
    'clientID'      : process.env.GOOGLE_CLIENT_ID || 'local_client_id',
    'clientSecret'  : process.env.GOOGLE_CLIENT_SECRET || 'secret key',
    'callbackURL'   : process.env.GOOGLE_AUTH_CALLBACK || 'http://localhost:3000/auth/google/callback'
};

var port = process.env.PORT || 3000;

module.exports = {  connectionString: connectionString,
                    sessionPassword: sessionPassword,
                    port: port,
                    googleConfig: googleConfig
};
