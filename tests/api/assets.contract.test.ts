import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { resolve } from 'path';
import sites from '../../src/data/sites.json';
import { validateSites } from '../../src/data/siteSchema';

const PUBLIC_DIR = resolve(__dirname, '../../public');

describe('asset library contract', () => {
  it('placeholder image exists', () => {
    const placeholderPath = resolve(PUBLIC_DIR, 'images/placeholders/toy-default.svg');
    expect(existsSync(placeholderPath)).toBe(true);
  });

  it('every site image path points to public/images', () => {
    const result = validateSites(sites);
    expect(result.success).toBe(true);
    if (result.success) {
      result.data.forEach((site) => {
        expect(site.image).toMatch(/^\/images\//);
        const localPath = resolve(PUBLIC_DIR, site.image.replace(/^\/images\//, 'images/'));
        expect(existsSync(localPath), `missing image for ${site.id}: ${site.image}`).toBe(true);
      });
    }
  });

  it('has a sites directory for future real screenshots', () => {
    const sitesDir = resolve(PUBLIC_DIR, 'images/sites');
    expect(existsSync(sitesDir)).toBe(true);
  });
});
