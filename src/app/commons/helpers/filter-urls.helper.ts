import { IUrlExcluded } from '@commons/constants/urls_excluded';

export function isExcludedUrl(
  url: string,
  urls_encrypt: IUrlExcluded[]
): boolean {
  return urls_encrypt.some((urlExclude) => url.includes(urlExclude.url));
}

export const isUrl = (url: string, urls_encrypt: string[]): boolean =>
  urls_encrypt.some((urlExclude) => url.includes(urlExclude));

export function requireSecurityHeaders(
  url: string,
  urls_encrypt: IUrlExcluded[]
): boolean {
  return urls_encrypt.find((urlExclude) => url.includes(urlExclude.url))
    .securityHeaders;
}
