module.exports = {
  index: async (request, response) => {
    response.json({
      status: true,
      message: "API server's heartbeat is working 💓",
      data: {}
    });
  },
  login: async (request, response) => {
    try {
      let user = await User.findOne({ email: request.body.email });
      if (typeof user === "undefined") throw "Invalid email address";
      await User.checkIfPasswordIsValid(request.body.password, user);
      response.json({
        user: user,
        access_token: JwtService.issue({ id: user.id })
      });
    } catch (err) {
      response.status(401).json({
        status: false,
        data: {},
        error: err || "Error occoured"
      });
    }
  },
  signup: async (request, response) => {
    try {
      let user = await User.create(request.body).fetch();
      response.json({
        data: user,
        status: true,
        message: "Sign Up Successful"
      });
    } catch (err) {
      response.status(401).json({
        status: false,
        data: err,
        error: err.message || err.stack || "An Error Occured"
      });
    }
  },
  me: async (request, response) => {
    try {
      response.json({
        data: request.user,
        status: true,
        message: "Access token valid"
      });
    } catch (err) {
      response.status(401).json({
        status: false,
        data: err,
        error: err.message || err.stack || "An Error Occured"
      });
    }
  }
};
