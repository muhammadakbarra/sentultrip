import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import { getAllTags, getPostsByTagSlug, getTagLabel } from "@/data/blogPosts";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export async function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const label = getTagLabel(tag);
  if (!label) return {};

  const title = `Topik: ${label} — Blog SentulTrip`;
  const url = `https://sentultrip.id/blog/tag/${tag}`;

  return {
    title,
    description: `Kumpulan artikel bertopik ${label} seputar wisata trekking, offroad, dan destinasi di Sentul, Bogor.`,
    alternates: { canonical: url },
  };
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const label = getTagLabel(tag);
  if (!label) notFound();

  const posts = getPostsByTagSlug(tag).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const allTags = getAllTags();

  return (
    <>
      <ScrollAnimations />
      <Navbar />
      <main className="blog-page">
        <div className="blog-breadcrumb-wrap">
          <div className="blog-container blog-breadcrumb">
            <Link href="/">Beranda</Link>
            <span>›</span>
            <Link href="/blog">Blog</Link>
            <span>›</span>
            <strong>#{label}</strong>
          </div>
        </div>

        <section className="blog-container blog-header">
          <p className="blog-eyebrow">Topik</p>
          <h1>#{label}</h1>
          <p className="blog-subtitle">
            {posts.length} artikel bertopik {label} dari blog SentulTrip.
          </p>

          <div className="blog-tag-row">
            {allTags.map((t) => (
              <Link
                key={t.slug}
                href={`/blog/tag/${t.slug}`}
                className={`blog-tag-pill${t.slug === tag ? " active" : ""}`}
              >
                {t.tag} <span>{t.count}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="blog-container blog-grid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-image">
                <Image
                  src={post.cover.src}
                  alt={post.cover.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                />
                <span className="blog-card-category">{post.category}</span>
              </div>
              <div className="blog-card-body">
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <div className="blog-card-meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>&middot;</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <Footer />

      <style>{`
        .blog-page { background: #fff; color: #111; min-height: 100vh; }
        .blog-container { max-width: 1140px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
        .blog-breadcrumb-wrap { background: var(--color-bg-secondary); border-bottom: 1px solid var(--color-border); }
        .blog-breadcrumb { display: flex; gap: 8px; align-items: center; padding-top: 12px; padding-bottom: 12px; font-size: 14px; color: #777; overflow-x: auto; white-space: nowrap; }
        .blog-breadcrumb a { color: #777; }
        .blog-breadcrumb strong { color: #222; font-weight: 600; }

        .blog-header { padding-top: 48px; padding-bottom: 32px; }
        .blog-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--color-green-primary); margin-bottom: 12px; }
        .blog-header h1 { font-size: clamp(28px, 4vw, 40px); font-weight: 700; letter-spacing: -0.5px; color: #111; margin-bottom: 10px; }
        .blog-subtitle { font-size: 15px; line-height: 1.7; color: #666; max-width: 640px; margin-bottom: 20px; }

        .blog-tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .blog-tag-pill { display: inline-flex; align-items: center; gap: 5px; background: var(--color-bg-secondary); border: 1px solid var(--color-border); color: #333; font-size: 13px; font-weight: 600; padding: 6px 12px 6px 14px; border-radius: 999px; transition: border-color 0.2s, color 0.2s; }
        .blog-tag-pill:hover { border-color: var(--color-green-primary); color: var(--color-green-primary); }
        .blog-tag-pill.active { background: var(--color-green-primary); border-color: var(--color-green-primary); color: #fff; }
        .blog-tag-pill.active span { background: rgba(255,255,255,0.25); color: #fff; }
        .blog-tag-pill span { background: rgba(0,0,0,0.08); color: #666; font-size: 11px; font-weight: 700; padding: 1px 6px; border-radius: 999px; }

        .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; padding-bottom: 72px; }
        .blog-card { display: flex; flex-direction: column; background: #fff; border: 1px solid var(--color-border); border-radius: 14px; overflow: hidden; text-decoration: none; color: inherit; transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
        .blog-card:hover { transform: translateY(-2px); border-color: var(--color-green-primary); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .blog-card-image { position: relative; height: 190px; background: var(--color-bg-secondary); }
        .blog-card-category { position: absolute; top: 12px; left: 12px; background: var(--color-green-primary); color: #fff; font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.02em; }
        .blog-card-body { padding: 20px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .blog-card-body h2 { font-size: 17px; font-weight: 700; line-height: 1.35; color: #111; }
        .blog-card-body p { font-size: 14px; line-height: 1.65; color: #666; flex: 1; }
        .blog-card-meta { display: flex; gap: 6px; align-items: center; font-size: 12px; color: #999; margin-top: 4px; }

        @media (max-width: 640px) {
          .blog-container { padding-left: 18px; padding-right: 18px; }
          .blog-header { padding-top: 32px; padding-bottom: 24px; }
          .blog-grid { grid-template-columns: 1fr; gap: 18px; padding-bottom: 56px; }
        }
      `}</style>
    </>
  );
}
