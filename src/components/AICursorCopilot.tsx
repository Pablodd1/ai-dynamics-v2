import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, FileText, Globe2, Loader2 } from 'lucide-react';

export const AICursorCopilot = () => {
  const [selection, setSelection] = useState({ text: '', x: 0, y: 0, show: false });
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      const activeSelection = window.getSelection();
      if (activeSelection && activeSelection.toString().trim().length > 5) {
        setSelection({
          text: activeSelection.toString(),
          x: e.clientX,
          y: e.clientY - 60, // Position above cursor
          show: true
        });
        setResult('');
      } else {
        setSelection(prev => ({ ...prev, show: false }));
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleAction = (action: string) => {
    setProcessing(true);
    // Simulate AI processing delay
    setTimeout(() => {
      setProcessing(false);
      if (action === 'summarize') setResult("AI Summary: This section explains how our Sovereign Agents automate enterprise tasks securely.");
      if (action === 'translate') setResult("Traducción de IA: Esta sección explica cómo nuestros Agentes Soberanos automatizan...");
      if (action === 'explain') setResult("Technical Explanation: The underlying architecture relies on multi-node LLM orchestration to parse context and execute APIs.");
    }, 1500);
  };

  return (
    <AnimatePresence>
      {selection.show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          style={{ left: Math.min(selection.x, window.innerWidth - 300), top: Math.max(selection.y, 20) }}
          className="fixed z-[100] bg-[#0C0C0C] border border-[#FF8A00]/50 rounded-xl shadow-2xl p-2 flex flex-col gap-2 min-w-[200px] max-w-[300px]"
        >
          {!processing && !result ? (
            <div className="flex items-center gap-1">
              <button onClick={() => handleAction('explain')} className="flex items-center gap-2 text-xs text-[#D7E2EA] hover:bg-[#FF8A00]/20 hover:text-[#FF8A00] px-3 py-2 rounded-lg transition-colors">
                <Sparkles size={14} /> Explain
              </button>
              <button onClick={() => handleAction('summarize')} className="flex items-center gap-2 text-xs text-[#D7E2EA] hover:bg-[#FF8A00]/20 hover:text-[#FF8A00] px-3 py-2 rounded-lg transition-colors border-l border-[#D7E2EA]/10">
                <FileText size={14} /> Summarize
              </button>
              <button onClick={() => handleAction('translate')} className="flex items-center gap-2 text-xs text-[#D7E2EA] hover:bg-[#FF8A00]/20 hover:text-[#FF8A00] px-3 py-2 rounded-lg transition-colors border-l border-[#D7E2EA]/10">
                <Globe2 size={14} /> ES
              </button>
            </div>
          ) : processing ? (
            <div className="flex items-center justify-center gap-2 py-2 px-4 text-[#FF8A00] text-xs">
              <Loader2 size={14} className="animate-spin" />
              <span>Querying Sovereign Node...</span>
            </div>
          ) : (
            <div className="p-2 text-xs text-[#D7E2EA]/90 leading-relaxed relative">
              <span className="font-bold text-[#FF8A00] mb-1 block">AI Result:</span>
              {result}
              <button 
                onClick={() => setSelection(prev => ({ ...prev, show: false }))}
                className="absolute top-2 right-2 text-[#D7E2EA]/40 hover:text-white"
              >
                ×
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
