'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, BookOpen, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { href: '/', label: 'Today', icon: Home },
  { href: '/qibla', label: 'Qibla', icon: Compass },
  { href: '/library', label: 'Library', icon: BookOpen },
  { href: '/privacy', label: 'Privacy', icon: Shield }
];

export function BottomNav() {
  const path = usePathname();
  return (
    <nav className="glass safe-b fixed inset-x-0 bottom-0 z-40 flex justify-around rounded-t-3xl px-2 pt-2">
      {items.map(({ href, label, icon: Icon }) => {
        const active = path === href;
        return (
          <Link key={href} href={href}
            className={cn('flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-medium transition-colors',
              active ? 'text-emerald-600' : 'text-[var(--muted)]')}>
            <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
