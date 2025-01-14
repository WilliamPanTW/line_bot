const dotenv = require("dotenv");
dotenv.config({ path: './application/.env' });
const rp = require('request-promise');

// Helper to enforce required parameters
const requiredParam = (param) => {
  const requiredParamError = new Error(`Required parameter, "${param}" is missing.`);
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(requiredParamError, requiredParam);
  }
  throw requiredParamError;
};

module.exports.get = async ({
  table = requiredParam('table'),
  pageSize,
  offset,
  sort,
} = {}) => {
  const option = {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    },
    qs: {
      pageSize,
      sort,
      offset,
    },
    url: `https://api.airtable.com/v0/${process.env.AIRTABLE_API_ID}/${table}`,
    json: true,
  };
  return rp(option);
};
