import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from '../../src/pages/Home';
import type { FilterState } from '../../src/utils/recommend';

describe('Home', () => {
  const baseFilters: FilterState = {
    networkMode: 'domestic',
    contentMode: 'light',
  };

  it('renders product name, subtitle, draw button and two filter switches', () => {
    render(
      <Home
        filters={baseFilters}
        onFilterChange={vi.fn()}
        onDraw={vi.fn()}
      />
    );

    expect(screen.getByText('玩点啥.ai')).toBeInTheDocument();
    expect(screen.getByText('随机发现一个好玩的网站')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '抽一下' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: '网络环境' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: '内容倾向' })).toBeInTheDocument();
  });

  it('calls onDraw when draw button is clicked', async () => {
    const onDraw = vi.fn();
    render(
      <Home
        filters={baseFilters}
        onFilterChange={vi.fn()}
        onDraw={onDraw}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: '抽一下' }));
    expect(onDraw).toHaveBeenCalledTimes(1);
  });

  it('toggles network mode', async () => {
    const onFilterChange = vi.fn();
    render(
      <Home
        filters={baseFilters}
        onFilterChange={onFilterChange}
        onDraw={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: '全部' }));
    expect(onFilterChange).toHaveBeenCalledWith({
      networkMode: 'all',
      contentMode: 'light',
    });
  });

  it('toggles content mode', async () => {
    const onFilterChange = vi.fn();
    render(
      <Home
        filters={baseFilters}
        onFilterChange={onFilterChange}
        onDraw={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: '有点收获' }));
    expect(onFilterChange).toHaveBeenCalledWith({
      networkMode: 'domestic',
      contentMode: 'useful',
    });
  });
});
