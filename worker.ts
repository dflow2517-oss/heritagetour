interface Env {
  ASSETS: Fetcher
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/videos/')) {
      const filename = url.pathname.slice('/videos/'.length)
      const r2Url = `https://pub-83f1ff1abd0c4b679e5f699c7d987364.r2.dev/${filename}`
      const r2Response = await fetch(r2Url)
      const headers = new Headers(r2Response.headers)
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Cache-Control', 'public, max-age=86400')
      return new Response(r2Response.body, { status: r2Response.status, headers })
    }

    return env.ASSETS.fetch(request)
  },
}
