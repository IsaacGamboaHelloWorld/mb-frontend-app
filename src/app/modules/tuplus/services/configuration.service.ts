import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { BANKS } from '@commons/constants/banks';
import { IConversionFactor } from '@modules/tuplus/entities/conversion-factor.entities';
import { environment } from '@environment/environment';
import { urlBuilder } from '@commons/utils/url-builder';

@Injectable()
export class ConfigurationService {
  constructor(private http: HttpClient) {}

  public configuration(): Observable<IConversionFactor> {
    const CONFIGURATION_REQUEST = {
      companyId: BANKS.BANCO_POPULAR,
      configurationRequest: {
        Type: 'cuenta'
      }
    };

    const url = urlBuilder.services(
      environment.api.services.tuplus.configuration
    );
    return this.http.post<IConversionFactor>(url, CONFIGURATION_REQUEST);
  }
}
