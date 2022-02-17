const { parse } = require("url");
const { json } = require("micro");
const { BigQuery } = require("@google-cloud/bigquery");

const credentials = JSON.parse(
    process.env.GOOGLE_APPLICATION_CREDENTIALS || "{}"
);

const client = new BigQuery({ credentials, projectId: credentials.project_id });

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }

module.exports = allowCors(async (req, res) => {
    try {
        let query, params;
        if (req.method === "POST")
            ({ query, params } = await json(req));
        else if (req.method === "GET")
            ({ query, params } = parse(req.url, true).query);
        else return {};
        console.log({ query, params });
        const [rows] = await client.query({ query, params, location: "US" });
        return res.send(rows);
    } catch (error) {
        res.send(error);
    }
});


