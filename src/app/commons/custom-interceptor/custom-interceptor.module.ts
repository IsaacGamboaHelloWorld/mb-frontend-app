import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CustomInterceptor } from '@commons/custom-interceptor/custom.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    }
  ]
})
export class CustomInterceptorModule {}
