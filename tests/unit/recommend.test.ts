import { describe, it, expect } from 'vitest';
import {
  recommendSites,
  filterSafeSites,
  sortByNetworkMode,
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

describe('sortByNetworkMode', () => {
  it('puts domestic-friendly sites first in domestic mode', () => {
    const global = site({ id: 'global', mayNeedGlobalNetwork: true });
    const domestic = site({ id: 'domestic', domesticPriority: true });
    const sorted = sortByNetworkMode([global, domestic], 'domestic');
    expect(sorted[0].id).toBe('domestic');
    expect(sorted[1].id).toBe('global');
  });

  it('keeps original order in all mode', () => {
    const a = site({ id: 'a', mayNeedGlobalNetwork: true });
    const b = site({ id: 'b', domesticPriority: true });
    const sorted = sortByNetworkMode([a, b], 'all');
    expect(sorted[0].id).toBe('a');
    expect(sorted[1].id).toBe('b');
  });

  it('retains all safe sites when domestic results are insufficient', () => {
    const globalA = site({ id: 'global-a', mayNeedGlobalNetwork: true });
    const globalB = site({ id: 'global-b', mayNeedGlobalNetwork: true });
    const sorted = sortByNetworkMode([globalA, globalB], 'domestic');
    expect(sorted).toHaveLength(2);
    expect(sorted.map((s) => s.id)).toContain('global-a');
    expect(sorted.map((s) => s.id)).toContain('global-b');
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
    const result = recommendSites([safe, unsafe], { networkMode: 'all', contentMode: 'light' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('safe');
  });

  it('prioritizes domestic-friendly sites in domestic mode', () => {
    const global = site({ id: 'global', mayNeedGlobalNetwork: true, contentMode: 'useful' });
    const domestic = site({ id: 'domestic', domesticPriority: true, contentMode: 'light' });
    const result = recommendSites([global, domestic], { networkMode: 'domestic', contentMode: 'light' });
    expect(result[0].id).toBe('domestic');
  });

  it('prioritizes light content in light mode', () => {
    const useful = site({ id: 'useful', contentMode: 'useful', mayNeedGlobalNetwork: true });
    const light = site({ id: 'light', contentMode: 'light', mayNeedGlobalNetwork: true });
    const result = recommendSites([useful, light], { networkMode: 'all', contentMode: 'light' });
    expect(result[0].id).toBe('light');
  });

  it('prioritizes useful content in useful mode', () => {
    const useful = site({ id: 'useful', contentMode: 'useful' });
    const light = site({ id: 'light', contentMode: 'light' });
    const result = recommendSites([light, useful], { networkMode: 'all', contentMode: 'useful' });
    expect(result[0].id).toBe('useful');
  });

  it('returns empty array when nothing is safe', () => {
    const unsafe = site({ safeLevel: 3 });
    const result = recommendSites([unsafe], { networkMode: 'all', contentMode: 'light' });
    expect(result).toEqual([]);
  });

  it('returns empty array for empty input', () => {
    const result = recommendSites([], { networkMode: 'all', contentMode: 'light' });
    expect(result).toEqual([]);
  });

  it('returns a permutation of safe sorted sites', () => {
    const input = [
      site({ id: 'a', safeLevel: 4 }),
      site({ id: 'b', safeLevel: 3 }),
      site({ id: 'c', contentMode: 'useful' }),
    ];
    const result = recommendSites(input, { networkMode: 'all', contentMode: 'light' });
    expect(result.map((s) => s.id).sort()).toEqual(['a', 'c']);
  });
});
