import { Security } from '@commons/security/utils/security';

const security = new Security();

export function encryptProperties(
  data: object,
  publicKey: string,
  properties: string[],
  addPrefix: string = ''
): object {
  for (const sensitiveField of properties) {
    const value = data[sensitiveField];
    if (!!value) {
      data[sensitiveField] =
        addPrefix + security.encryptRsaPkcs1String(value, publicKey);
    }
  }
  return data;
}
