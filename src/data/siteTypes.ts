export const CONTENT_MODES = ['light', 'useful'] as const;

export type ContentMode = typeof CONTENT_MODES[number];

export type Site = {
  id: string;
  name: string;
  url: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  contentMode: ContentMode;
  domesticPriority: boolean;
  mayNeedGlobalNetwork: boolean;
  childFriendly: boolean;
  safeLevel: 1 | 2 | 3 | 4 | 5;
  tested: boolean;
};
