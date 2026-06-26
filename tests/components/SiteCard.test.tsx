import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SiteCard } from '../../src/components/SiteCard';
import type { Site } from '../../src/data/siteTypes';

function site(overrides: Partial<Site> = {}): Site {
  return {
    id: 'test-site',
    name: 'Test Site',
    url: 'https://example.com',
    description: 'A short description.',
    image: '/images/placeholders/toy-default.svg',
    category: 'test',
    tags: ['tag1', 'tag2', 'tag3', 'tag4'],
    contentMode: 'light',
    domesticPriority: false,
    mayNeedGlobalNetwork: false,
    childFriendly: true,
    safeLevel: 5,
    tested: false,
    ...overrides,
  };
}

describe('SiteCard', () => {
  it('renders name, description, image and at most 3 tags', () => {
    render(<SiteCard site={site()} onClick={vi.fn()} />);

    expect(screen.getByText('Test Site')).toBeInTheDocument();
    expect(screen.getByText('A short description.')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Test Site' })).toBeInTheDocument();
    expect(screen.getAllByText(/tag\d/)).toHaveLength(3);
  });

  it('shows global network hint when mayNeedGlobalNetwork is true', () => {
    render(<SiteCard site={site({ mayNeedGlobalNetwork: true })} onClick={vi.fn()} />);
    expect(screen.getByText('可能需要外网')).toBeInTheDocument();
  });

  it('shows domestic-friendly hint when mayNeedGlobalNetwork is false', () => {
    render(<SiteCard site={site({ mayNeedGlobalNetwork: false })} onClick={vi.fn()} />);
    expect(screen.getByText('国内可试')).toBeInTheDocument();
  });

  it('uses placeholder fallback image path', () => {
    render(<SiteCard site={site()} onClick={vi.fn()} />);
    const img = screen.getByRole('img', { name: 'Test Site' }) as HTMLImageElement;
    expect(img.src).toContain('/images/placeholders/toy-default.svg');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<SiteCard site={site()} onClick={onClick} />);

    await userEvent.click(screen.getByRole('link', { name: /Test Site/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('link has safe rel attributes', () => {
    render(<SiteCard site={site()} onClick={vi.fn()} />);
    const link = screen.getByRole('link', { name: /Test Site/ });
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
