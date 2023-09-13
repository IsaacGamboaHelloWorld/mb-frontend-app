import { environment } from '@environment/environment';

export interface IUrlExcluded {
  url: string;
  securityHeaders: boolean;
}

export const URLS_EXCLUDED: IUrlExcluded[] = [
  {
    url: environment.api.services.security.cipher_public_key,
    securityHeaders: false
  },
  {
    url: environment.api.services.security.close_security_session,
    securityHeaders: true
  },
  {
    url: environment.api.services.security.validate_security_session,
    securityHeaders: true
  },
  {
    url: environment.api.services.symmetric_key,
    securityHeaders: false
  },
  {
    url: environment.api.services.auth.getEnrollmentServerPublicKey,
    securityHeaders: false
  },
  {
    url: environment.api.services.auth.getEnrollmentServerPublicKey,
    securityHeaders: false
  },
  {
    url: '/i18n/',
    securityHeaders: false
  },
  {
    url: '/assets/',
    securityHeaders: false
  },
  {
    url: environment.external_url.recharge,
    securityHeaders: false
  },
  {
    url: environment.terms,
    securityHeaders: false
  },
  {
    url: environment.api.services.auth.getAuthServerPublicKey,
    securityHeaders: false
  }
];
