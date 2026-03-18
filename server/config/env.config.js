const path = require('path');
const dotenv = require('dotenv');

const nodeEnv = process.env.NODE_ENV || 'development';
const envFileName = `.env.${nodeEnv}`;
const envFilePath = path.resolve(__dirname, `../${envFileName}`);

dotenv.config();
dotenv.config({ path: envFilePath, override: true });

module.exports = {
  nodeEnv,
  envFileName,
  envFilePath,
};
