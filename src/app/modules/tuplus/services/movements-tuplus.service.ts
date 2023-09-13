import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { urlBuilder } from '@commons/utils/url-builder';
import {
  IMovementTuplus,
  IRequestMovements
} from '@modules/tuplus/entities/movement-tuplus.entities';

@Injectable()
export class MovementsTuplusService {
  constructor(private http: HttpClient) {}

  public movementsTuplus(
    requestBody: IRequestMovements
  ): Observable<IMovementTuplus> {
    const url = urlBuilder.services(
      environment.api.services.tuplus.movementsTuPlus
    );
    return this.http.post<IMovementTuplus>(url, requestBody);
  }
}
