'use client';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { computeTimes, nextPrayer, type Method } from '@/lib/prayer-times';
import { PRAYERS, type Prayer } from '@/lib/design-tokens';
import { fmt, countdown } from '@/lib/utils';

const LABEL: Record<Prayer, string> = {
  fajr: 'Fajr', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha'
};

export default function Today() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [now, setNow] = useState(new Date());
  const [logged, setLogged] = useState<Record<string, boolean>>({});

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (p) => setCoords({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => setCoords({ lat: 21.4225, lng: 39.8262 }), // Makkah fallback
      { enableHighAccuracy: false, timeout: 8000 }
    );
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const times = useMemo(
    () => (coords ? computeTimes({ ...coords, method: 'mwl' as Method }) : null),
    [coords]
  );
  const next = times ? nextPrayer(times, now) : null;

  return (
    <div className="pt-14">
      <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
        {now.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
      </p>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="mt-4 overflow-hidden p-6">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-500/10 animate-breathe" />
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-emerald-600">Next prayer</p>
          {next ? (
            <>
              <h1 className="serif mt-1 text-5xl font-semibold text-[var(--text)]">{LABEL[next.name]}</h1>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-2xl font-semibold">{fmt(next.at)}</span>
                <span className="text-sm text-[var(--muted)]">in {countdown(next.at, now)}</span>
              </div>
            </>
          ) : (
            <h1 className="serif mt-1 text-3xl text-[var(--muted)]">Locating…</h1>
          )}
          <p className="mt-4 flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <MapPin size={13} /> {coords ? 'Your location · offline-ready' : 'Awaiting location'}
          </p>
        </Card>
      </motion.div>

      <h2 className="mt-8 text-sm font-medium uppercase tracking-[0.14em] text-[var(--muted)]">Today</h2>
      <div className="mt-3 space-y-2">
        {times && PRAYERS.map((p, i) => {
          const at = times[p] as Date;
          const isNext = next?.name === p;
          const done = logged[p];
          return (
            <motion.div key={p} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className={`flex items-center justify-between px-4 py-3 ${isNext ? 'shadow-glow' : ''}`}>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setLogged((s) => ({ ...s, [p]: !s[p] }))}
                    aria-label={`Log ${LABEL[p]}`}
                    className={`grid h-7 w-7 place-items-center rounded-full border transition-all
                      ${done ? 'border-emerald-600 bg-emerald-600 text-ivory' : 'hairline text-transparent'}`}
                  >
                    <Check size={15} />
                  </button>
                  <span className={`font-medium ${isNext ? 'text-emerald-600' : ''}`}>{LABEL[p]}</span>
                </div>
                <span className="tabular-nums text-[var(--muted)]">{fmt(at)}</span>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
