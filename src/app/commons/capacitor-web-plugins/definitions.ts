import { PluginListenerHandle } from '@capacitor/core';

export interface OtpAutocompleteOptions {
  /**
   * It is the phone number from which the sms arrives
   */
  senderCode: string;
}

export interface OtpAutocompleteResponse {
  success: boolean;
  otp: string;
  msg: string;
  retry: boolean;
}

export interface OtpAutocompletePluginI {
  listenOtpOnAndroid(
    arg: OtpAutocompleteOptions
  ): Promise<{ success: boolean }>;
  addListener(
    eventName: 'otpReceivedEvent',
    listenerCallback: (data: OtpAutocompleteResponse) => void
  ): PluginListenerHandle;
}

export interface RateAppPluginI {
  getRate(): Promise<object>;
}
