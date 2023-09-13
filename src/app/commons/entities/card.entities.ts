export interface ICard {
  name: string;
  id: string;
  img?: string;
  content?: {
    title?: string;
    amount?: string;
    amountSmall?: string;
    link?: string;
    showFooter?: boolean;
  };
  sectionError: {
    title: string;
    description: string;
    textButton: string;
    typeButton: string;
  };
  success: boolean;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
  hiddenId?: boolean;
}
