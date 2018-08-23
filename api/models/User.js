const bcrypt = require("bcryptjs");

module.exports = {
  attributes: {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true, isEmail: true },
    password: { type: "String", required: true }
  },
  beforeCreate: (user, next) => {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        return next(error);
      }
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) {
          return next(error);
        }
        user.password = hash;
        next();
      });
    });
  },
  beforeUpdate: (user, next) => {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        return next(error);
      }
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) {
          return next(error);
        }
        user.password = hash;
        next();
      });
    });
  },
  customToJSON() {
    delete this.password;
    return this;
  },
  async checkIfPasswordIsValid(password, user) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, async (error, isMatch) => {
        if (error) {
          reject("Error occoured while checking password");
        }
        if (isMatch) {
          resolve(true);
        } else {
          reject("Invalid password entered");
        }
      });
    });
  }
};
