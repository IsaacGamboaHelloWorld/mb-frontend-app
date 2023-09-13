import { Component, Injector, ViewEncapsulation } from '@angular/core';

import { movementsTuplusMapper } from '@modules/tuplus/mappers/movements-tuplus.mapper';
import { TuplusAbstract } from '@modules/tuplus/utils/tuplus.abstract';

@Component({
  selector: 'app-tuplus',
  templateUrl: './tuplus.page.html',
  styleUrls: ['./tuplus.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class TuplusPage extends TuplusAbstract {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ionViewWillEnter(): void {
    this.facade.fetchMovements(movementsTuplusMapper());
    this.facade.fetchConversionFactor();
  }
}
