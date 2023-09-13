export interface ISaveDataTemplate {
  toWho: any;
  howMuch?: any;
  when?: any;
  confirmation: any;
  success: any;
  stepActive: string;
  finish: boolean;
}

export const initDataTemplate: ISaveDataTemplate = {
  toWho: null,
  howMuch: null,
  when: null,
  confirmation: null,
  success: null,
  stepActive: 'toWho',
  finish: false
};
