const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv").config({ path: "../.env" });

const envFile = `
export const environment = {
  production: true,
  apiURL: '${process.env.API_URL}',
};
`;

const targetPath = path.join(
  __dirname,
  "../src/environments/environment.prod.ts"
);
fs.writeFileSync(targetPath, envFile);
console.log("Environment file generated successfully");
