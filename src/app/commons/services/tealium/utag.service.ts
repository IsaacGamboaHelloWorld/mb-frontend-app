import { Injectable } from '@angular/core';

@Injectable()
export class TealiumUtagService {
  constructor() {
    (window as any).utag_cfg_ovrd = { noview: true };
    (window as any).utag_data = {};
  }

  public track(tealiumEvent: string, data?: any): void {
    !!(window as any).utag && (window as any).utag.track(tealiumEvent, data);
  }

  public view(data?: any): void {
    this.track('view', data);
  }

  public link(data?: any): void {
    this.track('link', data);
  }
}
