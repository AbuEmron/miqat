// MIQAT design tokens — single source of truth for brand + product.
export const tokens = {
  color: {
    ivory: '#FBF8F1', ivorySoft: '#F3ECDD',
    emerald: '#0E5C45', emeraldDeep: '#073529',
    gold: '#C9A24B', goldSoft: '#D8B96E',
    ink: '#13201B', inkDeep: '#0B1410',
    success: '#2E9E6B', muted: '#6B7A72'
  },
  radius: { sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem', pill: '999px' },
  space: [0, 4, 8, 12, 16, 24, 32, 48, 64],
  type: {
    display: { size: 40, weight: 600, tracking: '-0.02em' },
    title:   { size: 24, weight: 600 },
    body:    { size: 16, weight: 400, leading: 1.6 },
    label:   { size: 13, weight: 500, tracking: '0.04em' }
  },
  motion: { gentle: 'cubic-bezier(0.22,1,0.36,1)', dur: { fast: 180, base: 320, slow: 560 } }
} as const;

export const PRAYERS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;
export type Prayer = (typeof PRAYERS)[number];
