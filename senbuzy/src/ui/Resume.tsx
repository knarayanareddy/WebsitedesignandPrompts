import { motion } from 'framer-motion'
import { ZooopLogo } from './ZooopLogo'
import { SOCIAL_ICONS } from './SocialIcons'
import { FOCUS_POINTS } from '../data/focusPoints'

const SOCIAL_LINKS = [
  {
    id: 'douyin',
    label: '抖音',
    href: 'https://www.douyin.com/user/MS4wLjABAAAAlmQDgHf0NlbsjrfWENm8LyrIikxSRRq7mzlzQSIStQJkV7Ju52B6A55zw5TUDU5d',
  },
  {
    id: 'bilibili',
    label: 'B站',
    href: 'https://space.bilibili.com/275344092?spm_id_from=333.937.0.0',
  },
  {
    id: 'xiaohongshu',
    label: '小红书',
    href: 'https://www.xiaohongshu.com/user/profile/5ceba8c8000000000502fd69',
  },
]

// 履历数据（双语）。英文为译稿，可按需润色。
interface ResumeGroup {
  heading?: string
  logo?: string
  logoImg?: string
  sub?: string
  link?: string
  items?: string[]
  links?: { id: string; label: string; href: string }[]
}
interface ResumeEntry {
  period: string
  place: string
  role?: string
  logo?: { src: string; alt: string }
  points?: string[]
  groups?: ResumeGroup[]
}
const RESUME: Record<'en' | 'zh', { title: string; entries: ResumeEntry[] }> = {
  en: {
    title: 'Résumé',
    entries: [
      {
        period: '2013 – 2017',
        place: 'Sun Yat-sen University',
        role: 'B.S. in Software Engineering',
      },
      {
        period: '2017 – 2020',
        place: 'HOTSAR Studio · Shanghai',
        role: 'Co-founder',
        logo: { src: `${import.meta.env.BASE_URL}images/hotsar.jpg`, alt: 'HOTSAR' },
        points: [
          'Co-founder · team of 20+',
          'Clients: Alibaba brands, Tencent, NetEase, DiDi, China Resources, McDonald’s…',
          'Work: development / creative direction / animation / team management',
        ],
      },
      {
        period: '2020 – 2025',
        place: 'Bad Printer Studio · Shenzhen',
        role: 'Founder',
        logo: { src: `${import.meta.env.BASE_URL}images/bp.png`, alt: 'Bad Printer Studio' },
        points: [
          'Founder · team of 14',
          'Clients: Honor of Kings / Trip.com / ByteDance / Kuaishou / VIVO / Tecno / Xiaomi / IM Motors…',
          'Work: team management / creative direction / animation / development',
        ],
      },
      {
        period: '2025 – Now',
        place: 'Content Creator',
        groups: [
          {
            heading: '小郑还挺忙',
            logoImg: `${import.meta.env.BASE_URL}images/buzyzheng.png`,
            sub: 'tech-DIY creator',
            items: ['120K on Douyin · 87K on Bilibili · 23K on Xiaohongshu'],
            links: SOCIAL_LINKS,
          },
        ],
      },
      {
        period: '2026 – Now',
        place: 'Indie Developer',
        groups: [{ logo: 'zooop', sub: 'AI creation platform', link: 'https://zooop.ai/' }],
      },
    ],
  },
  zh: {
    title: 'Résumé',
    entries: [
      {
        period: '2013 – 2017',
        place: '中山大学',
        role: '软件工程 · 本科',
      },
      {
        period: '2017 – 2020',
        place: 'HOTSAR 工作室 · 上海',
        role: '联合创始人',
        logo: { src: `${import.meta.env.BASE_URL}images/hotsar.jpg`, alt: 'HOTSAR' },
        points: [
          '联合创始人，团队人数 20+',
          '服务客户：阿里系品牌、腾讯、网易、滴滴、华润、麦当劳…',
          '负责：技术开发 / 创意策划 / 动画制作 / 团队管理',
        ],
      },
      {
        period: '2020 – 2025',
        place: '坏打印机工作室 · 深圳',
        role: '创始人',
        logo: { src: `${import.meta.env.BASE_URL}images/bp.png`, alt: '坏打印机工作室' },
        points: [
          '创始人，团队人数 14',
          '服务客户：王者荣耀 / 携程 / 字节 / 快手 / VIVO / 传音 / 小米…',
          '负责：团队管理 / 创意策划 / 动画制作 / 技术开发',
        ],
      },
      {
        period: '2025 – 至今',
        place: '自媒体博主',
        groups: [
          {
            heading: '小郑还挺忙',
            logoImg: `${import.meta.env.BASE_URL}images/buzyzheng.png`,
            sub: '科技 DIY 博主',
            items: ['抖音 12 万 · B站 8.7 万 · 小红书 2.3 万 关注'],
            links: SOCIAL_LINKS,
          },
        ],
      },
      {
        period: '2026 – 至今',
        place: '独立开发',
        groups: [{ logo: 'zooop', sub: 'AI 创作平台', link: 'https://zooop.ai/' }],
      },
    ],
  },
}

