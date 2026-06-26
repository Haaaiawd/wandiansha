import { describe, it, expect, vi } from 'vitest';
import { openExternal } from '../../src/utils/openExternal';

describe('openExternal contract', () => {
  it('opens http url with noopener,noreferrer', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    const result = openExternal('http://example.com');
    expect(result).toBe(true);
    expect(openSpy).toHaveBeenCalledWith('http://example.com', '_blank', 'noopener,noreferrer');
    openSpy.mockRestore();
  });

  it('opens https url with noopener,noreferrer', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    const result = openExternal('https://example.com');
    expect(result).toBe(true);
    expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer');
    openSpy.mockRestore();
  });

  it('rejects non-http(s) protocols', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    expect(openExternal('ftp://example.com')).toBe(false);
    expect(openExternal('javascript:alert(1)')).toBe(false);
    expect(openSpy).not.toHaveBeenCalled();
    openSpy.mockRestore();
  });

  it('rejects invalid urls', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    expect(openExternal('not a url')).toBe(false);
    expect(openSpy).not.toHaveBeenCalled();
    openSpy.mockRestore();
  });
});
