import { WebPlugin } from '@capacitor/core';
import { OtpAutocompleteOptions, OtpAutocompletePluginI } from './definitions';

export class OtpAutocompletePluginWeb extends WebPlugin
  implements OtpAutocompletePluginI {
  async listenOtpOnAndroid(
    arg: OtpAutocompleteOptions
  ): Promise<{ success: boolean }> {
    setTimeout(() => {
      this.notifyListeners('otpReceivedEvent', {
        success: false,
        otp: '84932736',
        msg: ''
      });
    }, 1000);
    return { success: true };
  }
}
