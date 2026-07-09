import type { LibraryPrompt } from '../types';
import { prompts as fundamentals } from './fundamentals';
import { prompts as vibeCoding } from './vibe-coding';
import { prompts as softwareDev } from './software-dev';
import { prompts as debugging } from './debugging';
import { prompts as writing } from './writing';
import { prompts as learning } from './learning';
import { prompts as research } from './research';
import { prompts as business } from './business';
import { prompts as marketing } from './marketing';
import { prompts as productivity } from './productivity';
import { prompts as thinking } from './thinking';
import { prompts as dataSql } from './data-sql';
import { prompts as imageGen } from './image-gen';
import { prompts as career } from './career';
import { prompts as roleplay } from './roleplay';
import { prompts as summarize } from './summarize';

export const LIBRARY_PROMPTS: LibraryPrompt[] = [
  ...fundamentals,
  ...vibeCoding,
  ...softwareDev,
  ...debugging,
  ...writing,
  ...learning,
  ...research,
  ...business,
  ...marketing,
  ...productivity,
  ...thinking,
  ...dataSql,
  ...imageGen,
  ...career,
  ...roleplay,
  ...summarize,
];

export const PROMPT_COUNT = LIBRARY_PROMPTS.length;

export const countByCategory = (slug: string): number =>
  LIBRARY_PROMPTS.filter((p) => p.category === slug).length;
