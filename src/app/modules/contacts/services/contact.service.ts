import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environment/environment';
import { IContactService } from '@modules/contacts/contact.entities';

@Injectable()
export class ContactService {
  constructor(private http: HttpClient) {}

  public fetchContacts(): Observable<IContactService> {
    return this.http.get<IContactService>(
      environment.resources.baseAssets + environment.resources.contacts
    );
  }
}
