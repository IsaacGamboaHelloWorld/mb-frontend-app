import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

import {
  initDataTemplate,
  ISaveDataTemplate
} from '@commons/velocity/templates/utils/entities/save.data.entities';

@Injectable({
  providedIn: 'root'
})
export class SaveDataTemplateService {
  private _dataTemplate: ISaveDataTemplate = initDataTemplate;
  private _actionConfirm: Subject<boolean> = new Subject<boolean>();
  private _actionButtons: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private _updateComponent: Subject<boolean> = new Subject<boolean>();

  constructor(private _router: Router) {}

  get dataTemplate(): ISaveDataTemplate {
    return this._dataTemplate;
  }

  get updateComponent$(): Observable<boolean> {
    return this._updateComponent.asObservable();
  }

  get updateActionButtons$(): Observable<string> {
    return this._actionButtons.asObservable();
  }

  get actionConfirm$(): Observable<boolean> {
    return this._actionConfirm.asObservable();
  }

  public setActionConfirm(value: boolean): void {
    this._actionConfirm.next(value);
  }

  public setActionButtons(value: string): void {
    this._actionButtons.next(value);
  }

  public setUpdateComponent(value: boolean): void {
    this._updateComponent.next(value);
  }

  public saveDataTemplate(template: ISaveDataTemplate): void {
    this._dataTemplate = template;
  }

  public resetDataTemplate(): void {
    this._dataTemplate = initDataTemplate;
  }
}
