
window.AllSeasonWeatherScene = (() => {
  let raf = 0, canvas = null, ctx = null, particles = [], last = 0, mode = 'neutral', enabled = true;
  let vw = 0, vh = 0, density = 1;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const rand = (a,b) => a + Math.random() * (b-a);
  function makeParticle(initial=false) {
    if (mode === 'leaves') return {x:rand(-20,vw+20),y:initial?rand(0,vh):rand(-60,-10),z:rand(.7,1.4),speed:rand(.85,2.1),phase:rand(0,6.28),turn:rand(0,6.28),opacity:rand(.55,.94),leaf:Math.floor(rand(0,4))};
    if (mode === 'rain' || mode === 'severe') return {
      x: rand(-vw * .25, vw * 1.15), y: initial ? rand(0, vh) : rand(-160,-20),
      z: rand(.55,1.6), speed: rand(9,17), length: rand(11,28), opacity:rand(.23,.58)
    };
    return {
      x:rand(0,vw), y:initial ? rand(0,vh):rand(-25,-5),
      z:rand(.55,1.6), speed:rand(.35,1.7), phase:rand(0,Math.PI*2), opacity:rand(.36,.84)
    };
  }
  function resize() {
    if (!canvas || !canvas.isConnected) return;
    vw = window.innerWidth; vh = window.innerHeight;
    density = Math.min(window.devicePixelRatio||1,1.6);
    canvas.width = Math.round(vw*density);canvas.height = Math.round(vh*density);
    canvas.style.width = vw+'px'; canvas.style.height = vh+'px';
    ctx.setTransform(density,0,0,density,0,0);
    const max = mode === 'snow' ? 165 : mode === 'severe' ? 155 : mode === 'leaves' ? 76 : 115;
    const count = Math.min(max, Math.round(vw*vh/7100));
    particles = Array.from({length:count},()=>makeParticle(true));
  }
  function drawRain(delta,stamp) {
    const storm = mode === 'severe';
    ctx.lineCap = 'round';
    for (let i=0;i<particles.length;i++) {
      const p=particles[i];
      const speed = p.speed * p.z * delta;
      p.x -= speed * (storm?.49:.27); p.y += speed * (storm?1.48:1.13);
      if (p.y > vh+35 || p.x < -45) particles[i]=Object.assign(p,makeParticle());
      ctx.strokeStyle=`rgba(219,236,255,${p.opacity})`;
      ctx.lineWidth = p.z * (storm?1.4:1.15);
      ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x + p.length*.23, p.y-p.length);ctx.stroke();
    }
    if(storm) {
      // Rare, subtle distant illumination; never a bright photosensitive flash.
      const glow = Math.pow(Math.max(0,Math.sin(stamp/5700)), 22)*.065;
      if(glow>0){ctx.fillStyle=`rgba(220,235,255,${glow})`;ctx.fillRect(0,0,vw,vh);}
    }
  }
  function drawSnow(delta,stamp) {
    for (let i=0;i<particles.length;i++) {
      const p=particles[i]; p.phase+=.013*delta;
      p.y+=p.speed*p.z*delta*1.05;
      p.x+=Math.sin(p.phase+stamp/2200)*.48*delta;
      if(p.y>vh+10 || p.x < -15 || p.x>vw+15)particles[i]=Object.assign(p,makeParticle());
      ctx.beginPath();ctx.fillStyle=`rgba(255,255,255,${p.opacity})`;
      ctx.arc(p.x,p.y,Math.max(1,p.z*2.2),0,Math.PI*2);ctx.fill();
    }
  }
  function drawLeaves(delta,stamp){
    const colors=['#E4A046','#C76531','#B69139','#E6B86A'];
    for(const p of particles){
      p.phase+=.015*delta; p.turn+=.038*delta;
      p.y+=p.speed*p.z*delta*1.55; p.x+=(Math.sin(p.phase)+.45)*.85*delta;
      if(p.y>vh+25||p.x>vw+25){Object.assign(p,makeParticle());continue;}
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(Math.sin(p.turn)*1.3);
      ctx.scale(Math.max(.45,Math.cos(p.turn)),1);ctx.globalAlpha=p.opacity;
      ctx.fillStyle=colors[p.leaf];ctx.beginPath();ctx.moveTo(0,-6*p.z);
      ctx.quadraticCurveTo(8*p.z,-2*p.z,3*p.z,6*p.z);
      ctx.quadraticCurveTo(-6*p.z,7*p.z,0,-6*p.z);ctx.fill();ctx.restore();
    }
    ctx.globalAlpha=1;
  }
  function frame(stamp) {
    if(!ctx || !canvas?.isConnected || !enabled || motionQuery.matches){stop();return;}
    raf = requestAnimationFrame(frame);
    if(document.hidden || stamp-last < 28) return; // throttle to <= 35fps
    const delta=last?Math.min((stamp-last)/30,2.2):1;last=stamp;
    ctx.clearRect(0,0,vw,vh);
    if(mode==='leaves')drawLeaves(delta,stamp);
    else if(mode==='snow')drawSnow(delta,stamp);
    else if(mode==='rain'||mode==='severe')drawRain(delta,stamp);
  }
  function stop() {
    if(raf)cancelAnimationFrame(raf);
    raf=0;last=0;
    window.removeEventListener('resize',resize);
    canvas=null;ctx=null;particles=[];
  }
  function start(weather,animate=true) {
    stop();
    mode = ['clear','cloud','rain','snow','severe','fog','leaves'].includes(weather)?weather:'neutral';
    enabled=animate;
    canvas=document.getElementById('weather-fx');
    if(!canvas || !animate || motionQuery.matches || !['rain','snow','severe','leaves'].includes(mode))return;
    ctx=canvas.getContext('2d');
    if(!ctx)return;
    window.addEventListener('resize',resize,{passive:true});
    resize();raf=requestAnimationFrame(frame);
  }
  motionQuery.addEventListener?.('change',()=>{const el=document.getElementById('weather-atmosphere');if(el)start(el.dataset.sky,el.dataset.animate==='true');});
  return {start,stop};
})();
