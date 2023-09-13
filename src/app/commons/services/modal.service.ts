import { Injectable, Type } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _modal: HTMLIonModalElement;
  private _type: object;
  private _closeModal: Subject<object> = new Subject<object>();
  private _actionButton: Subject<string> = new Subject<string>();
  constructor(private modalController: ModalController) {}

  get modal(): HTMLIonModalElement {
    return this._modal;
  }

  get actionCloseModal$(): Observable<any> {
    return this._closeModal.asObservable();
  }

  get actionButtonModal$(): Observable<string> {
    return this._actionButton.asObservable();
  }

  public setActionButton(type: string): void {
    this._actionButton.next(type);
  }

  public async openModal(
    component: Type<any>,
    props: object,
    nameClass: string = 'default-modal',
    swipeToClose: boolean = true,
    closeOnActionButton: boolean = false
  ): Promise<void> {
    this.close(null);
    const properties = { ...props, closeOnActionButton };
    const modal = await this.modalController.create({
      component,
      cssClass: nameClass,
      componentProps: properties,
      swipeToClose,
      animated: true,
      backdropDismiss: false
    });
    this._modal = modal;
    this._type = { type: 'default-modal', ...props };
    return await modal.present();
  }

  public close(value: any = null): void {
    this._closeModal.next({ props: this._type, value });
    this._modal?.dismiss();
    this._type = this._modal = null;
  }
}
