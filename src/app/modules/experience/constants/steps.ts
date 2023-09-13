export enum StepExperienceType {
  HAVE_PIN_DEBIT_CARD_ENABLE = 'HAVE_PIN_DEBIT_CARD_ENABLED',
  INIT_PIN_OTP_FLOW = 'INIT_PIN_OTP_FLOW',
  DOESNT_HAVE_PIN_DEBIT_CARD_ENABLE = 'DOESNT_HAVE_PIN_DEBIT_CARD_ENABLED',
  FILL_SECURITY_QUESTION = 'FILL_SECURITY_QUESTION',
  FILL_OTP_DATA = 'FILL_OTP_DATA',
  COMPLETED = 'COMPLETED',
  RETRIES_LIMIT_EXCEED_ON_LOAD_ENROLLMENT_OTP = 'RETRIES_LIMIT_EXCEED_ON_LOAD_ENROLLMENT_OTP',
  RETRIES_LIMIT_EXCEED_ON_FILL_SECURITY_QUESTION = 'RETRIES_LIMIT_EXCEED_ON_FILL_SECURITY_QUESTION',
  SERVICE_ERROR = 'SERVICE_ERROR'
}
