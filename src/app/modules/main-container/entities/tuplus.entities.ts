export interface ITuplus {
  success: boolean;
  status: string;
  totalPoints: number;
  points: IProductsTuplus;
}

export interface IProductsTuplus {
  BANCO_DE_BOGOTA: number;
  BANCO_POPULAR: number;
  BANCO_OCCIDENTE: number;
  BANCO_AV_VILLAS: number;
}
