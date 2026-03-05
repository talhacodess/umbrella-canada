import React, { useState, useEffect } from "react";
import { FaAngleDown, FaBed, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdOutdoorGrill } from "react-icons/md";
import { TbToolsKitchen3 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { LiaAngleRightSolid } from "react-icons/lia";
import logo from '../../assets/images/brand/logo.png';
import axiosInstance from "../../utils/axiosConfig";
import { BaseUrl } from "../../utils/BaseUrl";

// Inject styles
if (typeof document !== 'undefined' && !document.getElementById('bottomnav-v2-animations')) {
  const style = document.createElement('style');
  style.id = 'bottomnav-v2-animations';
  style.textContent = `
  

    @keyframes bnav-fadeSlide {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes bnav-slideLeft {
      from { opacity: 0; transform: translateX(-100%); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes bnav-fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes bnav-shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    .bnav-dropdown { animation: bnav-fadeSlide 0.22s cubic-bezier(.16,1,.3,1) both; }
    .bnav-mobile   { animation: bnav-slideLeft 0.28s cubic-bezier(.16,1,.3,1) both; }
    .bnav-overlay  { animation: bnav-fadeIn 0.2s ease both; }

    .bnav-link {
      position: relative;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 10px 14px;
      font-size: 13.5px;
      font-weight: 600;
      color: #1a1f2e;
      border-radius: 8px;
      transition: color 0.18s, background 0.18s;
      letter-spacing: -0.01em;
      white-space: nowrap;
    }
    .bnav-link::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 14px;
      right: 14px;
      height: 2px;
      border-radius: 99px;
      background: #c0392b;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.22s cubic-bezier(.16,1,.3,1);
    }
    .bnav-link:hover { color: #c0392b; background: rgba(192,57,43,0.06); }
    .bnav-link:hover::after { transform: scaleX(1); }

    .bnav-link.active { color: #c0392b; }
    .bnav-link.active::after { transform: scaleX(1); }

    .bnav-chevron {
      transition: transform 0.22s cubic-bezier(.16,1,.3,1);
      color: #9ca3af;
    }
    .bnav-link:hover .bnav-chevron,
    .bnav-link-open .bnav-chevron { transform: rotate(180deg); color: #c0392b; }

    /* Mega menu item */
    .bnav-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      color: #374151;
      transition: all 0.16s ease;
      cursor: pointer;
      text-decoration: none;
    }
    .bnav-item:hover {
      background: #fef2f2;
      color: #c0392b;
      transform: translateX(2px);
    }
    .bnav-item:hover .bnav-arrow { opacity: 1; transform: translateX(0); }
    .bnav-arrow {
      opacity: 0;
      transform: translateX(-4px);
      transition: all 0.16s ease;
      color: #c0392b;
      flex-shrink: 0;
    }

    /* Skeleton pulse */
    .bnav-skeleton {
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: bnav-shimmer 1.4s infinite;
      border-radius: 6px;
    }

    /* Mobile submenu item */
    .bnav-mobile-item {
      display: block;
      padding: 11px 16px;
      font-size: 14px;
      font-weight: 600;
      color: #1a1f2e;
      border-radius: 10px;
      transition: all 0.16s ease;
      text-decoration: none;
    }
    .bnav-mobile-item:hover { background: rgba(192,57,43,0.07); color: #c0392b; }

    .bnav-mobile-sub {
      display: block;
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 500;
      color: #6b7280;
      border-radius: 8px;
      transition: all 0.16s ease;
      text-decoration: none;
    }
    .bnav-mobile-sub:hover { background: rgba(192,57,43,0.05); color: #c0392b; }

    /* Divider dot */
    .bnav-dot {
      width: 3px; height: 3px;
      border-radius: 50%;
      background: #d1d5db;
      flex-shrink: 0;
    }

    /* Category badge */
    .bnav-badge {
      display: inline-flex;
      align-items: center;
      padding: 2px 7px;
      border-radius: 99px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.03em;
      background: #fef2f2;
      color: #c0392b;
      border: 1px solid rgba(192,57,43,0.15);
    }
  `;
  document.head.appendChild(style);
}

// Cache helpers
const CACHE_KEY = 'brands_cache_v2';
const CACHE_TS  = 'brands_cache_ts_v2';
const CACHE_TTL = 5 * 60 * 1000;

const getCached = () => {
  try {
    const d = localStorage.getItem(CACHE_KEY);
    const t = localStorage.getItem(CACHE_TS);
    if (d && t && Date.now() - parseInt(t) < CACHE_TTL) return JSON.parse(d);
  } catch {}
  return null;
};
const setCache = (data) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TS, Date.now().toString());
  } catch {}
};

