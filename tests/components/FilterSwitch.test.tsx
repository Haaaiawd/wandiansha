import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterSwitch } from '../../src/components/FilterSwitch';

describe('FilterSwitch', () => {
  it('renders both labels', () => {
    render(
      <FilterSwitch
        value="a"
        options={['a', 'b']}
        labels={['A', 'B']}
        onChange={vi.fn()}
        ariaLabel="test"
      />
    );

    expect(screen.getByRole('button', { name: 'A' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'B' })).toBeInTheDocument();
  });

  it('marks active side with aria-pressed', () => {
    render(
      <FilterSwitch
        value="a"
        options={['a', 'b']}
        labels={['A', 'B']}
        onChange={vi.fn()}
        ariaLabel="test"
      />
    );

    expect(screen.getByRole('button', { name: 'A' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'B' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onChange with new value', async () => {
    const onChange = vi.fn();
    render(
      <FilterSwitch
        value="a"
        options={['a', 'b']}
        labels={['A', 'B']}
        onChange={onChange}
        ariaLabel="test"
      />
    );

    await userEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});
