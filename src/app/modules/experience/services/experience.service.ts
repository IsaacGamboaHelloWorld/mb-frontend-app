import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  IExperienceResponse,
  IStartExperience
} from '@modules/experience/entities/experience.entities';
import { environment } from '@environment/environment';
import { urlBuilder } from '@commons/utils/url-builder';

export type PublicKey = Readonly<{
  publicKey: string;
}>;

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  constructor(private http: HttpClient) {}

  public experience(
    experienceData: IStartExperience
  ): Observable<IExperienceResponse> {
    const url = urlBuilder.services(environment.api.services.experience);
    return this.http.post<IExperienceResponse>(url, {
      ...experienceData
    });
  }
}
