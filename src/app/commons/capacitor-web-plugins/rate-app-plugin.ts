import { WebPlugin } from '@capacitor/core';
import { RateAppPluginI } from './definitions';

export class RateAppPluginWeb extends WebPlugin implements RateAppPluginI {
  async getRate(): Promise<object> {
    return { value: 'rate web' };
  }
}
