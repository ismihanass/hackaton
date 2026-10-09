window.AllSeasonClimate = (() => {
   const cache = new Map();
   const fresh = () => new Date().getFullYear() - 1;
   const numeric = (xs) => xs.filter(x => Number.isFinite(x));
   const mean = xs => { const n = numeric(xs); return n.length ? n.reduce((s, x) => s + x, 0) / n.length : null; };
   function heuristic(destination, target) {
      const month = +target.slice(5, 7), mountain = ['vlasic', 'jahorina'].includes(destination.id);
      const winter = [12, 1, 2].includes(month), autumn = [9, 10, 11].includes(month), summer = [6, 7, 8].includes(month);
      const condition = mountain && winter ? 'snow' : autumn ? 'cloud' : summer ? 'clear' : winter ? 'cloud' : 'cloud';
      return { type: 'seasonal', date: target, condition, high: null, low: null, wind: null, snowFrequency: null, rainFrequency: null, sampleDays: 0, years: [], source: 'seasonal-logic', mountain };
   }
   function seasonalSpan(target, year) {
      const [, m, d] = target.split('-').map(Number);
      let center = new Date(Date.UTC(year, m - 1, d));
      if (center.getUTCMonth() !== m - 1) center = new Date(Date.UTC(year, m - 1, 28)); // Feb 29 handling
      const iso = x => x.toISOString().slice(0, 10);
      return [iso(new Date(center.getTime() - 7 * 86400000)), iso(new Date(center.getTime() + 7 * 86400000))];
   }
   async function historicalEstimate(destination, target) {
      const key = destination.id + ':' + target.slice(5, 10);
      if (cache.has(key)) return { ...(await cache.get(key)), date: target };
      const work = (async () => {
         const years = Array.from({ length: 4 }, (_, i) => fresh() - i);
         const requests = years.map(async year => {
            const [start_date, end_date] = seasonalSpan(target, year);
            const p = new URLSearchParams({ latitude: destination.lat, longitude: destination.lon, timezone: 'Europe/Sarajevo', start_date, end_date, daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,wind_speed_10m_max' });
            if (['vlasic', 'jahorina'].includes(destination.id)) p.set('elevation', destination.id === 'vlasic' ? '1450' : '1600');
            const res = await fetch('https://archive-api.open-meteo.com/v1/archive?' + p, { signal: AbortSignal.timeout(12000) });
            if (!res.ok) throw Error('Historical API ' + res.status);
            const j = await res.json(); if (!j.daily?.time?.length) throw Error('No historical data');
            return j.daily.time.map((date, i) => ({ year, date, high: j.daily.temperature_2m_max?.[i], low: j.daily.temperature_2m_min?.[i], rain: j.daily.precipitation_sum?.[i], snow: j.daily.snowfall_sum?.[i], wind: j.daily.wind_speed_10m_max?.[i] }));
         });
         const done = await Promise.allSettled(requests);
         const rows = done.filter(x => x.status === 'fulfilled').flatMap(x => x.value).filter(x => Number.isFinite(x.high));
         if (rows.length < 10) return heuristic(destination, target);
         const high = mean(rows.map(x => x.high)), low = mean(rows.map(x => x.low)), wind = mean(rows.map(x => x.wind));
         const snowFrequency = rows.filter(x => (x.snow || 0) >= .3).length / rows.length;
         const rainFrequency = rows.filter(x => (x.rain || 0) >= 1).length / rows.length;
         const mountain = ['vlasic', 'jahorina'].includes(destination.id);
         let condition = 'cloud';
         if (snowFrequency >= (mountain ? .13 : .25) && low < 4) condition = 'snow';
         else if (rainFrequency >= .40) condition = 'rain';
         else if (high >= 19 && rainFrequency < .33) condition = 'clear';
         else if (high <= 2) condition = 'cloud';
         return { type: 'historical', date: target, condition, high, low, wind, snowFrequency, rainFrequency, sampleDays: rows.length, years: [...new Set(rows.map(x => x.year))].sort((a, b) => a - b), source: 'https://open-meteo.com/en/docs/historical-weather-api', mountain };
      })();
      cache.set(key, work);
      return { ...(await work), date: target };
   }
   return { historicalEstimate, heuristic };
})();
