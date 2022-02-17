# bq-cors

A method to query BigQuery datasets using CORS-friendly Serverless Function, hosted in Vercel.

This method was first used by [@visnup](https://observablehq.com/@visnup) for the [Baby Names](https://observablehq.com/@visnup/baby-names-by-birth-year) notebook.

Will work as long as the query processing time is under 10s (free Vercel) and the query result < 10 MB.

Please deploy your own Vercel project using your own GCP/BQ credentials.

See [example Observable's Notebook](https://observablehq.com/@adityawarmanfw/bigquery-cors-handler).