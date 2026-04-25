/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Users, 
  Heart, 
  Activity, 
  Swords, 
  Target, 
  GraduationCap, 
  MessageSquare, 
  BookOpen,
  ChevronRight,
  Globe,
  Sparkles,
  ArrowLeft,
  X,
  Send,
  Scale,
  Volume2,
  ClipboardCheck,
  CheckCircle2,
  Info,
  LayoutDashboard,
  Wand2,
  BarChart3,
  Settings,
  Clock,
  ArrowUpRight,
  Calculator,
  ChevronDown
} from 'lucide-react';
import { SUBJECTS, GLOBAL_CONTEXTS, TOPICS_BY_SUBJECT, CONNECTORS, ASSESSMENT_CRITERIA_BY_SUBJECT, MOCK_EXAM_TASKS } from './constants';
import { Topic, AppMode, Vocabulary, PracticeQuestion, AssessmentTask, GradingFeedback, Subject, GlobalContext } from './types';
import { GoogleGenAI } from "@google/genai";

// AI Service
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const getLangCode = (subjectId: string) => {
  switch (subjectId) {
    case 'german': return 'de-DE';
    case 'french': return 'fr-FR';
    case 'spanish': return 'es-ES';
    case 'mandarin': return 'zh-CN';
    default: return 'en-GB';
  }
};

const speak = (text: string, subjectId: string = 'german') => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLangCode(subjectId);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }
};

