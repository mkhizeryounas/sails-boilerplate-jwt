module.exports.routes = {
  "/": {
    view: "pages/homepage"
  },
  "POST /user/signup": "UserController.signup",
  "POST /user/login": "UserController.login"
};