const iconMap = {
  "box by industry": <FaBed />,
  "Box by industry": <FaBed />,
  "Shapes & Styles": <MdOutdoorGrill />,
  "Shapes & styles": <MdOutdoorGrill />,
  "Materials": <TbToolsKitchen3 />,
  "Boxes By Material": <TbToolsKitchen3 />,
  "Sticker labels & others": <TbToolsKitchen3 />,
  "Sticker Labels & Others": <TbToolsKitchen3 />,
};

const BottomNav = ({ Menu, OpenMenu }) => {
  const [hoveredCat, setHoveredCat]   = useState(null);
  const [categories, setCategories]   = useState([]);
  const [loading, setLoading]         = useState(true);

  const transform = (raw) => raw.map((b) => ({
    category: b.name,
    slug: b.slug,
    icon: iconMap[b.name] || <FaBed />,
    menu: (b.midcategories || []).map((m) => ({
      title: m.title,
      icon: m.icon?.startsWith('http') ? m.icon : `${BaseUrl}/${m.icon}`,
      slug: m.slug,
    })),
  }));

  // Lock body scroll on mobile menu open
  useEffect(() => {
    if (Menu) {
      const y = window.scrollY;
      document.body.style.cssText = `position:fixed;top:-${y}px;width:100%;overflow:hidden`;
    } else {
      const y = document.body.style.top;
      document.body.style.cssText = '';
      if (y) window.scrollTo(0, parseInt(y) * -1);
    }
    return () => { document.body.style.cssText = ''; };
  }, [Menu]);

  useEffect(() => {
    const init = async () => {
      const cached = getCached();
      if (cached) { setCategories(transform(cached)); setLoading(false); }

      try {
        const res = await axiosInstance.get(`${BaseUrl}/brands/getAll`, { timeout: 20000 });
        if (res.data.status === "success" && res.data.data) {
          setCache(res.data.data);
          setCategories(transform(res.data.data));
        }
      } catch (e) {
        if (!cached) setCategories([]);
      } finally { setLoading(false); }
    };
    init();
  }, []);

  // Split menu items into columns
  const getColumns = (items) => {
    if (!items?.length) return [];
    const perCol = Math.ceil(items.length / 3);
    return [
      items.slice(0, perCol),
      items.slice(perCol, perCol * 2),
      items.slice(perCol * 2),
    ].filter(c => c.length > 0);
  };

  return (
    <div className="bnav-root relative" onMouseLeave={() => setHoveredCat(null)}>

      {/* ── Desktop Bar ─────────────────────────────────────── */}
      <div
        className="hidden sm:block"
        style={{
          background: '#fff',
          borderBottom: '1px solid #f1f1f4',
          boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ maxWidth: '95%', margin: '0 auto', display: 'flex', alignItems: 'center', gap: 2, padding: '0 12px', height: 48 }}>

          {/* Home */}
          <Link to="/" className="bnav-link">Home</Link>

          {/* Divider */}
          <span className="bnav-dot" />

          {/* Dynamic categories */}
          {loading
            ? [1,2,3,4].map(i => (
                <div key={i} className="bnav-skeleton" style={{ width: 110, height: 20, margin: '12px 8px' }} />
              ))
            : categories.map((cat, i) => {
                const isOpen = hoveredCat?.category === cat.category;
                return (
                  <div
                    key={i}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setHoveredCat(cat)}
                  >
                    <Link
                      to={`/${cat.slug || cat.category}`}
                      className={`bnav-link ${isOpen ? 'bnav-link-open' : ''}`}
                    >
                      <span style={{ textTransform: cat.category?.toLowerCase().includes('box by industry') ? 'capitalize' : 'none' }}>
                        {cat.category?.toLowerCase().includes('box by industry') ? 'Box by Industry' : cat.category}
                      </span>
                      {cat.menu?.length > 0 && (
                        <FaAngleDown size={12} className="bnav-chevron" style={{ marginLeft: 2 }} />
                      )}
                    </Link>
                  </div>
                );
              })
          }

          <span className="bnav-dot" />
          <Link to="#" className="bnav-link">Client Spotlights</Link>
          <span className="bnav-dot" />
          <Link to="/about-us" className="bnav-link">About Us</Link>
        </div>

        {/* ── Mega Menu Dropdown ───────────────────────────── */}
        {hoveredCat && hoveredCat.menu?.length > 0 && (
          <div
            className="bnav-dropdown"
            style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 9999 }}
            onMouseEnter={() => setHoveredCat(hoveredCat)}
            onMouseLeave={() => setHoveredCat(null)}
          >
            {/* Bridge gap */}
            <div style={{ height: 8, background: 'transparent' }} />

            <div style={{ padding: '0 2.5% 20px' }}>
              <div
                style={{
                  maxWidth: '100%',
                  margin: '0 auto',
                  background: '#fff',
                  border: '1px solid #f0f0f4',
                  borderRadius: 16,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                }}
              >
                {/* Header strip */}
                <div
                  style={{
                    padding: '14px 28px',
                    borderBottom: '1px solid #f5f5f8',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: 'linear-gradient(to right, #fafafa, #fff)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18, color: '#c0392b' }}>{hoveredCat.icon}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#1a1f2e', letterSpacing: '-0.02em' }}>
                      {hoveredCat.category}
                    </span>
                    <span className="bnav-badge">{hoveredCat.menu.length} types</span>
                  </div>

                </div>

                {/* Columns */}
                <div style={{ display: 'flex', padding: '20px 20px 20px' }}>
                  {getColumns(hoveredCat.menu).map((col, ci) => (
                    <div
                      key={ci}
                      style={{
                        flex: 1,
                        paddingLeft: ci > 0 ? 16 : 8,
                        marginLeft: ci > 0 ? 16 : 0,
                        borderLeft: ci > 0 ? '1px solid #f0f0f4' : 'none',
                      }}
                    >
                      {col.map((item, ii) => (
                        <Link
                          key={ii}
                          to={`/category/${item.slug || item.title}`}
                          className="bnav-item"
                        >
                          <span>{item.title}</span>
                          <LiaAngleRightSolid size={13} className="bnav-arrow" />
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile Menu Overlay ──────────────────────────────── */}
      {Menu && (
        <div
          className="bnav-overlay sm:hidden"
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(15,18,30,0.6)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => OpenMenu(false)}
        >
          {/* Panel */}
          <div
            className="bnav-mobile"
            style={{
              width: 320, height: '100%',
              background: '#fff',
              boxShadow: '4px 0 40px rgba(0,0,0,0.15)',
              display: 'flex', flexDirection: 'column',
              overflowY: 'auto',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #f0f0f4',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: '#fafafa',
                position: 'sticky', top: 0, zIndex: 10,
              }}
            >
              <img src={logo} alt="Logo" style={{ height: 36, objectFit: 'contain' }} />
              <button
                onClick={() => OpenMenu(false)}
                style={{
                  width: 36, height: 36, borderRadius: '50%', border: 'none',
                  background: 'linear-gradient(135deg, #c0392b, #1a1f2e)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 2px 8px rgba(192,57,43,0.35)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <svg width="14" fill="white" viewBox="0 0 1000 1000">
                  <path d="M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z"/>
                </svg>
              </button>
            </div>

            {/* Nav Items */}
            <div style={{ padding: '12px 12px 24px', flex: 1 }}>
              {/* Section label */}
              <div style={{ padding: '8px 16px 4px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#9ca3af', textTransform: 'uppercase' }}>
                Navigation
              </div>

              <Link to="/" className="bnav-mobile-item" onClick={OpenMenu}>Home</Link>

              {categories.map((cat, i) => (
                <div key={i}>
                  <Link
                    to={`/${cat.slug || cat.category}`}
                    className="bnav-mobile-item"
                    onClick={OpenMenu}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <span>{cat.category}</span>
                    {cat.menu?.length > 0 && (
                      <span style={{ fontSize: 10, background: '#f3f4f6', color: '#6b7280', borderRadius: 99, padding: '2px 7px', fontWeight: 600 }}>
                        {cat.menu.length}
                      </span>
                    )}
                  </Link>
                  {cat.menu?.length > 0 && (
                    <div style={{ paddingLeft: 12, marginBottom: 4 }}>
                      {cat.menu.map((sub, si) => (
                        <Link
                          key={si}
                          to={`/category/${sub.slug || sub.title}`}
                          className="bnav-mobile-sub"
                          onClick={OpenMenu}
                        >
                          · {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Divider */}
              <div style={{ margin: '12px 16px', height: 1, background: '#f0f0f4' }} />
              <div style={{ padding: '0 16px 4px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#9ca3af', textTransform: 'uppercase' }}>
                Company
              </div>

              <Link to="/portfolio" className="bnav-mobile-item" onClick={OpenMenu}>Portfolio</Link>
              <Link to="/blog" className="bnav-mobile-item" onClick={OpenMenu}>Blog</Link>
              <Link to="/about-us" className="bnav-mobile-item" onClick={OpenMenu}>About Us</Link>
              <Link to="/contact-us" className="bnav-mobile-item" onClick={OpenMenu}>Contact Us</Link>
            </div>

            {/* Footer strip */}
            <div
              style={{
                padding: '16px 20px',
                borderTop: '1px solid #f0f0f4',
                display: 'flex', alignItems: 'center', gap: 12,
                background: '#fafafa',
              }}
            >
              {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: 34, height: 34, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: '#f3f4f6', color: '#6b7280',
                    transition: 'all 0.16s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#c0392b'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = '#6b7280'; }}
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomNav;