import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';
import { trackEvents } from '@commons/helpers/trackEvents.helper';

export function PageView(url: string = '', title: string = ''): ClassDecorator {
  return (constructor: any): any => {
    const ngOnInit = constructor.prototype.ngOnInit;

    constructor.prototype.ngOnInit = function(...args: any): void {
      trackEvents(url, title);
      if (!isNullOrUndefined(ngOnInit)) {
        ngOnInit.apply(this, args);
      }
    };

    const ngOnDestroy = constructor.prototype.ngOnDestroy;
    constructor.prototype.ngOnDestroy = function(...args: any): void {
      if (!isNullOrUndefined(ngOnDestroy)) {
        ngOnDestroy.apply(this, args);
      }
    };
  };
}