// 履历条目依次对应 glb 里的聚焦锚点（相机停靠点），顺序须与 entries 一致。
// 名单是唯一真源，见 data/focusPoints.ts（Scene.tsx 也从那里取）。
const POINT_ORDER = FOCUS_POINTS

const EASE = [0.22, 1, 0.36, 1]
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}
const itemV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

function Group({ group }: { group: ResumeGroup }) {
  const heading =
    group.logo === 'zooop' ? (
      <a
        className="zooop-logo-link"
        href={group.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ZOOOP"
      >
        <ZooopLogo className="zooop-logo" animated />
      </a>
    ) : group.link ? (
      <a className="about-link" href={group.link} target="_blank" rel="noopener noreferrer">
        {group.heading}
      </a>
    ) : (
      <span>{group.heading}</span>
    )

  return (
    <motion.div className="tl-group" variants={itemV}>
      <div className="tl-group-head">
        {group.logoImg && (
          <span className="tl-group-logo">
            <img src={group.logoImg} alt={group.heading || ''} loading="lazy" />
          </span>
        )}
        {heading}
        {group.sub && <span className="tl-group-sub">{group.sub}</span>}
      </div>
      {group.items && (
        <ul className="tl-points">
          {group.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
      {group.links && (
        <div className="tl-logos">
          {group.links.map((l) => {
            const Icon = SOCIAL_ICONS[l.id as keyof typeof SOCIAL_ICONS]
            return (
              <a
                key={l.id}
                className="tl-logo"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                title={l.label}
              >
                <Icon />
              </a>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}

function Entry({ entry, index }: { entry: ResumeEntry; index: number }) {
  return (
    <motion.div
      className="tl-entry"
      data-point={POINT_ORDER[index]}
      variants={containerV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
    >
      <motion.span className="tl-dot" variants={itemV} aria-hidden="true" />
      {/* tl-body 包住文字内容（点保持在外做时间轴标记）：移动端可给它加卡片衬底，
          且它紧贴内容高度，不含 tl-entry 用于排布的大 padding。
          用普通 div（非 motion）：framer 变体经 React context 穿透它，叶子元素仍是
          tl-entry 的直接 stagger 子级，入场动画与包裹前完全一致。 */}
      <div className="tl-body">
        <motion.div className="tl-period" variants={itemV}>
          {entry.period}
        </motion.div>
        <motion.div className="tl-head" variants={itemV}>
          {entry.logo && (
            <span className="tl-logo-chip">
              <img src={entry.logo.src} alt={entry.logo.alt} loading="lazy" />
            </span>
          )}
          <h3 className="tl-place">{entry.place}</h3>
        </motion.div>
        {entry.role && (
          <motion.div className="tl-role" variants={itemV}>
            {entry.role}
          </motion.div>
        )}
        {entry.points && (
          <motion.ul className="tl-points" variants={itemV}>
            {entry.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </motion.ul>
        )}
        {entry.groups && entry.groups.map((g, i) => <Group key={i} group={g} />)}
      </div>
    </motion.div>
  )
}

export default function Resume({ lang }: { lang: 'en' | 'zh' }) {
  const data = RESUME[lang]
  return (
    <section className="resume" lang={lang}>
      <motion.h2
        className="resume-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {data.title}
      </motion.h2>
      <div className="timeline">
        {data.entries.map((e, i) => (
          <Entry key={i} entry={e} index={i} />
        ))}
      </div>
    </section>
  )
}
