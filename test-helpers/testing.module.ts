import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { translateConfig } from '@app/app.translate';
import '../src/app/commons/helpers/extend-prototype.helpers';
import { APP_BASE_HREF } from '@angular/common';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';
import { CustomHeaderModule } from '@commons/components/custom-header/custom-header.module';

@NgModule({
  imports: [
    GlobalPipesModule,
    VelocityImageTitleModule,
    CustomHeaderModule,
    TranslateModule.forRoot(translateConfig),
    ReactiveFormsModule,
    HttpClientTestingModule,
    RouterModule.forRoot([
    {
        path: 'iniciar-sesion',
        redirectTo: '/'
    },
    {
        path: 'enrolamiento',
        redirectTo: '/'
    },
    {
        path: 'mensajes',
        redirectTo: '/'
    },
    {
        path: 'mensajes/mensaje/:id',
        redirectTo: '/'
    },
    {
        path: 'avances',
        redirectTo: '/'
    },
    {
        path: 'no-complementarios',
        redirectTo: '/'
    },
    {
        path: 'exitoso',
        redirectTo: '/'
    },
    {
        path: 'recargas/nuevo/exitoso',
        redirectTo: '/'
    }
], { relativeLinkResolution: 'legacy' })
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  exports: [GlobalPipesModule, HttpClientTestingModule]
})
export class TestingModule {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }
}
