const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demo.nopcommerce.com",
    watchForFileChanges: false,
    video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "chromeWebSecurity": false,
  },
});
