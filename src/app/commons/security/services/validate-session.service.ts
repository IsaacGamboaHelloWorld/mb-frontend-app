import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environment/environment';

@Injectable()
export class ValidateSessionService {
  constructor(private http: HttpClient) {}

  public validateSession(): Observable<any> {
    return this.http.get(
      environment.api.base +
        environment.api.services.security.validate_security_session
    );
  }
}
