import { Router }  from 'itty-router'

const router = Router()

async function readRequestBody(request) {
  const { headers } = request
  const contentType = headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    return JSON.stringify(await request.json())
  }
  
}

router.get('*', async request => {

  let pathname = new URL(request.url).pathname.replace("/", "");
  if (pathname.length > 0) { 
    let location = await urls.get(pathname)
    return location 
      ? Response.redirect(location, 301) 
      : new Response("Not Found", {status: 404})
  }
  else
  {
    return new Response("This is a URL shortening serivce, you must add a url key: like - https://dnz.nz/rr", {
        headers: { 'content-type': 'text/html' },
    })
  }

})

router.post('/new', async request => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405
    })
  }


  var params = JSON.parse(await readRequestBody(request))

  const { searchParams } = new URL(request.url)
  let api_key = searchParams.get('api_key')
  if (!api_key || api_key != API_KEY) { 
    return new Response("Unauthorized", {status: 401})
  }


  // If URL not provided generate a random one
  if (!params.hasOwnProperty("url_key")) { 
    params.url_key = Math.random().toString(16).substr(2, 6);
  }

  if (!params.hasOwnProperty("url")) {
    return new Response("Must provide a {url: 'https://somelink.com'} parameter representing the link to be shortened " + Object.keys(params), {status: 405})
  }
  
  await urls.put(params.url_key, params.url)

  const respond = { status: "sucess", 
              shorturl: "https://dnz.nz/" + params.url_key, 
              statusCode: 200 }

  return new Response(JSON.stringify(respond), {status: 200})
})

addEventListener('fetch', event => {
  event.respondWith(router.handle(event.request))
})

