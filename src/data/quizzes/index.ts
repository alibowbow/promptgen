import type { LessonQuiz } from '../types';
import { quizzes as foundations } from './foundations';
import { quizzes as rolePersona } from './role-persona';
import { quizzes as contextConstraints } from './context-constraints';
import { quizzes as examplesFewshot } from './examples-fewshot';
import { quizzes as reasoning } from './reasoning';
import { quizzes as iteration } from './iteration';
import { quizzes as advanced } from './advanced';

export const ALL_QUIZZES: LessonQuiz[] = [
  ...foundations,
  ...rolePersona,
  ...contextConstraints,
  ...examplesFewshot,
  ...reasoning,
  ...iteration,
  ...advanced,
];

export const getQuiz = (lessonId: string): LessonQuiz | undefined =>
  ALL_QUIZZES.find((q) => q.lessonId === lessonId);
