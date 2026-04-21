import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqItems } from '@/data/projects';
import SectionHeader from '@/components/SectionHeader';
import { Link } from 'react-router-dom';

function AccordionItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <span className="font-display font-semibold text-lg text-white group-hover:text-cyan transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`text-white/40 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="px-6 pb-6 text-white/50 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('what-is-lucidcore');

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding pb-16">
        <div className="container-lucid">
          <SectionHeader
            caption="FAQ"
            title="Common Questions."
            description="Everything you need to know about Lucidcore Technologies, our process, and how we can work together."
          />
        </div>
      </section>

      {/* FAQ List */}
      <section className="section-padding pt-8">
        <div className="container-lucid max-w-4xl">
          <div className="space-y-4">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openId === item.id}
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="pb-24">
        <div className="container-lucid">
          <div className="glass-card p-10 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan to-neon-purple" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center mx-auto mb-5">
                <HelpCircle size={24} className="text-cyan" />
              </div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
                Still have questions?
              </h2>
              <p className="text-white/50 max-w-lg mx-auto mb-6">
                Can't find the answer you're looking for? Our team is happy to help. Reach out and we'll get back to you within 24 hours.
              </p>
              <Link to="/contact" className="glow-button glow-button-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
