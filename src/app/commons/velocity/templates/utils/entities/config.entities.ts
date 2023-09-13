import { Type } from '@angular/core';
import { IonContent } from '@ionic/angular';

export interface IConfigTemplate {
  beforeUrl: string;
  defaultUrl: string;
  toWho: IStepTemplate;
  howMuch?: IStepTemplate;
  when?: IStepTemplate;
  router: IRouterTemplate[];
  ionContent: IonContent;
  lineTime?: string[];
  emitButtons?: boolean;
}

export interface IStepTemplate {
  component: Type<any>;
  action?: any;
}

export interface IRouterTemplate {
  url: string;
  step: number;
}

export const initConfigTemplate: IConfigTemplate = {
  beforeUrl: '/',
  defaultUrl: '/',
  toWho: null,
  router: [],
  ionContent: null,
  lineTime: [],
  emitButtons: false
};

export enum STATUS_BUTTONS {
  primary = 'primary',
  secondary = 'secondary'
}
