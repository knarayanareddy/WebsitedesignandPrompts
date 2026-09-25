import { useState } from 'react';
import type { MouseEvent } from 'react';
import { Reveal } from './Reveal';

interface Project {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly span: string;
}

interface MouseGlow {
  readonly x: number;
  readonly y: number;
}

const PROJECTS: readonly Project[] = [
  {
    id: 1,
    title: 'Automotive Motion',
    description: 'High-speed aerodynamics & interface design.',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop',
    span: 'md:col-span-7',
  },
  {
    id: 2,
    title: 'Urban Architecture',
    description: 'Spatial minimalism & structural forms.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    span: 'md:col-span-5',
  },
  {
    id: 3,
    title: 'Human Perspective',
    description: 'Editorial sensory portraiture.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    span: 'md:col-span-5',
  },
  {
    id: 4,
    title: 'Brand Identity',
    description: 'Physical typography & packaging systems.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    span: 'md:col-span-7',
  },
];

interface ProjectCardProps {
  readonly project: Project;
}

function ProjectCard({ project }: ProjectCardProps): JSX.Element {
  const [glow, setGlow] = useState<MouseGlow | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>): void => {
    const rect: DOMRect = event.currentTarget.getBoundingClientRect();
    setGlow({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const handleMouseLeave = (): void => {
    setGlow(null);
  };

  return (
    <article
      className={`group relative h-[380px] cursor-pointer overflow-hidden rounded-3xl border border-stroke bg-surface ${project.span}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Project image */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Halftone overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
      />

      {/* Mouse-follow ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: glow
            ? `radial-gradient(500px circle at ${glow.x}px ${glow.y}px, rgba(137,170,204,0.12), transparent 40%)`
            : 'none',
          opacity: glow ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Bottom shade for legibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

      {/* Hover dark wash */}
      <div className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100" />

      {/* Title + description */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 opacity-100 transition-all duration-500 group-hover:-translate-y-3 group-hover:opacity-0">
        <h3 className="mb-1.5 font-display text-2xl italic text-text-primary md:text-3xl">
          {project.title}
        </h3>
        <p className="max-w-sm text-sm text-muted">{project.description}</p>
      </div>

      {/* Hover pill */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 translate-y-[170%] opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <span className="gradient-ring inline-flex whitespace-nowrap rounded-full bg-bg/85 px-6 py-3 text-sm text-text-primary backdrop-blur-md">
          View — {project.title}
        </span>
      </div>
    </article>
  );
}

export default function Works(): JSX.Element {
  return (
    <section id="work" className="mx-auto max-w-[1240px] px-6 py-24 md:py-32">
      <Reveal className="mb-12 md:mb-16">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">Selected Work</p>
        <h2 className="mb-3 font-display text-4xl italic md:text-6xl">
          Featured <span className="font-sans font-normal not-italic">projects</span>
        </h2>
        <p className="max-w-xl text-sm text-muted md:text-base">
          A curated collection of case studies pairing interaction design with production
          engineering — shipped for teams who care about the details.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {PROJECTS.map((project: Project, index: number) => (
          <Reveal
            key={project.id}
            delay={index * 0.08}
            className={project.span}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
