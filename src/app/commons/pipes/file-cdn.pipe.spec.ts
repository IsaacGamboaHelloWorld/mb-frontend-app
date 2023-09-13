import { FileCdnPipe } from './file-cdn.pipe';

describe('FileCdnPipe', () => {
  let pipe: FileCdnPipe;

  beforeEach(() => {
    pipe = new FileCdnPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be return null', () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it('should be return url', () => {
    expect(pipe.transform('/file.pdf')).toEqual('/assets/files/file.pdf');
  });
});
