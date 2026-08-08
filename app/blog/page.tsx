import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import blogPosts, { getAllTags, slugifyTag } from "@/data/blogPosts";

export const metadata: Metadata = {
  title: "Blog — SentulTrip",
  description:
    "Panduan trekking, offroad, dan destinasi Sentul Bogor berdasarkan riset lapangan tim SentulTrip: rute, harga, dan tips keselamatan.",
  alternates: {
    canonical: "https://sentultrip.id/blog",
  },
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default function BlogPage() {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const tags = getAllTags();

  return (
    <>
      <ScrollAnimations />
      <Navbar />
      <main className="blog-page">
        <div className="blog-breadcrumb-wrap">
          <div className="blog-container blog-breadcrumb">
            <Link href="/">Beranda</Link>
            <span>›</span>
            <strong>Blog</strong>
          </div>
        </div>

        <section className="blog-container blog-header">
          <p className="blog-eyebrow">Blog</p>
          <h1>Panduan &amp; Data Wisata Sentul Bogor</h1>
          <p className="blog-subtitle">
            Rute, harga, dan tips trekking, offroad, serta corporate outing di Sentul — ditulis dari pengalaman
            lapangan tim SentulTrip, bukan sekadar rangkuman ulang.
          </p>

          {tags.length > 0 && (
            <div className="blog-tag-row">
              {tags.map((t) => (
                <Link key={t.slug} href={`/blog/tag/${t.slug}`} className="blog-tag-pill">
                  {t.tag} <span>{t.count}</span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="blog-container blog-grid">
          {posts.map((post) => (
            <article key={post.slug} className="blog-card reveal">
              <Link href={`/blog/${post.slug}`} className="blog-card-link">
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
              <div className="blog-card-tags">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog/tag/${slugifyTag(tag)}`} className="blog-card-tag">
                    #{tag}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />

      <style>{`
        .blog-page { background: #fff; color: #111; min-height: 100vh; }
        .blog-container { max-width: 1140px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
        .blog-breadcrumb-wrap { background: var(--color-bg-secondary); border-bottom: 1px solid var(--color-border); }
        .blog-breadcrumb { display: flex; gap: 8px; align-items: center; padding-top: 12px; padding-bottom: 12px; font-size: 14px; color: #777; }
        .blog-breadcrumb a { color: #777; }
        .blog-breadcrumb strong { color: #222; font-weight: 600; }

        .blog-header { padding-top: 48px; padding-bottom: 32px; }
        .blog-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--color-green-primary); margin-bottom: 12px; }
        .blog-header h1 { font-size: clamp(28px, 4vw, 40px); font-weight: 700; letter-spacing: -0.5px; color: #111; margin-bottom: 10px; }
        .blog-subtitle { font-size: 15px; line-height: 1.7; color: #666; max-width: 640px; margin-bottom: 20px; }

        .blog-tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .blog-tag-pill { display: inline-flex; align-items: center; gap: 5px; background: var(--color-bg-secondary); border: 1px solid var(--color-border); color: #333; font-size: 13px; font-weight: 600; padding: 6px 12px 6px 14px; border-radius: 999px; transition: border-color 0.2s, color 0.2s; }
        .blog-tag-pill:hover { border-color: var(--color-green-primary); color: var(--color-green-primary); }
        .blog-tag-pill span { background: rgba(0,0,0,0.08); color: #666; font-size: 11px; font-weight: 700; padding: 1px 6px; border-radius: 999px; }

        .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; padding-bottom: 72px; }
        .blog-card { display: flex; flex-direction: column; background: #fff; border: 1px solid var(--color-border); border-radius: 14px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
        .blog-card:hover { transform: translateY(-2px); border-color: var(--color-green-primary); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .blog-card-link { display: flex; flex-direction: column; flex: 1; text-decoration: none; color: inherit; }
        .blog-card-image { position: relative; height: 190px; background: var(--color-bg-secondary); }
        .blog-card-category { position: absolute; top: 12px; left: 12px; background: var(--color-green-primary); color: #fff; font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.02em; }
        .blog-card-body { padding: 20px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .blog-card-body h2 { font-size: 17px; font-weight: 700; line-height: 1.35; color: #111; }
        .blog-card-body p { font-size: 14px; line-height: 1.65; color: #666; flex: 1; }
        .blog-card-meta { display: flex; gap: 6px; align-items: center; font-size: 12px; color: #999; margin-top: 4px; }
        .blog-card-tags { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 20px 18px; }
        .blog-card-tag { font-size: 12px; font-weight: 600; color: #888; transition: color 0.2s; }
        .blog-card-tag:hover { color: var(--color-green-primary); }

        @media (max-width: 640px) {
          .blog-container { padding-left: 18px; padding-right: 18px; }
          .blog-header { padding-top: 32px; padding-bottom: 24px; }
          .blog-grid { grid-template-columns: 1fr; gap: 18px; padding-bottom: 56px; }
        }
      `}</style>
    </>
  );
}
