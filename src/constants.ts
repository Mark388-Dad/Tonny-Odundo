/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Subject, GlobalContext, Topic, AssessmentCriteria, Vocabulary } from './types';

export const SUBJECTS: Subject[] = [
  { id: 'german', name: 'German', category: 'Language Acquisition', icon: 'Languages' },
  { id: 'french', name: 'French', category: 'Language Acquisition', icon: 'Languages' },
  { id: 'spanish', name: 'Spanish', category: 'Language Acquisition', icon: 'Languages' },
  { id: 'mandarin', name: 'Mandarin', category: 'Language Acquisition', icon: 'Languages' },
  { id: 'english-lit', name: 'English Lang & Lit', category: 'Language & Literature', icon: 'BookOpen' },
  { id: 'math-std', name: 'Mathematics (Standard)', category: 'Mathematics', icon: 'Calculator' },
  { id: 'math-ext', name: 'Mathematics (Extended)', category: 'Mathematics', icon: 'Calculator' },
  { id: 'biology', name: 'Biology', category: 'Sciences', icon: 'Microscope' },
  { id: 'physics', name: 'Physics', category: 'Sciences', icon: 'Zap' },
  { id: 'chemistry', name: 'Chemistry', category: 'Sciences', icon: 'FlaskConical' },
  { id: 'individuals-societies', name: 'Individuals & Societies', category: 'Individuals & Societies', icon: 'Users' },
  { id: 'design', name: 'Design', category: 'Design', icon: 'Compass' },
  { id: 'arts', name: 'Arts', category: 'Arts', icon: 'Palette' },
  { id: 'phe', name: 'Physical & Health Ed', category: 'PHE', icon: 'HeartPulse' },
  { id: 'personal-project', name: 'Personal Project', category: 'Core', icon: 'Star' },
];

export const GLOBAL_CONTEXTS: GlobalContext[] = [
  {
    id: 'identities',
    name: 'Identities and Relationships',
    description: 'Who am I? Who are we? Exploring identity, beliefs, values, and human relationships.',
    explorations: ['Competition and cooperation', 'Identity formation', 'Self-esteem', 'Transitions', 'Health and well-being']
  },
  {
    id: 'orientation',
    name: 'Orientation in Space and Time',
    description: 'What is the meaning of "where" and "when"? Exploring personal histories, homes, journeys, and migrations.',
    explorations: ['Civilizations and social histories', 'Epochs and eras', 'Natural and human landscapes', 'Evolution and adaptation']
  },
  {
    id: 'expression',
    name: 'Personal and Cultural Expression',
    description: 'What is the nature and purpose of creative expression? Discovering and expressing ideas, feelings, and culture.',
    explorations: ['Artistry and craft', 'Social constructions of reality', 'Philosophies', 'Metacognition', 'Entrepreneurship']
  },
  {
    id: 'innovation',
    name: 'Scientific and Technical Innovation',
    description: 'How do we understand the worlds in which we live? Exploring the natural world and human interaction with it.',
    explorations: ['Systems and models', 'Adaptation and ingenuity', 'Digital life', 'Biological revolution', 'Mathematical discoveries']
  },
  {
    id: 'globalization',
    name: 'Globalization and Sustainability',
    description: 'How is everything connected? Exploring the interconnectedness of human-made systems and communities.',
    explorations: ['Markets and commercialization', 'Human impact on the environment', 'Urban planning', 'Population and demography']
  },
  {
    id: 'fairness',
    name: 'Fairness and Development',
    description: 'What are the consequences of our common humanity? Exploring rights, responsibilities, and access to opportunities.',
    explorations: ['Democracy and politics', 'Inequality and inclusion', 'Power and privilege', 'Justice and peace', 'Civic responsibility']
  }
];

export const ASSESSMENT_CRITERIA_BY_SUBJECT: { [key: string]: AssessmentCriteria[] } = {
  german: [
    {
      id: 'A',
      title: 'Criterion A: Comprehending Spoken and Visual Text',
    focus: 'Understanding spoken German (audio clips, conversations) and associated visuals.',
    assessment: ['Identifying main ideas', 'Specific details', 'Basic inferences'],
    bands: [
      { level: '7-8', descriptor: 'Analyzes most information accurately, identifies almost all main ideas and supporting details. Draws complex inferences.' },
      { level: '5-6', descriptor: 'Identifies most main ideas and supporting details. Draws some simple inferences.' }
    ]
  },
  {
    id: 'B',
    title: 'Criterion B: Comprehending Written and Visual Text',
    focus: 'Understanding written German (texts, signs, web pages) and visual aids.',
    assessment: ['Identifying explicit/implicit information', 'Understanding basic text conventions'],
    bands: [
      { level: '7-8', descriptor: 'Analyzes explicit and implicit information effectively. Identifies text conventions and their impact.' },
      { level: '5-6', descriptor: 'Identifies explicit and some implicit information. Recognizes basic text conventions.' }
    ]
  },
  {
    id: 'C',
    title: 'Criterion C: Communicating in Response to Spoken, Written, and Visual Text',
    focus: 'Responding to various stimuli in oral or written form.',
    assessment: ['Interpreting information', 'Using language effectively to respond'],
    bands: [
      { level: '7-8', descriptor: 'Responds with significant detail and depth. Demonstrates insightful interpretation of the stimulus.' },
      { level: '5-6', descriptor: 'Responds with relevant detail. Demonstrates a clear understanding of the stimulus.' }
    ]
  },
  {
    id: 'D',
    title: 'Criterion D: Using Language in Spoken and Written Form',
    focus: 'Accuracy of language production.',
    assessment: ['Correct vocabulary', 'Grammatical structures', 'Organization appropriate to emergent level'],
    bands: [
      { level: '7-8', descriptor: 'Uses a wide range of vocabulary and complex grammatical structures with high accuracy. Organization is very effective.' },
      { level: '5-6', descriptor: 'Uses a good range of vocabulary and some complex structures with good accuracy. Logic and organization are clear.' }
    ]
  }
 ]
};

