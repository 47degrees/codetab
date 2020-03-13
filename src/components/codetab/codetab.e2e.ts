import { newE2EPage } from '@stencil/core/testing';

describe('fortyseven-codetab', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fortyseven-codetab></fortyseven-codetab>');

    const element = await page.find('fortyseven-codetab');
    expect(element).toHaveClass('hydrated');
  });
});
