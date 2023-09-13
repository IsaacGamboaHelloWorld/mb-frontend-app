import { Routes } from '@angular/router';

import { MainContainer } from '@modules/main-container/main-container';
import { HomeContainerComponent } from '@modules/main-container/components/home-container/home-container.component';
import { ID_SECTIONS } from '@commons/constants/menu_items';

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    component: MainContainer,
    children: [
      {
        path: '',
        component: HomeContainerComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then((m) => m.HomePageModule)
          }
        ]
      },
      {
        path: ':type/home',
        loadChildren: () =>
          import('../generic-home-product/generic-home-product.module').then(
            (m) => m.GenericHomeProductPageModule
          ),
        data: {
          parent: ID_SECTIONS.payment
        }
      },
      {
        path: 'pagos/nuevo/:type',
        loadChildren: () =>
          import('../payments/new-payment/new-payment.module').then(
            (m) => m.NewPaymentModule
          )
      },
      {
        path: 'pagos/nuevo-un-paso/:type',
        loadChildren: () =>
          import(
            '../payments/new-payment-one-step/new-payment-one-step.module'
          ).then((m) => m.NewPaymentOneStepModule)
      },
      {
        path: 'qr/:type',
        loadChildren: () =>
          import('../qr/new-payment/new-payment.module').then(
            (m) => m.NewPaymentPageModule
          ),
        data: {
          parent: ID_SECTIONS.qr
        }
      },
      {
        path: 'transferencia/nuevo/inscritas',
        loadChildren: () =>
          import('../transfer/new-transfer/new-transfer.module').then(
            (m) => m.NewTransferModule
          )
      },
      {
        path: 'transferencia/nuevo/no-inscritas',
        loadChildren: () =>
          import(
            '../transfer/transfer-not-registered/transfer-not-registered.module'
          ).then((m) => m.TransferNotRegisteredPageModule)
      },
      {
        path: 'recargas/nuevo',
        loadChildren: () =>
          import('../recharges/new-recharge/recharges.module').then(
            (m) => m.RechargesModule
          ),
        data: {
          parent: ID_SECTIONS.recharge
        }
      },
      {
        path: 'giros-retiros',
        loadChildren: () =>
          import(
            '../transfer-withdrawal/new-withdrawal/transfer-withdrawal.module'
          ).then((m) => m.TransferWithdrawalModule),
        data: {
          parent: ID_SECTIONS.transferWithDrawal
        }
      },
      {
        path: 'detalle',
        loadChildren: () =>
          import('../detail/product-detail/product-detail.module').then(
            (m) => m.ProductDetailPageModule
          )
      },
      {
        path: 'avances',
        loadChildren: () =>
          import('../detail/advances/new-advance/advances.module').then(
            (m) => m.AdvancesModule
          ),
        data: {
          parent: ID_SECTIONS.advance
        }
      },
      {
        path: 'nuevo-producto/:type',
        loadChildren: () =>
          import('../open-account-custom/open-account-custom.module').then(
            (m) => m.OpenAccountCustomPageModule
          ),
        data: {
          parent: ID_SECTIONS.payment
        }
      },
      {
        path: 'no-complementarios',
        loadChildren: () =>
          import('../open-account-custom/open-account-custom.module').then(
            (m) => m.OpenAccountCustomPageModule
          )
      },
      {
        path: 'activar-tarjetas',
        loadChildren: () =>
          import('../activate-credit-card/home-active.module').then(
            (m) => m.HomeActivePageModule
          )
      },
      {
        path: 'bloquear-productos',
        loadChildren: () =>
          import('../block-product/block-product.module').then(
            (m) => m.BlockProductPageModule
          ),
        data: {
          parent: ID_SECTIONS.blockingProducts
        }
      },
      {
        path: 'cambiar-contrasena',
        loadChildren: () =>
          import('../change-password/change-password.module').then(
            (m) => m.ChangePasswordPageModule
          )
      },
      {
        path: 'biometrico',
        loadChildren: () =>
          import('../biometric/biometric.module').then(
            (m) => m.BiometricPageModule
          )
      },
      {
        path: 'bolsillos',
        loadChildren: () =>
          import('../pockets/pockets.module').then((m) => m.PocketsModule)
      },
      {
        path: 'totp',
        loadChildren: () =>
          import('../totp/totp.module').then((m) => m.TotpPageModule)
      },
      {
        path: 'mensajes',
        loadChildren: () =>
          import('../messages/messages.module').then(
            (m) => m.MessagesPageModule
          )
      },
      {
        path: 'mejorar-experiencia',
        loadChildren: () =>
          import('../experience/experience.module').then(
            (m) => m.ExperiencePageModule
          ),
        data: {
          parent: ID_SECTIONS.experience
        }
      },
      {
        path: 'notificaciones',
        loadChildren: () =>
          import('../push-notification/push-notification.module').then(
            (m) => m.PushNotificationPageModule
          )
      },
      {
        path: 'documentos/certificados',
        loadChildren: () =>
          import('../documents/certificates/certificates.module').then(
            (m) => m.CertificatesModule
          ),
        data: {
          parent: ID_SECTIONS.certificate
        }
      },
      {
        path: 'documentos/extractos',
        loadChildren: () =>
          import('../documents/statements/statements.module').then(
            (m) => m.StatementsModule
          ),
        data: {
          parent: ID_SECTIONS.statement
        }
      },
      {
        path: 'documentos/tributarios',
        loadChildren: () =>
          import('../documents/tax-certificates/tax-certificates.module').then(
            (m) => m.TaxCertificatesModule
          ),
        data: {
          parent: ID_SECTIONS.taxCertificates
        }
      },
      {
        path: 'tuplus',
        loadChildren: () =>
          import('../tuplus/tuplus.module').then((m) => m.TuplusPageModule)
      },
      {
        path: 'solicitar-productos',
        loadChildren: () =>
          import('../request-product/request-product.module').then(
            (m) => m.RequestProductPageModule
          ),
        data: {
          parent: ID_SECTIONS.requestProducts
        }
      }
    ]
  }
];
