import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const res = await fetch(new URL('/api/upload', req.url).toString(), {
      method: 'POST',
      headers: {
        Authorization: req.headers.get('authorization') || '',
        Cookie: req.headers.get('cookie') || '',
        'Content-Type': req.headers.get('content-type') || '',
      },
      body: req.body,
      // @ts-expect-error node streaming flag
      duplex: 'half',
    })
    const text = await res.text()
    return new NextResponse(text, {
      status: res.status,
      headers: { 'content-type': res.headers.get('content-type') ?? 'application/json' },
    })
  } catch (err) {
    console.error('Shim /api/upload/image error:', err)
    return NextResponse.json({ message: 'Gateway error while forwarding upload' }, { status: 502 })
  }
}
