import { OtpAutocompletePluginWeb } from '@commons/capacitor-web-plugins/otp-autocomplete-plugin';

describe('OtpAutocompletePluginWeb', () => {
  it('Should validate init', () => {
    jasmine.clock().install();
    const plugin = new OtpAutocompletePluginWeb();
    plugin.listenOtpOnAndroid({ senderCode: '858' }).then((data) => {
      jasmine.clock().tick(1001);
      expect(data.success).toBeTruthy();
      jasmine.clock().uninstall();
    });
  });
});
