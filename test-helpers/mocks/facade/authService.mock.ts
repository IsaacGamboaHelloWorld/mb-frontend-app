import { Injectable } from '@angular/core';

@Injectable()
export class AuthServiceMock {
  set setData(value: string) {}

  get serverPublicKey(): string {
    return '';
  }
}
