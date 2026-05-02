import type { Practice } from '../data/practices';

interface ComparisonTableProps {
  practice: Practice;
}

export default function ComparisonTable({ practice }: ComparisonTableProps) {
  if (!practice.proArguments || !practice.conArguments) return null;

  return (
    <div style={{
      border: '1px solid var(--sl-color-gray-5)',
      borderRadius: '8px',
      overflow: 'hidden',
      margin: '1rem 0',
      fontFamily: 'var(--sl-font, system-ui, sans-serif)',
    }}>
      <div style={{
        padding: '0.75rem 1rem',
        backgroundColor: 'var(--sl-color-gray-6)',
        borderBottom: '1px solid var(--sl-color-gray-5)',
      }}>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--sl-color-white)' }}>
          {practice.title}
        </h4>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--sl-color-gray-3)' }}>
          {practice.summary}
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Pro column */}
        <div style={{ padding: '1rem', borderRight: '1px solid var(--sl-color-gray-5)' }}>
          <h5 style={{
            margin: '0 0 0.75rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#22c55e',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
          }}>
            Arguments For
          </h5>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', listStyle: 'disc' }}>
            {practice.proArguments.map((arg, i) => (
              <li key={i} style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--sl-color-gray-2)', marginBottom: '0.5rem' }}>
                {arg}
              </li>
            ))}
          </ul>
        </div>
        {/* Con column */}
        <div style={{ padding: '1rem' }}>
          <h5 style={{
            margin: '0 0 0.75rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#ef4444',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
          }}>
            Arguments Against
          </h5>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', listStyle: 'disc' }}>
            {practice.conArguments.map((arg, i) => (
              <li key={i} style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--sl-color-gray-2)', marginBottom: '0.5rem' }}>
                {arg}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
