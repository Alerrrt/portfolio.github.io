"use client";

import {
  useRef,
  useState,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import TerminalIcon from "@/components/ui/icons/terminal";
import CodeIcon from "@/components/ui/icons/code";
import BookIcon from "@/components/ui/icons/book";
import CpuIcon from "@/components/ui/icons/cpu";
import SendIcon from "@/components/ui/icons/send";
import GithubIcon from "@/components/ui/icons/github";
import type { AnimatedIconHandle } from "@/components/ui/icons/types";
import { usePlaySound } from "@/components/ui/sensory-ui/config/use-play-sound";
import {
  profile,
  experience,
  previousExperience,
  projects,
  education,
  certifications,
  skillsDescription,
  hosted,
} from "@/data/resume-data";

const linkBtn =
  "group/btn inline-flex items-center gap-1.5 self-start rounded-md border border-border px-3 py-1.5 font-mono text-xs text-accent transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground";

const arrow =
  "h-3.5 w-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5";

type IconComponent = React.ForwardRefExoticComponent<
  { size?: number | string; className?: string } & React.RefAttributes<AnimatedIconHandle>
>;

// Section hover state — sections collapse to their titles and reveal detail on hover.
const RevealCtx = createContext(false);

function Reveal({ children }: { children: ReactNode }) {
  const open = useContext(RevealCtx);
  return (
    <div
      className="reveal grid transition-all duration-500 ease-out motion-reduce:transition-none"
      style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

function SourceButton({ url }: { url: string }) {
  const isGithub = url.includes("github.com");
  const isMedium = url.includes("medium.com");
  const label = isGithub ? "GitHub" : isMedium ? "Medium" : "Open";
  return (
    <a href={url} target="_blank" rel="noreferrer" className={linkBtn}>
      {isGithub && <GithubIcon size={14} />}
      {label}
      <ArrowUpRight className={arrow} />
    </a>
  );
}

function Section({
  icon: Icon,
  kicker,
  heading,
  children,
}: {
  icon: IconComponent;
  kicker: string;
  heading: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const iconRef = useRef<AnimatedIconHandle>(null);
  const { play } = usePlaySound({ sound: "interaction.subtle" });

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onViewportEnter={() => iconRef.current?.startAnimation()}
      onMouseEnter={() => {
        setOpen(true);
        play();
        iconRef.current?.startAnimation();
      }}
      onMouseLeave={() => {
        setOpen(false);
        iconRef.current?.stopAnimation();
      }}
      className="group/sec grid gap-8 border-b border-border px-8 py-16 transition-colors duration-500 hover:bg-card/30 sm:px-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] md:gap-16 md:py-20"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <Icon ref={iconRef} size={16} className="text-accent" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {kicker}
          </span>
        </div>
        <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
          {heading}
        </h2>
        <span className="hover-hint mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 transition-opacity duration-300 group-hover/sec:opacity-0">
          hover to expand →
        </span>
      </div>
      <div className="min-w-0">
        <RevealCtx.Provider value={open}>{children}</RevealCtx.Provider>
      </div>
    </motion.section>
  );
}

function PreviousExperience() {
  const [open, setOpen] = useState(false);
  const { play: playExpand } = usePlaySound({ sound: "overlay.expand" });
  const { play: playCollapse } = usePlaySound({ sound: "overlay.collapse" });

  return (
    <div className="mt-6 border-t border-border pt-5">
      <button
        onClick={() => {
          (open ? playCollapse : playExpand)();
          setOpen((o) => !o);
        }}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="inline-flex text-base leading-none"
        >
          +
        </motion.span>
        Previous experience
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-5 flex flex-col gap-6">
              {previousExperience.map((job) => (
                <div key={job.company} className="min-w-0">
                  <p className="font-mono text-sm font-semibold">{job.company}</p>
                  <p className="text-xs text-accent">{job.role}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {job.points[0]}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CertificationsList() {
  const [open, setOpen] = useState(false);
  const { play: playExpand } = usePlaySound({ sound: "overlay.expand" });
  const { play: playCollapse } = usePlaySound({ sound: "overlay.collapse" });

  return (
    <div className="mt-6 border-t border-border pt-5">
      <button
        onClick={() => {
          (open ? playCollapse : playExpand)();
          setOpen((o) => !o);
        }}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="inline-flex text-base leading-none"
        >
          +
        </motion.span>
        Certifications ({certifications.length})
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ul className="mt-5 flex flex-col divide-y divide-border">
              {certifications.map((c) => {
                const inner = (
                  <>
                    <span className="min-w-0">
                      <span className="font-mono text-sm font-semibold transition-colors group-hover/cert:text-accent">
                        {c.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {c.issuer} · {c.date}
                      </span>
                    </span>
                    {c.url && (
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-accent transition-transform group-hover/cert:-translate-y-0.5 group-hover/cert:translate-x-0.5" />
                    )}
                  </>
                );
                return (
                  <li key={c.name} className="py-3 first:pt-0 last:pb-0">
                    {c.url ? (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group/cert flex items-start justify-between gap-3"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="group/cert flex items-start justify-between gap-3">
                        {inner}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const { play: playTap } = usePlaySound({ sound: "interaction.tap" });

  return (
    <div className="mx-auto w-full max-w-7xl border-x border-border">
      {/* Hero */}
      <section className="flex min-h-[calc(100vh-var(--nav-height))] flex-col justify-center gap-6 border-b border-border px-8 py-20 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start gap-6"
        >
          <div
            className="matrix-btn overflow-hidden rounded-[0.5rem]"
            style={{ width: "5.5rem", height: "5.5rem" }}
          >
            <div className="matrix-btn-border" />
            <img
              src="/luffy-avatar.jpg"
              alt="A71n"
              className="relative z-10 h-full w-full rounded-[0.375rem] object-cover opacity-80 transition-all duration-500 hover:opacity-100"
            />
          </div>
          <h1 className="text-shine text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
            {profile.name}
          </h1>
          <p className="font-mono text-lg text-accent sm:text-xl">{profile.title}</p>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            {profile.tagline}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <motion.a
              whileTap={{ scale: 0.97 }}
              href={`mailto:${profile.email}`}
              onClick={playTap}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_24px_hsl(var(--accent)/0.35)]"
            >
              <SendIcon size={16} /> Get in touch
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ChevronDown className="h-4 w-4 text-accent" />
          </motion.span>
          Scroll
        </motion.div>
      </section>

      {/* What I've done */}
      <Section
        icon={TerminalIcon}
        kicker="What I've done"
        heading="Breaking things, on invitation."
      >
        {experience.map((job) => (
          <div key={job.company} className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              {job.url ? (
                <a
                  href={job.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-base font-semibold hover:text-accent"
                >
                  {job.company}
                </a>
              ) : (
                <span className="font-mono text-base font-semibold">{job.company}</span>
              )}
              {job.period && (
                <span className="font-mono text-xs text-muted-foreground">
                  {job.period}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm text-accent">{job.role}</p>
            <Reveal>
              <ul className="mt-3 space-y-2">
                {job.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
              {job.url && (
                <a href={job.url} target="_blank" rel="noreferrer" className={`${linkBtn} mt-4`}>
                  Visit {job.company}
                  <ArrowUpRight className={arrow} />
                </a>
              )}
              <PreviousExperience />
            </Reveal>
          </div>
        ))}
      </Section>

      {/* What I've written */}
      <Section
        icon={CodeIcon}
        kicker="What I've written"
        heading="Notes from the field."
      >
        <ul className="flex flex-col divide-y divide-border">
          {projects.map((proj) => (
            <li key={proj.name} className="min-w-0 py-4 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-base font-semibold hover:text-accent"
                >
                  {proj.name}
                </a>
                <SourceButton url={proj.url} />
              </div>
              <Reveal>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {proj.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* What I've learned */}
      <Section
        icon={BookIcon}
        kicker="What I've learned"
        heading="Self-taught, mostly."
      >
        <p className="font-mono text-base font-semibold">{education.headline}</p>
        <Reveal>
          <p className="mt-1 text-sm text-accent">{education.subline}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {education.sources}
          </p>
          <CertificationsList />
        </Reveal>
      </Section>

      {/* What I can do */}
      <Section
        icon={CpuIcon}
        kicker="What I can do"
        heading="What you can hand me."
      >
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {skillsDescription}
        </p>
        <Reveal>
          <div className="mt-6 border-t border-border pt-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              I&apos;ve also hosted
            </p>
            <a
              href={hosted.url}
              target="_blank"
              rel="noreferrer"
              onClick={playTap}
              className="group/host mt-3 inline-flex flex-wrap items-baseline gap-x-2 gap-y-1"
            >
              <span className="font-mono text-base font-semibold transition-colors group-hover/host:text-accent">
                {hosted.event}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                · {hosted.org}
              </span>
              <ArrowUpRight className="h-4 w-4 self-center text-accent transition-transform group-hover/host:-translate-y-0.5 group-hover/host:translate-x-0.5" />
            </a>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {hosted.detail}
            </p>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
