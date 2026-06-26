import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';
import type { Site } from '../../src/data/siteTypes';

const mockSites: Site[] = [
  {
    id: 'domestic-light',
    name: 'Domestic Light',
    url: 'https://domestic-light.example.com',
    description: 'A domestic light site.',
    image: '/images/placeholders/toy-default.svg',
    category: 'game',
    tags: ['tag1'],
    contentMode: 'light',
    domesticPriority: true,
    mayNeedGlobalNetwork: false,
    childFriendly: true,
    safeLevel: 5,
    tested: true,
  },
  {
    id: 'global-useful',
    name: 'Global Useful',
    url: 'https://global-useful.example.com',
    description: 'A global useful site.',
    image: '/images/placeholders/toy-default.svg',
    category: 'tool',
    tags: ['tag2'],
    contentMode: 'useful',
    domesticPriority: false,
    mayNeedGlobalNetwork: true,
    childFriendly: true,
    safeLevel: 5,
    tested: true,
  },
];

vi.mock('../../src/data/sites', () => ({
  default: mockSites,
  sitesLoadError: null,
}));

describe('recommendation flow', () => {
  it('draws cards with default filters and shows carousel', async () => {
    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: '抽一下' }));

    expect(screen.getByLabelText('推荐卡片列表')).toBeInTheDocument();
    expect(screen.getByText('2 个结果')).toBeInTheDocument();
    expect(screen.getByText('Domestic Light')).toBeInTheDocument();
    expect(screen.getByText('Global Useful')).toBeInTheDocument();
  });

  it('reflects filter changes in the recommendation result', async () => {
    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: '有点收获' }));
    await userEvent.click(screen.getByRole('button', { name: '抽一下' }));

    expect(screen.getByLabelText('推荐卡片列表')).toBeInTheDocument();
    expect(screen.getByText('Global Useful')).toBeInTheDocument();
  });

  it('shows empty state when filter combination yields no result', async () => {
    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: '国内优先' }));
    await userEvent.click(screen.getByRole('button', { name: '有点收获' }));
    await userEvent.click(screen.getByRole('button', { name: '抽一下' }));

    expect(
      screen.getByText('这一组已经抽完啦，换个筛选再试试。')
    ).toBeInTheDocument();
  });
});
