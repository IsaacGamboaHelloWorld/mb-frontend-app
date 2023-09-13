import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BANKS } from '@commons/constants/banks';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';
import { IGenerationOtp } from '@modules/tuplus/entities/otp-generation-tuplus';

@Injectable()
export class OtpGenerationTuplusService {
  constructor(private http: HttpClient) {}

  public generateOtp(): Observable<IGenerationOtp> {
    const OTP_GENERATION_REQUEST = {
      companyId: BANKS.BANCO_POPULAR
    };
    const url = urlBuilder.services(
      environment.api.services.tuplus.generateOtp
    );
    return this.http.post<IGenerationOtp>(url, OTP_GENERATION_REQUEST);
  }
}
