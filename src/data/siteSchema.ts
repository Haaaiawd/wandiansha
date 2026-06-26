import type { Site } from './siteTypes';
import { CONTENT_MODES } from './siteTypes';

export { CONTENT_MODES };

export const MIN_SAFE_LEVEL = 4;

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isArrayOfStrings(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function hasHttpProtocol(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function hasValidImagePath(image: string): boolean {
  return typeof image === 'string' && image.startsWith('/images/');
}

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: string[] };

export function validateSite(site: unknown): ValidationResult<Site> {
  const errors: string[] = [];

  if (site === null || typeof site !== 'object') {
    return { success: false, errors: ['Site must be an object'] };
  }

  const record = site as Record<string, unknown>;

  if (!isString(record.id) || record.id.trim() === '') {
    errors.push('id must be a non-empty string');
  }

  if (!isString(record.name) || record.name.trim() === '') {
    errors.push('name must be a non-empty string');
  }

  if (!isString(record.url) || record.url.trim() === '') {
    errors.push('url must be a non-empty string');
  } else if (!hasHttpProtocol(record.url)) {
    errors.push('url must use http: or https: protocol');
  }

  if (!isString(record.description) || record.description.trim() === '') {
    errors.push('description must be a non-empty string');
  }

  if (!isString(record.image) || !hasValidImagePath(record.image)) {
    errors.push('image must be a string starting with /images/');
  }

  if (!isString(record.category) || record.category.trim() === '') {
    errors.push('category must be a non-empty string');
  }

  if (!isArrayOfStrings(record.tags)) {
    errors.push('tags must be an array of strings');
  }

  if (!isString(record.contentMode) || !CONTENT_MODES.includes(record.contentMode as typeof CONTENT_MODES[number])) {
    errors.push(`contentMode must be one of ${CONTENT_MODES.join(', ')}`);
  }

  if (!isBoolean(record.domesticPriority)) {
    errors.push('domesticPriority must be a boolean');
  }

  if (!isBoolean(record.mayNeedGlobalNetwork)) {
    errors.push('mayNeedGlobalNetwork must be a boolean');
  }

  if (!isBoolean(record.childFriendly)) {
    errors.push('childFriendly must be a boolean');
  }

  if (!isNumber(record.safeLevel) || !Number.isInteger(record.safeLevel) || record.safeLevel < 1 || record.safeLevel > 5) {
    errors.push('safeLevel must be an integer between 1 and 5');
  }

  if (!isBoolean(record.tested)) {
    errors.push('tested must be a boolean');
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true, data: record as Site };
}

export function validateSites(sites: unknown): ValidationResult<Site[]> {
  if (!Array.isArray(sites)) {
    return { success: false, errors: ['sites must be an array'] };
  }

  const errors: string[] = [];
  const data: Site[] = [];
  const ids = new Set<string>();

  sites.forEach((site, index) => {
    const result = validateSite(site);
    if (!result.success) {
      errors.push(`[${index}]: ${result.errors.join('; ')}`);
    } else {
      if (ids.has(result.data.id)) {
        errors.push(`[${index}]: duplicate id "${result.data.id}"`);
      } else {
        ids.add(result.data.id);
        data.push(result.data);
      }
    }
  });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}

export function isRecommendable(site: Site): boolean {
  return site.safeLevel >= MIN_SAFE_LEVEL && site.childFriendly;
}
