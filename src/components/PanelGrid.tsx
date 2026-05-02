import { useState } from 'react';
import { pages, categoryMeta, type PageEntry } from '../data/pages';

const categories = ['research', 'guides', 'templates', 'raw-notes'] as const;

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

function PanelCard({ page }: { page: PageEntry }) {
  const cat = categoryMeta[page.category];

  return (
    <a
      href={`${base}${page.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        width: '100%',
        padding: '1.5rem',
        background: 'rgba(15, 15, 35, 0.5)',
        backdropFilter: 'blur(16px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.3)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        borderRadius: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        color: 'inherit',
        fontFamily: 'inherit',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = 'rgba(25, 25, 55, 0.65)';
        el.style.borderColor = 'rgba(255, 255, 255, 0.14)';
        el.style.transform = 'translateY(-4px)';
        el.style.boxShadow = `0 12px 40px ${cat.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.06)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = 'rgba(15, 15, 35, 0.5)';
        el.style.borderColor = 'rgba(255, 255, 255, 0.07)';
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${cat.color}40, transparent)`,
      }} />

      {/* Header: icon + badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>{page.icon}</span>
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          {page.isNew && (
            <span style={{
              padding: '3px 8px',
              borderRadius: '9999px',
              fontSize: '0.6rem',
              fontWeight: 800,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
              color: '#fbbf24',
              background: 'rgba(251, 191, 36, 0.15)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              animation: 'newPulse 2s ease-in-out infinite',
            }}>
              NEW
            </span>
          )}
          <span style={{
            padding: '3px 10px',
            borderRadius: '9999px',
            fontSize: '0.65rem',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.08em',
            color: cat.color,
            background: `${cat.color}15`,
            border: `1px solid ${cat.color}25`,
          }}>
            {cat.label}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        margin: '0 0 0.5rem',
        fontSize: '1.1rem',
        fontWeight: 700,
        color: 'rgba(255, 255, 255, 0.95)',
        lineHeight: 1.3,
      }}>
        {page.title}
      </h3>

      {/* Description */}
      <p style={{
        margin: '0 0 1rem',
        fontSize: '0.85rem',
        lineHeight: 1.55,
        color: 'rgba(255, 255, 255, 0.55)',
        flex: 1,
      }}>
        {page.description}
      </p>

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: '0.75rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <span style={{
          fontSize: '0.75rem',
          color: cat.color,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          Read
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </div>
    </a>
  );
}

export default function PanelGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? pages
    : pages.filter((p) => p.category === activeCategory);

  return (
    <div style={{ fontFamily: 'var(--sl-font, system-ui, sans-serif)' }}>
      {/* Category filter tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '2rem',
        padding: '0.5rem',
        background: 'rgba(15, 15, 35, 0.4)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '12px',
      }}>
        <button
          onClick={() => setActiveCategory('all')}
          style={{
            padding: '8px 18px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: activeCategory === 'all' ? 'rgba(129, 140, 248, 0.2)' : 'transparent',
            color: activeCategory === 'all' ? '#a5b4fc' : 'rgba(255, 255, 255, 0.5)',
          }}
        >
          All ({pages.length})
        </button>
        {categories.map((cat) => {
          const meta = categoryMeta[cat];
          const count = pages.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: activeCategory === cat ? `${meta.color}20` : 'transparent',
                color: activeCategory === cat ? meta.color : 'rgba(255, 255, 255, 0.5)',
              }}
            >
              {meta.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Panel grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
      }}>
        {filtered.map((page) => (
          <PanelCard key={page.slug} page={page} />
        ))}
      </div>

      <style>{`
        @keyframes newPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
