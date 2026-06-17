import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const cn = (...i: ClassValue[]) => twMerge(clsx(i));
export const fmt = (d: Date) =>
  d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
export const countdown = (to: Date, now = new Date()) => {
  const ms = Math.max(0, to.getTime() - now.getTime());
  const h = Math.floor(ms / 3.6e6); const m = Math.floor((ms % 3.6e6) / 6e4);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};
