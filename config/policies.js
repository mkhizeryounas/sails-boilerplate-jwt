module.exports.policies = {
  // '*': true,
  "user/*": "isLoggedIn",
  UserController: {
    login: true,
    create: true,
    signup: true
  }
};
