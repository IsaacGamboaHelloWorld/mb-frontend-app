import { ImageCdnPipe } from 'src/app/commons/pipes/image-cdn.pipe';

describe('ImageCdnPipe', () => {
  let pipe: ImageCdnPipe;

  beforeEach(() => {
    pipe = new ImageCdnPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be return null', () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it('should be return url', () => {
    expect(pipe.transform('/image.png')).toEqual('/assets/images/image.png');
  });
});
