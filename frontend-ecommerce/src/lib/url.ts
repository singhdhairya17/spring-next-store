/**
 * Normalizes the public backend base URL (no trailing slash).
 */
export function getBackendBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";
  const trimmed = raw.replace(/\/+$/, "");
  return trimmed;
}

/**
 * Builds an absolute URL for static assets served by the API (e.g. uploads).
 */
export function resolveAssetUrl(path?: string | null): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = getBackendBaseUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