export const ASSESSMENT_TASKS: { [key: string]: Topic[] } = {}; // We'll link tasks to topics

export const MOCK_EXAM_TASKS = [
  {
    id: 'task-1',
    title: 'Social Media & Self-Esteem Analysis',
    criterion: 'C',
    instructionEn: 'Read the blog post about social media and write a response evaluating whether the pros outweigh the cons for teenagers.',
    instructionDe: 'Lies den Blog-Beitrag über soziale Medien und schreibe eine Antwort, in der du bewertest, ob die Vorteile die Nachteile für Jugendliche überwiegen.',
    stimulus: 'Blog: "Das digitale Spiegelbild". Viele Jugendliche verbringen täglich Stunden auf Instagram. Sie sehen perfekte Bilder und vergleichen sich mit anderen. Einerseits macht es Spaß, Bilder zu teilen. Andererseits entstehen oft Druck und Unsicherheit.',
    targetBand: '7-8'
  },
  {
    id: 'task-2',
    title: 'The Future of Human Relationships',
    criterion: 'D',
    instructionEn: 'Write an article for your school magazine reflecting on how technology has changed how we communicate with our friends and family.',
    instructionDe: 'Schreibe einen Artikel für deine Schulzeitung, in dem du darüber reflektierst, wie die Technologie die Kommunikation mit Freunden und Familie verändert hat.',
    stimulus: 'Prompt: Discuss the shift from face-to-face meetings to digital messaging.',
    targetBand: '7-8'
  }
];

