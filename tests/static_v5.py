import json,re
from collections import Counter
from pathlib import Path
from datetime import date,timedelta
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text()
html=re.sub(r'<script[^>]+src="[^"]+"[^>]*></script>','',html)
html=re.sub(r'<link[^>]+href="https://[^"]+"[^>]*>','',html)
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 context=browser.new_context(viewport={'width':1400,'height':880},accept_downloads=True)
 context.route('https://cdn.livechatinc.com/tracking.js',lambda route:route.fulfill(status=200,content_type='application/javascript',body='/* fake vendor in tests */'))
 pg=context.new_page();errors=[];pg.on('pageerror',lambda e:errors.append(str(e)))
 pg.set_content(html); pg.add_style_tag(content=(ROOT/'styles.css').read_text())
 for f in ['motion.js','data.js','stays.js','logic.js','weather.js','climate.js','events.js','weather-scene.js']:
  pg.add_script_tag(content=(ROOT/f).read_text())
 start=date.today();forecast=[{'date':(start+timedelta(days=i)).isoformat(),'code':0,'high':26,'low':12,'prob':15,'rain':0,'snow':0,'wind':34} for i in range(16)]
 mock={'updatedAt':start.isoformat(),'daily':forecast,'current':{'temperature_2m':20,'weather_code':0}}
 pg.evaluate('(window.WeatherService.forecast = async () => ('+json.dumps(mock)+'))')
 historical={'type':'historical','date':'2027-01-16','condition':'snow','high':0.1,'low':-7,'wind':11,'snowFrequency':0.53,'rainFrequency':0.42,'sampleDays':60,'years':[2022,2023,2024,2025],'source':'https://open-meteo.com/en/docs/historical-weather-api'}
 pg.evaluate('(window.AllSeasonClimate.historicalEstimate = async (dest,date) => ({...('+json.dumps(historical)+'),condition:date.slice(5,7) === "10" ? "cloud" : "snow",date}),true)')
 pg.add_script_tag(content=(ROOT/'app.js').read_text())
 # New brand, vendor widget integration, and hero chat CTA.
 assert 'AllSeason.ba' in pg.title(), pg.title()
 assert 'AllSeason.ba' in pg.locator('.brand').first.inner_text()
 assert pg.evaluate('window.__lc.organizationId')=='7990d0a3-1b97-4fdf-bb8c-2424c257b536'
 assert pg.evaluate('typeof window.LiveChatWidget.call')=='function'
 pg.locator('[data-open-chat]').click()
 assert pg.evaluate('window.LiveChatWidget._q.some(x=>x[0]==="call" && x[1][0]==="maximize")')
 assert pg.locator('#scroll-progress').count()==1
 assert pg.locator('.motion-reveal').count()>10
 pg.evaluate('window.scrollTo(0,920)')
 pg.wait_for_timeout(250)
 assert pg.locator('#scroll-to-top.is-visible').count()==1
 ratio=pg.evaluate('getComputedStyle(document.querySelector("#scroll-progress-fill")).transform')
 assert ratio!='matrix(1, 0, 0, 1, 0, 0)',ratio
 pg.locator('#scroll-to-top').click();pg.wait_for_timeout(850)
 assert pg.evaluate('scrollY')<200,pg.evaluate('scrollY')
 # Keep the floating search centered despite reveal/parallax effects.
 bar=pg.locator('.hero-search').bounding_box(); viewport=pg.evaluate('innerWidth')
 assert abs(bar['x']+bar['width']/2-viewport/2)<3,bar
 print('Brand, Text.com chat widget command, scroll progress/reveals, back-to-top — PASS')
 ids=pg.evaluate('window.TRAVEL_DATA.destinations.map(d=>d.id)'); acts=pg.evaluate('window.TRAVEL_DATA.activities'); stays=pg.evaluate('window.TRAVEL_STAYS')
 assert len(ids)>=22 and len(acts)>=145,(len(ids),len(acts))
 counts=Counter(s['destination'] for s in stays)
 assert all(counts[i]>=2 for i in ids),counts
 print('Catalogue',len(ids),'destinations,',len(acts),'activities,',len(stays),'hotels — PASS')
 pg.locator('#main-nav [data-view="explore"]').click()
 pg.locator('#filter-season').select_option('winter')
 winter=pg.locator('.destination-card .card-heading').all_inner_texts()[:5]
 assert all(city in ['Vlašić','Jahorina','Kupres','Bjelašnica','Blidinje / Risovac'] for city in winter),winter
 assert 'Mostar' not in winter
 print('Winter top 5 ski areas:',winter,'— PASS')
 pg.locator('.destination-card[data-dest-detail="mostar"]').click()
 assert pg.locator('.mountain-nearby').count()==1
 assert 'Blidinje' in pg.locator('.mountain-nearby').inner_text()
 pg.locator('[data-modal-close]').first.click()
 pg.locator('#main-nav [data-view="events"]').click()
 assert pg.locator('.event-card').count()>=7
 assert 'Travnička noćna' in pg.locator('.events-grid').inner_text()
 assert '2026' in pg.locator('.event-upcoming').inner_text()
 print('Events page and city-to-mountain connections — PASS')
 pg.locator('#main-nav [data-view="planner"]').click()
 pg.wait_for_selector('.planner-page')
 pg.locator('#planner-form [name="dest"]').select_option('mostar')
 pg.locator('#planner-form [name="arrival"]').fill((start+timedelta(days=1)).isoformat())
 pg.locator('#planner-form [name="departure"]').fill((start+timedelta(days=2)).isoformat())
 pg.locator('#planner-form [name="interest"]').select_option('adventure')
 pg.locator('#planner-form [type="submit"]').click()
 pg.wait_for_timeout(250)
 assert pg.locator('.clothing-tip').count()==1
 assert 'vjetar' in pg.locator('.clothing-tip').inner_text().lower()
 assert pg.locator('[data-weather-motion]').count()==0
 print('Live-forecast outfit advice and no animation pause button — PASS')
 # force January future historical estimate
 pg.locator('#planner-form [name="dest"]').select_option('vlasic')
 pg.locator('#planner-form [name="arrival"]').fill('2027-01-16')
 pg.locator('#planner-form [name="departure"]').fill('2027-01-17')
 pg.locator('#planner-form [type="submit"]').click()
 pg.wait_for_timeout(450)
 assert 'HISTORIJSKA' in pg.locator('.weather-box').inner_text()
 assert '2022' in pg.locator('.weather-box').inner_text()
 assert 'NIJE PROGNOZA' in pg.locator('.weather-box').inner_text()
 assert pg.locator('.planner-page.sky-snow').count()==1
 idsInPlan=pg.locator('.activity-row [data-remove]').evaluate_all('(a)=>a.map(x=>x.dataset.remove)')
 assert len(set(idsInPlan))==len(idsInPlan)
 print('Historical long-range estimates, transparent disclaimer, animated snow — PASS')
 pg.locator('#planner-form [name="dest"]').select_option('travnik')
 pg.locator('#planner-form [name="arrival"]').fill('2027-10-15')
 pg.locator('#planner-form [name="departure"]').fill('2027-10-19')
 pg.locator('#planner-form [type="submit"]').click()
 pg.wait_for_timeout(450)
 assert pg.locator('.planner-page.sky-leaves').count()==1
 assert pg.evaluate("document.querySelector('#weather-atmosphere').dataset.sky")=='leaves'
 assert pg.locator('[data-weather-motion]').count()==0
 print('Falling autumn leaves — PASS')
 pg.locator('#planner-form [name="dest"]').select_option('mostar')
 pg.locator('#planner-form [name="arrival"]').fill('2027-01-16')
 pg.locator('#planner-form [name="departure"]').fill('2027-01-25')
 pg.locator('#planner-form [name="interest"]').select_option('adventure')
 pg.locator('#planner-form [type="submit"]').click()
 pg.wait_for_timeout(350)
 idsInPlan=pg.locator('.activity-row [data-remove]').evaluate_all('(a)=>a.map(x=>x.dataset.remove)')
 assert len(set(idsInPlan))==len(idsInPlan)
 assert pg.locator('.activity-row h4').count()>0
 assert 'Risovac' in pg.locator('.planner-board').inner_text() or 'Blidinje' in pg.locator('.planner-board').inner_text()
 print('Mostar winter ski excursion and no repeated attractions — PASS')
 pg.locator('#planner-form [name="dest"]').select_option('vlasic')
 pg.locator('#planner-form [name="arrival"]').fill('2027-01-16')
 pg.locator('#planner-form [name="departure"]').fill('2027-01-17')
 pg.locator('#planner-form [type="submit"]').click()
 pg.wait_for_timeout(950)
 pg.screenshot(path=str(ROOT/'preview-v5-winter-planner.png'),full_page=False)
 pg.locator('#main-nav [data-view="explore"]').click()
 pg.locator('#filter-season').select_option('winter')
 pg.wait_for_timeout(1100)
 pg.screenshot(path=str(ROOT/'preview-v5-winter-discovery.png'),full_page=False)
 pg.locator('#main-nav [data-view="events"]').click();pg.wait_for_timeout(1100);pg.screenshot(path=str(ROOT/'preview-v5-events.png'),full_page=False)
 pg.set_viewport_size({'width':390,'height':844})
 assert pg.evaluate('document.documentElement.scrollWidth <= innerWidth+2'),pg.evaluate('document.documentElement.scrollWidth')
 print('Mobile no horizontal overflow — PASS')
 assert errors==[],errors
 print('Browser JavaScript errors:',errors)
 browser.close()
print('ALL V5 ACCEPTANCE TESTS PASSED')
