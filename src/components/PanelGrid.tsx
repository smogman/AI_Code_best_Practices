import { courses } from '../data/pages';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function PanelGrid() {
  return (
    <div style={{ fontFamily: 'var(--sl-font, system-ui, sans-serif)' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
      }}>
        {courses.map((course) => (
          <a
            key={course.slug}
            href={`${base}${course.slug}`}
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
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = 'rgba(25, 25, 55, 0.65)';
              el.style.borderColor = 'rgba(255, 255, 255, 0.14)';
              el.style.transform = 'translateY(-4px)';
              el.style.boxShadow = `0 12px 40px ${course.badgeColor}30`;
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
              background: `linear-gradient(90deg, transparent, ${course.badgeColor}50, transparent)`,
            }} />

            {/* Badge row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{
                padding: '3px 10px',
                borderRadius: '9999px',
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
                color: course.badgeColor,
                background: `${course.badgeColor}15`,
                border: `1px solid ${course.badgeColor}30`,
              }}>
                {course.badge}
              </span>
              <span style={{
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.35)',
              }}>
                {course.lessons} lessons
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              margin: '0 0 0.5rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.95)',
              lineHeight: 1.3,
            }}>
              {course.title}
            </h3>

            {/* Description */}
            <p style={{
              margin: '0 0 1rem',
              fontSize: '0.85rem',
              lineHeight: 1.55,
              color: 'rgba(255, 255, 255, 0.55)',
              flex: 1,
            }}>
              {course.description}
            </p>

            {/* Footer */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
              <span style={{
                fontSize: '0.75rem',
                color: course.badgeColor,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                Start course
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
