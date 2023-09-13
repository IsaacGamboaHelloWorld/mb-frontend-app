export interface IToastProperties {
  header?: string;
  message: string;
  duration?: number;
  cssClass?: string;
  position?: 'top' | 'bottom' | 'middle';
  buttons?: Array<string>;
  type: 'error' | 'success' | 'warning' | 'info';
}

export const DEFAULT_TOAST_PROPERTIES: IToastProperties = {
  message: '',
  duration: 7000,
  position: 'top',
  type: 'error',
  cssClass: 'error-toast'
};
