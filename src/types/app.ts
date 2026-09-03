export type LessonLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type Lesson = {
  id: string;
  title: string;
  category: string;
  level: LessonLevel;
  duration: string;
  description: string;
  objectives: string[];
  sections: {title: string; body: string}[];
  keyPoints: string[];
  coachingTips: string[];
  commonMistakes: string[];
  question: {
    prompt: string;
    options: string[];
    answerIndex: number;
  };
};

export type GlossaryTerm = {
  id: string;
  term: string;
  pronunciation: string;
  category: string;
  type: string;
  definition: string;
  whenUsed: string;
  example: string;
  related: string[];
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type Offer = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  included: string[];
  availability: string;
  conditions: string;
  eligibility: string;
  validUntil: string;
  tag: string;
};

export type Service = {
  id: string;
  title: string;
  duration: string;
  description: string;
};

export type ParkingSpace = {
  id: string;
  zone: string;
  distance: string;
  type: string;
  available: boolean;
};

export type MatchRecord = {
  id: string;
  date: string;
  time: string;
  court: string;
  matchType: string;
  partner: string;
  opponentOne: string;
  opponentTwo: string;
  format: string;
  setScores: {you: string; opp: string}[];
  duration: string;
  notes: string;
};

export type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  createdAt: string;
};

export type AppState = {
  hasCompletedOnboarding: boolean;
  completedLessons: string[];
  lessonAnswers: Record<string, number>;
  bookmarkedTerms: string[];
  quizBestScore: number;
  quizHistory: {
    lastScore: number;
    correct: number;
    incorrect: number;
    accuracy: number;
  } | null;
  matches: MatchRecord[];
  serviceRequests: {
    id: string;
    serviceId: string;
    fullName: string;
    preferredDate: string;
    preferredTime: string;
    participants: string;
    level: string;
    contact: string;
    notes: string;
    confirmation: string;
  }[];
  parkingReservations: {
    id: string;
    spaceId: string;
    arrivalDate: string;
    arrivalTime: string;
    duration: string;
    make: string;
    model: string;
    licensePlate: string;
  }[];
  assistantMessages: ChatMessage[];
};
