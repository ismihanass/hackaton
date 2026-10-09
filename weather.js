window.WeatherService = (() => {
    const cache = new Map();
    async function forecast(destination) {
        const key = destination.id;
        const existing = cache.get(key);
        if (existing && Date.now() - existing.fetched < 25 * 60 * 1000) return existing.value;
        const base = 'https://api.open-meteo.com/v1/forecast';
        const params = new URLSearchParams({ latitude: destination.lat, longitude: destination.lon, timezone: 'Europe/Sarajevo', forecast_days: '16', daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,snowfall_sum,wind_speed_10m_max', current: 'temperature_2m,weather_code', });
        if (destination.id === 'vlasic') params.set('elevation', '1450');
        const res = await fetch(`${base}?${params}`, { signal: AbortSignal.timeout(11000) });
        if (!res.ok) throw new Error(`Weather service error: ${res.status}`);
        const j = await res.json();
        if (!j.daily?.time) throw new Error('Weather data incomplete');
        const daily = j.daily.time.map((date, i) => ({ date, code: j.daily.weather_code?.[i], high: j.daily.temperature_2m_max?.[i], low: j.daily.temperature_2m_min?.[i], prob: j.daily.precipitation_probability_max?.[i], rain: j.daily.precipitation_sum?.[i], snow: j.daily.snowfall_sum?.[i], wind: j.daily.wind_speed_10m_max?.[i] }));
        const value = { daily, current: j.current, updatedAt: new Date().toISOString(), source: 'https://open-meteo.com/en/docs' };
        cache.set(key, { fetched: Date.now(), value }); return value;
    }
    return { forecast };
})();
