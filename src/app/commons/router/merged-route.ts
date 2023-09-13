import { Data, Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';

export interface IMergedRoute {
  url: string;
  queryParams: Params;
  params: Params;
  data: Data;
}

export interface IRouteState {
  state: IMergedRoute;
  navigationId: number;
}
export type MergedRouteReducerState = RouterReducerState<IMergedRoute>;
