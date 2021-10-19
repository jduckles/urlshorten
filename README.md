# URL Shortener as Cloudflare Worker

Using cloudflare workers to make a URL shortner. I'm using this mostly in [dropshare.app](https://dropshare.app/), hence the API key is passed as a URL search parameter.

Very simple API

- /new - provide api_key as URL Search param and POST JSON 

Setup: 
```
wranger secret put API_KEY # create API_KEY string to secure /new endpoint
wrangler dev # test locally
```
Testing example: 
```
curl "http://127.0.0.1:8787/new?api_key=<API_KEY_REDACTED>" -H "content-type: application/json" --data '{"url": "http://test.com"}' --request POST
```

