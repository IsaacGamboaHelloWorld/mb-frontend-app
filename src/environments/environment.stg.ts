export const environment = {
  production: true,
  recaptcha: 'RecaptchaMbPopularStgToken',
  validateComplementary: true,
  addDeviceId: false,
  removeKonyFingerprint: false,
  showTotp: false,
  showOptions: false,
  otpSenderCode: '+85676',
  onOtpAutomatic: false,
  scanBarcode: true,
  showOpenAccounts: true,
  dataDog: {
    enable: false,
    clientToken: 'pub0dd1d992f1258c8ba4d39e6fd0d6a8cb',
    appId: '0cb8a828-7837-44ff-99e7-d8aad9228ad1',
    name: 'bpop-mb-frontend-stg'
  },
  tealium: {
    enabled: true,
    init: {
      account: 'adl',
      profile: 'popularapp',
      environment: 'qa',
      instance: 'popularAppStg',
      isLifecycleEnabled: 'TRUE',
      collectDispatchProfile: 'popularapp',
      isCrashReporterEnabled: 'TRUE'
    }
  },
  firebase: {
    enabled: true,
    init: {
      authDomain: 'popular-bm.firebaseapp.com',
      apiKey: 'AIzaSyDd6air9LsL9pAUO8Gl3A3wL3aOmUeojVk',
      databaseURL: 'https://popular-bm.firebaseio.com',
      projectId: 'popular-bm',
      storageBucket: 'popular-bm.appspot.com',
      messagingSenderId: '301872019448',
      appId: '1:301872019448:web:ace34247c3cec5c2d5c80d',
      measurementId: 'G-S21VSQCJ4F'
    }
  },
  api: {
    base: 'https://mb-stg-api-popular.avaldigitallabs.com',
    services: {
      security: {
        cipher_public_key: '/api/cipher/public-key',
        close_security_session: '/api/cipher/close-session',
        validate_security_session: '/api/cipher/validate-session'
      },
      customer: {
        user: '/api/customer/data'
      },
      auth: {
        getEnrollmentServerPublicKey: '/api/auth-manager/public-key',
        getAuthServerPublicKey: '/api/auth-service/v1/public-key',
        enrollment: '/api/v3/enrollment',
        logout: '/api/auth-service/v1/token',
        ping: '/api/auth-service/v1/ping',
        changePassword: '/api/auth-manager/enrollment-secure-data/password'
      },
      experience: '/api/user-self-management',
      products: {
        all: '/api/products/all',
        detail: '/api/products/product',
        movements: '/api/movements/all',
        otherProducts: '/api/products/other-entities/all',
        certificate: '/api/certificates/account',
        certificateTC: '/api/certificates/income-taxes-credit-card',
        certificateGMF: '/api/certificates/gfm',
        certificatesIncome: '/api/certificates/income-taxes',
        certificateRAC: '/api/certificates/rac',
        statements: '/api/statement/periods',
        statementsFile: '/api/statement/file',
        advances: '/api/advances/execute-advance',
        payrollloans: '/api/payroll-loans/all',
        block: '/api/product-administration/lock-product',
        debitCards: '/api/product-administration/debit-cards/search',
        freeDestination: {
          all: '/api/free-destination-credits/all',
          product: '/api/free-destination-credits/product'
        }
      },
      qr: {
        product: '/api/qr/payments-methods',
        info: '/api/qr/info',
        payment: '/api/qr/payment-authorization',
        annulment: '/api/qr/payment-anulation'
      },
      pockets: {
        home: '/api/pockets/all',
        detail: '/api/pockets/pocket',
        create: '/api/pockets/create',
        update: '/api/pockets/update',
        move: '/api/pockets/transfer',
        delete: '/api/pockets/delete',
        categories: '/api/pockets/categories'
      },
      transferWithdrawal: {
        generate: '/api/otp/generate'
      },
      symmetric_key: '/api/cipher/symmetric-key',
      recharges: {
        operators: '/api/cell-phone-recharge/operators-name',
        recharge: '/api/cell-phone-recharge'
      },
      transfer: {
        new: '/api/transfers/transfer',
        newNotRegistered: '/api/transfers-not-registered/transfers',
        affiliation_products: '/api/v2/affiliation-products-v2/all',
        registerAffiliationProducts: '/api/v2/affiliation-products/register',
        cost: '/api/transfers/cost'
      },
      tuplus: {
        balance: '/api/loyalty/balance',
        configuration: '/api/loyalty/configuration',
        redemption: '/api/loyalty/redemption',
        generateOtp: '/api/loyalty/otp/generate',
        movementsTuPlus: '/api/loyalty/transactions',
        loginTuplus: '/api/tu-plus-auth-ms/login',
        logoutTuplus: '/api/tu-plus-auth-ms/logout'
      },
      payment: {
        payLoans: '/api/loans/payment',
        loans: '/api/loans/registered',
        billers: '/api/billers/payments',
        payBillers: '/api/billers/loan-payment',
        register: '/api/billers/register',
        searchBilller: '/api/agreements/available',
        billerDetail: '/api/billers/loan-detail',
        barcode: '/api/barcode',
        taxes: {
          cities: '/api/taxes/cities',
          taxes: '/api/agreements/taxes',
          amount: '/api/taxes/amount',
          payment: '/api/taxes/payment'
        },
        pila: {
          information: '/api/pila/information',
          payment: '/api/v2/payments/payment/pila'
        }
      },
      creditCard: {
        active: '/api/product-administration/credit-card/activate'
      },
      stocks: {
        all: '/api/stocks-aval',
        period: '/api/stocks-aval/periods',
        types: '/api/stocks-aval/types'
      },
      totp: '/api/totp/devices',
      notifications: {
        messages: '/api/notification/list',
        delete: '/api/notification/delete_notification',
        check: '/api/notification/check_notification',
        disabled: '/api/notification/delete',
        send: '/api/notification/send-notification',
        register: '/api/notification/register'
      },
      nicknames: {
        all: '/api/nicknames/all'
      }
    }
  },
  resources: {
    baseAssets: 'https://pb-stg-popular.avaldigitallabs.com',
    contacts: '/assets/mb/contacts.json'
  },
  terms:
    'https://pb-stg-popular.avaldigitallabs.com/assets/files/terms-and-conditions-BM.pdf',
  policies:
    'https://pb-stg-popular.avaldigitallabs.com/assets/files/bank-policies-BM.pdf',
  external_url: {
    offices:
      'https://www.bancopopular.com.co/BuscadordePuntosPopular/?entidad=popular',
    openDepositAccount:
      'https://d1mxnl3uy8al6g.cloudfront.net/cuenta-de-ahorros/sso?channel=mb&dDL={token}&utm_source=MB&utm_medium=direct',
    openCDT:
      'https://d1mxnl3uy8al6g.cloudfront.net/apertura-cdt/sso?channel=mb&dDL={token}&utm_source=MB&utm_medium=direct',
    recharge:
      'https://www.bancopopular.com.co/wps/portal/bancopopular/inicio/para-ti/productos-ahorro-inversion',
    tuplus: 'https://www.tuplus.com.co/wps/portal/portal-lealtad/web/inicio',
    request_credit_card:
      'https://www.bancopopular.com.co/solicitud-tarjeta-de-credito-on-line/?utm_source=BM&utm_medium=bannerappBM&utm_campaign=tc-tcpc-bp-nal-ap-btn-ccn-app-tc&utm_content=tradicional',
    denunciation: 'https://www.policia.gov.co/denuncia-virtual/hurto-personas'
  }
};
