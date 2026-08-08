import { Fragment } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import blogPosts, { getBlogPost, getAllBlogSlugs, slugifyTag } from "@/data/blogPosts";
import packages, { Package } from "@/data/packages";
import { waLink } from "@/lib/whatsapp";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const title = `${post.title} — SentulTrip`;
  const url = `https://sentultrip.id/blog/${post.slug}`;

  return {
    title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.cover.src, alt: post.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: [post.cover.src],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => post.tags.includes(t)).length + (p.category === post.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.post);

  const relatedPackages = (post.relatedPackageSlugs ?? [])
    .map((s) => packages.find((p) => p.slug === s))
    .filter((p): p is Package => Boolean(p));
  const featuredPackages =
    relatedPackages.length > 0
      ? [...relatedPackages, ...packages.filter((p) => !relatedPackages.some((rp) => rp.slug === p.slug))].slice(0, 6)
      : packages.slice(0, 6);
  const spotlightPackage = relatedPackages[0];
  const midIndex = post.content.length > 2 ? Math.floor(post.content.length / 2) : -1;

  const showcaseItems = (post.packageShowcase ?? [])
    .map((item) => ({ pkg: packages.find((p) => p.slug === item.slug), note: item.note }))
    .filter((x): x is { pkg: Package; note: string } => Boolean(x.pkg));

  const url = `https://sentultrip.id/blog/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [`https://sentultrip.id${post.cover.src}`],
    author: { "@type": "Organization", name: "SentulTrip", url: "https://sentultrip.id" },
    publisher: {
      "@type": "Organization",
      name: "SentulTrip",
      logo: { "@type": "ImageObject", url: "https://sentultrip.id/logo-sentuiltrip.webp" },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: "https://sentultrip.id" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://sentultrip.id/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };
  const faqJsonLd = post.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <Navbar />
      <main className="blog-post-page">
        <div className="blog-breadcrumb-wrap">
          <div className="blog-container blog-breadcrumb">
            <Link href="/">Beranda</Link>
            <span>›</span>
            <Link href="/blog">Blog</Link>
            <span>›</span>
            <strong>{post.title}</strong>
          </div>
        </div>

        <article className="blog-container blog-article">
          <header className="blog-article-header">
            <span className="blog-post-category">{post.category}</span>
            <h1>{post.title}</h1>
            <p className="blog-article-excerpt">{post.excerpt}</p>
            <div className="blog-article-meta">
              <span>
                {post.author} &middot; <em>{post.authorRole}</em>
              </span>
              <span>&middot;</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>&middot;</span>
              <span>{post.readTime}</span>
            </div>
            <div className="blog-tag-row">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog/tag/${slugifyTag(tag)}`} className="blog-tag-pill">
                  #{tag}
                </Link>
              ))}
            </div>
          </header>

          <div className="blog-cover">
            <Image
              src={post.cover.src}
              alt={post.cover.alt}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 1140px) 100vw, 1140px"
              priority
            />
          </div>

          <div className="blog-article-body">
            {post.content.map((section, i) => (
              <Fragment key={section.heading}>
                <section>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((p, pi) => (
                    <p key={pi}>{p}</p>
                  ))}
                  {section.image && (
                    <figure className="blog-inline-figure">
                      <div className="blog-inline-image">
                        <Image
                          src={section.image.src}
                          alt={section.image.alt}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 780px) 100vw, 732px"
                        />
                      </div>
                    </figure>
                  )}
                </section>

                {i === midIndex && spotlightPackage && (
                  <Link href={`/paket/${spotlightPackage.slug}`} className="blog-spotlight-cta">
                    <div className="blog-spotlight-image">
                      {spotlightPackage.images?.[0] && (
                        <Image
                          src={spotlightPackage.images[0]}
                          alt={spotlightPackage.name}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 640px) 100vw, 160px"
                        />
                      )}
                    </div>
                    <div className="blog-spotlight-body">
                      <span className="blog-spotlight-label">Rekomendasi Paket</span>
                      <strong>{spotlightPackage.name}</strong>
                      <span className="blog-spotlight-price">
                        Mulai dari {formatRupiah(spotlightPackage.price)} / {spotlightPackage.priceUnit}
                      </span>
                    </div>
                    <span className="blog-spotlight-arrow">&rarr;</span>
                  </Link>
                )}
              </Fragment>
            ))}
          </div>

          {showcaseItems.length > 0 && (
            <section className="blog-showcase">
              <div className="blog-showcase-list">
                {showcaseItems.map(({ pkg, note }, i) => (
                  <Link key={pkg.slug} href={`/paket/${pkg.slug}`} className="blog-showcase-item">
                    <span className="blog-showcase-rank">{i + 1}</span>
                    <div className="blog-showcase-image">
                      {pkg.images?.[0] && (
                        <Image
                          src={pkg.images[0]}
                          alt={pkg.name}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 640px) 96px, 140px"
                        />
                      )}
                    </div>
                    <div className="blog-showcase-body">
                      <strong>{pkg.name}</strong>
                      <p>{note}</p>
                      <span className="blog-showcase-meta">
                        {pkg.duration} &middot; Mulai dari {formatRupiah(pkg.price)} / {pkg.priceUnit}
                      </span>
                    </div>
                    <span className="blog-showcase-arrow">&rarr;</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {post.faq && post.faq.length > 0 && (
            <section className="blog-faq">
              <h2>Pertanyaan Umum</h2>
              <div className="blog-faq-list">
                {post.faq.map((item) => (
                  <div key={item.question} className="blog-faq-item">
                    <strong>{item.question}</strong>
                    <p>{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="blog-closing-cta">
            <h2>Tertarik trekking langsung ke Sentul?</h2>
            <p>Tanya jadwal dan rekomendasi rute lewat WhatsApp, tim kami bantu pilihkan paket yang cocok.</p>
            <a
              href={waLink(`Halo SentulTrip, saya baru baca artikel "${post.title}" dan ingin tanya-tanya soal paket wisata.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-cta-btn"
            >
              Chat WhatsApp
            </a>
          </section>

          {post.sources && post.sources.length > 0 && (
            <div className="blog-sources">
              <span>Sumber:</span>
              <ul>
                {post.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer nofollow">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        {relatedPosts.length > 0 && (
          <section className="blog-container blog-related">
            <h2 className="blog-related-title">Baca Juga</h2>
            <div className="blog-related-grid">
              {relatedPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
                  <div className="blog-card-image">
                    <Image
                      src={p.cover.src}
                      alt={p.cover.alt}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                    />
                    <span className="blog-card-category">{p.category}</span>
                  </div>
                  <div className="blog-card-body">
                    <h2>{p.title}</h2>
                    <p>{p.excerpt}</p>
                    <div className="blog-card-meta">
                      <span>{formatDate(p.date)}</span>
                      <span>&middot;</span>
                      <span>{p.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="blog-container blog-packages">
          <div className="blog-packages-head">
            <h2 className="blog-related-title">Lihat Paket Kami</h2>
            <Link href="/#paket" className="blog-packages-link">Lihat semua paket &rarr;</Link>
          </div>
          <div className="blog-packages-grid">
            {featuredPackages.map((pkg) => (
              <Link key={pkg.id} href={`/paket/${pkg.slug}`} className="mini-package-card">
                <div className="mini-package-image">
                  {pkg.images?.[0] && (
                    <Image
                      src={pkg.images[0]}
                      alt={pkg.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 33vw, 180px"
                    />
                  )}
                </div>
                <div className="mini-package-body">
                  <span className="mini-package-name">{pkg.name}</span>
                  <span className="mini-package-price">
                    Mulai dari {formatRupiah(pkg.price)} / {pkg.priceUnit}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .blog-post-page { background: #fff; color: #111; min-height: 100vh; }
        .blog-container { max-width: 1140px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
        .blog-breadcrumb-wrap { background: var(--color-bg-secondary); border-bottom: 1px solid var(--color-border); }
        .blog-breadcrumb { display: flex; gap: 8px; align-items: center; padding-top: 12px; padding-bottom: 12px; font-size: 14px; color: #777; overflow-x: auto; white-space: nowrap; }
        .blog-breadcrumb a { color: #777; }
        .blog-breadcrumb strong { color: #222; font-weight: 600; }

        .blog-article { max-width: 780px; padding-top: 42px; padding-bottom: 62px; }
        .blog-post-category { display: inline-flex; background: #eaf5e8; color: #1e5c1e; border: 1px solid #c8e0c5; border-radius: 999px; padding: 6px 13px; font-size: 12px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; margin-bottom: 16px; }
        .blog-article-header h1 { font-size: clamp(28px, 4.5vw, 42px); line-height: 1.12; letter-spacing: -0.8px; margin-bottom: 14px; color: #111; font-weight: 750; }
        .blog-article-excerpt { font-size: 17px; line-height: 1.7; color: #444; margin-bottom: 16px; }
        .blog-article-meta { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; font-size: 13px; color: #888; margin-bottom: 16px; }
        .blog-article-meta em { font-style: normal; color: #666; }
        .blog-tag-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
        .blog-tag-pill { font-size: 12.5px; font-weight: 600; color: #1e5c1e; background: #eaf5e8; border: 1px solid #c8e0c5; padding: 4px 12px; border-radius: 999px; transition: background 0.2s; }
        .blog-tag-pill:hover { background: #dcefda; }

        .blog-cover { position: relative; width: 100%; aspect-ratio: 16 / 9; border-radius: 16px; overflow: hidden; margin-bottom: 36px; }

        .blog-article-body section { margin-bottom: 30px; }
        .blog-article-body h2 { font-size: 22px; line-height: 1.3; letter-spacing: -0.3px; color: #111; margin-bottom: 12px; }
        .blog-article-body p { font-size: 16px; line-height: 1.85; color: #444; margin-bottom: 14px; }
        .blog-inline-figure { margin: 22px 0 6px; }
        .blog-inline-image { position: relative; width: 100%; aspect-ratio: 16 / 10; border-radius: 14px; overflow: hidden; }

        .blog-spotlight-cta { display: flex; align-items: center; gap: 16px; background: #f0f7ee; border: 1.5px solid #c8e0c5; border-radius: 16px; padding: 14px; text-decoration: none; color: inherit; margin: 8px 0 34px; transition: border-color 0.2s, transform 0.2s; }
        .blog-spotlight-cta:hover { border-color: var(--color-green-primary); transform: translateY(-1px); }
        .blog-spotlight-image { position: relative; width: 84px; height: 84px; flex-shrink: 0; border-radius: 12px; overflow: hidden; background: #fff; }
        .blog-spotlight-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
        .blog-spotlight-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #2a7a2a; }
        .blog-spotlight-body strong { font-size: 15.5px; color: #111; line-height: 1.35; }
        .blog-spotlight-price { font-size: 13px; font-weight: 600; color: #1e5c1e; }
        .blog-spotlight-arrow { font-size: 22px; color: #2a7a2a; flex-shrink: 0; }

        .blog-showcase { margin: 8px 0 34px; }
        .blog-showcase-list { display: flex; flex-direction: column; gap: 12px; }
        .blog-showcase-item { position: relative; display: flex; align-items: center; gap: 16px; background: #fff; border: 1px solid var(--color-border); border-radius: 14px; padding: 14px; padding-left: 44px; text-decoration: none; color: inherit; transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s; }
        .blog-showcase-item:hover { border-color: var(--color-green-primary); box-shadow: 0 6px 18px rgba(0,0,0,0.06); transform: translateY(-1px); }
        .blog-showcase-rank { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 13px; font-weight: 800; color: #b0b0b0; }
        .blog-showcase-image { position: relative; width: 96px; height: 96px; flex-shrink: 0; border-radius: 10px; overflow: hidden; background: var(--color-bg-secondary); }
        .blog-showcase-body { display: flex; flex-direction: column; gap: 4px; min-width: 0; flex: 1; }
        .blog-showcase-body strong { font-size: 15.5px; color: #111; line-height: 1.35; }
        .blog-showcase-body p { font-size: 13.5px; line-height: 1.6; color: #555; margin: 0; }
        .blog-showcase-meta { font-size: 12px; font-weight: 600; color: #1e5c1e; }
        .blog-showcase-arrow { font-size: 20px; color: #2a7a2a; flex-shrink: 0; }

        .blog-faq { margin: 8px 0 34px; }
        .blog-faq h2 { font-size: 22px; letter-spacing: -0.3px; color: #111; margin-bottom: 16px; }
        .blog-faq-list { display: flex; flex-direction: column; gap: 14px; }
        .blog-faq-item { border: 1px solid var(--color-border); border-radius: 12px; padding: 16px 18px; background: #fafaf8; }
        .blog-faq-item strong { display: block; font-size: 15px; color: #111; margin-bottom: 6px; }
        .blog-faq-item p { font-size: 14.5px; line-height: 1.7; color: #555; }

        .blog-closing-cta { background: #102b15; color: #fff; border-radius: 18px; padding: 30px; margin-top: 42px; }
        .blog-closing-cta h2 { font-size: 24px; line-height: 1.25; margin-bottom: 8px; }
        .blog-closing-cta p { color: rgba(255,255,255,.78); font-size: 15px; line-height: 1.7; margin-bottom: 18px; }
        .blog-cta-btn { display: inline-flex; align-items: center; justify-content: center; background: #fff; color: #1e5c1e; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 8px; text-decoration: none; }

        .blog-sources { margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--color-border); display: flex; flex-wrap: wrap; gap: 6px 10px; font-size: 12.5px; color: #999; }
        .blog-sources ul { display: flex; flex-wrap: wrap; gap: 6px 12px; list-style: none; }
        .blog-sources a { color: #888; text-decoration: underline; text-underline-offset: 2px; }
        .blog-sources a:hover { color: var(--color-green-primary); }

        .blog-related { padding-bottom: 72px; }
        .blog-related-title { font-size: 22px; font-weight: 700; color: #111; margin-bottom: 20px; }
        .blog-related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
        .blog-card { display: flex; flex-direction: column; background: #fff; border: 1px solid var(--color-border); border-radius: 14px; overflow: hidden; text-decoration: none; color: inherit; transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
        .blog-card:hover { transform: translateY(-2px); border-color: var(--color-green-primary); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .blog-card-image { position: relative; height: 170px; background: var(--color-bg-secondary); }
        .blog-card-category { position: absolute; top: 12px; left: 12px; background: var(--color-green-primary); color: #fff; font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.02em; }
        .blog-card-body { padding: 18px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .blog-card-body h2 { font-size: 16px; font-weight: 700; line-height: 1.35; color: #111; }
        .blog-card-body p { font-size: 13.5px; line-height: 1.6; color: #666; flex: 1; }
        .blog-card-meta { display: flex; gap: 6px; align-items: center; font-size: 12px; color: #999; margin-top: 4px; }

        .blog-packages { padding-bottom: 72px; }
        .blog-packages-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
        .blog-packages-link { font-size: 13px; font-weight: 600; color: #888; white-space: nowrap; transition: color 0.2s; }
        .blog-packages-link:hover { color: var(--color-green-primary); }
        .blog-packages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
        .mini-package-card { display: flex; flex-direction: column; text-decoration: none; color: inherit; background: #fff; border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
        .mini-package-card:hover { transform: translateY(-2px); border-color: var(--color-green-primary); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
        .mini-package-image { position: relative; width: 100%; aspect-ratio: 1 / 1; background: var(--color-bg-secondary); }
        .mini-package-body { padding: 10px 12px 12px; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .mini-package-name { font-size: 13px; font-weight: 700; color: #222; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; overflow-wrap: break-word; }
        .mini-package-price { font-size: 12px; font-weight: 600; color: var(--color-green-primary); overflow-wrap: break-word; }

        @media (max-width: 640px) {
          .blog-container { padding-left: 18px; padding-right: 18px; }
          .blog-article { padding-top: 28px; padding-bottom: 44px; }
          .blog-article-excerpt { font-size: 16px; }
          .blog-cover { margin-bottom: 26px; }
          .blog-article-body h2 { font-size: 20px; }
          .blog-article-body p { font-size: 15.5px; }
          .blog-spotlight-cta { flex-wrap: wrap; }
          .blog-showcase-item { padding-left: 40px; gap: 12px; }
          .blog-showcase-image { width: 72px; height: 72px; }
          .blog-showcase-arrow { display: none; }
          .blog-closing-cta { padding: 24px; }
          .blog-related-grid { grid-template-columns: 1fr; }
          .blog-packages-grid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
        }
      `}</style>
    </>
  );
}
