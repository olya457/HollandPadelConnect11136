import {
  GlossaryTerm,
  Lesson,
  Offer,
  ParkingSpace,
  QuizQuestion,
  Service,
} from '../types/app';
import {
  generatedGlossaryTerms,
  generatedLessons,
  generatedOffers,
  generatedQuizQuestions,
} from './generatedContent';

export const onboardingSlides = [
  {
    id: 'learn',
    image: require('../assets/onboarding-learn-padel.png'),
    eyebrow: 'RULES, TECHNIQUES & TACTICS',
    title: 'Learn Padel',
    description:
      'Study Padel rules, court positioning, scoring, terminology, and essential gameplay concepts.',
    accent: '#9A5CFF',
  },
  {
    id: 'knowledge',
    image: require('../assets/onboarding-knowledge.png'),
    eyebrow: 'LESSONS, GLOSSARY & QUIZZES',
    title: 'Build Your Knowledge',
    description:
      'Complete structured lessons, explore the Padel glossary, and review key concepts.',
    accent: '#FFC529',
  },
  {
    id: 'score',
    image: require('../assets/onboarding-matches.png'),
    eyebrow: 'SCORES, STATS & HISTORY',
    title: 'Track Your Matches',
    description:
      'Record matches, calculate scores in real time, save results, and review performance.',
    accent: '#16D7FF',
  },
  {
    id: 'club',
    image: require('../assets/onboarding-club.png'),
    eyebrow: 'OFFERS, SERVICES & PARKING',
    title: 'Explore the Club',
    description:
      'Discover offers, request services, reserve parking, and chat with your in-app Club Assistant.',
    accent: '#19E38B',
  },
] as const;

