export interface IBiometricConfirmationItem {
  title: string;
  description: string;
  showSecondaryButton: boolean;
}

export const CONFIRMATION_REGISTER = {
  title: 'BIOMETRIC.SUCCESSFUL_REGISTRATION.TITLE',
  description: 'BIOMETRIC.SUCCESSFUL_REGISTRATION.DESCRIPTION',
  showSecondaryButton: false
};

export const CONFIRMATION_REMOVAL = {
  title: 'BIOMETRIC.SUCCESSFUL_REMOVAL.TITLE',
  description: 'BIOMETRIC.SUCCESSFUL_REMOVAL.DESCRIPTION',
  showSecondaryButton: true
};
