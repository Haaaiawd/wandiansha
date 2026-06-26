import type { Site } from './siteTypes';
import rawSites from './sites.json';
import { validateSites } from './siteSchema';

const result = validateSites(rawSites);

export const sites: Site[] = result.success ? result.data : [];
export const sitesLoadError = result.success ? null : result.errors.join('; ');

export default sites;