const seedLessons: Lesson[] = [
  {
    id: 'net-position',
    title: 'The Net Position',
    category: 'Court Positioning',
    level: 'Beginner',
    duration: '10 min',
    description:
      'Learn why the net position is dominant in Padel and how to establish and maintain it effectively.',
    objectives: [
      'Understand net dominance',
      'Learn correct net position',
      'Know when to advance',
      'Identify retreat triggers',
    ],
    sections: [
      {
        title: 'Why Net Rules Padel',
        body: 'Unlike tennis, the net position in Padel is overwhelmingly advantageous. From the net, you can create sharper angles, apply pressure, intercept weak returns, and force opponents into defensive shots.',
      },
      {
        title: 'Correct Net Position',
        body: 'Stand approximately 2–3 meters from the net, slightly toward your own side of the court. Keep your knees relaxed and your racket around waist-to-chest height.',
      },
      {
        title: 'Advancing to the Net',
        body: 'Move forward after a strong serve, effective approach shot, deep return, or short defensive ball. Both partners should advance together.',
      },
      {
        title: 'When to Retreat',
        body: 'If your opponents play a high, deep lob over you, move back together. Avoid trying to defend a strong lob while standing too close to the net.',
      },
    ],
    keyPoints: [
      'Net position creates offensive opportunities',
      'Stay approximately 2–3 m from the net',
      'Move forward and backward as a pair',
      'Watch carefully for defensive lobs',
    ],
    coachingTips: [
      'Split-step just before your opponent hits',
      'Keep your racket ready in front of your body',
      'Communicate before changing court position',
    ],
    commonMistakes: [
      'Standing directly against the net',
      'One player advancing alone',
      'Staying at the net after a deep lob',
    ],
    question: {
      prompt:
        'How far from the net should you generally stand in an attacking net position?',
      options: ['Less than 1 meter', 'About 5 meters', 'About 2–3 meters', 'Directly against the net'],
      answerIndex: 2,
    },
  },
  {
    id: 'serve',
    title: 'Understanding the Padel Serve',
    category: 'Serve & Return',
    level: 'Beginner',
    duration: '8 min',
    description:
      'Learn the basic serving rules and build a reliable serve that helps your team take control of the point.',
    objectives: [
      'Understand legal serving technique',
      'Learn correct court positioning',
      'Use the serve to reach the net',
    ],
    sections: [
      {
        title: 'How the Serve Works',
        body: 'Every point begins with an underhand serve. The server must bounce the ball behind the service line and strike it at or below waist height.',
      },
      {
        title: 'Serving Position',
        body: 'Stand behind the service line with both feet outside the service box. Avoid stepping across the line before contacting the ball.',
      },
      {
        title: 'Serve With Purpose',
        body: 'A good serve creates enough pressure to allow you and your partner to establish the net position. Aim for depth and placement rather than excessive speed.',
      },
    ],
    keyPoints: [
      'Serve underhand',
      'Strike at or below waist level',
      'Serve diagonally',
      'Use placement before power',
      'Move toward the net after serving',
    ],
    coachingTips: [
      'Use the same preparation on every serve',
      'Aim deep toward the glass or body',
      'Begin moving forward immediately after contact',
    ],
    commonMistakes: [
      'Hitting above waist height',
      'Trying to serve too hard',
      'Staying at the baseline after serving',
    ],
    question: {
      prompt: 'Where must a legal Padel serve initially land?',
      options: [
        "Anywhere in the opponent's court",
        'In the diagonally opposite service box',
        'Beyond the service line',
        'Directly against the back glass',
      ],
      answerIndex: 1,
    },
  },
  {
    id: 'lob',
    title: 'Mastering the Lob',
    category: 'Shots',
    level: 'Beginner',
    duration: '12 min',
    description:
      'Discover why the lob is one of the most important tactical shots in Padel and how to use it to regain court position.',
    objectives: [
      'Understand the tactical purpose of the lob',
      'Recognize the best moments to use it',
      'Learn basic lob technique',
      'Recover the net after a successful lob',
    ],
    sections: [
      {
        title: 'Why the Lob Matters',
        body: 'The lob is one of the main tools used to move opponents away from the net. A successful lob gives the defensive team time to move forward.',
      },
      {
        title: 'Basic Technique',
        body: 'Use a compact swing with an open racket face. Contact the ball in front of your body and guide it upward rather than trying to hit aggressively.',
      },
      {
        title: 'Choosing the Right Moment',
        body: 'Use the lob when you have enough time and balance to control the ball. It is especially effective when opponents are positioned very close to the net.',
      },
    ],
    keyPoints: [
      'The lob helps recover net position',
      'Height and depth are more important than speed',
      'Target space behind the opponents',
    ],
    coachingTips: [
      'Bend your knees before contact',
      'Use a relaxed upward swing',
      'Watch your opponents before deciding to advance',
    ],
    commonMistakes: [
      'Playing a lob when off balance',
      'Hitting too low',
      'Producing a short lob',
    ],
    question: {
      prompt: 'What is the main tactical purpose of a good lob?',
      options: [
        'Hit a direct winner',
        'Keep yourself at the baseline',
        'Increase ball speed',
        'Push opponents away from the net and regain position',
      ],
      answerIndex: 3,
    },
  },
  {
    id: 'bandeja',
    title: 'The Bandeja',
    category: 'Overhead Techniques',
    level: 'Intermediate',
    duration: '14 min',
    description:
      'Learn how the bandeja helps you maintain net position when opponents use defensive lobs.',
    objectives: [
      'Understand the purpose of the bandeja',
      'Recognize suitable balls',
      'Learn positioning and preparation',
      'Control depth and direction',
    ],
    sections: [
      {
        title: 'What Is a Bandeja?',
        body: 'The bandeja is a controlled overhead shot commonly used when an opponent’s lob is too deep for a smash but still playable before it reaches the back glass.',
      },
      {
        title: 'Preparation',
        body: 'Turn sideways early and move behind the expected contact point. Raise the racket while tracking the ball with your non-dominant hand.',
      },
      {
        title: 'Recover the Net',
        body: 'After playing the bandeja, quickly return to your net position rather than watching the shot.',
      },
    ],
    keyPoints: ['Bandeja is primarily a control shot', 'Prepare early', 'Use slice', 'Target depth'],
    coachingTips: [
      'Move your feet before preparing the swing',
      'Keep the contact point comfortable',
      'Focus on consistency before adding speed',
    ],
    commonMistakes: [
      'Treating every bandeja like a smash',
      'Moving backward while facing the net',
      'Remaining deep after the shot',
    ],
    question: {
      prompt: 'What is the primary tactical objective of the bandeja?',
      options: [
        'Hit the ball outside the court',
        'Produce maximum power',
        'Maintain control and preserve net position',
        'Force the ball to bounce twice immediately',
      ],
      answerIndex: 2,
    },
  },
];

