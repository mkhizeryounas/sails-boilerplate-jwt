module.exports.routes = {
  "/": {
    view: "pages/homepage"
  },
  "GET /api/v1/user/me": "UserController.me",
  "POST /api/v1/user/signup": "UserController.signup",
  "POST /api/v1/user/login": "UserController.login"
};
