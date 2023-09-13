import { Capacitor } from '@capacitor/core';

import { environment } from '@environment/environment';
import { Events } from '@commons/constants/events';
import { TealiumUtagService } from '@commons/services/tealium/utag.service';

const tealium = new TealiumUtagService();

export const trackEvents = (
  screenName: string,
  screenTitle: string,
  eventType: string = Events.screen_view
): void => {
  if (Capacitor.getPlatform() !== 'web' && environment.tealium.enabled) {
    const event = {
      tealium_event: eventType,
      event_title: screenName,
      screen_title: screenTitle,
      screen_name: screenName
    };
    tealium.view(event);
  }
};

export const trackLinks = (value: object): void => {
  if (Capacitor.getPlatform() !== 'web' && environment.tealium.enabled) {
    tealium.link(value);
  }
};