const seedGlossaryTerms: GlossaryTerm[] = [
  {
    id: 'bandeja',
    term: 'Bandeja',
    pronunciation: '/ban-DEH-ha/',
    category: 'Shots',
    type: 'Overhead slice control shot',
    definition:
      'A controlled overhead shot played with slice, designed to maintain pressure and preserve net position rather than finish the point immediately.',
    whenUsed:
      'Used when an opponent plays a lob that is not short enough for an aggressive smash but can still be taken overhead.',
    example:
      'Your opponent sends up a deep lob, so you step back, play a controlled bandeja into the corner, and recover your net position.',
    related: ['Vibora', 'Smash', 'Lob', 'Net Position'],
  },
  {
    id: 'vibora',
    term: 'Vibora',
    pronunciation: '/VEE-bo-ra/',
    category: 'Shots',
    type: 'Aggressive sliced overhead',
    definition:
      'An attacking overhead shot with strong sidespin and slice, typically hit with more acceleration than a bandeja.',
    whenUsed:
      'Used when you receive a playable lob and want to maintain the net while putting greater pressure on defenders.',
    example:
      'A short lob gives you time to attack, so you play a vibora toward the side glass and force a difficult return.',
    related: ['Bandeja', 'Smash', 'Slice', 'Side Glass'],
  },
  {
    id: 'chiquita',
    term: 'Chiquita',
    pronunciation: '/chee-KEE-ta/',
    category: 'Shots',
    type: 'Soft tactical shot',
    definition:
      'A controlled, low shot played toward the feet of opponents positioned at the net, making it difficult for them to attack the next volley.',
    whenUsed:
      'Used from a defensive position when you want to neutralize the net players without playing a lob.',
    example:
      'Both opponents are at the net, so you play a soft chiquita toward their feet and move forward after their weak volley.',
    related: ['Volley', 'Net Position', 'Lob', 'Transition'],
  },
  {
    id: 'golden-point',
    term: 'Golden Point',
    pronunciation: '/GOHL-den point/',
    category: 'Scoring',
    type: 'Deciding point',
    definition:
      'A deciding point used at deuce in certain Padel formats instead of continuing with advantage scoring.',
    whenUsed:
      'Used when the score reaches 40–40 in a match or competition that applies Golden Point rules.',
    example:
      'The game reaches 40–40, so the next rally becomes the Golden Point and decides the game.',
    related: ['Deuce', 'Game', 'Score', 'Advantage'],
  },
  {
    id: 'back-glass',
    term: 'Back Glass',
    pronunciation: '/bak glas/',
    category: 'Court',
    type: 'Rear court wall',
    definition:
      'The glass wall positioned behind each team that remains part of normal play after the ball has bounced correctly on the court.',
    whenUsed:
      'Players frequently allow deep shots to rebound from the back glass before returning them.',
    example:
      'Instead of rushing the deep ball, you let it rebound from the back glass and play a controlled return.',
    related: ['Side Glass', 'Rebound', 'Defense', 'Court'],
  },
  {
    id: 'net-position',
    term: 'Net Position',
    pronunciation: '/net puh-ZISH-un/',
    category: 'Positioning',
    type: 'Attacking court position',
    definition:
      'The offensive position occupied by a team near the net, allowing players to volley and apply pressure to opponents.',
    whenUsed:
      'Teams try to establish net position after serving, playing a strong approach shot, or forcing opponents backward with a lob.',
    example:
      'Your deep approach forces the opponents back, giving both you and your partner time to establish net position.',
    related: ['Volley', 'Lob', 'Transition', 'Court Positioning'],
  },
];

