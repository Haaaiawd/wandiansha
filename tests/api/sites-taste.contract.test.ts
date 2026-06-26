import { describe, expect, it } from 'vitest';
import sites from '../../src/data/sites.json';

const ALLOWED_CATEGORIES = new Set([
  '互联网怪站',
  '视觉玩具',
  '声音玩具',
  'AI 玩具',
  '探索实验',
  '离谱选择',
  '规则挑战',
  '轻量小游戏',
  '解压玩具',
  '创意挑战',
]);

const BANNED_EDU_DRIFT = /课程|课件|教育平台|在线课程|博物馆主页|工具导航|AI工具大全/;

describe('sites taste contract', () => {
  it('keeps catalog focused on web toys instead of education portals', () => {
    sites.forEach((site) => {
      expect(ALLOWED_CATEGORIES.has(site.category), site.id).toBe(true);
      expect(`${site.name} ${site.description} ${site.category}`, site.id).not.toMatch(BANNED_EDU_DRIFT);
    });
  });

  it('keeps every card immediately playable in tone', () => {
    sites.forEach((site) => {
      expect(site.description.length, site.id).toBeLessThanOrEqual(56);
      expect(site.tags.length, site.id).toBeGreaterThanOrEqual(2);
    });
  });

  it('keeps homepage filter labels backed by enough cards', () => {
    const lightSites = sites.filter((site) => site.contentMode === 'light');
    const usefulSites = sites.filter((site) => site.contentMode === 'useful');

    expect(lightSites.length).toBeGreaterThanOrEqual(30);
    expect(usefulSites.length).toBeGreaterThanOrEqual(30);
  });
});
