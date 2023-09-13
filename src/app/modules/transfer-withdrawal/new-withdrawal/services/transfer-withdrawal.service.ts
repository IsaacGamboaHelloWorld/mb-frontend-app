import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  IOtpWithdrawal,
  IOtpWithdrawalResponse
} from '@modules/transfer-withdrawal/new-withdrawal/entities/otp-transfer-withdrawal.entities';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment } from '@environment/environment';

@Injectable()
export class TransferWithdrawalService {
  constructor(private http: HttpClient) {}

  public generate(form: IOtpWithdrawal): Observable<IOtpWithdrawalResponse> {
    const url = urlBuilder.services(
      environment.api.services.transferWithdrawal.generate
    );
    return this.http.post<IOtpWithdrawalResponse>(url, form);
  }
}