const seedQuizQuestions: QuizQuestion[] = [
  {
    id: 'quiz-1',
    prompt:
      'Your opponents are controlling the net and standing very close to it. You receive a comfortable ball near the back of the court. What is usually the best tactical option?',
    options: [
      'Hit a hard flat ball directly at the net player',
      'Play a short drop shot',
      'Play a deep lob over the opponents',
      'Stay defensive and return to the middle',
    ],
    answerIndex: 2,
    explanation:
      'A deep lob can force both opponents away from the net and give your team an opportunity to move forward.',
  },
  {
    id: 'quiz-2',
    prompt:
      'You receive a lob that is too deep for an aggressive smash but still reachable overhead. Which shot is usually the safest choice for maintaining net control?',
    options: ['Bandeja', 'Drop shot', 'Flat forehand', 'Chiquita'],
    answerIndex: 0,
    explanation:
      'The bandeja is designed to control deep lobs while helping you maintain or recover your net position.',
  },
  {
    id: 'quiz-3',
    prompt:
      "During a rally, your shot bounces legally in the opponent's court and then hits their back glass. What happens?",
    options: [
      'You automatically win the point',
      'The ball is out',
      'The rally must be replayed',
      'The ball remains in play',
    ],
    answerIndex: 3,
    explanation:
      'After a legal first bounce on the court, the ball may rebound from the glass and remain playable.',
  },
  {
    id: 'quiz-4',
    prompt:
      'Your partner moves wide to cover a ball near the right side glass. What should you normally do?',
    options: [
      'Move toward the opposite sideline',
      'Shift in the same direction to protect the middle',
      'Stay exactly where you are',
      'Move directly against the back glass',
    ],
    answerIndex: 1,
    explanation:
      'Partners should move as a coordinated unit so that a large gap does not open between them.',
  },
  {
    id: 'quiz-5',
    prompt: 'Which situation is most suitable for playing a chiquita?',
    options: [
      'You are chasing a fast ball behind the baseline',
      'You receive a very high short lob',
      'You have a controlled ball and the opponents are established at the net',
      'Your opponent has already left the court',
    ],
    answerIndex: 2,
    explanation:
      'A chiquita is most effective when you can softly direct the ball toward the feet of net players.',
  },
  {
    id: 'quiz-6',
    prompt: 'Why is maximum power usually not the priority when playing a volley from the net?',
    options: [
      'Volleys are not allowed to travel quickly',
      'Powerful volleys automatically count as faults',
      'Players cannot use spin at the net',
      'Placement and control often create greater tactical pressure',
    ],
    answerIndex: 3,
    explanation:
      'A controlled volley toward the feet, corners, or open space can be more effective than simply hitting harder.',
  },
  {
    id: 'quiz-7',
    prompt:
      'When deciding between a chiquita and a lob, which factor is most important?',
    options: [
      'Which shot looks more impressive',
      'The quality of the incoming ball and the opponents’ positioning',
      'Which player served the previous game',
      'Whether the score contains an even number',
    ],
    answerIndex: 1,
    explanation:
      'Tactical shot selection should respond to the ball you receive and the space available on court.',
  },
  {
    id: 'quiz-8',
    prompt:
      'After hitting a wide volley, what should you generally do next?',
    options: [
      'Remain beside the sideline',
      'Turn your back to the opponents',
      'Move directly backward regardless of the response',
      'Recover toward an effective team position while preparing for the next shot',
    ],
    answerIndex: 3,
    explanation:
      'Recovery after each shot is essential for maintaining court coverage and avoiding exploitable gaps.',
  },
];

