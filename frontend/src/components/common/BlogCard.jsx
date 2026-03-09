import React, { useContext, createContext } from "react";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

// ── Context ────────────────────────────────────────────────────
const BlogSelectionContext = createContext();

export const BlogSelectionProvider = ({ children }) => {
  const [selectedBlogs, setSelectedBlogs] = React.useState(new Set());

  const toggleBlog = (blogId) => {
    setSelectedBlogs((prev) => {
      const n = new Set(prev);
      n.has(blogId) ? n.delete(blogId) : n.add(blogId);
      return n;
    });
  };

  return (
    <BlogSelectionContext.Provider value={{ selectedBlogs, toggleBlog }}>
      {children}
    </BlogSelectionContext.Provider>
  );
};

export const useBlogSelection = () => {
  const ctx = useContext(BlogSelectionContext);
  if (!ctx) return { selectedBlogs: new Set(), toggleBlog: () => {} };
  return ctx;
};

// ── Helpers ────────────────────────────────────────────────────
const stripHtml = (html) => {
  if (!html) return "";
  const d = document.createElement("div");
  d.innerHTML = html;
  return d.textContent || d.innerText || "";
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// ── BlogCard ───────────────────────────────────────────────────
const BlogCard = ({ data, disableSelection = false }) => {
  const { selectedBlogs, toggleBlog } = useBlogSelection();
  const isSelected = selectedBlogs.has(data?._id);

  const previewText = data?.shortDescription
    ? data.shortDescription.slice(0, 130) + "…"
    : stripHtml(data?.content).slice(0, 130) + "…";

  const handleClick = (e) => {
    if (!disableSelection && !e.target.closest("a")) {
      e.preventDefault();
      e.stopPropagation();
      if (data?._id) toggleBlog(data._id);
    }
  };

  const CardInner = () => (
    <div
      onClick={handleClick}
      className={[
        // Base
        "group relative flex flex-col w-full h-full bg-white rounded-2xl overflow-hidden cursor-pointer",
        // Border & shadow
        "border transition-all duration-300",
        "hover:-translate-y-1.5",
        isSelected && !disableSelection
          ? "border-[#AC292A] shadow-[0_0_0_3px_rgba(172,41,42,0.15),0_12px_40px_rgba(25,33,51,0.12)]"
          : "border-[#e5e7eb] shadow-sm hover:border-[#AC292A]/30 hover:shadow-xl",
      ].join(" ")}
    >
      {/* ── Image ── */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden flex-shrink-0">
        <img
          src={`${BaseUrl}/${data?.image}`}
          alt={data?.imageAltText || data?.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#192133]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Shine sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#AC292A] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-white/70 inline-block" />
          Knowledge Base
        </div>

        {/* Selected checkmark */}
        {isSelected && !disableSelection && (
          <div className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-[#AC292A] flex items-center justify-center shadow-[0_2px_8px_rgba(172,41,42,0.5)]">
            <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
              <path
                d="M1.5 5L5 8.5L11.5 1.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5">

        {/* Date */}
        {data?.createdAt && (
          <div className="flex items-center gap-1.5 mb-3">
            <FaCalendarAlt size={10} className="text-[#AC292A] flex-shrink-0" />
            <span className="text-[#AC292A] text-[10px] font-bold uppercase tracking-widest">
              {formatDate(data.createdAt)}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-[#192133] group-hover:text-[#AC292A] transition-colors duration-200 font-bold text-lg leading-snug line-clamp-2 mb-3">
          {data?.title}
        </h3>

        {/* Animated divider */}
        <div className="h-0.5 w-8 group-hover:w-14 rounded-full bg-gradient-to-r from-[#AC292A] to-[#AC292A]/20 mb-3 transition-all duration-300" />

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
          {previewText}
        </p>

        {/* Footer */}
        <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
          <Link
            to={`/blog/${data?.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="
              inline-flex items-center gap-2 px-4 py-2 rounded-full
              text-[#AC292A] text-xs font-bold tracking-wide
              bg-[#AC292A]/10 border border-[#AC292A]/20
              transition-all duration-200
              group-hover:bg-[#AC292A] group-hover:text-white
              group-hover:border-[#AC292A] group-hover:gap-3
              group-hover:shadow-[0_4px_14px_rgba(172,41,42,0.30)]
            "
          >
            Continue Reading
            <FaArrowRight size={11} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Corner decorative accent */}
      <div
        className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(135deg, transparent 50%, rgba(172,41,42,0.09) 50%)" }}
      />
    </div>
  );

  return (
    <div className="w-full h-full">
      {disableSelection ? (
        <Link to={`/blog/${data?.slug}`} className="block w-full h-full">
          <CardInner />
        </Link>
      ) : (
        <CardInner />
      )}
    </div>
  );
};

export default BlogCard;