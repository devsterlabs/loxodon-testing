require("dotenv").config({ path: ".env.cypress" });

const { defineConfig } = require("cypress");

module.exports = defineConfig({


  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: false
  },


  retries: {
    runMode: 2,
    openMode: 0
  },
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "https://loxodon-dev.work.gd",
    experimentalModifyObstructiveThirdPartyCode: true,
    setupNodeEvents(on, config) {
      config.env = {
        ...config.env,
        ENTRA_USERNAME: process.env.ENTRA_USERNAME,
        ENTRA_PASSWORD: process.env.ENTRA_PASSWORD
      };

      on("task", {
        getAADCredentials() {

          const username = process.env.ENTRA_USERNAME;
          const password = process.env.ENTRA_PASSWORD;

          if (!username || !password) {
            throw new Error("ENTRA_USERNAME or ENTRA_PASSWORD missing");
          }

          return { username, password };
        },
      });

      return config;
    },
  },

  video: false,
});
