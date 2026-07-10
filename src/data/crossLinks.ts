import type { LibraryPrompt } from './types';
import { LIBRARY_PROMPTS } from './library';
import { MODULES } from './curriculum';

// Which library categories best illustrate each curriculum module.
export const MODULE_CATEGORIES: Record<string, string[]> = {
  m1: ['fundamentals'],
  m2: ['roleplay'],
  m3: ['fundamentals', 'summarize'],
  m4: ['fundamentals', 'writing'],
  m5: ['thinking', 'debugging'],
  m6: ['vibe-coding', 'writing'],
  m7: ['vibe-coding', 'software-dev'],
};

// Reverse map: category slug -> first module that teaches its principles.
export const CATEGORY_MODULE: Record<string, string> = {};
for (const [moduleId, slugs] of Object.entries(MODULE_CATEGORIES)) {
  for (const slug of slugs) {
    if (!CATEGORY_MODULE[slug]) CATEGORY_MODULE[slug] = moduleId;
  }
}

/**
 * Related library prompts for a lesson — drawn from the module's mapped
 * categories, rotated by lesson index so sibling lessons get different picks.
 */
export const relatedPromptsForLesson = (
  moduleId: string,
  lessonIndex: number,
  count = 3
): LibraryPrompt[] => {
  const slugs = MODULE_CATEGORIES[moduleId] ?? [];
  const pool = LIBRARY_PROMPTS.filter((p) => slugs.includes(p.category));
  if (pool.length === 0) return [];
  const start = (lessonIndex * count) % pool.length;
  const picks: LibraryPrompt[] = [];
  for (let i = 0; i < Math.min(count, pool.length); i++) {
    picks.push(pool[(start + i) % pool.length]);
  }
  return picks;
};

/** Related prompts for a prompt detail: same category first, then shared tags. */
export const relatedPrompts = (prompt: LibraryPrompt, count = 3): LibraryPrompt[] => {
  const tagSet = new Set(prompt.tags);
  return LIBRARY_PROMPTS.filter((p) => p.id !== prompt.id)
    .map((p) => {
      let score = 0;
      if (p.category === prompt.category) score += 2;
      score += p.tags.filter((t) => tagSet.has(t)).length;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.p);
};

/** The module whose lessons teach the principles behind a library category. */
export const moduleForCategory = (categorySlug: string) => {
  const moduleId = CATEGORY_MODULE[categorySlug];
  return moduleId ? MODULES.find((m) => m.id === moduleId) : undefined;
};
