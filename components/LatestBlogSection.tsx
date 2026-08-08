import Link from "next/link";
import Image from "next/image";
import blogPosts from "@/data/blogPosts";

export default function LatestBlogSection() {
  const posts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section style={{ backgroundColor: "var(--color-bg-primary)", padding: "48px 0" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 24px" }}>
        <div
          className="reveal"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--color-green-primary)",
                marginBottom: "6px",
              }}
            >
              Blog
            </p>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111111" }}>
              Artikel Terbaru
            </h2>
          </div>
          <Link
            href="/blog"
            className="hover-green"
            style={{ fontSize: "13px", fontWeight: 600, color: "#888", whiteSpace: "nowrap" }}
          >
            Lihat semua artikel &rarr;
          </Link>
        </div>

        <div className="home-blog-grid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="home-blog-card reveal">
              <div className="home-blog-image">
                <Image
                  src={post.cover.src}
                  alt={post.cover.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 360px"
                />
              </div>
              <div className="home-blog-body">
                <span className="home-blog-category">{post.category}</span>
                <h3>{post.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .home-blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .home-blog-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .home-blog-card:hover {
          transform: translateY(-2px);
          border-color: var(--color-green-primary);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);
        }
        .home-blog-image {
          position: relative;
          width: 100%;
          height: 120px;
          background: var(--color-bg-secondary);
        }
        .home-blog-body {
          padding: 14px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .home-blog-category {
          font-size: 10.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--color-green-primary);
        }
        .home-blog-body h3 {
          font-size: 14px;
          font-weight: 700;
          line-height: 1.4;
          color: #111111;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .home-blog-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .home-blog-image {
            height: 150px;
          }
        }
      `}</style>
    </section>
  );
}
