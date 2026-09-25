import { Reveal } from './Reveal';

interface Article {
  readonly title: string;
  readonly readTime: string;
  readonly date: string;
}

const ARTICLES: readonly Article[] = [
  {
    title: 'The Philosophy of Quiet Software',
    readTime: '4 min read',
    date: 'Oct 2026',
  },
  {
    title: 'Why Great Interfaces Feel Physical',
    readTime: '6 min read',
    date: 'Sep 2026',
  },
  {
    title: 'Spatial Computing Beyond the Gimmick',
    readTime: '5 min read',
    date: 'Aug 2026',
  },
  {
    title: 'Typography as an Architectural Structure',
    readTime: '7 min read',
    date: 'Jul 2026',
  },
];

export default function Journal(): JSX.Element {
  return (
    <section id="journal" className="mx-auto max-w-[1240px] px-6 py-20">
      <Reveal className="mb-10">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">Recent Thoughts</p>
        <h2 className="font-display text-4xl italic md:text-5xl">
          Selected <span className="font-sans font-normal not-italic">writings</span>
        </h2>
      </Reveal>

      <div>
        {ARTICLES.map((article: Article, index: number) => (
          <Reveal key={article.title} delay={index * 0.06}>
            <article className="group mb-4 flex cursor-pointer flex-col justify-between rounded-2xl border border-stroke bg-surface/40 p-5 transition-all hover:border-white/20 hover:bg-surface sm:flex-row sm:items-center md:rounded-full md:p-6">
              <h3 className="text-base font-medium text-text-primary transition-transform duration-300 group-hover:translate-x-1 md:text-lg">
                {article.title}
              </h3>
              <div className="mt-3 flex shrink-0 items-center gap-4 text-sm text-muted sm:mt-0">
                <span>{article.readTime}</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-muted" />
                <span>{article.date}</span>
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 place-items-center rounded-full border border-stroke text-text-primary transition-all duration-300 group-hover:border-transparent group-hover:bg-text-primary group-hover:text-bg"
                >
                  ↗
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
