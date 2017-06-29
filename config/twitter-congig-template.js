/*
 Configuration information for Twitter API authorization. Fill in with your values.
 */


const Twitter = {
    CONSUMER_KEY: 'IfTauqLNipa19z0zDW9kvXSoT',
    CONSUMER_SECRET: 'RWny2QQEB7fiAcWxxOpfT8s1QVRcwPJn7JArWU6Hdg95OkjQAF',
    OWNER_ID: '240421422',
    CALLBACK_URL: 'http://localhost:3000/auth/callback',
    REQ_TOKEN_URL: 'https://api.twitter.com/oauth/request_token',
    AUTHORIZE_URL: 'https://api.twitter.com/oauth/authorize',
    ACCESS_TOKEN_URL: 'https://api.twitter.com/oauth/access_token'
}

// const Google = {
//     // CONSUMER_KEY: '',
//     // CONSUMER_SECRET: '',
//     // OWNER_ID: '',
//
//     CLIENT_ID: '385545320053-4q1ukhgkt5ks0pkj00u62f2rlhisnpfc.apps.googleusercontent.',
//     CLIENT_SECRET: 'lO_j-WdPYhYu8gOOU5p7ptAT',
//     CALLBACK_URL: 'http://localhost:3000/auth/callback',
//
//     // REQ_TOKEN_URL: 'https://api.twitter.com/oauth/request_token',
//     // AUTHORIZE_URL: 'https://api.twitter.com/oauth/authorize',
//     // ACCESS_TOKEN_URL: 'https://api.twitter.com/oauth/access_token'
// }



module.exports = Twitter;