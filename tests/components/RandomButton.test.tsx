import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RandomButton } from '../../src/components/RandomButton';

describe('RandomButton', () => {
  it('renders children', () => {
    render(<RandomButton onClick={vi.fn()}>抽一下</RandomButton>);
    expect(screen.getByRole('button', { name: '抽一下' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<RandomButton onClick={onClick}>抽一下</RandomButton>);

    await userEvent.click(screen.getByRole('button', { name: '抽一下' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
