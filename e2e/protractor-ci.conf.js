
const config = require("./protractor.conf").config;

config.chromeDriver = "/usr/bin/chromedriver";
config.capabilities = {
  browserName: "chrome",
  chromeOptions: {
    args: [
      "--headless",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
    ],
  },
};

exports.config = config;