const seedOffers: Offer[] = [
  {
    id: 'morning',
    title: 'Morning Court Package',
    shortDescription: 'Early weekday sessions at a reduced rate.',
    description:
      'Start your day on court with access to selected morning time slots at a special club rate.',
    included: ['1 hour court access', 'Equipment storage access', 'Post-session lounge access'],
    availability: 'Monday – Friday, 07:00 – 10:00',
    conditions: 'Advance booking required. Subject to court availability.',
    eligibility: 'All members and registered guests',
    validUntil: '31 Oct 2026',
    tag: 'Available',
  },
  {
    id: 'starter',
    title: 'Padel Starter Experience',
    shortDescription: 'A complete introduction for first-time players.',
    description:
      'Discover the essentials of Padel in a relaxed beginner-friendly session before enjoying guided court practice.',
    included: ['Beginner introduction', '45-minute guided court session', 'Padel racket rental', 'Practice balls'],
    availability: 'Tuesday – Sunday, selected sessions',
    conditions: 'Reservation required at least 24 hours in advance.',
    eligibility: 'New and beginner players',
    validUntil: '30 Nov 2026',
    tag: 'Popular',
  },
  {
    id: 'weekend',
    title: 'Weekend Doubles Package',
    shortDescription: 'A complete session designed for groups of four.',
    description:
      'Gather your team and enjoy a dedicated doubles session during selected weekend periods.',
    included: ['90-minute court booking', 'Four racket rentals', 'Match balls', 'Scorecard access'],
    availability: 'Saturday – Sunday, 10:00 – 18:00',
    conditions: 'Booking must include exactly four players.',
    eligibility: 'Members and registered guests',
    validUntil: '29 Nov 2026',
    tag: 'Weekend Only',
  },
];

export const services: Service[] = [
  {
    id: 'coaching',
    title: 'Private Padel Coaching',
    duration: '60 min',
    description: 'One-on-one technical coaching with a certified Padel instructor.',
  },
  {
    id: 'beginner',
    title: 'Beginner Introduction Session',
    duration: '45 min',
    description: 'Guided introduction to Padel for first-time players.',
  },
  {
    id: 'assessment',
    title: 'Technique Assessment',
    duration: '45 min',
    description: 'Video-assisted technical review with personalized feedback.',
  },
];

export const parkingSpaces: ParkingSpace[] = [
  {id: 'A1', zone: 'Zone A', distance: '35m from entrance', type: 'Standard', available: true},
  {id: 'A2', zone: 'Zone A', distance: '42m from entrance', type: 'Standard', available: true},
  {id: 'A3', zone: 'Zone A', distance: '51m from entrance', type: 'Standard', available: false},
  {id: 'A4', zone: 'Zone A', distance: '55m from entrance', type: 'Standard', available: false},
  {id: 'A5', zone: 'Zone A', distance: '70m from entrance', type: 'Accessible', available: true},
  {id: 'A6', zone: 'Zone A', distance: '30m from entrance', type: 'Standard', available: true},
  {id: 'B1', zone: 'Zone B', distance: '40m from entrance', type: 'Standard', available: true},
  {id: 'B2', zone: 'Zone B', distance: '48m from entrance', type: 'Standard', available: true},
  {id: 'B3', zone: 'Zone B', distance: '60m from entrance', type: 'Standard', available: false},
  {id: 'B4', zone: 'Zone B', distance: '66m from entrance', type: 'Standard', available: true},
];

export const assistantSuggestions = [
  'What are the basic rules of Padel?',
  'How does Padel scoring work?',
  'What is the Golden Point?',
  'What is a bandeja?',
  'How should beginners position themselves?',
  'Can the ball hit the glass?',
];

export const lessons: Lesson[] = generatedLessons as unknown as Lesson[];
export const glossaryTerms: GlossaryTerm[] = generatedGlossaryTerms as unknown as GlossaryTerm[];
export const quizQuestions: QuizQuestion[] = generatedQuizQuestions as unknown as QuizQuestion[];
export const offers: Offer[] = generatedOffers as unknown as Offer[];
