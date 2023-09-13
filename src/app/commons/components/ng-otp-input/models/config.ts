export class ConfigOtpInput {
  allowKeyCodes?: string[];
  length: number;
  allowNumbersOnly?: boolean;
  disableAutoFocus?: boolean;
  placeholder?: string;
  letterCase?: 'Upper' | 'Lower';
  iconHidden?: string;
  iconVisible?: string;
}
