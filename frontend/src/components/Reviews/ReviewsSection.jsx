import { useState } from "react";
import Button from "../common/Button";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg:           "#f7f7f7",
  surface:      "#ffffff",
  surfaceHover: "#fafafa",
  red:          "#AC292A",
  redHover:     "#8f1f20",
  redDim:       "rgba(172,41,42,0.08)",
  redBorder:    "rgba(172,41,42,0.25)",
  navy:         "#192133",
  navyMid:      "#2d3d5a",
  gold:         "#e8a838",
  border:       "#e8e8e8",
  borderHover:  "#d0d0d0",
  textPrimary:  "#192133",
  textSub:      "#4d607d",
  textMuted:    "#8a9bb4",
  shadow:       "0 1px 3px rgba(25,33,51,0.07), 0 4px 16px rgba(25,33,51,0.05)",
  shadowHover:  "0 4px 20px rgba(25,33,51,0.12)",
  shadowRed:    "0 4px 20px rgba(172,41,42,0.28)",
};

// ─── FAKE DATA ─────────────────────────────────────────────────────────────────
const reviewsData = {
  averageRating: 4.8,
  totalReviews: 17767,
  ratingBreakdown: [
    { stars: 5, percentage: 92 },
    { stars: 4, percentage: 4 },
    { stars: 3, percentage: 1 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 2 },
  ],
  reviewImages: [
    { id: 1, src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=380&fit=crop", alt: "Black History Month banner" },
    { id: 2, src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&h=380&fit=crop", alt: "Group photo with banner" },
    { id: 3, src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=380&fit=crop", alt: "Colorful art name tag" },
    { id: 4, src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=380&fit=crop", alt: "Art supplies" },
    { id: 5, src: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500&h=380&fit=crop", alt: "Event banner" },
  ],
};

const fakeReviews = [
  {
    id: 1, rating: 1, title: "Disappointed",
    date: "Mar 3, 2026", author: "Tiffany H.", verifiedBuyer: true,
    body: "Very disappointed in the quality that was printed. It's extremely blurry and unprofessional.",
    response: {
      from: "Customer Care Team",
      text: 'Thank you for your review of the vinyl banners. We are sorry to hear that the image quality was blurry. From our review, the resolution of the image used on the banner is low in quality. Please note that the recommended resolution is approximately 300 DPI and the suggested file formats are PDF, AI, and SVG. We recommend that you request a "PDF proof" of your design before completing the order. We have taken action on your account and a follow-up email will be sent to you.',
    },
  },
  {
    id: 2, rating: 5, title: "Absolutely love it!",
    date: "Feb 28, 2026", author: "Marcus L.", verifiedBuyer: true,
    body: "The banner came out crisp, vibrant, and exactly as designed. Shipped faster than expected. Will definitely order again!",
    response: null,
  },
  {
    id: 3, rating: 4, title: "Great quality, slight color difference",
    date: "Feb 20, 2026", author: "Sandra K.", verifiedBuyer: true,
    body: "Overall very happy with the product. The colors were slightly different from what I saw on screen, but nothing too noticeable. The banner itself is very sturdy.",
    response: {
      from: "Customer Care Team",
      text: "Thank you for your feedback, Sandra! Slight color variance can occur due to differences between screen and print color profiles. We recommend using our PDF proof tool to preview final colors before ordering. We're glad you're happy overall and hope to serve you again soon!",
    },
  },
  {
    id: 4, rating: 5, title: "Perfect for our school event",
    date: "Feb 14, 2026", author: "James R.", verifiedBuyer: true,
    body: "We ordered banners for our Black History Month event and they turned out beautifully. Everyone loved them. The print quality is outstanding.",
    response: null,
  },
  {
    id: 5, rating: 2, title: "Took way too long to arrive",
    date: "Feb 10, 2026", author: "Priya M.", verifiedBuyer: false,
    body: "The quality of the banner was decent, but it arrived 5 days after the promised delivery date. My event had already passed by then.",
    response: {
      from: "Customer Care Team",
      text: "We sincerely apologize for the delay, Priya. We understand how frustrating this must have been. Please reach out to our support team and we'll make this right for you.",
    },
  },
  {
    id: 6, rating: 5, title: "Exceeded expectations!",
    date: "Jan 30, 2026", author: "Olivia T.", verifiedBuyer: true,
    body: "Ordered a custom banner for my small business and it looks incredibly professional. High quality material and the colors really pop. Already got compliments on it!",
    response: null,
  },
];

const SORT_OPTIONS = ["Most Recent", "Highest Rated", "Lowest Rated"];
const FILTER_OPTIONS = ["All ratings", "5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function StarIcon({ filled, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}>
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={filled ? C.gold : "#e2e5ea"}
      />
    </svg>
  );
}

function StarRating({ rating, size }) {
  return (
    <span style={{ display: "inline-flex", gap: "2px" }}>
      {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= rating} size={size} />)}
    </span>
  );
}

function RatingBar({ stars, percentage, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: "10px",
        cursor: "pointer", padding: "6px 10px", borderRadius: "10px",
        background: selected ? C.redDim : "transparent",
        border: `1.5px solid ${selected ? C.redBorder : "transparent"}`,
        transition: "all 0.18s",
      }}
      onMouseEnter={e => !selected && (e.currentTarget.style.background = "#f0f2f5")}
      onMouseLeave={e => !selected && (e.currentTarget.style.background = "transparent")}
    >
      <span style={{ fontSize: "12px", color: C.textSub, width: "44px", flexShrink: 0 }}>
        {stars} {stars === 1 ? "star" : "stars"}
      </span>
      <div style={{ flex: 1, height: "7px", borderRadius: "99px", background: "#eaecf0", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${percentage}%`,
          background: selected
            ? `linear-gradient(90deg, ${C.red}, #c84040)`
            : `linear-gradient(90deg, ${C.gold}, #f5c040)`,
          borderRadius: "99px",
          transition: "width 0.4s ease",
        }} />
      </div>
      <span style={{ fontSize: "12px", color: C.textMuted, width: "34px", textAlign: "right", flexShrink: 0 }}>
        {percentage}%
      </span>
    </div>
  );
}

function ReviewCard({ review, index }) {
  const ratingColor = review.rating >= 4 ? "#1a9e5c" : review.rating === 3 ? "#b07d10" : C.red;
  const ratingBg    = review.rating >= 4 ? "rgba(26,158,92,0.09)" : review.rating === 3 ? "rgba(176,125,16,0.09)" : C.redDim;

  return (
    <div style={{
      background: C.surface,
      border: `1.5px solid ${C.border}`,
      borderRadius: "16px",
      padding: "24px 28px",
      marginBottom: "14px",
      boxShadow: C.shadow,
      animation: "fadeUp 0.35s ease both",
      animationDelay: `${index * 0.055}s`,
      transition: "box-shadow 0.2s, border-color 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = C.shadowHover; e.currentTarget.style.borderColor = C.borderHover; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = C.shadow; e.currentTarget.style.borderColor = C.border; }}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <StarRating rating={review.rating} size={15} />
          <span style={{
            fontSize: "11px", fontWeight: "700", color: ratingColor,
            background: ratingBg, padding: "2px 8px", borderRadius: "99px",
          }}>
            {review.rating}.0
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "12px", color: C.textMuted }}>{review.date}</span>
          <span style={{ color: C.border }}>·</span>
          <span style={{ fontSize: "12px", color: C.textSub, fontWeight: "600" }}>{review.author}</span>
          {review.verifiedBuyer && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              fontSize: "11px", color: "#1a9e5c", fontWeight: "600",
              background: "rgba(26,158,92,0.09)", padding: "2px 8px", borderRadius: "99px",
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/>
              </svg>
              Verified
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <div style={{ fontSize: "15px", fontWeight: "700", color: C.textPrimary, marginBottom: "8px", letterSpacing: "-0.01em" }}>
        {review.title}
      </div>

      {/* Body */}
      <p style={{ fontSize: "14px", color: C.textSub, lineHeight: "1.7", margin: "0 0 16px 0" }}>
        {review.body}
      </p>

      {/* Response block */}
      {review.response && (
        <div style={{
          borderLeft: `3px solid ${C.red}`,
          background: `linear-gradient(135deg, rgba(172,41,42,0.04), rgba(247,247,247,0.8))`,
          borderRadius: "0 12px 12px 0",
          padding: "14px 18px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "8px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.red, flexShrink: 0 }} />
            <span style={{ fontSize: "11px", color: C.red, fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Response from {review.response.from}
            </span>
          </div>
          <p style={{ fontSize: "13px", color: C.textSub, lineHeight: "1.68", margin: 0 }}>
            {review.response.text}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function ReviewsSection() {
  const [selectedBar, setSelectedBar] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("All ratings");
  const [sortBy, setSortBy] = useState("Most Recent");

  const canPrev = imageIndex > 0;
  const canNext = imageIndex + 3 < reviewsData.reviewImages.length;
  const visibleImages = reviewsData.reviewImages.slice(imageIndex, imageIndex + 3);

  const reviews = fakeReviews
    .filter(r => {
      const q = search.toLowerCase();
      const ms = !q || r.title.toLowerCase().includes(q) || r.body.toLowerCase().includes(q) || r.author.toLowerCase().includes(q);
      const mf = filterBy === "All ratings" || r.rating === parseInt(filterBy[0]);
      return ms && mf;
    })
    .sort((a, b) =>
      sortBy === "Highest Rated" ? b.rating - a.rating :
      sortBy === "Lowest Rated"  ? a.rating - b.rating :
      b.id - a.id
    );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", padding: "40px 24px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #aab4c4; }
        select option { background: #fff; color: #192133; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-[95%] mx-auto py-10">

        {/* ══ SECTION 1 ══════════════════════════════════════════ */}
        <div style={{ display: "flex", gap: "28px", alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* Rating card */}
          <div style={{
            width: "260px", flexShrink: 0,
            background: C.surface,
            border: `1.5px solid ${C.border}`,
            borderRadius: "20px",
            padding: "28px 22px",
            boxShadow: C.shadow,
          }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: C.red, fontWeight: "700", marginBottom: "14px" }}>
              Customer Reviews
            </div>

            {/* Score */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" }}>
              <span style={{  fontSize: "52px", fontWeight: "800", color: C.navy, lineHeight: 1 }}>
                {reviewsData.averageRating}
              </span>
              <span style={{ fontSize: "15px", color: C.textMuted, marginBottom: "4px" }}>/ 5</span>
            </div>
            <StarRating rating={Math.round(reviewsData.averageRating)} size={17} />
            <div style={{ fontSize: "12px", color: C.textMuted, marginTop: "5px", marginBottom: "22px" }}>
              Based on {reviewsData.totalReviews.toLocaleString()} reviews
            </div>

            {/* Bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "22px" }}>
              {reviewsData.ratingBreakdown.map(({ stars, percentage }) => (
                <RatingBar
                  key={stars} stars={stars} percentage={percentage}
                  selected={selectedBar === stars}
                  onClick={() => setSelectedBar(selectedBar === stars ? null : stars)}
                />
              ))}
            </div>

            {/* Button */}
            <Button
             label={"✏ Write a Review"}
              onMouseEnter={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.boxShadow = C.shadowRed; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.navy; e.currentTarget.style.boxShadow = `0 4px 16px rgba(25,33,51,0.2)`; e.currentTarget.style.transform = "translateY(0)"; }}
            />
             
          
          </div>

          {/* Image gallery */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            {/* Gallery header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "16px" }}>
              <div>
                <h2 style={{ fontSize: "30px", fontWeight: "800", color: C.navy, margin: 0, letterSpacing: "-0.02em" }}>
                  Reviews with Images
                </h2>
                <p style={{ fontSize: "16px", color: C.textMuted, margin: "3px 0 0" }}>Photos from real customers</p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {[{dir:"prev",icon:"‹",en:canPrev,fn:()=>setImageIndex(i=>i-1)},{dir:"next",icon:"›",en:canNext,fn:()=>setImageIndex(i=>i+1)}].map(b=>(
                  <button key={b.dir} onClick={b.fn} disabled={!b.en} style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    border: `1.5px solid ${b.en ? C.border : "#eee"}`,
                    background: b.en ? C.surface : "#f0f0f0",
                    color: b.en ? C.navy : C.textMuted,
                    cursor: b.en ? "pointer" : "default",
                    fontSize: "20px", lineHeight: 1,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: b.en ? C.shadow : "none",
                    transition: "all 0.15s",
                  }}
                    onMouseEnter={e => b.en && (e.currentTarget.style.borderColor = C.red, e.currentTarget.style.color = C.red)}
                    onMouseLeave={e => b.en && (e.currentTarget.style.borderColor = C.border, e.currentTarget.style.color = C.navy)}
                  >{b.icon}</button>
                ))}
              </div>
            </div>

            {/* Images */}
            <div style={{ display: "flex", gap: "14px" }}>
              {visibleImages.map((img, i) => (
                <div key={img.id} style={{
                  flex: "1 1 0", borderRadius: "16px", overflow: "hidden",
                  aspectRatio: "3/2", cursor: "pointer", position: "relative",
                  border: `1.5px solid ${C.border}`,
                  boxShadow: C.shadow,
                  animation: "fadeUp 0.35s ease both",
                  animationDelay: `${i * 0.07}s`,
                }}>
                  <img
                    src={img.src} alt={img.alt}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.32s ease" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
                    onMouseLeave={e => e.target.style.transform = "scale(1)"}
                  />
                  {/* Subtle hover vignette */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(25,33,51,0.18) 0%, transparent 55%)",
                    pointerEvents: "none",
                  }} />
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div style={{ display: "flex", gap: "6px", marginTop: "14px", justifyContent: "center" }}>
              {reviewsData.reviewImages.slice(0, reviewsData.reviewImages.length - 2).map((_, i) => (
                <div key={i} onClick={() => setImageIndex(i)} style={{
                  width: i === imageIndex ? "22px" : "7px", height: "7px",
                  borderRadius: "99px",
                  background: i === imageIndex ? C.red : C.border,
                  cursor: "pointer", transition: "all 0.25s",
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ margin: "36px 0", height: "1.5px", background: `linear-gradient(90deg, transparent, ${C.border} 20%, ${C.border} 80%, transparent)` }} />

        {/* ══ SECTION 2 ══════════════════════════════════════════ */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: "800", color: C.navy, margin: 0, letterSpacing: "-0.02em" }}>
              What Customers Say
            </h2>
            <p style={{ fontSize: "13px", color: C.textMuted, margin: "3px 0 0" }}>
              {reviewsData.totalReviews.toLocaleString()} verified reviews
            </p>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "end", gap: "10px", flexWrap: "wrap" }}>
            
            <div style={{ position: "relative" }}>
            
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text" placeholder="Search reviews…"
                value={search} onChange={e => setSearch(e.target.value)}
                style={{
                  paddingLeft: "34px", paddingRight: "14px", paddingTop: "9px", paddingBottom: "9px",
                  background: C.surface, border: `1.5px solid ${C.border}`,
                  borderRadius: "10px", fontSize: "13px", color: C.textPrimary,
                  outline: "none", width: "195px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={e => { e.target.style.borderColor = C.red; e.target.style.boxShadow = `0 0 0 3px ${C.redDim}`; }}
                onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "0 1px 2px rgba(0,0,0,0.04)"; }}
              />
            </div>

            {/* Dropdowns */}
            {[
              { label: "Filter By", value: filterBy, setter: setFilterBy, opts: FILTER_OPTIONS, accent: true },
              { label: "Sort by",   value: sortBy,   setter: setSortBy,   opts: SORT_OPTIONS,   accent: false },
            ].map(({ label, value, setter, opts, accent }) => (
              <div key={label} style={{ position: "relative" }}>
                <div style={{ fontSize: "10px", color: accent ? C.red : C.textMuted, fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "3px", paddingLeft: "2px" }}>
                  {label}
                </div>
                <div style={{ position: "relative" }}>
                  <select
                    value={value} onChange={e => setter(e.target.value)}
                    style={{
                      padding: "8px 30px 8px 13px",
                      background: C.surface,
                      border: `1.5px solid ${accent ? C.redBorder : C.border}`,
                      borderRadius: "10px", fontSize: "13px",
                      color: C.textPrimary, cursor: "pointer",
                      appearance: "none", outline: "none", minWidth: "130px",
                      fontWeight: "500",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                    }}
                  >
                    {opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2.5"
                    style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review cards */}
        {reviews.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "64px 0",
            color: C.textMuted, fontSize: "14px",
            background: C.surface, borderRadius: "16px",
            border: `1.5px solid ${C.border}`,
          }}>
            No reviews match your search or filter.
          </div>
        ) : (
          reviews.map((review, i) => <ReviewCard key={review.id} review={review} index={i} />)
        )}

      </div>
    </div>
  );
}