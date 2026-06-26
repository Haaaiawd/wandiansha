import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '../../src/components/EmptyState';

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(<EmptyState title="Empty" description="Nothing here." />);
    expect(screen.getByText('Empty')).toBeInTheDocument();
    expect(screen.getByText('Nothing here.')).toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(<EmptyState title="Done" action={<button>Back</button>} />);
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('renders decorative icon hidden from accessibility tree', () => {
    render(<EmptyState title="Empty" />);
    const icon = screen.getAllByRole('img', { hidden: true }).find(
      (el) => el.tagName.toLowerCase() === 'svg'
    );
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
