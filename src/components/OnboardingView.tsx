import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  GraduationCap, 
  Globe, 
  Target, 
  Rocket,
  Plus,
  BookOpen,
  Languages,
  Calculator,
  Microscope,
  Zap,
  FlaskConical,
  Users,
  Compass,
  Palette,
  HeartPulse,
  Star
} from 'lucide-react';
import { Subject, SubjectId, GlobalContextId, User, UserSubject } from '../types';
import { SUBJECTS, GLOBAL_CONTEXTS } from '../constants';

const GOALS = [
  'Improve grades',
  'Prepare for finals',
  'Master concepts deeply',
  'Practice exam writing',
  'Improve language fluency'
];

const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  Languages: <Languages size={18} />,
  BookOpen: <BookOpen size={18} />,
  Calculator: <Calculator size={18} />,
  Microscope: <Microscope size={18} />,
  Zap: <Zap size={18} />,
  FlaskConical: <FlaskConical size={18} />,
  Users: <Users size={18} />,
  Compass: <Compass size={18} />,
  Palette: <Palette size={18} />,
  HeartPulse: <HeartPulse size={18} />,
  Star: <Star size={18} />,
};

interface OnboardingViewProps {
  user: User;
  onComplete: (data: Partial<User>) => void;
}

export default function OnboardingView({ user, onComplete }: OnboardingViewProps) {
  const [step, setStep] = useState(1);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>([]);
  const [subjectLevels, setSubjectLevels] = useState<Record<SubjectId, string>>({});
  const [selectedContexts, setSelectedContexts] = useState<GlobalContextId[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      const subjects: UserSubject[] = selectedSubjects.map(id => ({
        subjectId: id,
        level: subjectLevels[id] || 'Standard'
      }));
      onComplete({
        subjects,
        globalContexts: selectedContexts,
        goals: selectedGoals,
        onboardingCompleted: true
      });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleSubject = (id: SubjectId) => {
    if (selectedSubjects.includes(id)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== id));
    } else {
      setSelectedSubjects([...selectedSubjects, id]);
    }
  };

  const toggleContext = (id: GlobalContextId) => {
    if (selectedContexts.includes(id)) {
      setSelectedContexts(selectedContexts.filter(c => c !== id));
    } else {
      setSelectedContexts([...selectedContexts, id]);
    }
  };

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full">
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i} 
                className={`h-1.5 w-12 rounded-full transition-all ${i <= step ? 'bg-blue-600' : 'bg-slate-200'}`}
              />
            ))}
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-2">
            Build your <span className="text-blue-600">IB Profile.</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
            Welcome {user.displayName} • Let's personalize your arena
          </p>
        </header>

        <motion.div 
          layout
          className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden"
        >
          <div className="p-10 md:p-16">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-tight leading-none">Subject Selection</h2>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Select all subjects you are currently taking</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {SUBJECTS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => toggleSubject(s.id)}
                        className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 text-center ${
                          selectedSubjects.includes(s.id) 
                            ? 'border-blue-600 bg-blue-50/50' 
                            : 'border-slate-100 bg-white hover:border-blue-200'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${selectedSubjects.includes(s.id) ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                          {SUBJECT_ICONS[s.icon] || <BookOpen size={18} />}
                        </div>
                        <span className="text-xs font-black uppercase tracking-tight leading-tight">{s.name}</span>
                        {selectedSubjects.includes(s.id) && <Check size={14} className="text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                      <Target size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-tight leading-none">Proficiency Levels</h2>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Define your current level for each subject</p>
                    </div>
                  </div>

                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {selectedSubjects.map((id) => {
                      const s = SUBJECTS.find(sub => sub.id === id);
                      return (
                        <div key={id} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                                {SUBJECT_ICONS[s?.icon || ''] || <BookOpen size={18} />}
                              </div>
                              <span className="text-lg font-black uppercase tracking-tight">{s?.name}</span>
                           </div>
                           <div className="flex flex-wrap gap-2">
                             {['Standard', 'Extended', 'A1', 'A2', 'B1'].map(lvl => (
                               <button
                                 key={lvl}
                                 onClick={() => setSubjectLevels({...subjectLevels, [id]: lvl})}
                                 className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                   subjectLevels[id] === lvl 
                                     ? 'bg-blue-600 text-white shadow-lg' 
                                     : 'bg-white text-slate-400 border border-slate-200 hover:border-blue-300'
                                 }`}
                               >
                                 {lvl}
                               </button>
                             ))}
                           </div>
                        </div>
                      );
                    })}
                    {selectedSubjects.length === 0 && (
                      <div className="text-center py-20 bg-slate-50 rounded-[3rem]">
                        <p className="text-slate-400 font-bold">No subjects selected. Go back to choose some.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                      <Globe size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-tight leading-none">Global Contexts</h2>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Select your top focus areas (Global Contexts)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {GLOBAL_CONTEXTS.map((gc) => (
                      <button
                        key={gc.id}
                        onClick={() => toggleContext(gc.id)}
                        className={`p-8 rounded-[2.5rem] border-2 transition-all text-left flex items-start gap-4 ${
                          selectedContexts.includes(gc.id) 
                            ? 'border-blue-600 bg-blue-50/50' 
                            : 'border-slate-100 bg-white hover:border-blue-200 shadow-sm'
                        }`}
                      >
                         <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center ${selectedContexts.includes(gc.id) ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                           <Globe size={18} />
                         </div>
                         <div>
                           <div className="flex items-center justify-between mb-1">
                             <h4 className="text-sm font-black uppercase tracking-tight">{gc.name}</h4>
                             {selectedContexts.includes(gc.id) && <Check size={14} className="text-blue-600" />}
                           </div>
                           <p className="text-xs text-slate-500 font-medium leading-relaxed">{gc.description}</p>
                         </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
                      <Rocket size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-tight leading-none">Goal Setting</h2>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">What do you want to achieve?</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {GOALS.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => toggleGoal(goal)}
                        className={`p-8 rounded-[2.5rem] border-2 transition-all text-left flex items-center justify-between ${
                          selectedGoals.includes(goal) 
                            ? 'border-amber-500 bg-amber-50/50' 
                            : 'border-slate-100 bg-white hover:border-amber-200 shadow-sm'
                        }`}
                      >
                        <span className="text-xs font-black uppercase tracking-tight leading-tight">{goal}</span>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${selectedGoals.includes(goal) ? 'bg-amber-500 text-white' : 'bg-slate-50 text-slate-300'}`}>
                          {selectedGoals.includes(goal) ? <Check size={14} /> : <Plus size={14} />}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-10 py-8 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${
                step === 1 ? 'text-slate-700 cursor-not-allowed' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ChevronLeft size={16} /> Back
            </button>

            <button
              onClick={handleNext}
              disabled={step === 1 && selectedSubjects.length === 0}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-3xl font-black uppercase tracking-[0.2em] transition-all shadow-xl flex items-center gap-3"
            >
              {step === 4 ? 'Launch Arena' : 'Continue'} 
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
