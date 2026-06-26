import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardCarousel } from '../../src/components/CardCarousel';
import type { Site } from '../../src/data/siteTypes';

function site(id: string, overrides: Partial<Site> = {}): Site {
  return {
    id,
    name: `Site ${id}`,
    url: 'https://example.com',
    description: 'Description.',
    image: '/images/placeholders/toy-default.svg',
    category: 'test',
    tags: [],
    contentMode: 'light',
    domesticPriority: false,
    mayNeedGlobalNetwork: false,
    childFriendly: true,
    safeLevel: 5,
    tested: false,
    ...overrides,
  };
}

describe('CardCarousel', () => {
  it('renders all sites in carousel', () => {
    const sites = [site('a'), site('b'), site('c')];
    render(
      <CardCarousel
        sites={sites}
        onSiteClick={vi.fn()}
        onBack={vi.fn()}
      />
    );

    expect(screen.getByLabelText('推荐卡片列表')).toBeInTheDocument();
    expect(screen.getByText('Site a')).toBeInTheDocument();
    expect(screen.getByText('Site b')).toBeInTheDocument();
    expect(screen.getByText('Site c')).toBeInTheDocument();
  });

  it('shows result count', () => {
    const sites = [site('a'), site('b')];
    render(
      <CardCarousel
        sites={sites}
        onSiteClick={vi.fn()}
        onBack={vi.fn()}
      />
    );

    expect(screen.getByText('2 个结果')).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', async () => {
    const onBack = vi.fn();
    render(
      <CardCarousel
        sites={[site('a')]}
        onSiteClick={vi.fn()}
        onBack={onBack}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: /返回/ }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('calls onSiteClick when a card is clicked', async () => {
    const onSiteClick = vi.fn();
    const sites = [site('a')];
    render(
      <CardCarousel
        sites={sites}
        onSiteClick={onSiteClick}
        onBack={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole('link', { name: /Site a/ }));
    expect(onSiteClick).toHaveBeenCalledTimes(1);
  });
});
