import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic' // ensure route is built in dev/prod

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'

// safe JSON parse
async function parseJsonSafe(res: Response) {
  const txt = await res.text()
  try { return JSON.parse(txt) } catch { return { message: txt || res.statusText } }
}

export async function POST(request: NextRequest) {
  try {
    // stream form-data + forward auth + content-type (boundary)
    const resp = await fetch(`${BACKEND_URL}/api/upload/image`, {
      method: 'POST',
      headers: {
        Authorization: request.headers.get('authorization') || '',
        Cookie: request.headers.get('cookie') || '',
        'Content-Type': request.headers.get('content-type') || '', // keep boundary
      },
      body: request.body,
      // @ts-expect-error node streaming flag
      duplex: 'half',
    })

    const data = await parseJsonSafe(resp)

    if (resp.ok) {
      const url =
        data?.url ??
        data?.data?.url ??
        data?.secure_url ??
        data?.data?.secure_url ?? null

      if (!url) {
        return NextResponse.json({ message: 'Upload OK but no URL', raw: data }, { status: 200 })
      }
      return NextResponse.json({ url }, { status: 200 })
    }

    const status = resp.status
    let message = data?.message || data?.error || resp.statusText || 'Upload failed'
    if (status === 413) message = 'Image too large.'
    else if (status === 415) message = 'Unsupported media type.'
    else if (status === 400 || status === 422) message = `Invalid image: ${message}`
    else if (status >= 500) message = 'Server error during upload.'
    return NextResponse.json({ message }, { status })
  } catch (err) {
    console.error('Proxy /api/upload error:', err)
    return NextResponse.json({ message: 'Gateway error while forwarding upload' }, { status: 502 })
  }
}
