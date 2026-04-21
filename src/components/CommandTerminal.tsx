import { useState, useRef, useCallback } from 'react';

const COMMANDS = ['PING', 'SCAN', 'DEPLOY', 'ENCRYPT'];

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export default function CommandTerminal() {
  const [terminalText, setTerminalText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState<'idle' | 'active' | 'success'>('idle');
  const abortRef = useRef(false);

  const typeText = useCallback(async (text: string) => {
    if (abortRef.current) return;
    setTerminalText('');
    for (let i = 0; i < text.length; i++) {
      if (abortRef.current) return;
      setTerminalText(text.slice(0, i + 1));
      await wait(50);
    }
  }, []);

  const runCommand = useCallback(async (cmd: string) => {
    if (isTyping) return;
    abortRef.current = false;
    setIsTyping(true);
    setStatus('active');

    await typeText(`> EXECUTING ${cmd.toUpperCase()}...`);
    await wait(300);

    if (abortRef.current) return;
    setTerminalText('');
    await wait(100);

    // Glitch sequence
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    for (let g = 0; g < 8; g++) {
      if (abortRef.current) return;
      let glitchText = '';
      for (let i = 0; i < 20; i++) {
        glitchText += chars[Math.floor(Math.random() * chars.length)];
      }
      setTerminalText(glitchText);
      await wait(50);
    }

    setTerminalText('');
    await wait(200);

    await typeText(`[SUCCESS] ${cmd.toUpperCase()} SEQUENCE COMPLETE.`);

    if (!abortRef.current) {
      setStatus('success');
      setIsTyping(false);
    }
  }, [isTyping, typeText]);

  const handleTagClick = (cmd: string) => {
    if (isTyping) return;
    runCommand(cmd);
  };

  return (
    <div className={`terminal-module max-w-2xl mx-auto ${status === 'active' ? 'is-active' : ''} ${status === 'success' ? 'is-success' : ''}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
          [ SYSTEM READY ]
        </span>
      </div>

      {/* Terminal Body */}
      <div className="min-h-[80px] flex items-center mb-8">
        <div className="font-mono text-sm text-white/80">
          {terminalText}
          <span className="blinking-cursor" />
        </div>
      </div>

      {/* Command Tags */}
      <div className="flex flex-wrap gap-3">
        {COMMANDS.map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleTagClick(cmd)}
            disabled={isTyping}
            className={`px-4 py-2 rounded-full border font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
              isTyping
                ? 'border-white/10 text-white/30 cursor-not-allowed'
                : 'border-cyan/30 text-cyan hover:border-cyan hover:bg-cyan/10 cursor-pointer'
            }`}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
