import type { Module, Lesson } from '../types';
import { module as foundations } from './foundations';
import { module as rolePersona } from './role-persona';
import { module as contextConstraints } from './context-constraints';
import { module as examplesFewshot } from './examples-fewshot';
import { module as reasoning } from './reasoning';
import { module as iteration } from './iteration';
import { module as advanced } from './advanced';

export const MODULES: Module[] = [
  foundations,
  rolePersona,
  contextConstraints,
  examplesFewshot,
  reasoning,
  iteration,
  advanced,
].sort((a, b) => a.order - b.order);

export const ALL_LESSONS: Lesson[] = MODULES.flatMap((m) => m.lessons);

export const TOTAL_LESSONS = ALL_LESSONS.length;

export const getModule = (slug: string): Module | undefined =>
  MODULES.find((m) => m.slug === slug);

export const getLesson = (id: string): Lesson | undefined =>
  ALL_LESSONS.find((l) => l.id === id);
