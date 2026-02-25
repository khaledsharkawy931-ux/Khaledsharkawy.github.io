import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  Clock, 
  Palette, 
  Code, 
  Languages, 
  CheckCircle2,
  Star,
  Zap,
  Heart,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const liveMatchesRef = useRef<HTMLDivElement>(null);
  const matchDemoRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const mentorsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation (auto-play on load)
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      heroTl
        .fromTo('.hero-media-card', 
          { x: '-60vw', opacity: 0, scale: 0.96 }, 
          { x: 0, opacity: 1, scale: 1, duration: 0.9 }
        )
        .fromTo('.hero-headline', 
          { x: '18vw', opacity: 0 }, 
          { x: 0, opacity: 1, duration: 0.7 }, 
          '-=0.6'
        )
        .fromTo('.hero-subtext', 
          { y: 24, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6 }, 
          '-=0.4'
        )
        .fromTo('.hero-cta', 
          { y: 24, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6 }, 
          '-=0.4'
        )
        .fromTo('.hero-stats', 
          { y: 24, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6 }, 
          '-=0.4'
        )
        .fromTo('.hero-pill', 
          { y: '-12vh', opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.6)' }, 
          '-=0.5'
        );

      // Hero scroll animation (exit only)
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.hero-media-card', { 
              x: -exitProgress * 18 + 'vw', 
              opacity: 1 - exitProgress * 0.75 
            });
            gsap.set('.hero-content', { 
              x: exitProgress * 10 + 'vw', 
              opacity: 1 - exitProgress * 0.7 
            });
            gsap.set('.hero-pill', { 
              x: (i) => (i % 2 === 0 ? 1 : -1) * exitProgress * 10 + 'vw',
              y: -exitProgress * 10 + 'vh',
              opacity: 1 - exitProgress * 0.8 
            });
          }
        },
        onLeaveBack: () => {
          gsap.set('.hero-media-card', { x: 0, opacity: 1 });
          gsap.set('.hero-content', { x: 0, opacity: 1 });
          gsap.set('.hero-pill', { x: 0, y: 0, opacity: 1 });
        }
      });

      // How It Works section
      gsap.fromTo('.hiw-header', 
        { y: 40, opacity: 0 }, 
        { 
          y: 0, opacity: 1, 
          scrollTrigger: {
            trigger: howItWorksRef.current,
            start: 'top 80%',
            end: 'center 55%',
            scrub: true
          }
        }
      );

      gsap.fromTo('.hiw-card', 
        { y: 80, rotate: -2, opacity: 0 }, 
        { 
          y: 0, rotate: 0, opacity: 1, stagger: 0.12,
          scrollTrigger: {
            trigger: '.hiw-cards',
            start: 'top 80%',
            end: 'top 40%',
            scrub: true
          }
        }
      );

      // Live Matches section
      gsap.fromTo('.lm-header', 
        { y: 30, opacity: 0 }, 
        { 
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: liveMatchesRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true
          }
        }
      );

      gsap.fromTo('.match-card-left', 
        { x: '-12vw', opacity: 0, scale: 0.98 }, 
        { 
          x: 0, opacity: 1, scale: 1,
          scrollTrigger: {
            trigger: '.match-cards',
            start: 'top 75%',
            end: 'top 35%',
            scrub: true
          }
        }
      );

      gsap.fromTo('.match-card-right', 
        { x: '12vw', opacity: 0, scale: 0.98 }, 
        { 
          x: 0, opacity: 1, scale: 1,
          scrollTrigger: {
            trigger: '.match-cards',
            start: 'top 75%',
            end: 'top 35%',
            scrub: true
          }
        }
      );

      // Match Demo section (pinned)
      ScrollTrigger.create({
        trigger: matchDemoRef.current,
        start: 'top top',
        end: '+=140%',
        pin: true,
        scrub: 0.7,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Entrance (0-30%)
          if (progress <= 0.3) {
            const entranceProgress = progress / 0.3;
            gsap.set('.demo-card', {
              y: (1 - entranceProgress) * 100 + 'vh',
              rotate: (1 - entranceProgress) * 6,
              scale: 0.92 + entranceProgress * 0.08,
              opacity: entranceProgress
            });
            gsap.set('.demo-avatar', {
              scale: 0.6 + entranceProgress * 0.4,
              opacity: entranceProgress
            });
            gsap.set('.demo-ring', {
              scale: 0.7 + entranceProgress * 0.3,
              opacity: entranceProgress
            });
            gsap.set('.demo-center-icon', {
              y: (1 - entranceProgress) * -40,
              opacity: entranceProgress
            });
            gsap.set('.demo-pill', {
              y: (1 - entranceProgress) * -20 + 'vh',
              opacity: entranceProgress
            });
          }
          // Settle (30-70%)
          else if (progress <= 0.7) {
            gsap.set('.demo-card', { y: 0, rotate: 0, scale: 1, opacity: 1 });
            gsap.set('.demo-avatar', { scale: 1, opacity: 1 });
            gsap.set('.demo-ring', { scale: 1, opacity: 1 });
            gsap.set('.demo-center-icon', { y: 0, opacity: 1 });
            gsap.set('.demo-pill', { y: 0, opacity: 1 });
          }
          // Exit (70-100%)
          else {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.demo-card', {
              y: -exitProgress * 40 + 'vh',
              rotate: -exitProgress * 4,
              opacity: 1 - exitProgress * 0.65
            });
            gsap.set('.demo-avatar-left', { x: -exitProgress * 4 + 'vw' });
            gsap.set('.demo-avatar-right', { x: exitProgress * 4 + 'vw' });
            gsap.set('.demo-pill', {
              y: -exitProgress * 10 + 'vh',
              opacity: 1 - exitProgress * 0.8
            });
          }
        },
        onLeaveBack: () => {
          gsap.set('.demo-card', { y: 0, rotate: 0, scale: 1, opacity: 1 });
          gsap.set('.demo-avatar', { scale: 1, opacity: 1, x: 0 });
          gsap.set('.demo-ring', { scale: 1, opacity: 1 });
          gsap.set('.demo-center-icon', { y: 0, opacity: 1 });
          gsap.set('.demo-pill', { y: 0, opacity: 1 });
        }
      });

      // Explore Skills section
      gsap.fromTo('.explore-header', 
        { x: '-6vw', opacity: 0 }, 
        { 
          x: 0, opacity: 1,
          scrollTrigger: {
            trigger: exploreRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true
          }
        }
      );

      gsap.fromTo('.explore-card', 
        { y: 60, opacity: 0 }, 
        { 
          y: 0, opacity: 1, stagger: 0.1,
          scrollTrigger: {
            trigger: '.explore-grid',
            start: 'top 80%',
            end: 'top 40%',
            scrub: true
          }
        }
      );

      // Mentors section
      gsap.fromTo('.mentors-header', 
        { y: 24, opacity: 0 }, 
        { 
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: mentorsRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: true
          }
        }
      );

      gsap.fromTo('.mentor-card', 
        { y: 80, rotate: 1.5, opacity: 0 }, 
        { 
          y: 0, rotate: 0, opacity: 1, stagger: 0.12,
          scrollTrigger: {
            trigger: '.mentors-grid',
            start: 'top 80%',
            end: 'top 40%',
            scrub: true
          }
        }
      );

      // CTA section
      gsap.fromTo('.cta-card', 
        { y: 60, scale: 0.98, opacity: 0 }, 
        { 
          y: 0, scale: 1, opacity: 1,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true
          }
        }
      );

    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-offwhite overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-offwhite/80 backdrop-blur-md">
        <div className="font-display font-bold text-xl tracking-tight text-foreground">
          SkillSwap
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection(howItWorksRef)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How it works
          </button>
          <button onClick={() => scrollToSection(exploreRef)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Explore
          </button>
          <button onClick={() => scrollToSection(liveMatchesRef)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Matches
          </button>
          <Button className="bg-coral hover:bg-coral-dark text-white rounded-full px-6">
            Sign up
          </Button>
        </div>
      </nav>

      {/* Section 1: Hero */}
      <section ref={heroRef} className="relative min-h-screen w-full flex items-center justify-center pt-20 dot-pattern">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          
          {/* Left Media Card */}
          <div className="hero-media-card relative w-full lg:w-[56vw] lg:h-[80vh] rounded-[34px] overflow-hidden shadow-card">
            <img 
              src="/images/hero_collaboration.jpg" 
              alt="People collaborating" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            {/* Floating skill pills on image */}
            <div className="absolute top-6 left-6 bg-surface-mint/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-pill">
              <span className="text-sm font-semibold flex items-center gap-2">
                <Palette className="w-4 h-4" /> Design
              </span>
            </div>
            <div className="absolute bottom-6 right-6 bg-surface-lavender/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-pill">
              <span className="text-sm font-semibold flex items-center gap-2">
                <Code className="w-4 h-4" /> Development
              </span>
            </div>
          </div>

          {/* Right Content */}
          <div className="hero-content relative w-full lg:w-[28vw] lg:ml-[4vw] flex flex-col items-start text-left py-8 lg:py-0">
            <h1 className="hero-headline font-display text-4xl sm:text-5xl lg:text-[clamp(44px,5vw,72px)] font-bold uppercase leading-[0.92] tracking-tight text-foreground mb-6">
              Trade skills.<br />
              <span className="text-coral">Not money.</span>
            </h1>
            
            <p className="hero-subtext text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
              Swap 30-minute micro-mentorships with people who want what you know.
            </p>
            
            <Button className="hero-cta bg-coral hover:bg-coral-dark text-white rounded-full px-8 py-6 text-base font-semibold shadow-pill hover:shadow-card transition-all hover:scale-105">
              Find your first swap <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <div className="hero-stats flex items-center gap-6 mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-coral" />
                <span className="text-sm font-medium">1,200+ swaps this week</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-coral" />
                <span className="text-sm font-medium">Avg match: 2 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating decorative pills */}
        <div className="hero-pill absolute top-[12vh] left-[52vw] hidden lg:flex bg-surface-peach rounded-full px-5 py-3 shadow-pill animate-float">
          <span className="text-sm font-semibold flex items-center gap-2">
            <Palette className="w-4 h-4" /> Design
          </span>
        </div>
        <div className="hero-pill absolute top-[56vh] left-[62vw] hidden lg:flex bg-surface-cream rounded-full px-5 py-3 shadow-pill animate-float" style={{ animationDelay: '0.5s' }}>
          <span className="text-sm font-semibold flex items-center gap-2">
            <Languages className="w-4 h-4" /> Language
          </span>
        </div>
        <div className="hero-pill absolute bottom-[12vh] left-[18vw] hidden lg:flex bg-surface-blush rounded-full px-5 py-3 shadow-pill animate-float" style={{ animationDelay: '1s' }}>
          <span className="text-sm font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Music
          </span>
        </div>
      </section>

      {/* Section 2: How It Works */}
      <section ref={howItWorksRef} className="relative py-24 lg:py-32 w-full dot-pattern">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hiw-header text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Post what you can teach. Choose what you want to learn. Swap 30 minutes—no money needed.
            </p>
          </div>

          <div className="hiw-cards grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Step 1 */}
            <div className="hiw-card bg-surface-mint rounded-[32px] p-8 min-h-[44vh] flex flex-col">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-soft">
                <span className="font-display font-bold text-xl text-coral">1</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">List your skills</h3>
              <p className="text-muted-foreground flex-grow">
                Add what you can teach in 30 minutes. From design to languages to career advice.
              </p>
              <div className="mt-6 flex -space-x-3">
                <img src="/images/avatar_maya.jpg" alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                <img src="/images/avatar_leo.jpg" alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                <img src="/images/avatar_rina.jpg" alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="hiw-card bg-surface-lavender rounded-[32px] p-8 min-h-[44vh] flex flex-col">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-soft">
                <span className="font-display font-bold text-xl text-coral">2</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Pick a goal</h3>
              <p className="text-muted-foreground flex-grow">
                Choose what you want to learn this month. Our AI finds the perfect matches.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <div className="bg-white/70 rounded-full px-3 py-1 text-sm font-medium">UI Design</div>
                <div className="bg-white/70 rounded-full px-3 py-1 text-sm font-medium">Spanish</div>
                <div className="bg-white/70 rounded-full px-3 py-1 text-sm font-medium">+3</div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="hiw-card bg-surface-cream rounded-[32px] p-8 min-h-[44vh] flex flex-col">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-soft">
                <span className="font-display font-bold text-xl text-coral">3</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Swap time</h3>
              <p className="text-muted-foreground flex-grow">
                Match, schedule, and trade mentorship. Build your skill reputation with every swap.
              </p>
              <div className="mt-6 flex items-center gap-2 text-coral">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-semibold">No money exchanged</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Live Matches */}
      <section ref={liveMatchesRef} className="relative py-24 lg:py-32 w-full bg-espresso grain-overlay">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lm-header text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white mb-4">
              Swaps Happening Now
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Real people trading real skills—design, code, language, music, fitness, and more.
            </p>
          </div>

          <div className="match-cards grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Match Card A */}
            <div className="match-card-left bg-surface-mint rounded-[34px] p-8 h-[52vh] flex flex-col items-center justify-center relative">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="relative">
                  <img src="/images/avatar_maya.jpg" alt="Maya" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-soft" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-full px-3 py-1 text-xs font-semibold shadow-soft whitespace-nowrap">
                    Maya teaches UI
                  </div>
                </div>
                <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center shadow-pill">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <div className="relative">
                  <img src="/images/avatar_leo.jpg" alt="Leo" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-soft" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-full px-3 py-1 text-xs font-semibold shadow-soft whitespace-nowrap">
                    Leo teaches Spanish
                  </div>
                </div>
              </div>
              <div className="bg-coral text-white rounded-full px-6 py-3 font-display font-bold text-lg shadow-pill">
                94% MATCH
              </div>
            </div>

            {/* Match Card B */}
            <div className="match-card-right bg-surface-lavender rounded-[34px] p-8 h-[52vh] flex flex-col items-center justify-center relative">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="relative">
                  <img src="/images/avatar_rina.jpg" alt="Rina" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-soft" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-full px-3 py-1 text-xs font-semibold shadow-soft whitespace-nowrap">
                    Rina teaches Python
                  </div>
                </div>
                <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center shadow-pill">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <div className="relative">
                  <img src="/images/avatar_jon.jpg" alt="Jon" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-soft" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-full px-3 py-1 text-xs font-semibold shadow-soft whitespace-nowrap">
                    Jon teaches Guitar
                  </div>
                </div>
              </div>
              <div className="bg-coral text-white rounded-full px-6 py-3 font-display font-bold text-lg shadow-pill">
                91% MATCH
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Skill Match Demo */}
      <section ref={matchDemoRef} className="relative min-h-screen w-full flex items-center justify-center diagonal-pattern">
        {/* Floating pills */}
        <div className="demo-pill absolute top-[10vh] left-[8vw] hidden lg:flex bg-surface-mint rounded-full px-5 py-3 shadow-pill">
          <span className="text-sm font-semibold flex items-center gap-2">
            <Zap className="w-4 h-4" /> Teach
          </span>
        </div>
        <div className="demo-pill absolute top-[12vh] right-[10vw] hidden lg:flex bg-surface-lavender rounded-full px-5 py-3 shadow-pill">
          <span className="text-sm font-semibold flex items-center gap-2">
            <Heart className="w-4 h-4" /> Learn
          </span>
        </div>
        <div className="demo-pill absolute bottom-[15vh] left-[12vw] hidden lg:flex bg-surface-cream rounded-full px-5 py-3 shadow-pill">
          <span className="text-sm font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Match
          </span>
        </div>

        {/* Main Demo Card */}
        <div className="demo-card relative w-[90vw] lg:w-[64vw] min-h-[70vh] lg:min-h-[76vh] bg-surface-peach rounded-[36px] shadow-card p-8 lg:p-12 flex flex-col items-center justify-center">
          <div className="text-sm font-display font-semibold uppercase tracking-wider text-muted-foreground mb-8">
            Your Top Match
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full">
            {/* Left Avatar - You */}
            <div className="demo-avatar demo-avatar-left flex flex-col items-center">
              <div className="relative">
                <img src="/images/avatar_you.jpg" alt="You" className="w-28 h-28 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-white shadow-soft" />
              </div>
              <h4 className="font-display font-bold text-xl mt-4">You</h4>
              <div className="bg-white/70 rounded-full px-4 py-1.5 mt-2">
                <span className="text-sm font-medium">Illustration</span>
              </div>
            </div>

            {/* Center - Compatibility Ring */}
            <div className="relative flex flex-col items-center">
              <div className="demo-ring relative w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center animate-pulse-slow">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="4" opacity="0.5" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#E4572E" strokeWidth="4" 
                    strokeDasharray="283" strokeDashoffset="11" strokeLinecap="round" />
                </svg>
                <div className="demo-center-icon w-14 h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-white shadow-soft">
                  <img src="/images/topic_camera.jpg" alt="Topic" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="bg-coral text-white rounded-full px-5 py-2 mt-4 font-display font-bold shadow-pill">
                96% MATCH
              </div>
            </div>

            {/* Right Avatar - Ava */}
            <div className="demo-avatar demo-avatar-right flex flex-col items-center">
              <div className="relative">
                <img src="/images/avatar_ava.jpg" alt="Ava" className="w-28 h-28 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-white shadow-soft" />
              </div>
              <h4 className="font-display font-bold text-xl mt-4">Ava</h4>
              <div className="bg-white/70 rounded-full px-4 py-1.5 mt-2">
                <span className="text-sm font-medium">Public Speaking</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-12">
            <Button className="bg-coral hover:bg-coral-dark text-white rounded-full px-8 py-6 text-base font-semibold shadow-pill hover:shadow-card transition-all hover:scale-105">
              Request a swap <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" className="rounded-full px-8 py-6 text-base font-semibold border-2 border-foreground/20 hover:bg-white/50 transition-all">
              Save for later
            </Button>
          </div>
        </div>
      </section>

      {/* Section 5: Explore Skills */}
      <section ref={exploreRef} className="relative py-24 lg:py-32 w-full dot-pattern">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="explore-header mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-4">
              Explore Skills
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              From creative tools to languages to career coaching—pick a path and start swapping.
            </p>
          </div>

          <div className="explore-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Design & Creative */}
            <div className="explore-card bg-surface-mint rounded-[32px] p-8 min-h-[38vh] flex flex-col relative group hover:shadow-card transition-shadow">
              <h3 className="font-display text-2xl font-bold mb-2">Design & Creative</h3>
              <p className="text-muted-foreground mb-6">UI, branding, illustration, motion.</p>
              <div className="flex -space-x-3 mb-auto">
                <img src="/images/avatar_design1.jpg" alt="" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                <img src="/images/mentor_noah.jpg" alt="" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                <img src="/images/avatar_maya.jpg" alt="" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
              </div>
              <button className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-soft group-hover:shadow-pill group-hover:scale-110 transition-all">
                <ChevronRight className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Tech & Data */}
            <div className="explore-card bg-surface-lavender rounded-[32px] p-8 min-h-[38vh] flex flex-col relative group hover:shadow-card transition-shadow">
              <h3 className="font-display text-2xl font-bold mb-2">Tech & Data</h3>
              <p className="text-muted-foreground mb-6">Code, analytics, automation, AI prompts.</p>
              <div className="flex -space-x-3 mb-auto">
                <img src="/images/avatar_tech1.jpg" alt="" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                <img src="/images/mentor_sofia.jpg" alt="" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                <img src="/images/avatar_rina.jpg" alt="" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
              </div>
              <button className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-soft group-hover:shadow-pill group-hover:scale-110 transition-all">
                <ChevronRight className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Language & Communication */}
            <div className="explore-card bg-surface-cream rounded-[32px] p-8 min-h-[38vh] flex flex-col relative group hover:shadow-card transition-shadow">
              <h3 className="font-display text-2xl font-bold mb-2">Language & Communication</h3>
              <p className="text-muted-foreground mb-6">Conversation, writing, presentations.</p>
              <div className="flex -space-x-3 mb-auto">
                <img src="/images/avatar_lang1.jpg" alt="" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                <img src="/images/avatar_ava.jpg" alt="" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                <img src="/images/avatar_leo.jpg" alt="" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
              </div>
              <button className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-soft group-hover:shadow-pill group-hover:scale-110 transition-all">
                <ChevronRight className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Career & Wellness */}
            <div className="explore-card bg-surface-peach rounded-[32px] p-8 min-h-[38vh] flex flex-col relative group hover:shadow-card transition-shadow">
              <h3 className="font-display text-2xl font-bold mb-2">Career & Wellness</h3>
              <p className="text-muted-foreground mb-6">Resumes, interviews, fitness, habits.</p>
              <div className="flex -space-x-3 mb-auto">
                <img src="/images/mentor_james.jpg" alt="" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                <img src="/images/avatar_fitness1.jpg" alt="" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                <img src="/images/avatar_jon.jpg" alt="" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
              </div>
              <button className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-soft group-hover:shadow-pill group-hover:scale-110 transition-all">
                <ChevronRight className="w-6 h-6 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Mentors */}
      <section ref={mentorsRef} className="relative py-24 lg:py-32 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mentors-header text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-4">
              Learn From Real People
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mentors are rated by the community—swap with confidence.
            </p>
          </div>

          <div className="mentors-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Mentor 1 - Noah */}
            <div className="mentor-card bg-surface-mint rounded-[34px] p-8 h-[56vh] flex flex-col items-center text-center">
              <img src="/images/mentor_noah.jpg" alt="Noah Kim" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-soft mb-4" />
              <h4 className="font-display font-bold text-xl">Noah Kim</h4>
              <p className="text-muted-foreground text-sm mb-4">Product Designer</p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="bg-white/70 rounded-full px-3 py-1 text-xs font-medium">UI critique</span>
                <span className="bg-white/70 rounded-full px-3 py-1 text-xs font-medium">Figma</span>
                <span className="bg-white/70 rounded-full px-3 py-1 text-xs font-medium">Portfolio</span>
              </div>
              <p className="text-sm text-muted-foreground italic flex-grow">"I'll help you tighten your layout in 30 minutes."</p>
              <div className="flex items-center gap-1 mt-4">
                <Star className="w-4 h-4 fill-coral text-coral" />
                <Star className="w-4 h-4 fill-coral text-coral" />
                <Star className="w-4 h-4 fill-coral text-coral" />
                <Star className="w-4 h-4 fill-coral text-coral" />
                <Star className="w-4 h-4 fill-coral text-coral" />
                <span className="text-sm font-medium ml-2">4.9</span>
              </div>
            </div>

            {/* Mentor 2 - Sofia */}
            <div className="mentor-card bg-surface-lavender rounded-[34px] p-8 h-[56vh] flex flex-col items-center text-center">
              <img src="/images/mentor_sofia.jpg" alt="Sofia Reyes" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-soft mb-4" />
              <h4 className="font-display font-bold text-xl">Sofia Reyes</h4>
              <p className="text-muted-foreground text-sm mb-4">Data Analyst</p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="bg-white/70 rounded-full px-3 py-1 text-xs font-medium">SQL</span>
                <span className="bg-white/70 rounded-full px-3 py-1 text-xs font-medium">Excel</span>
                <span className="bg-white/70 rounded-full px-3 py-1 text-xs font-medium">Visualization</span>
              </div>
              <p className="text-sm text-muted-foreground italic flex-grow">"Let's turn your data into a clear story."</p>
              <div className="flex items-center gap-1 mt-4">
                <Star className="w-4 h-4 fill-coral text-coral" />
                <Star className="w-4 h-4 fill-coral text-coral" />
                <Star className="w-4 h-4 fill-coral text-coral" />
                <Star className="w-4 h-4 fill-coral text-coral" />
                <Star className="w-4 h-4 fill-coral text-coral" />
                <span className="text-sm font-medium ml-2">5.0</span>
              </div>
            </div>

            {/* Mentor 3 - James */}
            <div className="mentor-card bg-surface-cream rounded-[34px] p-8 h-[56vh] flex flex-col items-center text-center">
              <img src="/images/mentor_james.jpg" alt="James O." className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-soft mb-4" />
              <h4 className="font-display font-bold text-xl">James O.</h4>
              <p className="text-muted-foreground text-sm mb-4">Career Coach</p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="bg-white/70 rounded-full px-3 py-1 text-xs font-medium">Resumes</span>
                <span className="bg-white/70 rounded-full px-3 py-1 text-xs font-medium">Interviews</span>
                <span className="bg-white/70 rounded-full px-3 py-1 text-xs font-medium">LinkedIn</span>
              </div>
              <p className="text-sm text-muted-foreground italic flex-grow">"Small changes that open doors."</p>
              <div className="flex items-center gap-1 mt-4">
                <Star className="w-4 h-4 fill-coral text-coral" />
                <Star className="w-4 h-4 fill-coral text-coral" />
                <Star className="w-4 h-4 fill-coral text-coral" />
                <Star className="w-4 h-4 fill-coral text-coral" />
                <Star className="w-4 h-4 fill-coral text-coral" />
                <span className="text-sm font-medium ml-2">4.8</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: CTA + Footer */}
      <section ref={ctaRef} className="relative py-24 lg:py-32 w-full bg-espresso grain-overlay">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* CTA Card */}
          <div className="cta-card bg-surface-mint rounded-[36px] p-10 lg:p-16 text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-4">
              Ready To Swap?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Join 10,000+ members trading skills—no fees, no ads, just people helping people.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-coral hover:bg-coral-dark text-white rounded-full px-8 py-6 text-base font-semibold shadow-pill hover:shadow-card transition-all hover:scale-105">
                Create your profile <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="rounded-full px-8 py-6 text-base font-semibold border-2 border-foreground/20 hover:bg-white/50 transition-all">
                See how matching works
              </Button>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-white/80">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
              <div>
                <h5 className="font-display font-bold text-white mb-4">Platform</h5>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-display font-bold text-white mb-4">Community</h5>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-display font-bold text-white mb-4">Legal</h5>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="font-display font-bold text-xl text-white">
                SkillSwap
              </div>
              <p className="text-sm text-white/60">
                © 2026 SkillSwap MicroMentor. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}

export default App;
