import { registerPlugin } from '@capacitor/core';
import {
  OtpAutocompletePluginI,
  RateAppPluginI
} from '@commons/capacitor-web-plugins/definitions';

export * from './definitions';

const RateAppPlugin = registerPlugin<RateAppPluginI>('RateApp', {
  web: () => import('./rate-app-plugin').then((m) => new m.RateAppPluginWeb())
});

const OtpAutocompletePlugin = registerPlugin<OtpAutocompletePluginI>(
  'OtpAutocompletePlugin',
  {
    web: () =>
      import('./otp-autocomplete-plugin').then(
        (m) => new m.OtpAutocompletePluginWeb()
      )
  }
);

export { OtpAutocompletePlugin, RateAppPlugin };
