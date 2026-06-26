const ALLOWED_PROTOCOLS = ['http:', 'https:'];

export function openExternal(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) {
      return false;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
    return true;
  } catch {
    return false;
  }
}
