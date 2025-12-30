export async function loadImageWithAuth(url: string | undefined | null, token?: string): Promise<string> {
  if (!url) return ''

  try {
    const isDownload = url.includes('/api/v1/images') && url.includes('/download')
    const base = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '')
    const fullUrl = url.startsWith('http') ? url : `${base}${url}`

    if (token && isDownload) {
      const res = await fetch(fullUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        throw new Error('Failed to fetch image')
      }
      const blob = await res.blob()
      return URL.createObjectURL(blob)
    }

    return fullUrl
  } catch (err) {
    return url
  }
}
