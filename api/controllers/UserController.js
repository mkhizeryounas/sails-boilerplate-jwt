module.exports = {
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
      response.status(401).json(
        {
          status: false,
          error: err
        } || "Error occoured"
      );
    }
  }
};
