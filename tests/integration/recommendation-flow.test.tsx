import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockSites = [
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
    id: 'global-light',
    name: 'Global Light',
    url: 'https://global-light.example.com',
    description: 'A global light site.',
    image: '/images/placeholders/toy-default.svg',
    category: 'tool',
    tags: ['tag2'],
    contentMode: 'light',
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

async function renderApp() {
  const { default: App } = await import('../../src/App');
  return render(<App />);
}

describe('recommendation flow', () => {
  it('draws cards with default filters and shows carousel', async () => {
    await renderApp();

    await userEvent.click(screen.getByRole('button', { name: '抽一下' }));

    expect(screen.getByLabelText('推荐卡片列表')).toBeInTheDocument();
    expect(screen.getByText('2 个结果')).toBeInTheDocument();
    expect(screen.getByText('Domestic Light')).toBeInTheDocument();
    expect(screen.getByText('Global Light')).toBeInTheDocument();
  });

  it('reflects filter changes in the recommendation result', async () => {
    await renderApp();

    await userEvent.click(screen.getByRole('button', { name: '全部' }));
    await userEvent.click(screen.getByRole('button', { name: '抽一下' }));

    expect(screen.getByLabelText('推荐卡片列表')).toBeInTheDocument();
    expect(screen.getByText('Global Light')).toBeInTheDocument();
  });
});

describe('recommendation flow error state', () => {
  it('shows empty state when data loading fails', async () => {
    vi.resetModules();
    vi.doMock('../../src/data/sites', () => ({
      default: [],
      sitesLoadError: 'Failed to load sites.',
    }));

    const { default: App } = await import('../../src/App');
    render(<App />);

    expect(screen.getByText('网站库加载失败')).toBeInTheDocument();
    expect(screen.getByText('Failed to load sites.')).toBeInTheDocument();
  });
});
