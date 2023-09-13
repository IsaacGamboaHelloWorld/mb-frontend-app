import { NgModule } from '@angular/core';
import {
  routerReducer,
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { MergedRouterStateSerializer } from 'src/app/commons/router/merged-route-serialzer';

@NgModule({
  imports: [
    StoreModule.forFeature('router', routerReducer),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
  ],
  exports: [StoreModule, StoreRouterConnectingModule],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: MergedRouterStateSerializer
    }
  ]
})
export class NgrxRouterStoreModule {}
