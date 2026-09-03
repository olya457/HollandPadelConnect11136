import React, {createContext, useContext, useEffect, useMemo, useReducer} from 'react';
import {AppState, ChatMessage, MatchRecord} from '../types/app';
import {readStorage, writeStorage} from '../utils/storage';

const initialState: AppState = {
  hasCompletedOnboarding: false,
  completedLessons: [],
  lessonAnswers: {},
  bookmarkedTerms: ['bandeja'],
  quizBestScore: 0,
  quizHistory: null,
  matches: [],
  serviceRequests: [],
  parkingReservations: [],
  assistantMessages: [
    {
      id: 'welcome',
      role: 'assistant',
      text: "Welcome to Holland Casino Padel Connect. I'm your Club Assistant. I can help you with Padel rules and techniques, scoring, Academy lessons, your Scorebook, club services, parking reservations, and more.",
      createdAt: new Date('2026-09-03T18:30:00').toISOString(),
    },
  ],
};

type Action =
  | {type: 'hydrate'; payload: AppState}
  | {type: 'complete-onboarding'}
  | {type: 'toggle-bookmark'; payload: string}
  | {type: 'save-lesson-answer'; payload: {lessonId: string; answerIndex: number}}
  | {type: 'complete-lesson'; payload: string}
  | {
      type: 'save-quiz-result';
      payload: {score: number; correct: number; incorrect: number; accuracy: number};
    }
  | {type: 'add-match'; payload: MatchRecord}
  | {type: 'add-service-request'; payload: AppState['serviceRequests'][number]}
  | {type: 'add-parking-reservation'; payload: AppState['parkingReservations'][number]}
  | {type: 'add-chat-message'; payload: ChatMessage};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'hydrate':
      return action.payload;
    case 'complete-onboarding':
      return {...state, hasCompletedOnboarding: true};
    case 'toggle-bookmark':
      return {
        ...state,
        bookmarkedTerms: state.bookmarkedTerms.includes(action.payload)
          ? state.bookmarkedTerms.filter(id => id !== action.payload)
          : [...state.bookmarkedTerms, action.payload],
      };
    case 'save-lesson-answer':
      return {
        ...state,
        lessonAnswers: {
          ...state.lessonAnswers,
          [action.payload.lessonId]: action.payload.answerIndex,
        },
      };
    case 'complete-lesson':
      return state.completedLessons.includes(action.payload)
        ? state
        : {...state, completedLessons: [...state.completedLessons, action.payload]};
    case 'save-quiz-result':
      return {
        ...state,
        quizBestScore: Math.max(state.quizBestScore, action.payload.accuracy),
        quizHistory: {
          lastScore: action.payload.score,
          correct: action.payload.correct,
          incorrect: action.payload.incorrect,
          accuracy: action.payload.accuracy,
        },
      };
    case 'add-match':
      return {...state, matches: [action.payload, ...state.matches]};
    case 'add-service-request':
      return {...state, serviceRequests: [action.payload, ...state.serviceRequests]};
    case 'add-parking-reservation':
      return {
        ...state,
        parkingReservations: [action.payload, ...state.parkingReservations],
      };
    case 'add-chat-message':
      return {...state, assistantMessages: [...state.assistantMessages, action.payload]};
    default:
      return state;
  }
}

type ContextValue = {
  state: AppState;
  completeOnboarding: () => void;
  toggleBookmark: (id: string) => void;
  saveLessonAnswer: (lessonId: string, answerIndex: number) => void;
  completeLesson: (lessonId: string) => void;
  saveQuizResult: (payload: {
    score: number;
    correct: number;
    incorrect: number;
    accuracy: number;
  }) => void;
  addMatch: (payload: MatchRecord) => void;
  addServiceRequest: (payload: AppState['serviceRequests'][number]) => void;
  addParkingReservation: (payload: AppState['parkingReservations'][number]) => void;
  addChatMessage: (payload: ChatMessage) => void;
};

const AppContext = createContext<ContextValue | undefined>(undefined);

export function AppProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    readStorage<AppState>(initialState).then(payload =>
      dispatch({type: 'hydrate', payload}),
    );
  }, []);

  useEffect(() => {
    writeStorage(state);
  }, [state]);

  const value = useMemo<ContextValue>(
    () => ({
      state,
      completeOnboarding: () => dispatch({type: 'complete-onboarding'}),
      toggleBookmark: id => dispatch({type: 'toggle-bookmark', payload: id}),
      saveLessonAnswer: (lessonId, answerIndex) =>
        dispatch({type: 'save-lesson-answer', payload: {lessonId, answerIndex}}),
      completeLesson: lessonId =>
        dispatch({type: 'complete-lesson', payload: lessonId}),
      saveQuizResult: payload => dispatch({type: 'save-quiz-result', payload}),
      addMatch: payload => dispatch({type: 'add-match', payload}),
      addServiceRequest: payload =>
        dispatch({type: 'add-service-request', payload}),
      addParkingReservation: payload =>
        dispatch({type: 'add-parking-reservation', payload}),
      addChatMessage: payload => dispatch({type: 'add-chat-message', payload}),
    }),
    [state],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
