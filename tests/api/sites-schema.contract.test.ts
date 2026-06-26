import { describe, it, expect } from 'vitest';
import sites from '../../src/data/sites.json';
import { validateSite, validateSites, isRecommendable, CONTENT_MODES } from '../../src/data/siteSchema';
import type { Site } from '../../src/data/siteTypes';

describe('sites.json schema contract', () => {
  it('validates the real sites.json', () => {
    const result = validateSites(sites);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.length).toBeGreaterThanOrEqual(30);
    }
  });

  it('has at least 30 recommendable sites', () => {
    const result = validateSites(sites);
    expect(result.success).toBe(true);
    if (result.success) {
      const recommendable = result.data.filter(isRecommendable);
      expect(recommendable.length).toBeGreaterThanOrEqual(30);
    }
  });

  it('rejects missing required fields', () => {
    const result = validateSite({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.length).toBeGreaterThan(0);
    }
  });

  it('rejects non-http(s) url protocols', () => {
    const result = validateSite({
      id: 'bad-url',
      name: 'Bad URL',
      url: 'ftp://example.com',
      description: 'test',
      image: '/images/placeholders/toy-default.svg',
      category: 'test',
      tags: [],
      contentMode: 'light',
      domesticPriority: false,
      mayNeedGlobalNetwork: false,
      childFriendly: true,
      safeLevel: 5,
      tested: false,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.some((e) => e.includes('http:') || e.includes('https:'))).toBe(true);
    }
  });

  it('rejects invalid contentMode', () => {
    const result = validateSite(validSite({ contentMode: 'fun' as 'light' }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.some((e) => e.includes('contentMode'))).toBe(true);
    }
  });

  it('rejects image paths not under /images/', () => {
    const result = validateSite(validSite({ image: 'https://example.com/image.png' }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.some((e) => e.includes('/images/'))).toBe(true);
    }
  });

  it('rejects duplicate ids', () => {
    const result = validateSites([
      validSite({ id: 'same' }),
      validSite({ id: 'same' }),
    ]);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.some((e) => e.includes('duplicate id'))).toBe(true);
    }
  });

  it('rejects more than 3 tags', () => {
    const result = validateSite(validSite({ tags: ['a', 'b', 'c', 'd'] }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.some((e) => e.includes('tags'))).toBe(true);
    }
  });

  it('accepts a minimal valid site', () => {
    const result = validateSite(validSite());
    expect(result.success).toBe(true);
  });

  it('contentMode values are frozen to expected set', () => {
    expect(CONTENT_MODES).toEqual(['light', 'useful']);
  });
});

function validSite(overrides: Partial<Site> = {}): Site {
  return {
    id: 'valid-site',
    name: 'Valid Site',
    url: 'https://example.com',
    description: 'A valid test site.',
    image: '/images/placeholders/toy-default.svg',
    category: 'test',
    tags: ['test'],
    contentMode: 'light',
    domesticPriority: false,
    mayNeedGlobalNetwork: false,
    childFriendly: true,
    safeLevel: 5,
    tested: false,
    ...overrides,
  };
}
