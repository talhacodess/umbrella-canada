import React, { useEffect, useState, useRef } from 'react';
import TableOfContent from './TableOfContent';
import { BaseUrl } from '../../utils/BaseUrl';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import GetQuoteModal from '../../components/common/GetQuoteModal';
import ProductCard from '../../components/common/ProductCard';
import { FaCalendarAlt, FaClock, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// ── Horizontal mini blog card (image left, content right) ──────
const MiniArticleCard = ({ data }) => {
    const formatDate = (d) => {
        if (!d) return '';
        return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };
    const stripHtml = (html) => {
        if (!html) return '';
        const el = document.createElement('div');
        el.innerHTML = html;
        return el.textContent || el.innerText || '';
    };

    return (
        <Link
            to={`/blog/${data?.slug}`}
            className="group flex items-start gap-3 p-3 rounded-xl border border-transparent hover:border-[#AC292A]/15 hover:bg-[#AC292A]/4 transition-all duration-200 no-underline"
        >
            {/* Thumbnail */}
            <div className="w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <img
                    src={`${BaseUrl}/${data?.image}`}
                    alt={data?.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between min-w-0 flex-1 gap-1">
                {data?.createdAt && (
                    <div className="flex items-center gap-1">
                        <FaCalendarAlt size={9} className="text-[#AC292A] flex-shrink-0" />
                        <span className="text-[10px] font-semibold text-[#AC292A] uppercase tracking-wide">
                            {formatDate(data.createdAt)}
                        </span>
                    </div>
                )}
                <h4 className="text-[13px] font-semibold text-[#192133] group-hover:text-[#AC292A] transition-colors duration-200 leading-snug line-clamp-2">
                    {data?.title}
                </h4>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#AC292A] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Read <FaArrowRight size={9} />
                </span>
            </div>
        </Link>
    );
};

// ── Main Component ─────────────────────────────────────────────
function SingleBlog({ serverData }) {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [singleBlog, setSingleBlog] = useState(serverData || null);
    const [blogs, setBlogs] = useState([]);
    const [blogProducts, setBlogProducts] = useState([]);
    const blogProductsScrollRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/blog/get?slug=${slug}`);
            if (!response?.data?.data) { navigate('/404'); return; }
            setSingleBlog(response?.data?.data);
            if (response?.data?.data?._id) fetchBlogProducts(response.data.data._id);
        } catch { navigate('/404'); }
    };

    const fetchBlogProducts = async (blogId) => {
        try {
            const response = await axios.get(`${BaseUrl}/blog-product/blog/${blogId}`);
            if (response?.data?.data) {
                setBlogProducts(
                    response.data.data.map(bp => bp.productId).filter(Boolean)
                );
            }
        } catch {}
    };

    const fetchAllBlogs = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/blog/getAll`);
            setBlogs(response?.data?.data || []);
        } catch {}
    };

    useEffect(() => { fetchBlogs(); fetchAllBlogs(); }, [slug]);

    useEffect(() => {
        const el = document.querySelector('.blog_content');
        if (el) {
            Array.from(el.querySelectorAll('h1,h2,h3,h4,h5,h6')).forEach((h, i) => {
                if (!h.id) h.id = `section-${i}-${h.textContent.toLowerCase().replace(/[^\w\s]/g,'').replace(/\s+/g,'-')}`;
            });
        }
    }, [singleBlog]);

    const formatDate = (d) => {
        if (!d) return '';
        return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const calcReadTime = (content) => {
        if (!content) return 5;
        return Math.ceil(content.replace(/<[^>]*>/g,'').split(/\s+/).length / 200) || 5;
    };

    const scrollProducts = (dir) => {
        if (blogProductsScrollRef.current) {
            const w = blogProductsScrollRef.current.firstChild?.clientWidth || 260;
            blogProductsScrollRef.current.scrollTo({
                left: blogProductsScrollRef.current.scrollLeft + (dir === 'right' ? w : -w),
                behavior: 'smooth',
            });
        }
    };

    return (
        <>
            <div className="bg-[#f7f8fc] min-h-screen">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <div className="flex gap-7 flex-col lg:flex-row">

                        {/* ══ LEFT — Main Content ══════════════════════════ */}
                        <div className="flex-1 min-w-0 flex flex-col gap-6">

                            {/* ── Hero Block ── */}
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

                                {/* Image */}
                                {singleBlog?.image && (
                                    <div className="relative w-full overflow-hidden group aspect-[16/7]">
                                        <img
                                            src={`${BaseUrl}/${singleBlog.image}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                            alt={singleBlog?.imageAltText || singleBlog?.title}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#192133]/60 via-[#192133]/10 to-transparent pointer-events-none" />
                                        {/* Badge */}
                                        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#AC292A] text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                                            Knowledge Base
                                        </span>
                                    </div>
                                )}

                                {/* Title area */}
                                <div className="px-6 md:px-10 py-7">
                                    {/* Meta pills */}
                                    <div className="flex flex-wrap items-center gap-3 mb-5">
                                        {singleBlog?.createdAt && (
                                            <div className="flex items-center gap-1.5 bg-[#AC292A]/8 px-3 py-1.5 rounded-full">
                                                <FaCalendarAlt size={10} className="text-[#AC292A]" />
                                                <span className="text-[11px] font-bold text-[#AC292A] uppercase tracking-wide">
                                                    {formatDate(singleBlog.createdAt)}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
                                            <FaClock size={10} className="text-gray-400" />
                                            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                                                {calcReadTime(singleBlog?.content)} min read
                                            </span>
                                        </div>
                                    </div>

                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#192133] leading-tight">
                                        {singleBlog?.title}
                                    </h1>

                                    {/* Bottom accent */}
                                    <div className="flex items-center gap-3 mt-5">
                                        <div className="h-1 w-12 rounded-full bg-[#AC292A]" />
                                        <div className="h-1 w-4 rounded-full bg-[#AC292A]/30" />
                                        <div className="h-1 w-2 rounded-full bg-[#AC292A]/15" />
                                    </div>
                                </div>
                            </div>

                            {/* ── Article Body ── */}
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
                                <article className="blog_content px-6 md:px-10 py-8 md:py-10">
                                    <div
                                        className="
                                            text-gray-700 leading-relaxed text-base md:text-[17px]
                                            [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-[#192133] [&_h1]:mt-10 [&_h1]:mb-4
                                            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#192133] [&_h2]:mt-8 [&_h2]:mb-3
                                            [&_h2]:pl-4 [&_h2]:border-l-[3px] [&_h2]:border-[#AC292A]
                                            [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#192133] [&_h3]:mt-6 [&_h3]:mb-2
                                            [&_p]:mb-5 [&_p]:leading-[1.85]
                                            [&_a]:text-[#AC292A] [&_a]:font-medium [&_a]:underline-offset-2 [&_a:hover]:underline
                                            [&_strong]:text-[#192133] [&_strong]:font-semibold
                                            [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:my-7 [&_img]:w-full [&_img]:h-auto
                                            [&_blockquote]:border-l-4 [&_blockquote]:border-[#AC292A] [&_blockquote]:pl-5 [&_blockquote]:pr-5 [&_blockquote]:py-4 [&_blockquote]:italic [&_blockquote]:bg-[#AC292A]/5 [&_blockquote]:rounded-r-2xl [&_blockquote]:my-7 [&_blockquote]:text-[#192133]/80
                                            [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-5 [&_ul]:space-y-2
                                            [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-5 [&_ol]:space-y-2
                                            [&_li]:leading-7
                                            [&_table]:w-full [&_table]:border-collapse [&_table]:my-7 [&_table]:rounded-xl [&_table]:overflow-hidden [&_table]:shadow-sm
                                            [&_th]:bg-[#192133] [&_th]:text-white [&_th]:px-4 [&_th]:py-3 [&_th]:text-sm [&_th]:font-semibold [&_th]:text-left
                                            [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm [&_td]:border-b [&_td]:border-gray-100
                                            [&_tr:nth-child(even)_td]:bg-gray-50
                                            [&_code]:bg-[#192133]/6 [&_code]:text-[#AC292A] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                                            [&_pre]:bg-[#192133] [&_pre]:text-gray-200 [&_pre]:rounded-2xl [&_pre]:p-5 [&_pre]:my-6 [&_pre]:overflow-x-auto
                                            [&_hr]:border-gray-100 [&_hr]:my-8
                                        "
                                        dangerouslySetInnerHTML={{ __html: singleBlog?.content }}
                                    />
                                </article>
                            </div>

                            {/* ── Related Products ── */}
                            {blogProducts?.length > 0 && (
                                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-1 h-8 rounded-full bg-[#AC292A]" />
                                        <div>
                                            <h2 className="text-xl font-bold text-[#192133]">Related Products</h2>
                                            <p className="text-gray-400 text-xs mt-0.5">Products featured in this article</p>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div
                                            ref={blogProductsScrollRef}
                                            className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
                                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                        >
                                            {blogProducts.map((product, index) => (
                                                <div key={product._id || index} className="w-[78vw] sm:w-[260px] flex-shrink-0 snap-start">
                                                    <ProductCard data={product} disableSelection={true} />
                                                </div>
                                            ))}
                                        </div>

                                        {blogProducts.length > 2 && (
                                            <>
                                                <button
                                                    onClick={() => scrollProducts('left')}
                                                    className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-[#192133] hover:bg-[#192133] hover:text-white hover:border-[#192133] transition-all duration-200"
                                                >
                                                    <FaChevronLeft size={13} />
                                                </button>
                                                <button
                                                    onClick={() => scrollProducts('right')}
                                                    className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-[#192133] hover:bg-[#192133] hover:text-white hover:border-[#192133] transition-all duration-200"
                                                >
                                                    <FaChevronRight size={13} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ══ RIGHT — Sidebar ══════════════════════════════ */}
                        <div className="lg:w-[340px] xl:w-[360px] flex-shrink-0 lg:sticky lg:top-8 lg:self-start">
                            <div className="flex flex-col gap-5">

                                {/* Table of Contents */}
                                {singleBlog?.content && (
                                    <TableOfContent content={singleBlog.content} />
                                )}

                                {/* ── Latest Articles (horizontal cards) ── */}
                                {blogs?.length > 0 && (
                                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                                        {/* Header */}
                                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-1 h-6 rounded-full bg-[#AC292A]" />
                                                <h2 className="text-base font-bold text-[#192133]">Latest Articles</h2>
                                            </div>
                                          
                                        </div>

                                        {/* Article rows */}
                                        <div className="divide-y divide-gray-50 px-2 py-2">
                                            {blogs.slice(0, 6).map((item, index) => (
                                                <MiniArticleCard key={item._id || index} data={item} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* ── CTA Card ── */}
                                <div className="relative rounded-3xl overflow-hidden bg-[#192133]">
                                    {/* Decorative blobs */}
                                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#AC292A]/25 blur-3xl pointer-events-none" />
                                    <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#AC292A]/15 blur-3xl pointer-events-none" />
                                    {/* Dot pattern */}
                                    <div
                                        className="absolute inset-0 opacity-[0.04] pointer-events-none"
                                        style={{
                                            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                                            backgroundSize: '18px 18px',
                                        }}
                                    />

                                    <div className="relative z-10 p-7 text-center">
                                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#AC292A]/20 mb-5">
                                            <svg className="w-7 h-7 text-[#AC292A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                        <h3 className="text-white font-bold text-lg mb-2 leading-snug">
                                            Need Custom Packaging?
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                            Get a free quote tailored to your exact requirements.
                                        </p>
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="w-full py-3 px-5 rounded-xl bg-[#AC292A] text-white text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:bg-[#AC292A]/90 hover:shadow-[0_6px_20px_rgba(172,41,42,0.45)] active:scale-[0.98]"
                                        >
                                            Get Free Quote
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <GetQuoteModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        </>
    );
}

export default SingleBlog;