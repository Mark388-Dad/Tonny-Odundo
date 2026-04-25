/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Vocabulary {
  german: string;
  english: string;
  context?: string;
}

export interface ConceptBlock {
  titleEn: string;
  titleDe: string;
  contentEn: string;
  contentDe: string;
}

export interface GrammarExplanation {
  german: string;
  english: string;
  grammarTip: string;
}

export interface PracticeQuestion {
  question: string;
  type: 'opinion' | 'comparative' | 'evaluative';
  criterion: 'A' | 'B' | 'C' | 'D';
  sampleAnswer: string;
  explanation: string;
}

export interface AssessmentTask {
  id: string;
  title: string;
  criterion: 'A' | 'B' | 'C' | 'D';
  instructionEn: string;
  instructionDe: string;
  stimulus?: string; // Text or prompt description
  targetBand: string; // e.g., "7-8"
}

export interface GradingFeedback {
  band: number;
  criterion: string;
  strengthDe: string;
  strengthEn: string;
  improvementDe: string;
  improvementEn: string;
  grammarCorrections: { original: string; corrected: string; rule: string }[];
}

export interface AssessmentCriteria {
  id: string;
  title: string;
  focus: string;
  assessment: string[];
  bands: { level: string; descriptor: string }[];
}

export interface Topic {
  id: string;
  title: string;
  germanTitle: string;
  icon: string;
  coreIdeaEn: string;
  coreIdeaDe: string;
  concepts: ConceptBlock[];
  vocab: Vocabulary[];
  advancedPhrases: Vocabulary[];
  band7Sentences: GrammarExplanation[];
  practiceQuestions: PracticeQuestion[];
  visualPrompt: string;
  deepThinkingEn: string;
  deepThinkingDe: string;
}

export type SubjectId = 'german' | 'french' | 'spanish' | 'mandarin' | 'english-lit' | 'math-std' | 'math-ext' | 'biology' | 'chemistry' | 'physics' | 'individuals-societies' | 'design' | 'arts' | 'phe' | 'personal-project';

export interface Subject {
  id: SubjectId;
  name: string;
  category: 'Language Acquisition' | 'Language & Literature' | 'Sciences' | 'Mathematics' | 'Individuals & Societies' | 'Arts' | 'PHE' | 'Design' | 'Core';
  icon: string;
}

export type GlobalContextId = 'identities' | 'orientation' | 'expression' | 'innovation' | 'globalization' | 'fairness';

export interface GlobalContext {
  id: GlobalContextId;
  name: string;
  description: string;
  explorations: string[];
}

export interface UserSubject {
  subjectId: SubjectId;
  level: string;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  schoolName?: string;
  subjects?: UserSubject[];
  globalContexts?: GlobalContextId[];
  goals?: string[];
  onboardingCompleted?: boolean;
}

export type AppMode = 'dashboard' | 'learn' | 'tutor' | 'exam-prep' | 'assessment' | 'generator' | 'analytics' | 'settings' | 'subject-selector' | 'auth';
