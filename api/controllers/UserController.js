const Joi = require("joi");
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
      let { error } = Joi.validate(
        request.body,
        Joi.object().keys({
          email: Joi.string()
            .email()
            .required(),
          password: Joi.string().required()
        })
      );
      if (error && error.isJoi)
        throw { detail: "Validation error", data: error.details };
      let user = await User.findOne({ email: request.body.email });
      if (typeof user === "undefined")
        throw { detail: "Invalid email address" };
      await User.checkIfPasswordIsValid(request.body.password, user);
      response.json({
        status: true,
        data: {
          user: user,
          access_token: JwtService.issue({ id: user.id })
        },
        message: "Login successful"
      });
    } catch (err) {
      response.status(400).json({
        status: false,
        data: err.data || {},
        error: err.detail || err.stack || "Unknown error occoured"
      });
    }
  },
  signup: async (request, response) => {
    try {
      let { error } = Joi.validate(
        request.body,
        Joi.object().keys({
          email: Joi.string()
            .email()
            .required(),
          name: Joi.string().required(),
          password: Joi.string().required()
        })
      );
      if (error && error.isJoi)
        throw { detail: "Validation error", data: error.details };
      let user = await User.create(request.body).fetch();
      response.json({
        data: user,
        status: true,
        message: "Sign Up Successful"
      });
    } catch (err) {
      response.status(400).json({
        status: false,
        data: err,
        error: err.detail || err.stack || "Unknown error occoured"
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
      response.status(400).json({
        status: false,
        data: err,
        error: err.detail || err.stack || "Unknown error occoured"
      });
    }
  }
};
