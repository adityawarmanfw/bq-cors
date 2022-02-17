# bq-cors

A method to query BigQuery datasets using CORS-friendly Serverless Function, hosted in Vercel.

This method was first used by [@visnup](https://observablehq.com/@visnup) for the [Baby Names](https://observablehq.com/@visnup/baby-names-by-birth-year) notebook.

This will work as long as the query processing time is under 10s and the query result < 10 MB.
