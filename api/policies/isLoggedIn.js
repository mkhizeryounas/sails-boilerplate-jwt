module.exports = async function(request, response, next) {
  let authHeader = request.headers["authorization"] || "";
  if (typeof authHeader !== "undefined" && authHeader.includes("Bearer ")) {
    authHeader = authHeader.substring(7);
    JwtService.verify(authHeader, async (err, decode) => {
      try {
        if (err) {
          throw err;
        }
        request.user = await User.findOne({ id: decode.id });
        return next();
      } catch (error) {
        response.status(401).json({
          error: "Authentication error, invalid 'access_token' passed",
          response: error
        });
      }
    });
  } else {
    response.status(401).json({
      status: false,
      responseCode: 401,
      error:
        "Authentication error, 'Authorization' header is missing or invalid"
    });
  }
};
