module.exports.policies = {
  // '*': true,
  "user/*": "isLoggedIn",
  UserController: {
    login: true,
    signup: true
  }
};
