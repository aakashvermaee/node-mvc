require("dotenv").config({ silent: true });

module.exports = {
  port: process.env.PORT || 4000,
  host: process.env.HOST || "0.0.0.0",
  env: process.env.NODE_ENV || "development",
  development: {
    db: {
      dialect: process.env.DIALECT || "sqlite",
      storage: process.env.STORAGE || ":memory:"
    }
  }
};
