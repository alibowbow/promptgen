// Shared data model for the prompt-learning platform.

export type Difficulty = '입문' | '중급' | '고급';

/** A single curated, reusable prompt in the library. */
export interface LibraryPrompt {
  /** Unique id, e.g. "vibe-coding-01". */
  id: string;
  /** Concise Korean title. */
  title: string;
  /** Category slug (see categories.ts). */
  category: string;
  difficulty: Difficulty;
  /** Short Korean tags for filtering/search. */
  tags: string[];
  /** The ready-to-use prompt text. May contain [대괄호] placeholders. */
  prompt: string;
  /** The fundamental principle this prompt demonstrates (short). */
  principle: string;
  /** Why it works / when to use it (1-2 sentences, Korean). */
  why: string;
  /** Optional extra usage tip. */
  tip?: string;
  /** The template with its [placeholders] filled for one realistic scenario — ready to run. */
  example?: string;
  /** One sentence: why this filling works / what output to expect. */
  exampleNote?: string;
  /** Situational variants of the template (short label + full prompt). */
  variations?: { label: string; prompt: string }[];
}

/** A before/after teaching example inside a lesson. */
export interface LessonExample {
  bad: string;
  good: string;
  /** Why the good version is better. */
  note: string;
}

/** A single lesson within a curriculum module. */
export interface Lesson {
  /** Unique id, e.g. "m1-l1". */
  id: string;
  /** Owning module id, e.g. "m1". */
  moduleId: string;
  title: string;
  /** One-line summary. */
  summary: string;
  /** Concept explanation as a list of paragraphs. */
  concept: string[];
  /** Key transferable principles. */
  principles: string[];
  /** A concrete before/after example. */
  example: LessonExample;
  /** A short self-check checklist. */
  checklist: string[];
  /** A practice task the learner can try in the generator. */
  exercise: string;
}

/** A curriculum module grouping several lessons. */
export interface Module {
  /** Unique id, e.g. "m1". */
  id: string;
  slug: string;
  title: string;
  emoji: string;
  description: string;
  level: Difficulty;
  /** Display/learning order (ascending). */
  order: number;
  lessons: Lesson[];
}

/** A single multiple-choice quiz question. */
export interface QuizQuestion {
  q: string;
  /** Exactly 4 options. */
  options: string[];
  /** Index (0-3) of the correct option. */
  answer: number;
  /** Why the answer is correct (Korean, 1-2 sentences). */
  explain: string;
}

/** The comprehension quiz attached to one lesson. */
export interface LessonQuiz {
  lessonId: string;
  questions: QuizQuestion[];
}

/** Library category metadata. */
export interface Category {
  slug: string;
  label: string;
  emoji: string;
  description: string;
}
