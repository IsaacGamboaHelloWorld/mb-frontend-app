export const randomText = (): string => {
  let text = '';
  const POSSIBLE =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i++) {
    text += POSSIBLE.charAt(Math.floor(Math.random() * POSSIBLE.length));
  }

  return text;
};
