import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface PanelItem {
  id: string;
  title: string;
  description: string;
  confidence?: number;
  date?: string;
  icon?: string;
  accentColor?: string;
  isNew?: boolean;
}

interface ContentPanelsProps {
  items: PanelItem[];
  accentColor?: string;
}

const confidenceLabels: Record<number, string> = {
  1: 'Low', 2: 'Moderate', 3: 'Good', 4: 'Strong', 5: 'Very Strong',
};

const confidenceColors: Record<number, string> = {
  1: '#ef4444', 2: '#f97316', 3: '#eab308', 4: '#22c55e', 5: '#16a34a',
};

export default function ContentPanels({ items, accentColor = '#818cf8' }: ContentPanelsProps) {
  const [selectedItem, setSelectedItem] = useState<PanelItem | null>(null);
  const [modalHtml, setModalHtml] = useState<string>('');
  const sectionsHidden = useRef(false);

  // On mount, hide the original markdown sections
  useEffect(() => {
    if (sectionsHidden.current) return;
    sectionsHidden.current = true;

    // Find and hide all sections matching our IDs
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) {
        el.style.display = 'none';
      }
    });

    // Also hide <hr> elements between sections (the --- separators)
    const markdownContent = document.querySelector('.sl-markdown-content');
    if (markdownContent) {
      const hrs = markdownContent.querySelectorAll('hr');
      hrs.forEach((hr) => {
        (hr as HTMLElement).style.display = 'none';
      });
    }
  }, [items]);

  const openPanel = useCallback((item: PanelItem) => {
    const section = document.getElementById(item.id);
    if (section) {
      // Temporarily show it to grab innerHTML
      section.style.display = '';
      setModalHtml(section.innerHTML);
      section.style.display = 'none';
    }
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
    // Hide Starlight's "On this page" TOC and right sidebar so they don't overlap
    document.querySelectorAll('starlight-toc, .right-sidebar, .right-sidebar-panel, [data-pagefind-ignore="all"]').forEach((el) => {
      (el as HTMLElement).style.display = 'none';
    });
  }, []);

  const closeModal = useCallback(() => {
    setSelectedItem(null);
    setModalHtml('');
    document.body.style.overflow = '';
    // Restore Starlight's TOC
    document.querySelectorAll('starlight-toc, .right-sidebar, .right-sidebar-panel, [data-pagefind-ignore="all"]').forEach((el) => {
      (el as HTMLElement).style.display = '';
    });
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  return (
    <>
      {/* Panel grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1rem',
        marginTop: '1.5rem',
      }}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => openPanel(item)}
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
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = 'rgba(25, 25, 55, 0.65)';
              el.style.borderColor = 'rgba(255, 255, 255, 0.14)';
              el.style.transform = 'translateY(-3px)';
              el.style.boxShadow = `0 12px 40px ${accentColor}20, inset 0 1px 0 rgba(255, 255, 255, 0.06)`;
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
              background: `linear-gradient(90deg, transparent, ${item.accentColor || accentColor}50, transparent)`,
            }} />

            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {item.icon && <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>}
                {item.isNew && (
                  <span style={{
                    padding: '2px 7px',
                    borderRadius: '9999px',
                    fontSize: '0.55rem',
                    fontWeight: 800,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.08em',
                    color: '#fbbf24',
                    background: 'rgba(251, 191, 36, 0.15)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                  }}>
                    NEW
                  </span>
                )}
              </div>

              {item.confidence && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: i < item.confidence!
                          ? confidenceColors[item.confidence!]
                          : 'rgba(255, 255, 255, 0.12)',
                      }}
                    />
                  ))}
                  <span style={{
                    marginLeft: '4px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: confidenceColors[item.confidence],
                  }}>
                    {confidenceLabels[item.confidence]}
                  </span>
                </span>
              )}
            </div>

            {/* Title */}
            <h3 style={{
              margin: '0 0 0.5rem',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.93)',
              lineHeight: 1.3,
            }}>
              {item.title}
            </h3>

            {/* Description */}
            <p style={{
              margin: 0,
              fontSize: '0.84rem',
              lineHeight: 1.55,
              color: 'rgba(255, 255, 255, 0.5)',
              flex: 1,
            }}>
              {item.description}
            </p>

            {/* Footer */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
              {item.date && (
                <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.3)' }}>
                  {new Date(item.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              )}
              <span style={{
                fontSize: '0.75rem',
                color: item.accentColor || accentColor,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}>
                Read more
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && createPortal(
        <>
          {/* Close button — fixed position, completely independent of modal content */}
          <button
            onClick={() => closeModal()}
            type="button"
            style={{
              position: 'fixed',
              top: '1.5rem',
              right: '1.5rem',
              zIndex: 10001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(20, 20, 40, 0.9)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: 'rgba(255, 255, 255, 0.8)',
              cursor: 'pointer',
              fontSize: '1.5rem',
              lineHeight: 1,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              pointerEvents: 'auto',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(239, 68, 68, 0.3)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239, 68, 68, 0.5)';
              (e.currentTarget as HTMLElement).style.color = '#fca5a5';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(20, 20, 40, 0.9)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.2)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.8)';
            }}
            aria-label="Close"
          >
            &times;
          </button>

          {/* Backdrop */}
          <div
            onClick={() => closeModal()}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              animation: 'cpFadeIn 0.2s ease',
            }}
          />

          {/* Modal box */}
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10000,
            width: 'calc(100% - 3rem)',
            maxWidth: '900px',
            maxHeight: '88vh',
            background: 'rgba(12, 12, 32, 0.94)',
            backdropFilter: 'blur(24px) saturate(1.5)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: `0 24px 80px rgba(0, 0, 0, 0.5), 0 0 40px ${selectedItem.accentColor || accentColor}20`,
            animation: 'cpSlideUp 0.25s ease',
            pointerEvents: 'auto',
          }}>
            {/* Modal header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem 1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
              background: 'rgba(0, 0, 0, 0.25)',
              flexShrink: 0,
            }}>
              {selectedItem.icon && <span style={{ fontSize: '1.25rem', marginRight: '0.75rem' }}>{selectedItem.icon}</span>}
              <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.95)' }}>
                {selectedItem.title}
              </h2>
              {selectedItem.confidence && (
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: confidenceColors[selectedItem.confidence],
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: `${confidenceColors[selectedItem.confidence]}18`,
                  marginLeft: '0.75rem',
                  flexShrink: 0,
                }}>
                  {selectedItem.confidence}/5
                </span>
              )}
            </div>

            {/* Modal content */}
            <div
              className="sl-markdown-content"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.5rem 2rem 2rem',
              }}
              dangerouslySetInnerHTML={{ __html: modalHtml }}
            />
          </div>
        </>,
        document.body
      )}

      <style>{`
        @keyframes cpFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cpSlideUp {
          from { opacity: 0; transform: translate(-50%, -50%) translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translate(-50%, -50%) translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
