import { IsJokerPipe } from './is-joker.pipe';

describe('IsJokerPipe', () => {
  it('create an instance', () => {
    const pipe = new IsJokerPipe();
    expect(pipe).toBeTruthy();
  });
});
