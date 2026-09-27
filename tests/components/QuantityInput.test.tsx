import { useState } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import QuantityInput from '@/common/QuantityInput';
import { renderWithProviders } from '../test-utils';

const Controlled = ({ initial = 1, max }: { initial?: number; max?: number }) => {
  const [value, setValue] = useState(initial);
  return <QuantityInput value={value} onChange={setValue} max={max} label="Quantity" />;
};

const input = () => screen.getByRole('textbox', { name: 'Quantity' });
const plus = () => screen.getByRole('button', { name: 'Increase quantity' });
const minus = () => screen.getByRole('button', { name: 'Decrease quantity' });

describe('QuantityInput', () => {
  it('increments and decrements with the buttons', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Controlled initial={2} />);

    await user.click(plus());
    expect(input()).toHaveValue('3');

    await user.click(minus());
    await user.click(minus());
    expect(input()).toHaveValue('1');
  });

  it('disables minus at the minimum of 1', () => {
    renderWithProviders(<Controlled initial={1} />);
    expect(minus()).toBeDisabled();
    expect(plus()).toBeEnabled();
  });

  it('disables plus at the maximum', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Controlled initial={2} max={3} />);

    await user.click(plus());
    expect(input()).toHaveValue('3');
    expect(plus()).toBeDisabled();
  });
});
