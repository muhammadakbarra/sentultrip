import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageGallery from "@/components/PackageGallery";
import { getPackageDetail, getAllSlugs } from "@/data/packageDetails";
import BookingFlow from "@/components/BookingFlow";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = getPackageDetail(slug);
  if (!detail) return {};
  return {
    title: `${detail.name} — SentulTrip`,
    description: detail.shortDescription,
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = getPackageDetail(slug);
  if (!detail) notFound();

  const price = formatPrice(detail.price);
  const marketPrice = detail.marketPrice ? formatPrice(detail.marketPrice) : null;

  const quickInfo = [
    { label: "Durasi", value: detail.duration },
    { label: "Harga", value: `${price}/orang` },
    { label: "Level", value: detail.difficulty },
    { label: "Min. Usia", value: detail.minAge },
    { label: "Area", value: detail.locationArea },
    { label: "Rute", value: detail.routeType },
  ];

  return (
    <>
      <Navbar />
      <main className="package-page">
        <div className="package-breadcrumb-wrap">
          <div className="package-container package-breadcrumb">
            <Link href="/">Beranda</Link>
            <span>›</span>
            <Link href="/#paket">Paket</Link>
            <span>›</span>
            <strong>{detail.name}</strong>
          </div>
        </div>

        <section className="package-container package-hero">
          <div className="package-hero-copy">
            <span className="package-label">Trekking Sentul</span>
            <h1>{detail.name}</h1>
            <p className="package-tagline">{detail.tagline}</p>
            <p className="package-short">{detail.shortDescription}</p>

            <div className="hero-actions">
              <BookingFlow packageSlug={detail.slug} packageName={detail.name} price={detail.price} marketPrice={detail.marketPrice} />
              <a href="#detail-paket" className="secondary-cta">Lihat Detail</a>
            </div>
          </div>

          <aside className="hero-price-card">
            <span>Mulai dari</span>
            {marketPrice && <s className="hero-market-price">{marketPrice}</s>}
            <strong>{price}</strong>
            <small>per orang</small>
            <div className="hero-mini-grid">
              <div><b>{detail.duration}</b><small>Durasi</small></div>
              <div><b>{detail.difficulty}</b><small>Level</small></div>
            </div>
          </aside>
        </section>

        <section className="package-container gallery-section">
          <PackageGallery photos={detail.photos} orientations={detail.photoOrientations} name={detail.name} />
        </section>

        <section id="detail-paket" className="package-container package-content-grid">
          <div className="package-main">
            <section className="quick-card-grid">
              {quickInfo.map((item) => (
                <div className="quick-card" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </section>

            <Section title="Tentang Paket Ini">
              {detail.description.map((p, i) => (
                <p key={i} className="body-copy">{p}</p>
              ))}
            </Section>

            <Section title="Kenapa Pilih Paket Ini">
              <div className="highlight-grid">
                {detail.highlights.map((h) => (
                  <article className="highlight-card" key={h.title}>
                    <div className="accent-line" />
                    <h3>{h.title}</h3>
                    <p>{h.desc}</p>
                  </article>
                ))}
              </div>
            </Section>

            <Section title="Cocok Untuk">
              <div className="pill-list">
                {detail.suitableFor.map((item) => <span key={item}>{item}</span>)}
              </div>
            </Section>

            <Section title="Jadwal Perjalanan">
              <div className="timeline">
                {detail.schedule.map((s) => (
                  <div className="timeline-item" key={`${s.time}-${s.activity}`}>
                    <time>{s.time}</time>
                    <p>{s.activity}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Fasilitas & Ketentuan">
              <div className="included-grid">
                <InfoList title="Sudah Termasuk" type="yes" items={detail.includes} />
                <InfoList title="Tidak Termasuk" type="no" items={detail.excludes} />
              </div>
            </Section>

            <Section title="Yang Perlu Dibawa">
              <div className="simple-list">
                {detail.whatToBring.map((item) => <div key={item}>→ {item}</div>)}
              </div>
            </Section>

            <Section title="Catatan Keamanan">
              <div className="simple-list warning-list">
                {detail.safetyNotes.map((item) => <div key={item}>! {item}</div>)}
              </div>
            </Section>

            <Section title="Pertanyaan Umum">
              <div className="faq-list">
                {detail.faq.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </Section>

            <section className="closing-cta">
              <h2>Siap trekking ke {detail.name.replace("Trekking ", "")}?</h2>
              <p>Tanya jadwal dulu juga boleh. Tim SentulTrip akan bantu pilih waktu dan rute yang paling pas.</p>
              <BookingFlow packageSlug={detail.slug} packageName={detail.name} price={detail.price} marketPrice={detail.marketPrice} />
            </section>
          </div>

          <aside className="booking-card-wrap">
            <div className="booking-card">
              <div className="booking-price">
                <span>Harga mulai dari</span>
                {marketPrice && <s className="hero-market-price">{marketPrice}</s>}
                <strong>{price}</strong>
                <small>per orang</small>
              </div>

              <InfoRow label="Durasi" value={detail.duration} />
              <InfoRow label="Kapasitas" value={detail.capacity} />
              <InfoRow label="Kesulitan" value={detail.difficulty} />
              <InfoRow label="Min. Usia" value={detail.minAge} />
              <InfoRow label="Waktu terbaik" value={detail.bestTime} />

              <div className="meeting-box">
                <span>Titik Kumpul</span>
                <p>{detail.meetingPoint}</p>
              </div>

              <BookingFlow packageSlug={detail.slug} packageName={detail.name} price={detail.price} marketPrice={detail.marketPrice} />
              <p className="booking-note">Respon cepat · Bisa tanya dulu sebelum booking</p>
            </div>
          </aside>
        </section>
      </main>

      <div className="mobile-sticky-cta-wrap">
        <span>
          {marketPrice && <s style={{ color: "#b0b0b0", fontSize: "12px", marginRight: "6px" }}>{marketPrice}</s>}
          {price}/orang
        </span>
        <BookingFlow packageSlug={detail.slug} packageName={detail.name} price={detail.price} marketPrice={detail.marketPrice} />
      </div>

      <Footer />

      <style>{`
        .package-page { background: #fff; color: #111; min-height: 100vh; padding-bottom: 24px; }
        .package-container { max-width: 1140px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
        .package-breadcrumb-wrap { background: var(--color-bg-secondary); border-bottom: 1px solid var(--color-border); }
        .package-breadcrumb { display: flex; gap: 8px; align-items: center; padding-top: 12px; padding-bottom: 12px; font-size: 14px; color: #777; overflow-x: auto; white-space: nowrap; }
        .package-breadcrumb a { color: #777; }
        .package-breadcrumb strong { color: #222; font-weight: 600; }

        .package-hero { display: grid; grid-template-columns: minmax(0, 1fr) 330px; gap: 34px; align-items: end; padding-top: 42px; padding-bottom: 28px; }
        .package-label { display: inline-flex; background: #eaf5e8; color: #1e5c1e; border: 1px solid #c8e0c5; border-radius: 999px; padding: 6px 13px; font-size: 12px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; margin-bottom: 15px; }
        .package-hero h1 { font-size: clamp(34px, 5vw, 54px); line-height: 1.04; letter-spacing: -1.5px; margin: 0 0 12px; font-weight: 850; color: #111; }
        .package-tagline { font-size: clamp(18px, 2vw, 23px); line-height: 1.35; color: #2a7a2a; font-weight: 750; margin-bottom: 12px; max-width: 760px; }
        .package-short { font-size: 17px; line-height: 1.75; color: #444; max-width: 760px; margin-bottom: 22px; }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; }
        .primary-cta, .secondary-cta { min-height: 48px; display: inline-flex; align-items: center; justify-content: center; gap: 9px; padding: 14px 20px; border-radius: 10px; font-size: 16px; font-weight: 800; text-decoration: none; transition: transform .15s, background .15s, border-color .15s; }
        .primary-cta { background: #2a7a2a; color: #fff; }
        .primary-cta:hover { background: #1e5c1e; transform: translateY(-1px); }
        .secondary-cta { color: #1e5c1e; border: 1px solid #c8e0c5; background: #fff; }
        .secondary-cta:hover { border-color: #2a7a2a; }

        .hero-price-card { background: #fff; border: 1px solid #e5e5e0; border-radius: 18px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,.07); }
        .hero-price-card > span, .booking-price span { display: block; color: #777; font-size: 14px; margin-bottom: 4px; }
        .hero-market-price { display: block; color: #b0b0b0; font-size: 15px; font-weight: 600; text-decoration: line-through; margin-bottom: 2px; }
        .hero-price-card > strong, .booking-price strong { display: block; color: #2a7a2a; font-size: 34px; line-height: 1; letter-spacing: -.8px; }
        .hero-price-card > small, .booking-price small { color: #888; font-size: 14px; }
        .hero-mini-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; }
        .hero-mini-grid div { background: #f7f7f5; border: 1px solid #e5e5e0; border-radius: 12px; padding: 12px; }
        .hero-mini-grid b { display: block; font-size: 15px; color: #111; }
        .hero-mini-grid small { color: #777; }

        .gallery-section { padding-bottom: 42px; }
        .package-content-grid { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 44px; align-items: start; padding-bottom: 82px; }
        .package-main section { margin-bottom: 42px; }
        .section-title { font-size: 26px; line-height: 1.2; letter-spacing: -.4px; margin: 0 0 18px; color: #111; }
        .body-copy { font-size: 17px; line-height: 1.85; color: #444; margin-bottom: 14px; }

        .quick-card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .quick-card { border: 1px solid #e5e5e0; background: #fdfdfb; border-radius: 14px; padding: 16px; }
        .quick-card span { display: block; color: #777; font-size: 13px; margin-bottom: 4px; }
        .quick-card strong { color: #111; font-size: 16px; line-height: 1.35; }

        .highlight-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .highlight-card { background: #f0f7ee; border: 1px solid #c8e0c5; border-radius: 14px; padding: 20px; }
        .accent-line { width: 38px; height: 4px; background: #2a7a2a; border-radius: 999px; margin-bottom: 13px; }
        .highlight-card h3 { font-size: 17px; line-height: 1.35; margin-bottom: 8px; color: #111; }
        .highlight-card p { font-size: 15px; line-height: 1.7; color: #444; }
        .pill-list { display: flex; flex-wrap: wrap; gap: 10px; }
        .pill-list span { background: #f7f7f5; border: 1px solid #e5e5e0; border-radius: 999px; padding: 10px 14px; font-size: 15px; font-weight: 700; color: #333; }

        .timeline { position: relative; padding-left: 22px; }
        .timeline:before { content: ""; position: absolute; left: 6px; top: 7px; bottom: 7px; width: 2px; background: #e5e5e0; }
        .timeline-item { position: relative; display: grid; grid-template-columns: 70px minmax(0, 1fr); gap: 14px; margin-bottom: 18px; }
        .timeline-item:before { content: ""; position: absolute; left: -20px; top: 6px; width: 12px; height: 12px; border-radius: 99px; background: #2a7a2a; box-shadow: 0 0 0 3px #eaf5e8; }
        .timeline-item time { font-size: 15px; font-weight: 850; color: #2a7a2a; }
        .timeline-item p { font-size: 16px; line-height: 1.6; color: #333; }

        .included-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .info-list { border-radius: 14px; padding: 20px; border: 1px solid #e5e5e0; }
        .info-list.yes { background: #f0f7ee; border-color: #c8e0c5; }
        .info-list.no { background: #fff8f5; border-color: #f0d0c0; }
        .info-list h3 { font-size: 17px; margin-bottom: 12px; }
        .info-list ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .info-list li { display: flex; gap: 9px; align-items: flex-start; font-size: 15px; line-height: 1.55; color: #333; }
        .info-list li span { font-weight: 900; flex-shrink: 0; }
        .info-list.yes li span { color: #2a7a2a; }
        .info-list.no li span { color: #c0602a; }

        .simple-list { display: grid; gap: 10px; }
        .simple-list div { background: #f7f7f5; border: 1px solid #e5e5e0; border-radius: 12px; padding: 14px 16px; font-size: 16px; line-height: 1.6; color: #333; }
        .warning-list div { background: #fffaf0; border-color: #f0dfb8; }
        .faq-list { display: grid; gap: 10px; }
        .faq-list details { border: 1px solid #e5e5e0; border-radius: 12px; background: #fff; padding: 16px 18px; }
        .faq-list summary { cursor: pointer; font-size: 16px; font-weight: 800; color: #111; }
        .faq-list p { font-size: 15px; line-height: 1.7; color: #444; margin-top: 10px; }

        .closing-cta { background: #102b15; color: #fff; border-radius: 18px; padding: 30px; }
        .closing-cta h2 { font-size: 28px; line-height: 1.25; margin-bottom: 8px; }
        .closing-cta p { color: rgba(255,255,255,.78); font-size: 16px; line-height: 1.7; margin-bottom: 18px; }
        .closing-cta .primary-cta { background: #fff; color: #1e5c1e; }

        .booking-card-wrap { position: sticky; top: 84px; }
        .booking-card { background: #fff; border: 1px solid #e5e5e0; border-radius: 18px; padding: 26px; box-shadow: 0 8px 30px rgba(0,0,0,.08); }
        .booking-price { padding-bottom: 20px; border-bottom: 1px solid #f0f0eb; margin-bottom: 4px; }
        .info-row { display: flex; justify-content: space-between; gap: 18px; padding: 12px 0; border-bottom: 1px solid #f0f0eb; font-size: 15px; }
        .info-row span { color: #777; }
        .info-row strong { color: #111; text-align: right; }
        .meeting-box { padding: 14px 0; border-bottom: 1px solid #f0f0eb; }
        .meeting-box span { display: block; color: #777; font-size: 14px; margin-bottom: 5px; }
        .meeting-box p { color: #333; line-height: 1.6; font-size: 15px; }
        .booking-card .availability-btn { width: 100%; margin-top: 20px; }
        .booking-note { text-align: center; color: #888; font-size: 13px; margin-top: 10px; }

        .mobile-sticky-cta-wrap { display: none; }

        @media (max-width: 920px) {
          .package-hero, .package-content-grid { grid-template-columns: 1fr; }
          .hero-price-card { display: none; }
          .booking-card-wrap { position: static; }
          .quick-card-grid { grid-template-columns: repeat(2, 1fr); }
          .highlight-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .package-container { padding-left: 18px; padding-right: 18px; }
          .package-hero { padding-top: 30px; gap: 20px; }
          .package-hero h1 { font-size: 36px; letter-spacing: -1px; }
          .package-tagline { font-size: 19px; }
          .package-short, .body-copy { font-size: 16px; line-height: 1.75; }
          .primary-cta, .secondary-cta { width: 100%; font-size: 16px; }
          .gallery-section { padding-bottom: 32px; }
          .quick-card-grid, .included-grid { grid-template-columns: 1fr; }
          .quick-card strong { font-size: 17px; }
          .section-title { font-size: 24px; }
          .timeline-item { grid-template-columns: 58px minmax(0, 1fr); gap: 12px; }
          .timeline-item p { font-size: 15.5px; }
          .booking-card-wrap { display: none; }
          .mobile-sticky-cta-wrap { position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 40; display: flex; align-items: center; justify-content: space-between; gap: 12px; background: #2a7a2a; color: #fff; border-radius: 14px; padding: 12px 16px; box-shadow: 0 10px 26px rgba(0,0,0,.22); }
          .mobile-sticky-cta-wrap span { font-size: 13px; opacity: .88; white-space: nowrap; }
          .mobile-sticky-cta-wrap .availability-btn { width: auto; margin-top: 0; min-height: 42px; padding: 10px 14px; background: #fff; color: #1e5c1e; }
        }
      `}</style>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

function InfoList({ title, items, type }: { title: string; items: string[]; type: "yes" | "no" }) {
  return (
    <div className={`info-list ${type}`}>
      <h3>{type === "yes" ? "✓" : "✕"} {title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}><span>{type === "yes" ? "✓" : "✕"}</span>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

