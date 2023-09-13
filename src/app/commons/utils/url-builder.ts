import * as urlTemplate from 'url-template';

import { environment } from '@environment/environment';

export const urlBuilder: any = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  services(url: string, options: Object = {}): string {
    const serverUrl = getServicesUrl(url);
    return urlTemplate.parse(serverUrl).expand(options);
  }
};

export const urlBuilderWithoutBase: any = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  services(url: string, options: Object = {}): string {
    return urlTemplate.parse(url).expand(options);
  }
};

function getServicesUrl(url: string): string {
  return environment.api.base + url;
}