export const TOPICS_BY_SUBJECT: { [key: string]: Topic[] } = {
  german: [
    {
      id: 'identity',
    title: 'Identity',
    germanTitle: 'Identität',
    icon: 'User',
    coreIdeaEn: 'Identity is who you are—your personality, values, roles, and culture. It is not fixed; it is dynamic and changes over time.',
    coreIdeaDe: 'Identität ist, wer du bist – deine Persönlichkeit, deine Werte, deine Rollen und deine Kultur. Sie ist nicht fest, sondern dynamisch und verändert sich mit der Zeit.',
    concepts: [
      {
        titleEn: 'Personality',
        titleDe: 'Persönlichkeit',
        contentEn: 'How you behave and react to the world (e.g., introvert, self-confident, ambitious).',
        contentDe: 'Wie du dich verhältst und auf die Welt reagierst (z. B. introvertiert, selbstbewusst, ehrgeizig).'
      },
      {
        titleEn: 'Values & Beliefs',
        titleDe: 'Werte & Überzeugungen',
        contentEn: 'What you consider right and important (e.g., honesty, respect, freedom).',
        contentDe: 'Was du für richtig und wichtig hältst (z. B. Ehrlichkeit, Respekt, Freiheit).'
      }
    ],
    vocab: [
      { german: 'selbstbewusst', english: 'self-confident' },
      { german: 'ehrgeizig', english: 'ambitious' },
      { german: 'die Herkunft', english: 'origin/background' },
      { german: 'das Vorbild', english: 'role model' }
    ],
    advancedPhrases: [
      { german: 'Ich sehe mich als eine Person, die...', english: 'I see myself as a person who...' },
      { german: 'Meine Identität wird von meiner Familie geprägt.', english: 'My identity is shaped by my family.' }
    ],
    band7Sentences: [
      {
        german: "Würden wir unsere Herkunft ignorieren, verlören wir einen wesentlichen Teil unserer Identität.",
        english: "If we were to ignore our origins, we would lose an essential part of our identity.",
        grammarTip: "Uses Konjunktiv II (Subjunctive II) to express a hypothetical condition and its consequence."
      },
      {
        german: "Es ist von entscheidender Bedeutung, dass die Identität nicht als etwas Statisches, sondern als ein dynamischer Prozess verstanden wird.",
        english: "It is of crucial importance that identity is understood not as something static, but as a dynamic process.",
        grammarTip: "Uses Passive Voice ('verstanden wird') and sophisticated noun-verb combinations ('von entscheidender Bedeutung sein')."
      },
      {
        german: "Man darf nicht außer Acht lassen, dass unsere Identität maßgeblich durch die Sprache beeinflusst wird, die wir sprechen.",
        english: "One must not lose sight of the fact that our identity is significantly influenced by the language we speak.",
        grammarTip: "Combines a modal verb construction ('darf nicht außer Acht lassen') with passive voice and a relative clause."
      },
      {
        german: "Hätten wir die Freiheit nicht, unsere Werte selbst zu wählen, wäre das Konzept der Identität bedeutungslos.",
        english: "If we did not have the freedom to choose our values ourselves, the concept of identity would be meaningless.",
        grammarTip: "Uses Subjunctive II in a conditional sentence and an infinitive construction with 'zu'."
      }
    ],
    practiceQuestions: [
      {
        question: "Inwieweit bestimmt unsere Kultur, wer wir sind?",
        type: 'evaluative',
        criterion: 'C',
        sampleAnswer: "Ich denke, dass Kultur die Basis unserer Identität bildet. Zum Beispiel prägen Traditionen unsere Werte. Einerseits gibt uns das Sicherheit, andererseits kann es die individuelle Freiheit einschränken.",
        explanation: "This answer uses an evaluative structure (Einerseits/Andererseits) and complex connectors."
      }
    ],
    visualPrompt: "A Venn diagram showing overlapping spheres of 'Family', 'Culture', and 'Personal Choice' creating 'Identity' in the center.",
    deepThinkingEn: 'You are not born with a complete identity—it is formed through influences like family, friends, and society.',
    deepThinkingDe: 'Man wird nicht mit einer fertigen Identität geboren – sie bildet sich durch Einflüsse wie Familie, Freunde und die Gesellschaft.'
  },
  {
    id: 'relationships',
    title: 'Relationships',
    germanTitle: 'Beziehungen',
    icon: 'Users',
    coreIdeaEn: 'Relationships are connections between people. They are built on trust, communication, and mutual respect.',
    coreIdeaDe: 'Beziehungen sind Verbindungen zwischen Menschen. Sie basieren auf Vertrauen, Kommunikation und gegenseitigem Respekt.',
    concepts: [
      {
        titleEn: 'Types of Connection',
        titleDe: 'Arten von Verbindungen',
        contentEn: 'Family (authority, generation gaps), Friends (loyalty, trust), and Social Groups.',
        contentDe: 'Familie (Autorität, Generationenkonflikte), Freunde (Loyalität, Vertrauen) und soziale Gruppen.'
      },
      {
        titleEn: 'Healthy vs. Toxic',
        titleDe: 'Gesund vs. Toxisch',
        contentEn: 'A healthy relationship offers support; a toxic one creates pressure and stress.',
        contentDe: 'Eine gesunde Beziehung bietet Unterstützung; eine toxische erzeugt Druck und Stress.'
      }
    ],
    vocab: [
      { german: 'das Vertrauen', english: 'trust' },
      { german: 'die Loyalität', english: 'loyalty' },
      { german: 'der Konflikt', english: 'conflict' },
      { german: 'die Kommunikation', english: 'communication' }
    ],
    advancedPhrases: [
      { german: 'Eine gute Beziehung basiert auf gegenseitigem Verständnis.', english: 'A good relationship is based on mutual understanding.' },
      { german: 'Konflikte entstehen oft, wenn Erwartungen nicht klar sind.', english: 'Conflicts often arise when expectations are not clear.' }
    ],
    band7Sentences: [
      {
        german: "Obwohl Konflikte oft unvermeidlich sind, können sie durch offene Kommunikation gelöst werden.",
        english: "Although conflicts are often inevitable, they can be resolved through open communication.",
        grammarTip: "Uses 'Obwohl' (conjunction with verb at end) and Passive Voice ('gelöst werden')."
      },
      {
        german: "Man sollte Distanz zu Beziehungen wahren, die das persönliche Wohlbefinden beeinträchtigen.",
        english: "One should maintain distance from relationships that impair personal well-being.",
        grammarTip: "Uses a Relative Clause ('die... beeinträchtigen') and the modal verb 'sollte'."
      },
      {
        german: "Es wird oft behauptet, dass wahre Loyalität erst in Krisenzeiten unter Beweis gestellt wird.",
        english: "It is often claimed that true loyalty is only put to the test in times of crisis.",
        grammarTip: "Uses passive voice ('wird ... gestellt') and the abstract expression 'unter Beweis stellen'."
      },
      {
        german: "Würden wir mehr Empathie für unsere Mitmenschen aufbringen, könnten viele soziale Konflikte bereits im Keim erstickt werden.",
        english: "If we were to show more empathy for our fellow human beings, many social conflicts could be nipped in the bud.",
        grammarTip: "Uses Subjunctive II ('würden... könnten') combined with passive voice and idiomatic expressions."
      }
    ],
    practiceQuestions: [
      {
        question: "Vergleichen Sie die Rolle der Familie mit der Rolle von Freunden in der heutigen Gesellschaft.",
        type: 'comparative',
        criterion: 'D',
        sampleAnswer: "Während die Familie oft für Stabilität und Tradition steht, bieten Freunde häufig Raum für individuelle Entwicklung. Beides ist wichtig, aber Freunde gewinnen in der Jugend an Bedeutung.",
        explanation: "Uses 'Während' (while) for comparison and clear evaluative summary."
      }
    ],
    visualPrompt: "A balance scale with 'Trust' and 'Communication' on one side and 'Conflict' on the other, representing relationship stability.",
    deepThinkingEn: 'Why do relationships fail? Often due to a lack of communication or different expectations.',
    deepThinkingDe: 'Warum scheitern Beziehungen? Oft wegen mangelnder Kommunikation oder unterschiedlicher Erwartungen.'
  },
  {
    id: 'self-esteem',
    title: 'Self-Esteem',
    germanTitle: 'Selbstwertgefühl',
    icon: 'Heart',
    coreIdeaEn: 'Self-esteem is how you view yourself. In the modern world, social media plays a huge role in shaping it.',
    coreIdeaDe: 'Selbstwertgefühl ist, wie man sich selbst sieht. In der modernen Welt spielen soziale Medien eine große Rolle bei der Gestaltung.',
    concepts: [
      {
        titleEn: 'Internal Confidence',
        titleDe: 'Inneres Selbstvertrauen',
        contentEn: 'Valuing yourself regardless of external validation.',
        contentDe: 'Sich selbst schätzen, unabhängig von externer Bestätigung.'
      },
      {
        titleEn: 'Social Media Influence',
        titleDe: 'Einfluss der sozialen Medien',
        contentEn: 'Constant comparison can lead to pressure and low confidence.',
        contentDe: 'Ständiger Vergleich kann zu Druck und geringem Selbstvertrauen führen.'
      }
    ],
    vocab: [
      { german: 'unsicher', english: 'insecure' },
      { german: 'vergleichen', english: 'to compare' },
      { german: 'das Selbstbild', english: 'self-image' },
      { german: 'der Druck', english: 'pressure' }
    ],
    advancedPhrases: [
      { german: 'Soziale Medien können das Selbstbild stärken oder verzerren.', english: 'Social media can strengthen or distort one\'s self-image.' },
      { german: 'Ich habe mehr Selbstvertrauen entwickelt.', english: 'I have developed more self-confidence.' }
    ],
    band7Sentences: [
      {
        german: "Wäre das Selbstwertgefühl nicht so stark von Bestätigung abhängig, wären viele Jugendliche zufriedener.",
        english: "If self-esteem were not so strongly dependent on validation, many young people would be more satisfied.",
        grammarTip: "Konjunktiv II (Wäre/wären) for counterfactual situations."
      },
      {
        german: "Das Selbstbild wird zunehmend durch die perfekten Darstellungen in sozialen Medien verzerrt.",
        english: "The self-image is increasingly distorted by perfect representations in social media.",
        grammarTip: "Passive voice ('wird ... verzerrt') with 'durch' to indicate the cause."
      },
      {
        german: "Es ist unerlässlich, dass Jugendliche lernen, ihr Selbstwertgefühl unabhängig von digitaler Bestätigung zu definieren.",
        english: "It is essential that young people learn to define their self-esteem independently of digital validation.",
        grammarTip: "Uses 'Es ist unerlässlich, dass' (It is essential that) and an infinitive clause with 'zu'."
      },
      {
        german: "In einer Gesellschaft, die ständig Perfektion fordert, wird das authentische Selbstbild oft unterdrückt.",
        english: "In a society that constantly demands perfection, the authentic self-image is often suppressed.",
        grammarTip: "Combines a relative clause ('die ... fordert') with passive voice ('wird ... unterdrückt')."
      }
    ],
    practiceQuestions: [
      {
        question: "Inwieweit beeinflussen soziale Medien unsere psychische Gesundheit?",
        type: 'evaluative',
        criterion: 'C',
        sampleAnswer: "Meiner Meinung nach haben soziale Medien einen zwiespältigen Einfluss. Einerseits fördern sie die soziale Vernetzung, andererseits können sie durch ständige Vergleiche den Selbstwert mindern. Obwohl es Vorteile gibt, überwiegen oft die negativen Aspekte.",
        explanation: "Uses 'Einerseits/Andererseits', 'Obwohl', and high-level vocabulary like 'zwiespältig' and 'vernetzung'."
      }
    ],
    visualPrompt: "A mirror showing a reflection that is slightly different from the person standing before it, symbolizing the gap between reality and self-image.",
    deepThinkingEn: 'Is external validation (likes, comments) more important than internal self-acceptance?',
    deepThinkingDe: 'Ist externe Bestätigung (Likes, Kommentare) wichtiger als interne Selbstakzeptanz?'
  },
  {
    id: 'health',
    title: 'Health & Well-being',
    germanTitle: 'Gesundheit & Wohlbefinden',
    icon: 'Activity',
    coreIdeaEn: 'Health encompasses physical (body), mental (mind), and social (belonging) dimensions.',
    coreIdeaDe: 'Gesundheit umfasst körperliche (Körper), psychische (Geist) und soziale (Zugehörigkeit) Dimensionen.',
    concepts: [
      {
        titleEn: 'The Holistic Balance',
        titleDe: 'Das ganzheitliche Gleichgewicht',
        contentEn: 'Everything is connected: stress affects the body; isolation affects the mind.',
        contentDe: 'Alles ist verbunden: Stress beeinflusst den Körper; Isolation beeinflusst den Geist.'
      },
      {
        titleEn: 'Lifestyle Choices',
        titleDe: 'Lebensstilentscheidungen',
        contentEn: 'Small daily choices in diet and activity lead to long-term consequences.',
        contentDe: 'Kleine tägliche Entscheidungen in Ernährung und Aktivität führen zu langfristigen Konsequenzen.'
      }
    ],
    vocab: [
      { german: 'körperlich', english: 'physical' },
      { german: 'psychisch', english: 'mental/psychological' },
      { german: 'die Ernährung', english: 'nutrition' },
      { german: 'das Gleichgewicht', english: 'balance' }
    ],
    advancedPhrases: [
      { german: 'Ein gesunder Lebensstil erfordert mentale Stabilität.', english: 'A healthy lifestyle requires mental stability.' },
      { german: 'Stress hat negative Auswirkungen auf die Gesundheit.', english: 'Stress has negative effects on health.' }
    ],
    band7Sentences: [
      {
        german: "Man muss erkennen, dass psychische Gesundheit genauso wichtig ist wie körperliche Fitness.",
        english: "One must recognize that mental health is just as important as physical fitness.",
        grammarTip: "Uses a modal verb 'muss', 'erkennen dass' clause, and a comparison 'genauso wichtig wie'."
      },
      {
        german: "Es wird oft unterschätzt, wie sehr Schlafmangel die kognitive Leistungsfähigkeit beeinträchtigt.",
        english: "It is often underestimated how much sleep deprivation impairs cognitive performance.",
        grammarTip: "Passive voice with an impersonal subject 'Es wird... unterschätzt' followed by an indirect question."
      },
      {
        german: "Es lässt sich nicht bestreiten, dass eine ausgewogene Lebensweise maßgeblich zur Prävention psychischer Erkrankungen beiträgt.",
        english: "It cannot be denied that a balanced lifestyle contributes significantly to the prevention of mental illness.",
        grammarTip: "Uses the formal structure 'Es lässt sich nicht bestreiten' (It cannot be denied) and sophisticated genitive objects."
      },
      {
        german: "Wäre das Gesundheitssystem präventiver ausgerichtet, ließen sich viele chronische Leiden bereits im Vorfeld vermeiden.",
        english: "If the healthcare system were more preventively oriented, many chronic ailments could be avoided in advance.",
        grammarTip: "Uses Subjunctive II ('Wäre... ließen sich') where 'ließe sich' acts as a passive substitute for possibility."
      }
    ],
    practiceQuestions: [
      {
        question: "Wie hängen Lebensstil und psychische Gesundheit zusammen?",
        type: 'opinion',
        criterion: 'D',
        sampleAnswer: "Ich bin fest davon überzeugt, dass ein ausgewogener Lebensstil die Basis für Wohlbefinden ist. Wer sich gesund ernährt und Sport treibt, ist meist stressresistenter. Dennoch darf man die soziale Komponente nicht vernachlässigen.",
        explanation: "Uses 'Ich bin fest davon überzeugt' (strong opinion) and relative clauses ('Wer... ist...')."
      }
    ],
    visualPrompt: "A triangle with 'Body', 'Mind', and 'Social Life' as the vertices, and 'Well-being' in the center.",
    deepThinkingEn: 'Why do students feel stressed? Exams, high expectations, and constant competition are major factors.',
    deepThinkingDe: 'Warum fühlen sich Schüler gestresst? Prüfungen, hohe Erwartungen und ständiger Wettbewerb sind Hauptfaktoren.'
  },
  {
    id: 'competition',
    title: 'Competition & Cooperation',
    germanTitle: 'Wettbewerb & Zusammenarbeit',
    icon: 'Swords',
    coreIdeaEn: 'Competition can motivate us to improve, but cooperation leads to sustainable community success.',
    coreIdeaDe: 'Wettbewerb kann uns motivieren uns zu verbessern, aber Zusammenarbeit führt zu nachhaltigem Erfolg in der Gemeinschaft.',
    concepts: [
      {
        titleEn: 'Motivation vs. Stress',
        titleDe: 'Motivation vs. Druck',
        contentEn: 'Competition can be healthy but also destructive if it creates too much pressure.',
        contentDe: 'Wettbewerb kann gesund sein, aber auch destruktiv, wenn er zu viel Druck erzeugt.'
      },
      {
        titleEn: 'Team Skills',
        titleDe: 'Teamfähigkeit',
        contentEn: 'Working together promotes social skills and efficiency.',
        contentDe: 'Zusammenarbeit fördert soziale Fähigkeiten und Effizienz.'
      }
    ],
    vocab: [
      { german: 'wettbewerbsorientiert', english: 'competitive' },
      { german: 'die Teamarbeit', english: 'teamwork' },
      { german: 'fördern', english: 'to promote/encourage' },
      { german: 'destruktiv', english: 'destructive' }
    ],
    advancedPhrases: [
      { german: 'Teamarbeit fördert nicht nur Effizienz, sondern auch soziale Fähigkeiten.', english: 'Teamwork promotes not only efficiency but also social skills.' },
      { german: 'Übermäßiger Wettbewerb kann zu Konflikten führen.', english: 'Excessive competition can lead to conflicts.' }
    ],
    band7Sentences: [
      {
        german: "Könnten wir den Wettbewerbsgedanken durch Kooperation ersetzen, würde sich das soziale Klima verbessern.",
        english: "If we could replace the competitive mindset with cooperation, the social climate would improve.",
        grammarTip: "Complex Konjunktiv II with 'Könnten... ersetzen, würde... verbessern'."
      },
      {
        german: "Es ist unumstritten, dass Zusammenarbeit in einer globalisierten Welt wichtiger ist als individueller Wettbewerb.",
        english: "It is undisputed that cooperation is more important than individual competition in a globalized world.",
        grammarTip: "Uses fixed expressions 'Es ist unumstritten, dass' and comparative adjectives 'wichtiger... als'."
      },
      {
        german: "Man sollte in Erwägung ziehen, dass ein übermäßiger Fokus auf Wettbewerb den sozialen Zusammenhalt nachhaltig gefährden kann.",
        english: "One should consider that an excessive focus on competition can sustainably jeopardize social cohesion.",
        grammarTip: "Uses a 'Nomen-Verb-Gefüge' (noun-verb combination) 'in Erwägung ziehen' and high-level vocabulary like 'nachhaltig' and 'Zusammenhalt'."
      },
      {
        german: "Durch die konsequente Förderung von Teamfähigkeit wird sichergestellt, dass individuelle Stärken zum Wohl der Allgemeinheit genutzt werden.",
        english: "Through the consistent promotion of teamwork skills, it is ensured that individual strengths are used for the good of the community.",
        grammarTip: "Uses passive voice ('wird sichergestellt' and 'genutzt werden') in a complex sentence structure."
      }
    ],
    practiceQuestions: [
      {
        question: "Was sind die Vor- und Nachteile von Wettbewerb in der Schule?",
        type: 'evaluative',
        criterion: 'C',
        sampleAnswer: "In der Schule kann Wettbewerb zwar die Motivation steigern, aber gleichzeitig zu hohem Stress führen. Demgegenüber fördert Teamarbeit den Zusammenhalt. Meiner Meinung nach ist eine Balance zwischen beiden Aspekten ideal.",
        explanation: "Uses contrastive connectors like 'zwar... aber' and 'demgegenüber'."
      }
    ],
    visualPrompt: "A tug-of-war where the 'rope' is actually a bridge being built together, showing the transition from competition to cooperation.",
    deepThinkingEn: 'Is a world without competition possible, or do we need it to grow?',
    deepThinkingDe: 'Ist eine Welt ohne Wettbewerb möglich, oder brauchen wir ihn zum Wachsen?'
  },
  {
    id: 'agency',
    title: 'Personal Agency',
    germanTitle: 'Selbstständigkeit',
    icon: 'Target',
    coreIdeaEn: 'Personal agency is your ability to take responsibility for your decisions and shape your own future.',
    coreIdeaDe: 'Persönliche Handlungsfähigkeit ist deine Fähigkeit, Verantwortung für deine Entscheidungen zu übernehmen und deine eigene Zukunft zu gestalten.',
    concepts: [
      {
        titleEn: 'Responsibility',
        titleDe: 'Verantwortung',
        contentEn: 'Taking ownership of actions and their consequences.',
        contentDe: 'Die Verantwortung für Handlungen und deren Folgen übernehmen.'
      },
      {
        titleEn: 'Independence',
        titleDe: 'Unabhängigkeit',
        contentEn: 'Making decisions based on internal values rather than external pressure.',
        contentDe: 'Entscheidungen auf der Grundlage interner Werte statt auf externem Druck treffen.'
      }
    ],
    vocab: [
      { german: 'die Entscheidung', english: 'decision' },
      { german: 'verantwortlich', english: 'responsible' },
      { german: 'die Motivation', english: 'motivation' },
      { german: 'das Ziel', english: 'goal' }
    ],
    advancedPhrases: [
      { german: 'Persönliche Verantwortung ist entscheidend für den Erfolg.', english: 'Personal responsibility is crucial for success.' },
      { german: 'Motivation kann sowohl intrinsisch als auch extrinsisch sein.', english: 'Motivation can be both intrinsic and extrinsic.' }
    ],
    band7Sentences: [
      {
        german: "Hätten wir mehr Vertrauen in unsere eigenen Fähigkeiten, könnten wir unsere Ziele schneller erreichen.",
        english: "If we had more trust in our own abilities, we could reach our goals faster.",
        grammarTip: "Hypothetical condition using 'Hätten... könnten'."
      },
      {
        german: "Die Fähigkeit, selbstständig Entscheidungen zu treffen, wird oft durch gesellschaftliche Erwartungen eingeschränkt.",
        english: "The ability to make decisions independently is often restricted by societal expectations.",
        grammarTip: "Passive voice 'wird ... eingeschränkt' and infinitive with 'zu' construction."
      },
      {
        german: "Es gilt zu betonen, dass Eigenverantwortung nicht nur eine Last, sondern auch ein Privileg der Freiheit darstellt.",
        english: "It is important to emphasize that personal responsibility represents not only a burden but also a privilege of freedom.",
        grammarTip: "Uses the formal fixed expression 'Es gilt zu betonen' and the correlative conjunction 'nicht nur... sondern auch'."
      },
      {
        german: "Könnten wir unsere Ängste überwinden, würden wir feststellen, dass wir weit mehr Einfluss auf unser Schicksal haben, als wir annehmen.",
        english: "If we could overcome our fears, we would find that we have far more influence on our destiny than we assume.",
        grammarTip: "Uses Subjunctive II for hypothetical scenarios followed by a comparison ('mehr ... als')."
      }
    ],
    practiceQuestions: [
      {
        question: "Wie wichtig ist Eigenverantwortung für die persönliche Entwicklung?",
        type: 'opinion',
        criterion: 'D',
        sampleAnswer: "Ich vertrete den Standpunkt, dass Eigenverantwortung der Schlüssel zum Erfolg ist. Wer die Kontrolle über sein Leben übernimmt, kann Herausforderungen besser meistern. Trotzdem braucht jeder Mensch Unterstützung von anderen.",
        explanation: "Uses sophisticated opinion starter 'Ich vertrete den Standpunkt, dass'."
      }
    ],
    visualPrompt: "A hand holding a steering wheel, with various road signs pointing towards different future paths, representing control over one's life.",
    deepThinkingEn: 'What limits your ability to control your life? Is it society, family, or your own fears?',
    deepThinkingDe: 'Was schränkt deine Fähigkeit ein, dein Leben zu kontrollieren? Ist es die Gesellschaft, die Familie oder deine eigenen Ängste?'
  },
  {
    id: 'development',
    title: 'Human Development',
    germanTitle: 'Menschliche Entwicklung',
    icon: 'GraduationCap',
    coreIdeaEn: 'People change through life stages (child, teen, adult). Every stage brings new challenges and opportunities for growth.',
    coreIdeaDe: 'Menschen verändern sich in verschiedenen Lebensphasen (Kind, Teenager, Erwachsener). Jede Phase bringt neue Herausforderungen und Chancen für Wachstum mit sich.',
    concepts: [
      {
        titleEn: 'Growth through Challenges',
        titleDe: 'Wachstum durch Herausforderungen',
        contentEn: 'Difficulties help us build resilience and shape our personality.',
        contentDe: 'Schwierigkeiten helfen uns, Resilienz aufzubauen und unsere Persönlichkeit zu formen.'
      },
      {
        titleEn: 'Life Transitions',
        titleDe: 'Übergänge im Leben',
        contentEn: 'The path from childhood to adulthood involves significant identity shifts.',
        contentDe: 'Der Weg von der Kindheit zum Erwachsensein geht mit signifikanten Identitätsveränderungen einher.'
      }
    ],
    vocab: [
      { german: 'die Lebensphase', english: 'life stage' },
      { german: 'die Herausforderung', english: 'challenge' },
      { german: 'das Wachstum', english: 'growth' },
      { german: 'nachhaltig', english: 'sustainable/lasting' }
    ],
    advancedPhrases: [
      { german: 'Jede Lebensphase bringt neue Chancen mit sich.', english: 'Each stage of life brings new opportunities.' },
      { german: 'Erfahrungen prägen die Persönlichkeit nachhaltig.', english: 'Experiences shape the personality in a lasting way.' }
    ],
    deepThinkingEn: 'How has your identity changed from when you were a child? What was the most important influence?',
    deepThinkingDe: 'Wie hat sich deine Identität verändert, seit du ein Kind warst? Was war der wichtigste Einfluss?',
    band7Sentences: [
      {
        german: "Wären wir uns der kulturellen Einflüsse bewusster, könnten wir unsere eigene Entwicklung besser reflektieren.",
        english: "If we were more aware of cultural influences, we could better reflect on our own development.",
        grammarTip: "Subjunctive II (Irrealis) 'Wären... könnten' for hypothetical reflection."
      },
      {
        german: "Obwohl die Kindheit prägend ist, wird die Identität im Laufe des Lebens ständig neu verhandelt.",
        english: "Although childhood is formative, identity is constantly renegotiated over the course of life.",
        grammarTip: "Passive voice 'wird ... verhandelt' with 'obwohl' clause."
      },
      {
        german: "Veränderungen im Lebensverlauf sollten nicht als Verlust, sondern als notwendiger Teil der Reifung angesehen werden.",
        english: "Changes in the course of life should be viewed not as a loss, but as a necessary part of maturation.",
        grammarTip: "Uses passive voice with a modal verb ('sollten ... angesehen werden') and contrastive structures."
      },
      {
        german: "Es ist bemerkenswert, wie sehr technologische Fortschritte die Art und Weise verändert haben, wie wir erwachsen werden.",
        english: "It is remarkable how much technological advancements have changed the way we grow up.",
        grammarTip: "Analytical structure 'Es ist bemerkenswert' followed by an indirect question and a relative clause."
      }
    ],
    practiceQuestions: [
      {
        question: "Inwiefern beeinflusst die digitale Welt die Identitätsbildung von Jugendlichen?",
        type: 'opinion',
        criterion: 'C',
        sampleAnswer: "Ich bin fest davon überzeugt, dass soziale Medien eine doppelte Rolle spielen. Einerseits ermöglichen sie Selbstausdruck, andererseits fördern sie unrealistische Erwartungen. Man sollte daher eine kritische Distanz wahren.",
        explanation: "Uses 'einerseits... andererseits' and 'Inwiefern' for complex evaluation."
      }
    ],
    visualPrompt: "A multi-layered tree where the roots represent childhood, the trunk represents youth, and the branches represent different adult paths."
  },
  {
    id: 'ethics',
    title: 'Ethics & Human Nature',
    germanTitle: 'Ethik & Menschenbild',
    icon: 'Scale',
    coreIdeaEn: 'Ethics is about what is right or wrong. These values can differ across cultures and personal beliefs.',
    coreIdeaDe: 'In der Ethik geht es darum, was richtig oder falsch ist. Diese Werte können sich je nach Kultur und persönlichen Überzeugungen unterscheiden.',
    concepts: [
      {
        titleEn: 'Moral Reasoning',
        titleDe: 'Moralisches Denken',
        contentEn: 'How we make decisions based on our values, even under pressure.',
        contentDe: 'Wie wir Entscheidungen treffen, basierend auf unseren Werten, auch unter Druck.'
      },
      {
        titleEn: 'Human Dignity',
        titleDe: 'Menschenwürde',
        contentEn: 'The fundamental belief that every human being has intrinsic value and deserves respect.',
        contentDe: 'Der grundlegende Glaube, dass jeder Mensch einen inneren Wert hat und Respekt verdient.'
      }
    ],
    vocab: [
      { german: 'die Moral', english: 'morality' },
      { german: 'die Würde', english: 'dignity' },
      { german: 'das Recht', english: 'right/law' },
      { german: 'gerecht', english: 'just/fair' }
    ],
    advancedPhrases: [
      { german: 'Moralische Entscheidungen hängen oft von der Kultur ab.', english: 'Moral decisions often depend on culture.' },
      { german: 'Die Würde des Menschen sollte immer respektiert werden.', english: 'Human dignity should always be respected.' }
    ],
    deepThinkingEn: 'Why do people sometimes make "wrong" decisions? Is it fear, pressure, or a lack of knowledge?',
    deepThinkingDe: 'Warum treffen Menschen manchmal „falsche“ Entscheidungen? Ist es Angst, Druck oder mangelndes Wissen?',
    band7Sentences: [
      {
        german: "Es muss betont werden, dass moralisches Handeln oft eine Frage der individuellen Courage ist.",
        english: "It must be emphasized that moral action is often a matter of individual courage.",
        grammarTip: "Passive construction 'Es muss betont werden, dass...' for formal analysis."
      },
      {
        german: "Sollte die Menschenwürde verletzt werden, verliert eine Gesellschaft ihre moralische Grundlage.",
        english: "If human dignity were to be violated, a society would lose its moral foundation.",
        grammarTip: "Sollte-phrase for hypothetical scenarios (Band 7 level formality)."
      },
      {
        german: "Es wird zunehmend diskutiert, ob ethische Standards in Zeiten des rasanten technologischen Wandels neu definiert werden müssen.",
        english: "It is increasingly discussed whether ethical standards must be redefined in times of rapid technological change.",
        grammarTip: "Combines an impersonal passive ('Es wird ... diskutiert') with an indirect question and a passive infinitive with a modal verb."
      },
      {
        german: "Würden wir uns stets von moralischen Prinzipien leiten lassen, blieben uns viele gesellschaftliche Fehlentwicklungen erspart.",
        english: "If we always allowed ourselves to be guided by moral principles, many societal misdevelopments would be spared to us.",
        grammarTip: "Uses Subjunctive II in a condensed conditional clause with 'lassen' and a dative object ('uns')."
      }
    ],
    practiceQuestions: [
      {
        question: "Welche moralischen Dilemmata entstehen durch den Einsatz von KI in unserem Alltag?",
        type: 'opinion',
        criterion: 'D',
        sampleAnswer: "Zwar erleichtert KI viele Prozesse, dennoch wirft sie ethische Fragen bezüglich der Privatsphäre auf. Es gilt zu bedenken, dass Technologie niemals die menschliche Verantwortung ersetzen kann.",
        explanation: "Uses 'Zwar... dennoch' and 'Es gilt zu bedenken' (It is important to consider)."
      }
    ],
    visualPrompt: "A balance scale with a heart on one side and a law book on the other, surrounded by a faint blue glow."
  },
  {
    id: 'happiness',
    title: 'Happiness & Fulfillment',
    germanTitle: 'Glück & Erfüllung',
    icon: 'Sparkles',
    coreIdeaEn: 'Happiness is subjective. Real fulfillment often comes from relationships, purpose, and inner peace, not just material wealth.',
    coreIdeaDe: 'Glück ist subjektiv. Wirkliche Erfüllung kommt oft von Beziehungen, Sinn und innerem Frieden, nicht nur von materiellem Wohlstand.',
    concepts: [
      {
        titleEn: 'Subjective Well-being',
        titleDe: 'Subjektives Wohlbefinden',
        contentEn: 'What makes one person happy might not work for another.',
        contentDe: 'Was eine Person glücklich macht, funktioniert für eine andere vielleicht nicht.'
      },
      {
        titleEn: 'Material vs. Immaterial',
        titleDe: 'Materiell vs. Immateriell',
        contentEn: 'Comparing short-term pleasure (buying things) with long-term fulfillment (personal growth).',
        contentDe: 'Kurzfristiges Vergnügen (Dinge kaufen) mit langfristiger Erfüllung (persönliches Wachstum) vergleichen.'
      }
    ],
    vocab: [
      { german: 'die Zufriedenheit', english: 'satisfaction/contentment' },
      { german: 'der Wohlstand', english: 'wealth/prosperity' },
      { german: 'erfüllt', english: 'fulfilled' },
      { german: 'sinnvoll', english: 'meaningful' }
    ],
    advancedPhrases: [
      { german: 'Wahres Glück kommt von innerer Zufriedenheit.', english: 'True happiness comes from inner contentment.' },
      { german: 'Ein erfülltes Leben basiert auf Sinn und Beziehungen.', english: 'A fulfilled life is based on purpose and relationships.' }
    ],
    deepThinkingEn: 'What defines a "good life"? Is it success, or is it the quality of your relationships?',
    deepThinkingDe: 'Was definiert ein „gutes Leben“? Ist es Erfolg oder die Qualität deiner Beziehungen?',
    band7Sentences: [
      {
        german: "Anstatt nur nach materiellem Reichtum zu streben, sollte man sich auf die Pflege tiefgehender Beziehungen konzentrieren.",
        english: "Instead of only striving for material wealth, one should concentrate on the cultivation of deep relationships.",
        grammarTip: "Anstatt... zu + infinitive construction for high-level comparison."
      },
      {
        german: "Es lässt sich feststellen, dass Erfüllung eng mit dem Gefühl der Selbstwirksamkeit verknüpft ist.",
        english: "It can be established that fulfillment is closely linked to the sense of self-efficacy.",
        grammarTip: "Formal analytical structure 'Es lässt sich feststellen' and passive link 'verknüpft'."
      },
      {
        german: "Es wird oft verkannt, dass das Streben nach Glück eher ein kontinuierlicher Weg als ein endgültiges Ziel ist.",
        english: "It is often ignored that the pursuit of happiness is more of a continuous path than a final goal.",
        grammarTip: "Uses the passive structure 'Es wird ... verkannt' (It is often underestimated/ignored) and a complex comparison."
      },
      {
        german: "Hätte man früher erkannt, wie wichtig soziale Bindungen für das Wohlbefinden sind, wäre die Isolation heute weniger verbreitet.",
        english: "If it had been recognized earlier how important social ties are for well-being, isolation would be less widespread today.",
        grammarTip: "Uses Subjunctive II in the past ('Hätte ... erkannt') for a counterfactual past situation and its present consequence."
      }
    ],
    practiceQuestions: [
      {
        question: "Inwiefern ist das Streben nach Glück eine individuelle oder eine gesellschaftliche Aufgabe?",
        type: 'opinion',
        criterion: 'C',
        sampleAnswer: "Meiner Ansicht nach ist Glück sowohl eine persönliche Entscheidung als auch ein Ergebnis stabiler sozialer Strukturen. Man darf nicht vergessen, dass Isolation ein großes Hindernis für die Erfüllung darstellt.",
        explanation: "Uses 'Sowohl... als auch' and complex subject 'das Streben nach Glück'."
      }
    ],
    visualPrompt: "A sun made of interlocking geometric puzzle pieces, radiating light towards a simplified modern house and a group of figures holding hands."
  }
  ],
  french: [],
  spanish: [],
  mandarin: [],
  'english-lit': [],
  'math-std': [],
  'math-ext': [],
  biology: [],
  chemistry: [],
  physics: [],
  'individuals-societies': [],
  design: [],
  arts: [],
  phe: [],
  'personal-project': []
};

export const CONNECTORS: Vocabulary[] = [
  { german: 'obwohl', english: 'although', context: 'Subordinating (verb at end)' },
  { german: 'trotzdem', english: 'nevertheless', context: 'Adverbial (verb in 2nd position)' },
  { german: 'während', english: 'while/whereas', context: 'Comparison/Time' },
  { german: 'deshalb', english: 'therefore', context: 'Cause/Effect' },
  { german: 'nicht nur... sondern auch', english: 'not only... but also', context: 'Emphasis' }
];