export default function App() {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(SUBJECTS[0]);
  const [selectedContext, setSelectedContext] = useState<GlobalContext>(GLOBAL_CONTEXTS[0]);
  const [mode, setMode] = useState<AppMode>('dashboard');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<AssessmentTask | null>(null);

  const startTask = (task: AssessmentTask) => {
    setActiveTask(task);
    setMode('assessment');
    setSelectedTopic(null);
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans border-8 border-slate-200 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-hidden">
        {/* Branding */}
        <div 
          className="p-8 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors"
          onClick={() => { setMode('subject-selector'); setSelectedTopic(null); setActiveTask(null); }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl transform -rotate-3">IB</div>
            <div>
              <h1 className="font-black text-lg leading-none uppercase tracking-tighter">
                {selectedSubject.name} <ChevronDown size={14} className="inline ml-1 text-blue-600" />
              </h1>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">
                {selectedContext.name}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <SidebarHeading label="Main Console" />
            <div className="space-y-1">
              <SidebarLink 
                active={mode === 'dashboard'} 
                onClick={() => { setMode('dashboard'); setSelectedTopic(null); setActiveTask(null); }}
                icon={<LayoutDashboard size={18} />}
                label="Home Dashboard"
              />
              <SidebarLink 
                active={mode === 'learn'} 
                onClick={() => { setMode('learn'); setSelectedTopic(null); setActiveTask(null); }}
                icon={<BookOpen size={18} />}
                label="Study Modules"
              />
              <SidebarLink 
                active={mode === 'assessment'} 
                onClick={() => { setMode('assessment'); setSelectedTopic(null); setActiveTask(null); }}
                icon={<ClipboardCheck size={18} />}
                label="Criteria & Rubrics"
              />
            </div>
          </div>

          <div>
             <SidebarHeading label="AI Mastery Tools" />
             <div className="space-y-1">
                <SidebarLink 
                  active={mode === 'generator'} 
                  onClick={() => { setMode('generator'); setSelectedTopic(null); setActiveTask(null); }}
                  icon={<Wand2 size={18} />}
                  label="AI Exam Generator"
                />
                <SidebarLink 
                  active={mode === 'tutor'} 
                  onClick={() => { setChatOpen(true); }}
                  icon={<Sparkles size={18} />}
                  label="Interactive AI Tutor"
                  badge="ACTIVE"
                />
             </div>
          </div>

          <div>
            <SidebarHeading label="Study Roadmap" />
            <div className="space-y-1 mt-3">
              {(TOPICS_BY_SUBJECT[selectedSubject.id] || []).map((topic, idx) => (
                <button 
                  key={topic.id}
                  onClick={() => { setMode('learn'); setSelectedTopic(topic); setActiveTask(null); }}
                  className={`flex items-center gap-3 w-full p-3 rounded-2xl text-[11px] font-black transition-all border uppercase tracking-tight ${
                    selectedTopic?.id === topic.id 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xl translate-x-1' 
                      : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-100'
                  }`}
                >
                  <span className={`w-5 h-5 rounded flex items-center justify-center text-[9px] ${
                    selectedTopic?.id === topic.id ? 'bg-blue-600' : 'bg-slate-200 text-slate-500 font-bold'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="truncate">{topic.title}</span>
                </button>
              ))}
              {(TOPICS_BY_SUBJECT[selectedSubject.id] || []).length === 0 && (
                <div className="p-4 text-[10px] text-slate-400 font-bold uppercase text-center border-2 border-dashed border-slate-100 rounded-2xl">
                  AI will generate content upon selection
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Footer Sidebar */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
           <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center justify-between mb-2">
                 <span className="text-[9px] font-black text-slate-400 uppercase">Your Progress</span>
                 <span className="text-[9px] font-black text-blue-600 uppercase">25%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-600 w-1/4" />
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="grow overflow-y-auto bg-white flex flex-col relative">
        {/* Subtle dynamic background */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none" />
        
        <div className="relative z-10 p-12 lg:p-20 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {mode === 'subject-selector' && (
              <motion.div 
                key="subject-selector"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <SubjectSelectorView 
                  subjects={SUBJECTS} 
                  contexts={GLOBAL_CONTEXTS}
                  currentSubject={selectedSubject}
                  currentContext={selectedContext}
                  onSelectSubject={(s) => { setSelectedSubject(s); setMode('dashboard'); }}
                  onSelectContext={(c) => { setSelectedContext(c); setMode('dashboard'); }}
                />
              </motion.div>
            )}

            {mode === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <DashboardView 
                  currentSubject={selectedSubject}
                  currentContext={selectedContext}
                  onStartModule={(topic) => { setSelectedTopic(topic); setMode('learn'); }} 
                />
              </motion.div>
            )}

            {mode === 'learn' && !selectedTopic && (
               <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col justify-center text-center py-20 gap-8"
               >
                  <div className="space-y-6">
                    <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner border border-blue-100">
                       <BookOpen size={48} />
                    </div>
                    <h2 className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                      Focus on a <span className="text-blue-600 italic">Module.</span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-xl mx-auto font-medium">
                      Select a topic from the roadmap on your left to explore core concepts, vocabulary, and advanced phrasing.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                    <div className="bg-slate-50 p-8 rounded-[3rem] border-2 border-slate-200">
                      <div className="text-5xl font-black text-slate-900 mb-1">A2</div>
                      <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Baseline</div>
                    </div>
                    <div className="bg-emerald-50 p-8 rounded-[3rem] border-2 border-emerald-100">
                      <div className="text-5xl font-black text-emerald-600 italic">B1+</div>
                      <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Mastery</div>
                    </div>
                  </div>
               </motion.div>
            )}

            {selectedTopic && mode === 'learn' && (
              <motion.div 
                key={selectedTopic.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <TopicDetail topic={selectedTopic} subjectId={selectedSubject.id} />
              </motion.div>
            )}

            {mode === 'exam-prep' && (
              <motion.div 
                key="exam-prep"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ExamPrepView 
                  onStartTask={startTask} 
                  subject={selectedSubject}
                  context={selectedContext}
                />
              </motion.div>
            )}

            {mode === 'assessment' && (
              <motion.div 
                key="assessment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {activeTask ? (
                  <AssessmentTaskView 
                    task={activeTask} 
                    onCancel={() => setActiveTask(null)} 
                    subject={selectedSubject}
                    context={selectedContext}
                  />
                ) : (
                  <AssessmentDashboard 
                    onStartTask={startTask} 
                    subject={selectedSubject}
                  />
                )}
              </motion.div>
            )}

            {mode === 'generator' && (
                <motion.div 
                    key="generator"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <ExamGeneratorView 
                      onStartTask={startTask} 
                      subject={selectedSubject}
                      context={selectedContext}
                    />
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <TutorOverlay 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)} 
        subject={selectedSubject}
        context={selectedContext}
      />
    </div>
  );
}


// --- Sub-components ---

function SubjectSelectorView({ 
  subjects, 
  contexts, 
  currentSubject, 
  currentContext, 
  onSelectSubject, 
  onSelectContext 
}: { 
  subjects: Subject[]; 
  contexts: GlobalContext[]; 
  currentSubject: Subject;
  currentContext: GlobalContext;
  onSelectSubject: (s: Subject) => void;
  onSelectContext: (c: GlobalContext) => void;
}) {
  return (
    <div className="space-y-12 pb-20">
      <header>
        <h2 className="text-5xl font-black tracking-tighter uppercase mb-2">Subject Selection</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Choose your IB MYP subject and exploration context</p>
      </header>

      <section>
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 px-2">IB MYP Subjects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <button 
              key={subject.id}
              onClick={() => onSelectSubject(subject)}
              className={`p-6 rounded-3xl border-2 text-left transition-all group ${
                currentSubject.id === subject.id 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-200' 
                  : 'bg-white border-slate-100 hover:border-blue-600 hover:bg-slate-50 text-slate-900 shadow-sm'
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-widest mb-2 block opacity-60">
                {subject.category}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xl font-black uppercase tracking-tight">{subject.name}</span>
                <ChevronRight className={`transition-transform group-hover:translate-x-1 ${currentSubject.id === subject.id ? 'text-white' : 'text-blue-600'}`} />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 px-2">Global Contexts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contexts.map((context) => (
            <button 
              key={context.id}
              onClick={() => onSelectContext(context)}
              className={`p-8 rounded-[40px] border-2 text-left transition-all ${
                currentContext.id === context.id 
                  ? 'bg-slate-900 border-slate-900 text-white shadow-2xl' 
                  : 'bg-white border-slate-100 hover:border-slate-900 hover:bg-slate-50 text-slate-900 shadow-sm'
              }`}
            >
              <h4 className="text-2xl font-black uppercase tracking-tight mb-3">{context.name}</h4>
              <p className={`text-sm mb-6 ${currentContext.id === context.id ? 'text-slate-400' : 'text-slate-500'} font-medium`}>
                {context.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {context.explorations.map((exp, i) => (
                  <span key={i} className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    currentContext.id === context.id ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {exp}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function DashboardView({ onStartModule, currentSubject, currentContext }: { onStartModule: (topic: Topic) => void; currentSubject: Subject; currentContext: GlobalContext }) {
  const topics = TOPICS_BY_SUBJECT[currentSubject.id] || [];
  return (
    <div className="space-y-16">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200">{currentSubject.name} | {currentContext.name}</span>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Clock size={12} /> Personalized Roadmap
             </span>
          </div>
          <h1 className="text-7xl font-black text-slate-900 tracking-tighter leading-none uppercase">MYP <span className="text-blue-600">Mastery.</span></h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl">Exploring **{currentContext.name}** through the lens of **{currentSubject.name}**. Start a module below or generate an exam task.</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-slate-900 text-white p-5 rounded-3xl shadow-xl hover:bg-black transition-all group">
              <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
           </button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatCard label="Grammar Accuracy" value="84%" trend="+12%" icon={<Target className="text-blue-600" />} />
         <StatCard label="Vocab Retained" value="1,240" trend="+45" icon={<BookOpen className="text-emerald-600" />} />
         <StatCard label="Exam Readiness" value="B1" trend="UP" icon={<Activity className="text-amber-600" />} />
         <StatCard label="Study Streak" value="12 Days" trend="🔥" icon={<Heart className="text-rose-600" />} />
      </section>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-10">
            <SectionHeader title="Recommended Modules" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {topics.slice(0, 4).map((topic) => (
                  <TopicCard key={topic.id} topic={topic} onClick={() => onStartModule(topic)} />
               ))}
            </div>

            <SectionHeader title="Recent Activity" />
            <div className="space-y-4">
               {[
                 { action: 'Completed Quiz', target: 'Digital World Identities', time: '2 hours ago', score: '7/8' },
                 { action: 'AI Assessment', target: 'Social Media vs Reality', time: 'Yesterday', score: '6/8' },
                 { action: 'Vocab Mastered', target: 'Relationships Vocabulary', time: '2 days ago', score: '100%' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:shadow-md transition-all group">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                          <Clock size={20} />
                       </div>
                       <div>
                          <p className="font-black text-slate-900 uppercase text-xs tracking-tight">{item.action}</p>
                          <p className="text-sm font-bold text-slate-500">{item.target}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="font-black text-blue-600">{item.score}</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase">{item.time}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="space-y-10">
            <SectionHeader title="Global Insights" />
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl" />
               <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase text-blue-400 tracking-widest">Global Context Focus</h4>
                  <h3 className="text-3xl font-black uppercase leading-tight">Identities & Relationships</h3>
               </div>
               
               <div className="space-y-6">
                  <p className="text-slate-400 text-sm leading-relaxed">Most students are currently struggling with **Criterion D** (Accuracy). Focus on your adjective endings in the tutor today.</p>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                     <p className="text-[10px] font-black text-blue-300 uppercase mb-2">Expert Hint</p>
                     <p className="text-xs italic">"Use 'Es lässt sich feststellen' to increase your analytical depth in responses."</p>
                  </div>
               </div>

               <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2">
                  Deep Dive Analysis <ChevronRight size={16} />
               </button>
            </div>

            <div className="bg-emerald-600 rounded-[3rem] p-10 text-white shadow-2xl">
               <h3 className="text-2xl font-black uppercase mb-4">Exam Prep</h3>
               <p className="text-emerald-100 text-sm font-medium mb-6">4 practice tasks are waiting for your evaluation. Average band target: 7/8.</p>
               <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-emerald-600 bg-slate-200" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-600 bg-white flex items-center justify-center text-emerald-600 text-[10px] font-black">+4</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, icon }: { label: string; value: string; trend: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
       <div className="flex items-center justify-between mb-6">
          <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all">
             {icon}
          </div>
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${trend.startsWith('+') || trend === 'UP' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
             {trend}
          </span>
       </div>
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
       <h4 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h4>
    </div>
  );
}

function ExamGeneratorView({ onStartTask, subject, context }: { onStartTask: (task: AssessmentTask) => void; subject: Subject; context: GlobalContext }) {
  const [topic, setTopic] = useState('');
  const [criterion, setCriterion] = useState<'A' | 'B' | 'C' | 'D'>('C');
  const [loading, setLoading] = useState(false);
  const [generatedTask, setGeneratedTask] = useState<AssessmentTask | null>(null);

  async function generateTask() {
    if (loading) return;
    setLoading(true);

    try {
      const prompt = `Generate a realistic IB MYP ${subject.name} exam task.
      Subject: ${subject.name}
      Global Context: ${context.name}
      Exploration: ${context.description}
      Specific Theme: ${topic || context.explorations[0]}
      Criterion: ${criterion}
      
      The task must include:
      1. A catchy title.
      2. A stimulus (a text, data, or prompt description appropriate for ${subject.name}).
      3. Precise student instructions.
      4. A target band (usually 7-8).
      
      Format your response as valid JSON:
      {
        "id": "gen-${Date.now()}",
        "title": "Task Title",
        "criterion": "${criterion}",
        "instructionEn": "Instruction in English",
        "instructionDe": "Target language instruction (if a foreign language subject, otherwise same as English)",
        "stimulus": "The stimulus content",
        "targetBand": "7-8"
      }`;

      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      const text = response.text.replace(/```json|```/g, '');
      const data = JSON.parse(text);
      setGeneratedTask(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-12">
      <header className="max-w-3xl">
        <div className="flex gap-4 mb-2">
           <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">AI Laboratory</span>
           <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200">Task Generator</span>
        </div>
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">AI Exam <span className="text-blue-600 italic">Generator</span></h1>
        <p className="text-slate-500 mt-4 text-xl font-medium leading-relaxed">Use artificial intelligence to create unique, high-quality MYP practice tasks tailored to your specific weaknesses.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         <div className="lg:col-span-1 space-y-8">
            <SectionHeader title="Configuration" />
            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-200 space-y-8 shadow-sm">
               <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Target Topic</label>
                  <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Identity & Social Media"
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold focus:border-blue-600 outline-none transition-all"
                  />
               </div>

               <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Focus Criterion</label>
                  <div className="grid grid-cols-4 gap-2">
                     {['A', 'B', 'C', 'D'].map((c) => (
                       <button 
                         key={c}
                         onClick={() => setCriterion(c as any)}
                         className={`py-3 rounded-xl font-black border transition-all ${
                           criterion === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-400 text-slate-600'
                         }`}
                       >
                         {c}
                       </button>
                     ))}
                  </div>
               </div>

               <button 
                 onClick={generateTask}
                 disabled={loading}
                 className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-3xl font-black uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 disabled:bg-slate-300"
               >
                 {loading ? 'Synthesizing...' : 'Generate New Task'}
                 {!loading && <Wand2 size={20} />}
               </button>
            </div>

            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
               <h4 className="text-sm font-black uppercase mb-2">How it works</h4>
               <p className="text-xs text-slate-400 leading-relaxed">Our AI analyzes your selected criterion and generates a stimulus that matches the IB complexity requirements for the Emergent level.</p>
            </div>
         </div>

         <div className="lg:col-span-2 space-y-8">
            <SectionHeader title="Generated Output" />
            <AnimatePresence mode="wait">
               {generatedTask ? (
                 <motion.div 
                   key={generatedTask.id}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="bg-white border-4 border-slate-900 rounded-[4rem] p-16 shadow-[30px_30px_0px_0px_rgba(15,23,42,0.03)] space-y-12 relative overflow-hidden"
                 >
                    <div className="absolute top-0 right-0 p-12">
                       <div className="w-40 h-40 bg-blue-600 text-white rounded-[2.5rem] flex flex-col items-center justify-center -rotate-6 shadow-2xl">
                          <span className="text-[10px] font-black uppercase opacity-60">TARGET</span>
                          <span className="text-xl font-black uppercase tracking-tighter">Band {generatedTask.targetBand}</span>
                       </div>
                    </div>

                    <div className="max-w-xl">
                       <div className="flex gap-3 mb-6">
                          <span className="px-3 py-1 bg-slate-100 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">AI Synthesized</span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200">Criterion {generatedTask.criterion}</span>
                       </div>
                       <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-tight mb-8 group-hover:italic transition-all cursor-default">{generatedTask.title}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       <div className="space-y-6">
                          <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2"><Globe size={14} /> Stimulus ({subject.name})</h4>
                          <p className="text-xl font-bold text-slate-700 leading-relaxed italic">"{generatedTask.stimulus}"</p>
                       </div>
                       
                       <div className="space-y-6">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Target size={14} /> Instructions</h4>
                          <p className="font-bold text-slate-900">{generatedTask.instructionDe}</p>
                          <p className="text-sm text-slate-500 font-medium italic">({generatedTask.instructionEn})</p>
                       </div>
                    </div>

                    <div className="pt-10 border-t border-slate-100 flex justify-end">
                       <button 
                         onClick={() => onStartTask(generatedTask)}
                         className="bg-slate-900 text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl flex items-center gap-3"
                       >
                         Start Final Draft <ChevronRight size={20} />
                       </button>
                    </div>
                 </motion.div>
               ) : (
                 <div className="h-[600px] bg-slate-50 rounded-[4rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-20">
                    <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-lg mb-8 text-slate-300">
                       <Wand2 size={48} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-400 uppercase">Awaiting Configuration</h3>
                    <p className="text-slate-400 max-w-xs mx-auto mt-4 font-medium">Configure your target topic and criterion on the left to synthesize a new examination task.</p>
                 </div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}

function SidebarLink({ active, onClick, icon, label, badge }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; badge?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-between w-full p-3.5 rounded-2xl transition-all group ${
        active 
          ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-1.5 rounded-lg transition-colors ${active ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-white'}`}>
           {icon}
        </div>
        <span className="text-[13px] font-black uppercase tracking-tight">{label}</span>
      </div>
      {badge && (
        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${active ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function SidebarHeading({ label }: { label: string }) {
  return (
    <h4 className="px-3 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</h4>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${
        active ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

interface TopicCardProps {
  topic: Topic;
  onClick: () => void;
  key?: React.Key;
}

function TopicCard({ topic, onClick }: TopicCardProps) {
  const Icon = { 
    User, 
    Users, 
    Heart, 
    Activity, 
    Swords, 
    Target, 
    GraduationCap, 
    Globe, 
    Sparkles,
    Scale 
  }[topic.icon] || Globe;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all group"
      id={`topic-card-${topic.id}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Icon size={24} />
        </div>
        <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">{topic.title}</h3>
      <h4 className="text-blue-600 font-medium mb-2">{topic.germanTitle}</h4>
      <p className="text-slate-500 text-sm line-clamp-2">{topic.coreIdeaEn}</p>
    </motion.div>
  );
}

function TopicDetail({ topic, subjectId }: { topic: Topic; subjectId: string }) {
  const Icon = { 
    User, 
    Users, 
    Heart, 
    Activity, 
    Swords, 
    Target, 
    GraduationCap, 
    Globe, 
    Sparkles,
    Scale 
  }[topic.icon] || Globe;

  return (
    <div className="space-y-12 pb-20">
      {/* Header with Background Contrast */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="shrink-0 p-8 bg-blue-600 rounded-[2rem] shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
             <Icon size={64} className="text-white" />
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="flex items-center gap-3 justify-center md:justify-start">
               <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-400 border border-white/10">GLOBAL CONTEXT</span>
               <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
               <span className="text-xs font-bold text-slate-400">Identities & Relationships</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">{topic.title} / <span className="text-blue-500 italic">{topic.germanTitle}</span></h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">{topic.coreIdeaEn}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* Concepts - Geometric Style */}
         <section className="space-y-6">
            <SectionHeader title="Themenkonzepte" />
            <div className="grid gap-6 mt-4">
              {topic.concepts.map((concept, i) => (
                <div key={i} className="group bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-blue-600 transition-all shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-sm group-hover:bg-blue-600 transition-colors">{i + 1}</div>
                    <h3 className="font-black text-xl uppercase tracking-tight">{concept.titleDe} <span className="text-slate-400 text-sm font-medium italic block md:inline md:ml-2">({concept.titleEn})</span></h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium mb-4">„{concept.contentDe}“</p>
                  <p className="text-sm text-slate-400 italic border-l-2 border-slate-200 pl-4">{concept.contentEn}</p>
                </div>
              ))}
            </div>
         </section>

         {/* Visual Section: Geometric Infographic Placeholder */}
         <section className="flex flex-col gap-6">
            <SectionHeader title="Concept Visualization" />
            <div className="bg-slate-100 rounded-[3rem] p-10 flex flex-col justify-center items-center text-center border-4 border-dashed border-slate-200 h-full min-h-[400px]">
               <div className="mb-6 p-6 bg-white rounded-full shadow-inner">
                  <Globe size={80} className="text-blue-600 opacity-20" />
               </div>
               <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">Visual Mapping</h4>
               <p className="text-xs text-slate-400 max-w-xs italic mb-8">"{topic.visualPrompt}"</p>
               
               {/* Simple CSS Infographic Shape */}
               <div className="flex gap-4 items-end">
                  <div className="w-12 bg-blue-600 rounded-t-xl transition-all duration-1000" style={{ height: '120px' }}></div>
                  <div className="w-12 bg-slate-300 rounded-t-xl transition-all duration-1000" style={{ height: '80px' }}></div>
                  <div className="w-12 bg-blue-500 rounded-t-xl transition-all duration-1000" style={{ height: '160px' }}></div>
                  <div className="w-12 bg-slate-400 rounded-t-xl transition-all duration-1000" style={{ height: '100px' }}></div>
               </div>
            </div>
         </section>
      </div>

      {/* Band 7 Advanced Grammar Section */}
      <section className="bg-white p-12 rounded-[3.5rem] border-4 border-slate-900 shadow-[20px_20px_0px_0px_rgba(15,23,42,0.05)]">
        <div className="flex items-center gap-6 mb-10">
          <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg -rotate-6">
            <GraduationCap size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Band 7 Mastery Phrases</h2>
            <p className="text-slate-500 font-bold italic">Expressing abstract ideas with complex grammar.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topic.band7Sentences.map((s, i) => (
            <div key={i} className="relative group">
               <div className="absolute -inset-2 bg-blue-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative p-6 space-y-4">
                  <div className="space-y-2">
                    <p className="text-xl font-black text-slate-900 leading-tight">„{s.german}“</p>
                    <p className="text-slate-500 font-medium italic">{s.english}</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Grammar Detail</p>
                    <p className="text-xs text-slate-600 leading-relaxed font-bold">{s.grammarTip}</p>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vocab with Pronunciation Hooks */}
      <section>
        <SectionHeader title="Vokabeln & Ausdrücke" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {topic.vocab.map((v, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-600 hover:shadow-md transition-all cursor-help group">
               <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">A2-B1</span>
                <Globe size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
               </div>
               <p className="font-black text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{v.german}</p>
               <p className="text-xs text-slate-400 font-bold">{v.english}</p>
               <div 
                 onClick={(e) => { e.stopPropagation(); speak(v.german, subjectId); }}
                 className="mt-3 pt-3 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-blue-600"
               >
                  <Volume2 size={12} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Listen Pronunciation</span>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ExamPrepView({ onStartTask, subject, context }: { onStartTask: (task: AssessmentTask) => void; subject: Subject; context: GlobalContext }) {
  const topics = TOPICS_BY_SUBJECT[subject.id] || [];
  return (
    <div className="space-y-12 pb-20">
      <header className="max-w-3xl">
        <div className="flex gap-4 mb-2">
           <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">STRATEGY MODULE</span>
           <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200">EXAM MASTERY</span>
        </div>
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">Exam Tactics & <span className="text-blue-600 italic">Band 7 Drills</span></h1>
        <p className="text-slate-500 mt-4 text-xl font-medium leading-relaxed">Master the structure of a top-tier response. Use these practice prompts to build complexity and demonstrate evaluation skills for {subject.name} within {context.name}.</p>
      </header>

      {/* The Strategy Framework */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <SectionHeader title="The Band 7 Answer Formula" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               { id: '01', title: 'State Idea', formula: 'Ich bin der Meinung, dass...', color: 'blue' },
               { id: '02', title: 'Deep Logic', formula: 'Dies liegt daran, dass...', color: 'emerald' },
               { id: '03', title: 'Example', formula: 'Zum Beispiel prägt...', color: 'amber' },
               { id: '04', title: 'Eval Loop', formula: 'Einerseits... andererseits...', color: 'rose' }
             ].map((f) => (
                <div key={f.id} className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm group hover:border-slate-900 transition-all">
                   <div className="flex items-center gap-3 mb-3">
                      <span className={`text-sm font-black text-white px-2 py-1 bg-slate-900 rounded-md`}>{f.id}</span>
                      <h4 className="font-black uppercase text-sm tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">{f.title}</h4>
                   </div>
                   <p className="text-lg font-black text-slate-800">„{f.formula}“</p>
                </div>
             ))}
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
           <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl" />
           <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Expert Tip</h3>
           <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                 <p className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest">Connectors are Key</p>
                 <p className="text-slate-300 text-sm leading-relaxed">Top students don't just list facts. They use <span className="text-white italic">obwohl, während</span>, and <span className="text-white italic">darüber hinaus</span> to create a flow of logic.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                 <p className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest">Avoid Passive Lists</p>
                 <p className="text-slate-300 text-sm leading-relaxed">Turn "I am happy" into "Happiness is influenced by social environment, although personal mindset remains the core factor."</p>
              </div>
           </div>
        </div>
      </section>

      {/* Practice Question Bank */}
      <section className="space-y-8">
        <SectionHeader title="Practice Question Bank" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
           {topics.filter(t => t.practiceQuestions.length > 0).map((topic) => (
             <div key={topic.id} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all border-l-8 border-l-blue-600">
                <div className="flex items-center gap-3 mb-6">
                   <div className="bg-blue-50 text-blue-600 p-2 rounded-xl"><Sparkles size={18} /></div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{topic.title} / {topic.germanTitle}</span>
                </div>
                {topic.practiceQuestions.map((q, i) => (
                   <div key={i} className="space-y-8">
                      <div className="flex items-center gap-2">
                         <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${
                            q.criterion === 'A' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                            q.criterion === 'B' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                            q.criterion === 'C' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                            'bg-purple-100 text-purple-700 border-purple-200'
                         }`}>Criterion {q.criterion}</span>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{q.type} Focus</span>
                      </div>
                      <h4 className="text-2xl font-black text-slate-900 leading-tight">Q: {q.question}</h4>
                      
                      <div className="space-y-4">
                         <div className="flex items-center gap-2">
                           <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-black uppercase">Sample Band 7 Answer</span>
                         </div>
                         <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <p className="text-lg font-bold text-slate-800 italic leading-relaxed">„{q.sampleAnswer}“</p>
                            <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500 font-medium leading-relaxed">
                               <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Analysis</p>
                               {q.explanation}
                            </div>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}

function AssessmentDashboard({ onStartTask, subject }: { onStartTask: (task: AssessmentTask) => void; subject: Subject }) {
  return (
    <div className="space-y-16 pb-20">
      <header className="max-w-3xl">
        <div className="flex gap-4 mb-2">
           <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Formal Assessment</span>
           <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200">{subject.name} | Practice Exam</span>
        </div>
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">Assessment <span className="text-blue-600 italic">Command Center</span></h1>
        <p className="text-slate-500 mt-4 text-xl font-medium leading-relaxed">Prepare for your MYP {subject.name} board exams with curated tasks. Each response is graded by our AI based on official IB criteria.</p>
      </header>

      {/* Grid of Criteria */}
      <section className="space-y-8">
        <SectionHeader title="Assessment Criteria Descriptors" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(ASSESSMENT_CRITERIA_BY_SUBJECT[subject.id] || []).map((criterion, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 hover:border-slate-900 transition-all shadow-sm flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg transform -rotate-3 ${
                  criterion.id === 'A' ? 'bg-amber-500 text-white' :
                  criterion.id === 'B' ? 'bg-emerald-500 text-white' :
                  criterion.id === 'C' ? 'bg-blue-500 text-white' :
                  'bg-purple-500 text-white'
                }`}>{criterion.id}</div>
                <h3 className="font-black text-xl uppercase tracking-tight text-slate-900 leading-tight">{criterion.title}</h3>
              </div>
              
              <div className="space-y-8 flex-1">
                <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Target size={12} /> Key Focus
                  </p>
                  <p className="text-slate-600 font-bold leading-relaxed text-lg">{criterion.focus}</p>
                </div>
                
                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Level 7-8 Standard</p>
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm italic text-sm font-medium text-slate-600">
                    "{criterion.bands.find(b => b.level === '7-8')?.descriptor}"
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Exam Tasks Bank */}
      <section className="space-y-8">
        <SectionHeader title="Active Exam Tasks" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_EXAM_TASKS.map((task) => (
            <div key={task.id} className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between">
               <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-md text-[10px] font-black uppercase">Criterion {task.criterion}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Band: {task.targetBand}</span>
                  </div>
                  <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">{task.title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed mb-8">{task.instructionEn}</p>
               </div>
               <button 
                 onClick={() => onStartTask(task as any)}
                 className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-2"
               >
                 Start Exam Task <ChevronRight size={18} />
               </button>
            </div>
          ))}
        </div>
      </section>

      {/* Deep Dive Section */}
      <section className="bg-blue-600 p-16 rounded-[4.5rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
             <div className="inline-block p-4 bg-white/20 backdrop-blur-xl rounded-3xl border border-white/20">
                <Info size={40} />
             </div>
             <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">The <span className="text-blue-200">Science</span> of Assessment</h2>
             <p className="text-xl text-blue-100 font-medium leading-relaxed">IB MYP Assessment is not just about being "correct"—it is about demonstrating **complexity, analysis, and reflection**. To score a Band 7, you must bridge the gap between simple communication and nuanced evaluation.</p>
          </div>
          
          <div className="space-y-6">
             <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10">
                <h4 className="font-black uppercase tracking-widest text-xs text-blue-300 mb-4">The Assessment Loop</h4>
                <ol className="space-y-4">
                   {[
                     { step: 'Identification', desc: 'Find the core themes in the stimulus.' },
                     { step: 'Interpretation', desc: 'Explain what these themes mean for the global context.' },
                     { step: 'Application', desc: `Use advanced ${subject.name} structures to communicate your thoughts.` },
                     { step: 'Evaluation', desc: 'Critically analyze different perspectives.' }
                   ].map((s, i) => (
                     <li key={i} className="flex gap-4">
                        <span className="font-black text-blue-300">{i + 1}.</span>
                        <div>
                           <span className="font-black block uppercase text-sm tracking-tight">{s.step}</span>
                           <span className="text-blue-100/70 text-sm font-medium">{s.desc}</span>
                        </div>
                     </li>
                   ))}
                </ol>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AssessmentTaskView({ task, onCancel, subject, context }: { task: AssessmentTask; onCancel: () => void; subject: Subject; context: GlobalContext }) {
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<GradingFeedback | null>(null);

  async function handleGrade() {
    if (!answer.trim() || loading) return;
    setLoading(true);

    try {
      const prompt = `You are an IB MYP ${subject.name} Assistant Examiner. 
      Task Title: ${task.title}
      Instruction: ${task.instructionDe}
      Stimulus: ${task.stimulus}
      Global Context: ${context.name}
      MYP Criterion: ${task.criterion}
      
      Student Answer: "${answer}"
      
      CRITICAL GRADING INSTRUCTIONS:
      1. Provide a numerical band (1-8). 
      2. Be strict but constructive. 
      3. Identify specific strengths and areas for improvement.
      4. Provide a list of corrections if applicable.
      
      Output JSON format:
      {
        "band": number,
        "criterion": "Criterion ${task.criterion}",
        "strengthDe": "detailed strength",
        "strengthEn": "detailed strength in English",
        "improvementDe": "detailed improvement",
        "improvementEn": "detailed improvement in English",
        "grammarCorrections": [
          { "original": "text", "corrected": "text", "rule": "explanation" }
        ]
      }`;

      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      const text = response.text.replace(/```json|```/g, '');
      const data = JSON.parse(text);
      setFeedback(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-12 pb-20">
      <button 
        onClick={onCancel}
        className="flex items-center gap-2 text-slate-400 font-black uppercase text-xs hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
           <header>
             <div className="flex gap-3 mb-4">
                <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Active Exam Task</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">Criterion {task.criterion}</span>
             </div>
             <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">{task.title}</h2>
           </header>

           <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 space-y-6">
              <div>
                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                   <Info size={12} /> Stimulus Material
                </h4>
                <p className="text-xl font-bold text-slate-700 leading-relaxed italic">"{task.stimulus}"</p>
              </div>
              
              <div className="pt-6 border-t border-slate-200">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Instructions</h4>
                <p className="font-bold text-slate-600 mb-1">{task.instructionDe}</p>
                <p className="text-sm text-slate-400 italic">({task.instructionEn})</p>
              </div>
           </div>
        </div>

        <div className="flex flex-col gap-6">
           <SectionHeader title="Your Response" />
           <div className="relative grow min-h-[400px]">
              <textarea 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Schreibe deine Antwort hier..."
                className="w-full h-full p-8 bg-white border-2 border-slate-200 rounded-[3rem] text-lg font-medium focus:border-blue-600 focus:ring-0 outline-none transition-all resize-none shadow-sm"
              />
              <button 
                onClick={handleGrade}
                disabled={!answer.trim() || loading}
                className="absolute bottom-6 right-6 bg-slate-900 text-white px-8 py-4 rounded-3xl font-black uppercase tracking-widest hover:bg-blue-600 disabled:bg-slate-200 transition-all shadow-xl flex items-center gap-3"
              >
                {loading ? 'Grading...' : 'Grade my Answer'}
                {!loading && <Send size={20} />}
              </button>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-4 border-slate-900 rounded-[4rem] p-16 shadow-[30px_30px_0px_0px_rgba(15,23,42,0.05)] space-y-12 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-12">
               <div className="w-40 h-40 bg-slate-900 text-white rounded-[2.5rem] flex flex-col items-center justify-center -rotate-6 shadow-2xl">
                  <span className="text-[10px] font-black uppercase opacity-60">BAND</span>
                  <span className="text-7xl font-black">{feedback.band}</span>
                  <span className="text-[10px] font-black uppercase">OUT OF 8</span>
               </div>
            </div>

            <div className="max-w-2xl">
               <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">Examiner Feedback</h3>
               <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">{feedback.criterion} Assessment</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-6">
                  <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2.5rem]">
                     <div className="flex items-center gap-3 mb-4 text-emerald-700">
                        <CheckCircle2 size={24} />
                        <h4 className="font-black uppercase tracking-widest text-xs">Stärken (Strengths)</h4>
                     </div>
                     <p className="text-emerald-900 font-bold mb-3">{feedback.strengthDe}</p>
                     <p className="text-emerald-600 text-sm font-medium italic">{feedback.strengthEn}</p>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 p-8 rounded-[2.5rem]">
                     <div className="flex items-center gap-3 mb-4 text-amber-700">
                        <Target size={24} />
                        <h4 className="font-black uppercase tracking-widest text-xs">Verbesserungen (Improvements)</h4>
                     </div>
                     <p className="text-amber-900 font-bold mb-3">{feedback.improvementDe}</p>
                     <p className="text-amber-600 text-sm font-medium italic">{feedback.improvementEn}</p>
                  </div>
               </div>

               <div className="space-y-6">
                  <h4 className="font-black uppercase tracking-widest text-xs text-slate-400 mb-4 flex items-center gap-2">
                     <Scale size={14} /> Grammar Audit
                  </h4>
                  <div className="space-y-4">
                     {feedback.grammarCorrections.map((corr, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-100 p-6 rounded-3xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 px-3 py-1 bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest rounded-bl-xl">Correction #{idx+1}</div>
                           <div className="flex items-center gap-4 mb-3">
                              <span className="text-slate-400 line-through text-sm font-medium">{corr.original}</span>
                              <ChevronRight size={14} className="text-slate-300" />
                              <span className="text-blue-600 font-black text-lg">{corr.corrected}</span>
                           </div>
                           <p className="text-xs text-slate-500 font-bold leading-relaxed">{corr.rule}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-2xl font-bold text-slate-900 decoration-blue-500/30 decoration-4 underline-offset-8 underline">{title}</h2>
      <div className="h-px bg-slate-200 flex-1" />
    </div>
  );
}

function TutorOverlay({ isOpen, onClose, subject, context }: { isOpen: boolean; onClose: () => void; subject: Subject; context: GlobalContext }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: `Greetings! I am your IB MYP ${subject.name} Tutor. I can help you explore core concepts, terminology from "${context.name}", or give you practice questions and feedback. What would you like to focus on today?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const prompt = `You are a professional IB MYP ${subject.name} Tutor.
      The current global context is "${context.name}" (${context.description}).
      
      CRITICAL INSTRUCTIONS:
      1. PROVIDE DETAILED EXPLANATIONS: Explain concepts, nuances, and vocabulary relevant to ${subject.name}.
      2. FOCUS ON IB CRITERIA: Connect the learning to Assessment Criteria and the Global Context exploration.
      3. CORRECT & ELEVATE: If the student makes a mistake or gives a basic answer, correct it. THEN, provide a "Level 7/8 Alternative" that uses more sophisticated terminology and analytical depth.
      4. EXPLAIN IMPROVEMENTS: Briefly explain WHY the advanced alternative is better.
      5. CONCEPTUAL DEPTH: Discuss how the subject helps us understand the current Global Context.
      
      Student message: ${userMsg}`;

      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      const text = response.text;

      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I am having trouble connecting. Make sure your API key is correctly configured.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b flex items-center justify-between bg-blue-600 text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h2 className="font-bold text-lg">AI IB Tutor</h2>
                  <p className="text-xs opacity-80 uppercase tracking-widest">Powered by Gemini</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                id="close-tutor"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t bg-white">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask your tutor something... (e.g. Give me a practice question block)"
                  className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white p-3 rounded-xl transition-colors shadow-md"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
