window.TravelLogic = (() => {
  const seasons = ['winter', 'spring', 'summer', 'autumn'];
  function parseLocal(dateStr) { const [y, m, d] = (dateStr || '').split('-').map(Number); return new Date(y, m - 1, d); }
  function dateISO(date) { return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-'); }
  function addDays(date, n) { const d = parseLocal(date); d.setDate(d.getDate() + n); return dateISO(d); }
  function daysBetween(start, end) { return Math.round((parseLocal(end) - parseLocal(start)) / 86400000); }
  function seasonForDate(iso) { const m = parseLocal(iso).getMonth() + 1; return m === 12 || m <= 2 ? 'winter' : m <= 5 ? 'spring' : m <= 8 ? 'summer' : 'autumn'; }
  function isValidRange(a, b, max = 14) { if (!a || !b) return false; const n = daysBetween(a, b); return Number.isFinite(n) && n >= 0 && n < max; }
  function kmBetween(a, b) { const toRad = n => n * Math.PI / 180; const R = 6371; const dLat = toRad(b.lat - a.lat), dLon = toRad(b.lon - a.lon); let v = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2; return Math.round(2 * R * Math.asin(Math.sqrt(v)) * 10) / 10; }
  function dateHorizon(iso, today = dateISO(new Date())) { const diff = daysBetween(today, iso); return diff < 0 ? 'past' : diff <= 14 ? 'forecast' : 'climate'; }
  function categorizeDay(day) { if (!day) return 'unknown'; const c = Number(day.code), wind = Number(day.wind || 0), snow = Number(day.snow || 0), rain = Number(day.rain || 0); if ([95, 96, 99].includes(c) || wind >= 55) return 'severe'; if ([71, 73, 75, 77, 85, 86].includes(c) || snow > 1) return 'snow'; if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(c) || rain >= 3) return 'rain'; if ([45, 48].includes(c)) return 'fog'; if ([0, 1, 2].includes(c)) return 'clear'; return 'cloud'; }
  function suitability(activity, opts = {}) {
    const { season = 'summer', weather = 'unknown', interest = 'all' } = opts;
    let score = 30, reasons = [];
    if (activity.seasons.includes(season)) { score += 35; reasons.push('season'); } else { score -= 55; reasons.push('out-of-season'); }
    if (interest === 'all' || activity.type === interest) score += 12;
    if (['rain', 'snow', 'severe'].includes(weather)) {
      if (activity.indoor) { score += 22; reasons.push('indoor'); }
      else { score -= weather === 'severe' ? 55 : weather === 'rain' ? 28 : 18; reasons.push('weather'); }
    } else if (weather === 'clear' && !activity.indoor) score += 12;
    if (weather === 'fog' && !activity.indoor) score -= 14;
    if (activity.type === 'adventure' && /ski|skij|skia|bab(in|i) do|risovac|olimpijski centar|kraljica/i.test((activity.title || '') + ' ' + (activity.titleEn || ''))) {
      // Skiing requires independent confirmation even if forecast looks snowy.
      score -= 15; reasons.push('resort-unverified');
      if (weather === 'rain' || weather === 'clear') score -= 20;
    }
    return { score, reasons, flag: score >= 69 ? 'good' : score >= 36 ? 'caution' : 'poor' };
  }
  function sortedActivities(activities, opts) { return [...activities].map(activity => ({ ...activity, rating: suitability(activity, opts) })).sort((a, b) => b.rating.score - a.rating.score); }
  function buildDays(start, end) { const count = daysBetween(start, end); return Array.from({ length: count + 1 }, (_, i) => addDays(start, i)); }
  function weatherSummary(weather, iso) { return weather?.daily?.find(x => x.date === iso) || null; }
  return { parseLocal, dateISO, addDays, daysBetween, seasonForDate, isValidRange, kmBetween, dateHorizon, categorizeDay, suitability, sortedActivities, buildDays, weatherSummary, seasons };
})();
