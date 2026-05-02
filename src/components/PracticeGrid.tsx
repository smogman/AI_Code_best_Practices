import { useState, useMemo } from 'react';
import type { Practice, PracticeCategory, PracticeTag } from '../data/practices';

interface PracticeGridProps {
  practices: Practice[];
}

const categoryConfig: Record<PracticeCategory, { label: string; color: string; bg: string; border: string }> = {
  consensus: { label: 'Consensus', color: '#166534', bg: '#dcfce7', border: '#86efac' },
  contested: { label: 'Contested', color: '#92400e', bg: '#fef3c7', border: '#fcd34d' },
  advanced: { label: 'Advanced', color: '#1e3a5f', bg: '#dbeafe', border: '#93c5fd' },
  'failure-mode': { label: 'Pitfall', color: '#991b1b', bg: '#fee2e2', border: '#fca5a5' },
};

const confidenceLabels: Record<number, string> = {
  1: 'Low', 2: 'Moderate', 3: 'Good', 4: 'Strong', 5: 'Very Strong',
};

const confidenceColors: Record<number, string> = {
  1: '#ef4444', 2: '#f97316', 3: '#eab308', 4: '#22c55e', 5: '#16a34a',
};

export default function PracticeGrid({ practices }: PracticeGridProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PracticeCategory | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<PracticeTag | 'all'>('all');

  const allTags = useMemo(() => {
    const tags = new Set<PracticeTag>();
    practices.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [practices]);

  const filtered = useMemo(() => {
    return practices.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedTag !== 'all' && !p.tags.includes(selectedTag)) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [practices, search, selectedCategory, selectedTag]);

  return (
    <div style={{ fontFamily: 'var(--sl-font, system-ui, sans-serif)' }}>
      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search practices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid var(--sl-color-gray-5)',
            borderRadius: '8px',
            background: 'var(--sl-color-bg)',
            color: 'var(--sl-color-white)',
            fontSize: '0.9rem',
            minWidth: '200px',
            flex: '1',
          }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as PracticeCategory | 'all')}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid var(--sl-color-gray-5)',
            borderRadius: '8px',
            background: 'var(--sl-color-bg)',
            color: 'var(--sl-color-white)',
            fontSize: '0.9rem',
          }}
        >
          <option value="all">All Categories</option>
          <option value="consensus">Consensus</option>
          <option value="contested">Contested</option>
          <option value="advanced">Advanced</option>
          <option value="failure-mode">Failure Modes</option>
        </select>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value as PracticeTag | 'all')}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid var(--sl-color-gray-5)',
            borderRadius: '8px',
            background: 'var(--sl-color-bg)',
            color: 'var(--sl-color-white)',
            fontSize: '0.9rem',
          }}
        >
          <option value="all">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
        <span style={{ fontSize: '0.85rem', color: 'var(--sl-color-gray-3)' }}>
          {filtered.length} of {practices.length}
        </span>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>
        {filtered.map((practice) => {
          const cat = categoryConfig[practice.category];
          return (
            <div
              key={practice.id}
              style={{
                border: '1px solid var(--sl-color-gray-5)',
                borderLeft: `4px solid ${cat.border}`,
                borderRadius: '8px',
                padding: '1.25rem',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    padding: '2px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.05em',
                    color: cat.color,
                    backgroundColor: cat.bg,
                  }}
                >
                  {cat.label}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: i < practice.confidence
                          ? confidenceColors[practice.confidence]
                          : 'var(--sl-color-gray-5)',
                      }}
                    />
                  ))}
                  <span style={{ color: confidenceColors[practice.confidence], fontWeight: 600, fontSize: '0.75rem', marginLeft: '2px' }}>
                    {confidenceLabels[practice.confidence]}
                  </span>
                </span>
              </div>

              {/* Title */}
              <h3 style={{ margin: '0.5rem 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--sl-color-white)' }}>
                {practice.title}
              </h3>

              {/* Summary */}
              <p style={{ margin: '0.5rem 0', fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--sl-color-gray-2)' }}>
                {practice.summary}
              </p>

              {/* Pro/Con for contested */}
              {practice.category === 'contested' && practice.proArguments && practice.conArguments && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.8rem' }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#22c55e' }}>For:</strong>
                    <span style={{ color: 'var(--sl-color-gray-3)', marginLeft: '0.25rem' }}>
                      {practice.proArguments[0]}
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: '#ef4444' }}>Against:</strong>
                    <span style={{ color: 'var(--sl-color-gray-3)', marginLeft: '0.25rem' }}>
                      {practice.conArguments[0]}
                    </span>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {practice.tags.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      style={{
                        padding: '1px 8px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        backgroundColor: selectedTag === tag ? 'var(--sl-color-accent)' : 'var(--sl-color-gray-6)',
                        color: selectedTag === tag ? 'white' : 'var(--sl-color-gray-3)',
                        cursor: 'pointer',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--sl-color-gray-3)' }}>
                  {practice.sourceIds.length} src
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--sl-color-gray-3)' }}>
          No practices match your filters.
        </div>
      )}
    </div>
  );
}
