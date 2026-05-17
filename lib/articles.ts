/**
 * Blog article loader.
 *
 * Reads every Markdown file under content/blog/, parses its frontmatter
 * (tiny custom parser — no gray-matter dependency), and exposes a typed
 * `articles` array. Used by both the Blog index and per-article pages.
 *
 * Articles are sorted newest-first by `date`.
 */

export interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  keywords: string;
  readTime: string;
  image: string;
  imageAlt: string;
  author: string;
  authorBio: string;
  related: string[];
  cta: 'dakiraty' | 'quran' | 'kids-memory' | 'none';
}

export interface Article extends ArticleMeta {
  body: string;
}

const rawArticles = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const [, fmBlock, content] = match;
  const data: Record<string, unknown> = {};

  for (const rawLine of fmBlock.split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    if (!line || line.startsWith('#')) continue;

    const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (!m) continue;

    const [, key, rawValue] = m;
    const value = rawValue.trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      data[key] = value.replace(/^["']|["']$/g, '');
    }
  }

  return { data, content: content.replace(/^\r?\n/, '') };
}

function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace(/\.md$/, '');
}

export const articles: Article[] = Object.entries(rawArticles)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const slug = (data.slug as string) || slugFromPath(path);
    return {
      slug,
      title: (data.title as string) || slug,
      excerpt: (data.excerpt as string) || '',
      date: (data.date as string) || '1970-01-01',
      updated: data.updated as string | undefined,
      category: (data.category as string) || 'عام',
      tags: (data.tags as string[]) || [],
      keywords: (data.keywords as string) || '',
      readTime: (data.readTime as string) || '5 دقائق',
      image: (data.image as string) || '',
      imageAlt: (data.imageAlt as string) || (data.title as string) || slug,
      author: (data.author as string) || 'كوتش أحمد',
      authorBio: (data.authorBio as string) || 'مدرب الذاكرة وحفظ القرآن، بطل وطني سابق.',
      related: (data.related as string[]) || [],
      cta: ((data.cta as Article['cta']) || 'none'),
      body: content,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const articlesBySlug = new Map(articles.map((a) => [a.slug, a]));

export const articleSlugs = articles.map((a) => a.slug);

export function getRelatedArticles(slugs: string[]): Article[] {
  return slugs.map((s) => articlesBySlug.get(s)).filter((a): a is Article => Boolean(a));
}

export const categories = Array.from(
  articles.reduce((acc, a) => {
    acc.set(a.category, (acc.get(a.category) || 0) + 1);
    return acc;
  }, new Map<string, number>())
).map(([name, count]) => ({ name, count }));
