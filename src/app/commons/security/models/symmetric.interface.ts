export interface Symmetric {
  id: string;
  iv: string;
  key: string;
  expiration?: number;
  hmacKey: string;
}
