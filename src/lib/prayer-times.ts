import {
  CalculationMethod, Coordinates, PrayerTimes, Qibla, Madhab, SunnahTimes
} from 'adhan';
import type { Prayer } from './design-tokens';

export type Method =
  | 'mwl' | 'isna' | 'egypt' | 'makkah' | 'karachi' | 'tehran' | 'singapore' | 'turkey';

const methodMap: Record<Method, () => any> = {
  mwl: CalculationMethod.MuslimWorldLeague,
  isna: CalculationMethod.NorthAmerica,
  egypt: CalculationMethod.Egyptian,
  makkah: CalculationMethod.UmmAlQura,
  karachi: CalculationMethod.Karachi,
  tehran: CalculationMethod.Tehran,
  singapore: CalculationMethod.Singapore,
  turkey: CalculationMethod.Turkey
};

export interface TimesInput {
  lat: number; lng: number; date?: Date; method?: Method; madhab?: 'shafi' | 'hanafi';
}

export interface DayTimes {
  fajr: Date; sunrise: Date; dhuhr: Date; asr: Date; maghrib: Date; isha: Date;
  qiyam?: Date; lastThird?: Date;
}

// Pure, offline-capable: no network needed once coordinates are known.
export function computeTimes(input: TimesInput): DayTimes {
  const { lat, lng, date = new Date(), method = 'mwl', madhab = 'shafi' } = input;
  const coords = new Coordinates(lat, lng);
  const params = methodMap[method]();
  params.madhab = madhab === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi;
  const pt = new PrayerTimes(coords, date, params);
  const sunnah = new SunnahTimes(pt);
  return {
    fajr: pt.fajr, sunrise: pt.sunrise, dhuhr: pt.dhuhr,
    asr: pt.asr, maghrib: pt.maghrib, isha: pt.isha,
    qiyam: sunnah.lastThirdOfTheNight, lastThird: sunnah.middleOfTheNight
  };
}

export function nextPrayer(times: DayTimes, now = new Date()): { name: Prayer; at: Date } {
  const order: [Prayer, Date][] = [
    ['fajr', times.fajr], ['dhuhr', times.dhuhr], ['asr', times.asr],
    ['maghrib', times.maghrib], ['isha', times.isha]
  ];
  for (const [name, at] of order) if (at > now) return { name, at };
  return { name: 'fajr', at: times.fajr }; // tomorrow's fajr
}

export function qiblaDirection(lat: number, lng: number): number {
  return Qibla(new Coordinates(lat, lng)); // degrees from true north
}
