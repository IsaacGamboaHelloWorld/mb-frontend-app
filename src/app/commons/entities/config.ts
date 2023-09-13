export interface IConfig {
  config: ItemConfig[];
}

export interface ItemConfig {
  id: string;
  enabled: boolean;
  new: boolean;
  complementary?: boolean;
}
