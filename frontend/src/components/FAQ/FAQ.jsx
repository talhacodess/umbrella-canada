import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '../common/Accordion';
import { BaseUrl } from '../../utils/BaseUrl';
import faqImage from '../../assets/images/faq.webp';
import Button from '../common/Button';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';

const FAQ = ({ serverData, faqImageUrl, faqImageAltText }) => {
  const stripHtml = (html) => {
    if (!html) return '';
    if (typeof document === 'undefined') {
      return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    }
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const processFAQs = (faqs) => {
    if (!faqs || !Array.isArray(faqs)) return [];
    return faqs.map((faq, index) => ({
      key: index + 1,
      id: String(index + 1).padStart(2, '0'),
      title: faq.question,
      data: stripHtml(faq.answer),
      isOpen: false,
    }));
  };

  const [accordions, setAccordions] = useState(() => processFAQs(serverData));
  const [loading, setLoading] = useState(!serverData);

  useEffect(() => {
    if (serverData && serverData.length > 0) {
      setAccordions(processFAQs(serverData));
      setLoading(false);
      return;
    }
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BaseUrl}/faq/getAll`);
        if (response.data.status === 'success' && response.data.data) {
          setAccordions(processFAQs(response.data.data));
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, [serverData]);

  const toggleAccordion = (accordionKey) => {
    setAccordions(accordions.map((accordion) =>
      accordion.key === accordionKey
        ? { ...accordion, isOpen: !accordion.isOpen }
        : { ...accordion, isOpen: false }
    ));
  };

  if (loading) {
    return (
      <section className="faq-section">
        <style>{CSS}</style>
        <div className="faq-container">
          <div className="faq-header">
          
            <h2 className="faq-title">Frequently Asked <em>Questions</em></h2>
            <Button label="View All FAQs" variant="red" size="md" className="faq-cta-btn" rIcons={<FaArrowDown color="white" />} />
          </div>
          <div className="faq-loading">
            <div className="faq-spinner" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="faq-section">
      <style>{CSS}</style>

      <div className="faq-grid-bg" aria-hidden="true" />

      <div className="faq-container">
        {/* Header */}
        <div className="faq-header">
         
          <h2 className="faq-title">Frequently Asked <em>Questions</em></h2>
          <p className="faq-subtitle">Everything you need to know, answered clearly.</p>
          <Button
            label="View All FAQs"
            variant="red"
            size="md"
            className="faq-cta-btn"
            rIcons={<FaArrowRight color="white" />}
          />
        </div>

        {/* Body */}
        <div className="faq-body">
          {/* Image */}
          <div className="faq-image-wrap">
            <img
              src={faqImageUrl ? `${BaseUrl}/${faqImageUrl}` : faqImage}
              alt={faqImageAltText || 'FAQ'}
              className="faq-img"
              loading="lazy"
            />
          </div>

          {/* Accordions */}
          <div className="faq-list">
            {accordions.map((accordion, index) => (
              <div
                key={accordion.key}
                className="faq-item"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <Accordion
                  id={accordion.id}
                  title={accordion.title}
                  data={accordion.data}
                  isOpen={accordion.isOpen}
                  toggleAccordion={() => toggleAccordion(accordion.key)}
                  customKey={`${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CSS = `
  

  :root {
    --navy: #192133;
    --red:  #AC292A;
    --red-light: rgba(172,41,42,0.08);
    --navy-light: rgba(25,33,51,0.06);
    --white: #ffffff;
    --surface: #f5f6f8;
    --border: #e4e6eb;
    --text-muted: #6b7280;
  }

  /* ── Section ── */
  .faq-section {
    position: relative;
    background: var(--white);
    padding: 96px 0 104px;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
  }

  /* subtle grid overlay */
  .faq-grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 48px 48px;
    opacity: 0.35;
    pointer-events: none;
  }

  /* ── Container ── */
  .faq-container {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 28px;
    position: relative;
    z-index: 1;
  }

  /* ── Header ── */
  .faq-header {
    text-align: center;
    margin-bottom: 64px;
  }

  
  .faq-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(30px, 4.5vw, 48px);
    font-weight: 800;
    color: var(--navy);
    margin: 0 0 14px;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  .faq-title em {
    font-style: normal;
    color: var(--red);
    position: relative;
  }

  .faq-title em::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 2px;
    width: 100%;
    height: 3px;
    background: var(--red);
    border-radius: 2px;
    opacity: 0.3;
  }

  .faq-subtitle {
    font-size: 15px;
    color: var(--text-muted);
    margin: 0 0 28px;
    font-weight: 400;
  }

  .faq-cta-btn {
    display: inline-flex !important;
    align-items: center;
    gap: 8px;
    font-family: 'DM Sans', sans-serif !important;
    font-weight: 600 !important;
    letter-spacing: 0.06em;
    border-radius: 8px !important;
    transition: transform 0.2s ease, box-shadow 0.2s ease !important;
  }

  .faq-cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(172,41,42,0.28) !important;
  }

  /* ── Body layout ── */
  .faq-body {
    display: flex;
    align-items: stretch;
    gap: 48px;
    flex-wrap: wrap;
  }

  /* ── Image ── */
  .faq-image-wrap {
    flex: 1 1 0;
    min-width: 300px;
    position: sticky;
    top: 80px;
    align-self: stretch;
  }

  .faq-img {
    width: 100%;
    height: 100%;
    min-height: 480px;
    object-fit: contain;
    object-position: center;
    display: block;
  }

  /* ── Accordion list ── */
  .faq-list {
    flex: 1 1 0;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .faq-item {
    border-radius: 12px;
    border: 1.5px solid var(--border);
    background: var(--white);
    overflow: hidden;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
    animation: faqIn 0.45s cubic-bezier(0.22,1,0.36,1) both;
  }

  .faq-item:hover {
    border-color: rgba(172,41,42,0.4);
    box-shadow: 0 4px 20px rgba(172,41,42,0.09);
    transform: translateX(3px);
  }

  @keyframes faqIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Loading ── */
  .faq-loading {
    display: flex;
    justify-content: center;
    padding: 80px 0;
  }

  .faq-spinner {
    width: 36px;
    height: 36px;
    border: 3px solid var(--red-light);
    border-top-color: var(--red);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .faq-section { padding: 64px 0 72px; }
    .faq-header { margin-bottom: 40px; }
    .faq-body { gap: 40px; }
    .faq-image-wrap { width: 100%; position: static; }
    .faq-item:hover { transform: none; }
  }
`;

export default FAQ;