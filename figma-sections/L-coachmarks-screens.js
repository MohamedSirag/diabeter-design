(async () => {
  // Coach marks — first-time tooltip overlays shown on real app screens
  // Each frame = actual screen + a highlight + tooltip bubble pointing at a feature
  const W=393,H=844,GAP=40,ROW_Y=12*924; // y=11088

  await Promise.all([
    figma.loadFontAsync({family:'Montserrat',style:'Regular'}),
    figma.loadFontAsync({family:'Montserrat',style:'Medium'}),
    figma.loadFontAsync({family:'Montserrat',style:'SemiBold'}),
    figma.loadFontAsync({family:'Montserrat',style:'Bold'}),
    figma.loadFontAsync({family:'Montserrat',style:'ExtraBold'}),
  ]);

  const hx=h=>{const n=parseInt(h.replace('#',''),16);return{r:((n>>16)&255)/255,g:((n>>8)&255)/255,b:(n&255)/255};};
  const solid=(h,a=1)=>[{type:'SOLID',color:hx(h),opacity:a}];
  function tx(text,style='Regular',size=14,hex='#FFFFFF',a=1){
    const t=figma.createText();t.fontName={family:'Montserrat',style};
    t.fontSize=size;t.characters=String(text);t.fills=solid(hex,a);return t;
  }
  function rc(w,h,hex,a=1,cr=0){
    const r=figma.createRectangle();r.resize(w,h);r.fills=solid(hex,a);
    if(cr>0)r.cornerRadius=cr;return r;
  }
  function p(parent,child,x,y){parent.appendChild(child);child.x=x;child.y=y;}
  function scr(name,col){
    const f=figma.createFrame();f.name=name;f.resize(W,H);
    f.x=col*(W+GAP);f.y=ROW_Y;f.fills=solid('#0A0E17');
    figma.currentPage.appendChild(f);return f;
  }

  // Draw a simplified version of the dashboard as bg
  function dashBg(s){
    p(s,rc(W,44,'#0A0E17'),0,0);p(s,tx('9:41','SemiBold',15,'#FFFFFF'),20,14);
    p(s,rc(W,56,'#0F172A'),0,44);p(s,tx('diaboo','Bold',20,'#FFFFFF'),54,60);
    // Glucose ring
    const ring=figma.createFrame();ring.resize(160,160);ring.cornerRadius=80;
    ring.fills=solid('#0D1220');ring.strokes=solid('#22C55E',0.8);ring.strokeWeight=2;
    p(s,ring,W/2-80,120);
    const num=tx('118','ExtraBold',44,'#22C55E');num.textAlignHorizontal='CENTER';num.textAutoResize='NONE';num.resize(160,52);ring.appendChild(num);num.x=0;num.y=42;
    const unit=tx('mg/dL','Medium',12,'#94A3B8');unit.textAlignHorizontal='CENTER';unit.textAutoResize='NONE';unit.resize(160,16);ring.appendChild(unit);unit.x=0;unit.y=100;
    // Mini stats
    p(s,rc(337,52,'#0F172A',1,14),28,300);
    p(s,tx('87% TIR','SemiBold',13,'#22C55E'),44,316);p(s,tx('Avg 112','Regular',12,'#94A3B8'),160,316);p(s,tx('48 readings','Regular',12,'#94A3B8'),255,316);
    // Mini chart
    p(s,rc(337,80,'#0B1221',1,14),28,368);
    // Tab bar
    const bar=figma.createFrame();bar.resize(W,80);bar.fills=solid('#0F172A');
    p(s,bar,0,H-80);
    const names=['Live','Logbook','Camera','News','Profile'];const tw=W/5;
    names.forEach((n,i)=>{
      const lbl=tx(n,i===0?'SemiBold':'Regular',11,i===0?'#3B82F6':'#5F6F86');
      bar.appendChild(lbl);lbl.x=Math.round(i*tw+tw/2-n.length*3.3);lbl.y=52;
    });
  }

  // Coach tooltip bubble
  function coachTip(s,title,body,step,total,tipX,tipY,arrowDir='down'){
    const tipW=240,tipH=body.length>60?100:84;
    const tip=figma.createFrame();tip.resize(tipW,tipH);tip.cornerRadius=14;
    tip.fills=solid('#1D3461');tip.strokes=solid('#3B82F6',0.6);tip.strokeWeight=1;
    p(s,tip,tipX,tipY);
    // Arrow pointer
    const arrowY=arrowDir==='down'?tipH:(-8);
    const arrow=rc(12,8,'#1D3461',1);p(s,arrow,tipW/2-6,tipY+arrowY);
    const stepLbl=tx(step+'/'+total,'Medium',10,'#3B82F6');tip.appendChild(stepLbl);stepLbl.x=12;stepLbl.y=10;
    const titleT=tx(title,'Bold',13,'#FFFFFF');tip.appendChild(titleT);titleT.x=12;titleT.y=26;
    const bodyT=tx(body,'Regular',11,'#CBD5E1');bodyT.textAutoResize='HEIGHT';bodyT.resize(216,1);tip.appendChild(bodyT);bodyT.x=12;bodyT.y=42;
    // Next button inside tip
    const nxtBtn=figma.createFrame();nxtBtn.resize(64,26);nxtBtn.fills=solid('#3B82F6');nxtBtn.cornerRadius=8;
    nxtBtn.layoutMode='HORIZONTAL';nxtBtn.primaryAxisSizingMode='FIXED';nxtBtn.counterAxisSizingMode='FIXED';
    nxtBtn.primaryAxisAlignItems='CENTER';nxtBtn.counterAxisAlignItems='CENTER';
    nxtBtn.appendChild(tx('Next','SemiBold',11,'#FFFFFF'));
    tip.appendChild(nxtBtn);nxtBtn.x=tipW-76;nxtBtn.y=tipH-34;
    // Skip link
    const skip=tx('Skip','Regular',10,'#64748B');tip.appendChild(skip);skip.x=12;skip.y=tipH-24;
    // Highlight ring
    return tip;
  }

  // Highlight circle
  function highlight(s,cx,cy,r){
    const ring=figma.createFrame();ring.resize(r*2+16,r*2+16);ring.cornerRadius=r+8;
    ring.fills=solid('#3B82F6',0.1);ring.strokes=solid('#3B82F6',0.7);ring.strokeWeight=2;
    p(s,ring,cx-r-8,cy-r-8);
  }

  // Dark overlay with hole (simulated with semi-transparent rect)
  function dimOverlay(s){p(s,rc(W,H,'#000000',0.6),0,0);}

  // ─── L-01 to L-10: Coach marks ────────────────────────────────────
  const coachData=[
    {id:'L-01',title:'Your Live Glucose',body:'This ring shows your current blood glucose. Color changes with your range.',stepTarget:'glucose ring',hx:W/2,hy:200,tx:76,ty:320,arrow:'down'},
    {id:'L-02',title:'Trend Arrow',body:'The arrow shows if glucose is rising, falling or steady, and how fast.',stepTarget:'trend',hx:W/2+40,hy:280,tx:76,ty:170,arrow:'up'},
    {id:'L-03',title:'Time in Range',body:'The percentage of time your glucose stays in the healthy 70–180 mg/dL range.',stepTarget:'TIR stat',hx:100,hy:326,tx:28,ty:380,arrow:'up'},
    {id:'L-04',title:'Mini Glucose Chart',body:'The last 3 hours of glucose readings. Tap it to open the full reports view.',stepTarget:'chart',hx:W/2,hy:408,tx:76,ty:470,arrow:'up'},
    {id:'L-05',title:'Log Entry',body:'Tap + to log a meal, insulin, exercise, note, or ketone reading.',stepTarget:'log button',hx:100,hy:H-148,tx:28,ty:600,arrow:'down'},
    {id:'L-06',title:'Camera AI',body:'Point your camera at food and Diaboo will automatically count the carbs using AI.',stepTarget:'camera tab',hx:W/2,hy:H-40,tx:76,ty:680,arrow:'down'},
    {id:'L-07',title:'Logbook',body:'All your entries in one place — meals, insulin, exercise, notes and ketones.',stepTarget:'logbook tab',hx:W/5+W/10,hy:H-40,tx:28,ty:680,arrow:'down'},
    {id:'L-08',title:'Reports',body:'View 7, 30, or 90-day glucose reports. Tap Profile → Export & Reports.',stepTarget:'profile tab',hx:W-W/10,hy:H-40,tx:150,ty:680,arrow:'down'},
    {id:'L-09',title:'Overlay Bubble',body:'Enable the floating bubble so you can see your glucose over other apps.',stepTarget:'bubble toggle',hx:W/2,hy:300,tx:76,ty:380,arrow:'up'},
    {id:'L-10',title:"You're all set!",body:'Diaboo is ready. Your CGM is connected and monitoring has started.',stepTarget:'complete',hx:W/2,hy:H/2,tx:76,ty:450,arrow:'up'},
  ];

  coachData.forEach((cm,idx)=>{
    const s=scr(cm.id+' — Coach: '+cm.title.slice(0,20),idx);
    dashBg(s);
    dimOverlay(s);
    highlight(s,cm.hx,cm.hy,36);
    coachTip(s,cm.title,cm.body,idx+1,10,cm.tx,cm.ty,cm.arrow);
    // Progress dots at top
    for(let d=0;d<10;d++){
      const dot=rc(6,6,d===idx?'#3B82F6':'#334155',1,3);
      p(s,dot,W/2-37+d*8,54);
    }
  });

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('Coach mark screens L-01 to L-10 built!');
})();
