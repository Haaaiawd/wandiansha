import { describe, it, expect } from 'vitest';
import {
  recommendSites,
  filterSafeSites,
  sortByContentMode,
  shuffleSites,
} from '../../src/utils/recommend';
import type { Site } from '../../src/data/siteTypes';

function site(overrides: Partial<Site> = {}): Site {
  return {
    id: 'site',
    name: 'Site',
    url: 'https://example.com',
    description: 'A site.',
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

describe('filterSafeSites', () => {
  it('keeps safe and child-friendly sites', () => {
    const safe = site();
    expect(filterSafeSites([safe])).toHaveLength(1);
  });

  it('keeps sites with safeLevel exactly 4', () => {
    const borderline = site({ safeLevel: 4 });
    expect(filterSafeSites([borderline])).toHaveLength(1);
  });

  it('drops sites with safeLevel < 4', () => {
    const unsafe = site({ safeLevel: 3 });
    expect(filterSafeSites([unsafe])).toHaveLength(0);
  });

  it('drops sites with childFriendly = false', () => {
    const unsafe = site({ childFriendly: false });
    expect(filterSafeSites([unsafe])).toHaveLength(0);
  });
});

describe('sortByContentMode', () => {
  it('puts matching contentMode first', () => {
    const useful = site({ id: 'useful', contentMode: 'useful' });
    const light = site({ id: 'light', contentMode: 'light' });
    const sorted = sortByContentMode([useful, light], 'light');
    expect(sorted[0].id).toBe('light');
    expect(sorted[1].id).toBe('useful');
  });
});

describe('shuffleSites', () => {
  it('returns same length', () => {
    const input = [site({ id: 'a' }), site({ id: 'b' }), site({ id: 'c' })];
    expect(shuffleSites(input)).toHaveLength(input.length);
  });

  it('returns a permutation of input without seed', () => {
    const input = [site({ id: 'a' }), site({ id: 'b' }), site({ id: 'c' }), site({ id: 'd' })];
    const result = shuffleSites(input);
    expect(result.map((s) => s.id).sort()).toEqual(['a', 'b', 'c', 'd']);
  });

  it('returns deterministic order with same seed', () => {
    const input = [site({ id: 'a' }), site({ id: 'b' }), site({ id: 'c' }), site({ id: 'd' })];
    const first = shuffleSites(input, 123).map((s) => s.id);
    const second = shuffleSites(input, 123).map((s) => s.id);
    expect(first).toEqual(second);
  });
});

describe('recommendSites', () => {
  it('returns safe sites only', () => {
    const safe = site({ id: 'safe' });
    const unsafe = site({ id: 'unsafe', safeLevel: 3 });
    const result = recommendSites([safe, unsafe], { contentMode: 'light' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('safe');
  });

  it('retains all safe child-friendly sites', () => {
    const safe = site({ id: 'safe', safeLevel: 5, contentMode: 'light' });
    const borderline = site({ id: 'borderline', safeLevel: 4, contentMode: 'useful' });
    const result = recommendSites([safe, borderline], { contentMode: 'light' });
    expect(result.map((s) => s.id).sort()).toEqual(['borderline', 'safe']);
  });

  it('retains light content in light mode', () => {
    const useful = site({ id: 'useful', contentMode: 'useful', mayNeedGlobalNetwork: true });
    const light = site({ id: 'light', contentMode: 'light', mayNeedGlobalNetwork: true });
    const result = recommendSites([useful, light], { contentMode: 'light' });
    expect(result.map((s) => s.id).sort()).toEqual(['light', 'useful']);
    expect(result[0].contentMode).toBe('light');
  });

  it('retains useful content in useful mode', () => {
    const useful = site({ id: 'useful', contentMode: 'useful' });
    const light = site({ id: 'light', contentMode: 'light' });
    const result = recommendSites([light, useful], { contentMode: 'useful' });
    expect(result.map((s) => s.id).sort()).toEqual(['light', 'useful']);
    expect(result[0].contentMode).toBe('useful');
  });

  it('keeps non-matching content after all matching content', () => {
    const input = [
      site({ id: 'light-a', contentMode: 'light' }),
      site({ id: 'useful-a', contentMode: 'useful' }),
      site({ id: 'light-b', contentMode: 'light' }),
      site({ id: 'useful-b', contentMode: 'useful' }),
    ];
    const result = recommendSites(input, { contentMode: 'useful' });
    expect(result.slice(0, 2).every((item) => item.contentMode === 'useful')).toBe(true);
    expect(result.slice(2).every((item) => item.contentMode === 'light')).toBe(true);
  });

  it('returns empty array when nothing is safe', () => {
    const unsafe = site({ safeLevel: 3 });
    const result = recommendSites([unsafe], { contentMode: 'light' });
    expect(result).toEqual([]);
  });

  it('returns empty array for empty input', () => {
    const result = recommendSites([], { contentMode: 'light' });
    expect(result).toEqual([]);
  });

  it('returns a permutation of safe sorted sites', () => {
    const input = [
      site({ id: 'a', safeLevel: 4 }),
      site({ id: 'b', safeLevel: 3 }),
      site({ id: 'c', contentMode: 'useful' }),
    ];
    const result = recommendSites(input, { contentMode: 'light' });
    expect(result.map((s) => s.id).sort()).toEqual(['a', 'c']);
  });
});
