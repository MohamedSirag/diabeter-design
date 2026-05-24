(async () => {
  // LIGHT THEME — I-01 to I-03: Notifications screens
  const W=393,H=844,GAP=40,ROW_Y=23*924; // y=21252

  await Promise.all([
    figma.loadFontAsync({family:'Montserrat',style:'Regular'}),
    figma.loadFontAsync({family:'Montserrat',style:'Medium'}),
    figma.loadFontAsync({family:'Montserrat',style:'SemiBold'}),
    figma.loadFontAsync({family:'Montserrat',style:'Bold'}),
    figma.loadFontAsync({family:'Montserrat',style:'ExtraBold'}),
  ]);

  const BG='#F3F6FB',SURF='#FFFFFF',SURF2='#F1F5F9',SURF3='#EFF6FF';
  const T1='#0F172A',T2='#334155',T3='#64748B',T4='#94A3B8';
  const PRI='#2563EB',SUC='#16A34A',WARN='#D97706',DAN='#DC2626';
  const BRD='#E2E8F0';

  const hx=h=>{const n=parseInt(h.replace('#',''),16);return{r:((n>>16)&255)/255,g:((n>>8)&255)/255,b:(n&255)/255};};
  const solid=(h,a=1)=>[{type:'SOLID',color:hx(h),opacity:a}];
  function tx(text,style='Regular',size=14,hex='#0F172A',a=1){
    const t=figma.createText();t.fontName={family:'Montserrat',style};
    t.fontSize=size;t.characters=String(text);t.fills=solid(hex,a);return t;
  }
  function rc(w,h,hex,a=1,cr=0){
    const r=figma.createRectangle();r.resize(w,h);r.fills=solid(hex,a);
    if(cr>0)r.cornerRadius=cr;return r;
  }
  function p(parent,child,x,y){parent.appendChild(child);child.x=x;child.y=y;}
  function scr(name,col,fill=BG){
    const f=figma.createFrame();f.name=name+'  [Light]';f.resize(W,H);
    f.x=col*(W+GAP);f.y=ROW_Y;f.fills=solid(fill);
    figma.currentPage.appendChild(f);return f;
  }

  function notifRow(s,icon,iconColor,title,body,time,unread,x,y){
    const row=figma.createFrame();row.resize(337,72);
    row.fills=solid(unread?SURF3:SURF);row.cornerRadius=14;
    row.strokes=solid(unread?iconColor:BRD,unread?0.3:1);row.strokeWeight=1;
    p(s,row,x,y);
    const ib=rc(40,40,iconColor,0.12,20);row.appendChild(ib);ib.x=12;ib.y=16;
    const it=tx(icon,'Bold',16,iconColor);row.appendChild(it);it.x=20;it.y=22;
    const tl=tx(title,'SemiBold',13,T1);row.appendChild(tl);tl.x=62;tl.y=14;
    const bl=tx(body,'Regular',11,T3);bl.textAutoResize='NONE';bl.resize(220,14);row.appendChild(bl);bl.x=62;bl.y=32;
    const tm=tx(time,'Regular',10,T4);row.appendChild(tm);tm.x=62;tm.y=50;
    if(unread){const dot=rc(8,8,iconColor,1,4);row.appendChild(dot);dot.x=320;dot.y=32;}
    return row;
  }

  // ─── I-01: Notification Inbox ─────────────────────────────────────
  {
    const s=scr('I-01 — Notifications',0);
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    p(s,rc(W,56,SURF),0,44);p(s,rc(W,1,BRD),0,99);
    p(s,tx('Notifications','Bold',20,T1),28,60);
    const clrBtn=rc(52,28,SURF2,1,8);p(s,clrBtn,305,64);
    clrBtn.strokes=solid(BRD);clrBtn.strokeWeight=1;
    p(s,tx('Clear','Medium',11,PRI),311,71);
    const cats=['All','Alerts','Reminders','Updates'];
    let cx=28;
    cats.forEach((cat,i)=>{
      const c=figma.createFrame();c.resize(cat.length*7+20,30);c.cornerRadius=15;
      c.fills=solid(i===0?PRI:SURF2);if(i!==0){c.strokes=solid(BRD);c.strokeWeight=1;}
      c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';
      c.appendChild(tx(cat,i===0?'SemiBold':'Regular',12,i===0?SURF:T2));
      p(s,c,cx,110);cx+=cat.length*7+28;
    });
    p(s,tx('Today','SemiBold',11,T3),28,156);
    notifRow(s,'!',DAN,'Hypo Alert — Take action now','Glucose: 58 mg/dL · Eat 15g fast carbs','Just now',true,28,176);
    notifRow(s,'v',SUC,'Back in range','Glucose back to 76 mg/dL · Good job!','8 min ago',true,28,256);
    notifRow(s,'M',PRI,'Post-meal check','2h since lunch log — time to check your BG','35 min ago',true,28,336);
    notifRow(s,'^',WARN,'Glucose rising fast','Rate +4.2 mg/dL/min — check soon','1h ago',false,28,416);
    p(s,tx('Yesterday','SemiBold',11,T3),28,502);
    notifRow(s,'o',T4,'Sensor expiry reminder','FreeStyle Libre 3 expires in 7 days','10:00 PM',false,28,522);
    notifRow(s,'s','#7C3AED','Daily summary','87% TIR today · 3 entries logged · Great day','9:00 PM',false,28,602);
    notifRow(s,'!',WARN,'High glucose alert','Glucose: 210 mg/dL · Consider correction','2:15 PM',false,28,682);
    notifRow(s,'v',SUC,'Good overnight control','All night in range 72–138 mg/dL · Well done','7:00 AM',false,28,762);
  }

  // ─── I-02: Alert History ──────────────────────────────────────────
  {
    const s=scr('I-02 — Alert History',1);
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    p(s,rc(W,56,SURF),0,44);p(s,rc(W,1,BRD),0,99);
    const bb=rc(34,34,SURF2,1,10);p(s,bb,20,55);bb.strokes=solid(BRD);bb.strokeWeight=1;
    p(s,tx('<','SemiBold',16,T1),27,60);
    p(s,tx('Alert History','Bold',18,T1),64,60);
    const statsRow=rc(337,64,SURF,1,14);p(s,statsRow,28,108);
    statsRow.strokes=solid(BRD);statsRow.strokeWeight=1;
    const stats=[['Hypos','3',DAN],['Hypers','7',WARN],['Rapid drops','2','#EA580C'],['Total','12',T4]];
    stats.forEach(([l,v,c],i)=>{p(s,tx(l,'Regular',10,T3),44+i*84,118);p(s,tx(v,'Bold',18,c),44+i*84,134);});
    const periodBg=rc(337,38,SURF2,1,12);p(s,periodBg,28,184);
    periodBg.strokes=solid(BRD);periodBg.strokeWeight=1;
    const periods=['7d','14d','30d'];
    periods.forEach((per,i)=>{
      const isA=per==='7d';
      if(isA){const hl=rc(100,30,PRI,1,10);p(s,hl,32,188);}
      const lbl=tx(per,isA?'SemiBold':'Regular',13,isA?SURF:T3);
      lbl.textAlignHorizontal='CENTER';lbl.textAutoResize='NONE';lbl.resize(100,30);
      p(s,lbl,32+i*108,195);
    });
    const alertItems=[
      ['Hypo','58 mg/dL','Duration: 8 min · Resolved after carbs','May 23, 9:41 AM',DAN],
      ['Hyper','285 mg/dL','Duration: 2.5h · Resolved after correction','May 22, 3:20 PM',WARN],
      ['Rapid drop','142→58 mg/dL','Rate: -5.4 mg/dL/min · Hypo followed','May 22, 9:30 AM','#EA580C'],
      ['Hypo','64 mg/dL','Duration: 12 min · Resolved spontaneously','May 21, 7:15 PM',DAN],
      ['Hyper','210 mg/dL','Duration: 1h · Post-meal correction given','May 21, 2:15 PM',WARN],
      ['Hyper','196 mg/dL','Duration: 45 min · Corrected','May 20, 8:00 AM',WARN],
    ];
    alertItems.forEach(([type,val,note,time,color],i)=>{
      const row=rc(337,72,SURF,1,12);p(s,row,28,240+i*80);
      row.strokes=solid(BRD);row.strokeWeight=1;
      const dot=rc(10,10,color,1,5);p(s,dot,44,276+i*80);
      const typeB=figma.createFrame();typeB.resize(type.length*7+16,22);typeB.cornerRadius=11;typeB.fills=solid(color,0.1);
      typeB.layoutMode='HORIZONTAL';typeB.primaryAxisSizingMode='FIXED';typeB.counterAxisSizingMode='FIXED';typeB.primaryAxisAlignItems='CENTER';typeB.counterAxisAlignItems='CENTER';
      typeB.appendChild(tx(type,'SemiBold',10,color));
      p(s,typeB,64,252+i*80);
      p(s,tx(val,'Bold',14,T1),64+type.length*7+24,252+i*80);
      const noteT=tx(note,'Regular',11,T3);noteT.textAutoResize='NONE';noteT.resize(280,14);
      p(s,noteT,64,272+i*80);
      p(s,tx(time,'Regular',10,T4),64,290+i*80);
    });
  }

  // ─── I-03: Force Update Gate ──────────────────────────────────────
  {
    const s=scr('I-03 — Force Update Gate',2,BG);
    p(s,rc(W,H,BG),0,0);
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    const overlay=rc(W,H-44,BG);p(s,overlay,0,44);
    // Diaboo logo
    const logo=figma.createFrame();logo.resize(80,80);logo.cornerRadius=40;logo.fills=solid(SURF);
    logo.strokes=solid(BRD);logo.strokeWeight=2;
    p(s,logo,W/2-40,120);
    const drop=rc(40,50,'#0891B2',1,20);logo.appendChild(drop);drop.x=20;drop.y=15;
    const wave=rc(40,8,BG,0.8,4);logo.appendChild(wave);wave.x=20;wave.y=35;
    p(s,tx('diaboo','ExtraBold',32,T1),W/2-52,216);
    // Update card
    const card=rc(337,320,SURF,1,24);p(s,card,28,272);
    card.strokes=solid(BRD);card.strokeWeight=1;
    const updateCircle=rc(64,64,PRI,0.1,32);p(s,updateCircle,W/2-32,288);
    p(s,tx('^','ExtraBold',32,PRI),W/2-12,302);
    p(s,tx('Update Required','Bold',22,T1),W/2-82,372);
    p(s,tx('Version 3.2.0','Medium',14,T4),W/2-44,402);
    const noteT=tx('A critical update is available. This version includes important safety improvements for glucose monitoring. Please update to continue.','Regular',13,T2);
    noteT.textAlignHorizontal='CENTER';noteT.textAutoResize='HEIGHT';noteT.resize(297,1);
    p(s,noteT,40,430);
    const updateBtn=figma.createFrame();updateBtn.resize(297,52);updateBtn.fills=solid(PRI);updateBtn.cornerRadius=14;
    updateBtn.layoutMode='HORIZONTAL';updateBtn.primaryAxisSizingMode='FIXED';updateBtn.counterAxisSizingMode='FIXED';
    updateBtn.primaryAxisAlignItems='CENTER';updateBtn.counterAxisAlignItems='CENTER';
    updateBtn.appendChild(tx('Update Now','Bold',16,SURF));
    p(s,updateBtn,48,528);
    // What's new
    const whatsNew=rc(337,100,SURF,1,20);p(s,whatsNew,28,620);
    whatsNew.strokes=solid(BRD);whatsNew.strokeWeight=1;
    p(s,tx("What's new in v3.2.0",'SemiBold',14,T1),44,634);
    const changes=['Critical fix for CGM reconnection','Improved hypo alert algorithm','Performance improvements'];
    changes.forEach((c2,i)=>{
      const dot=rc(4,4,SUC,1,2);p(s,dot,44,660+i*22);
      p(s,tx(c2,'Regular',12,T2),56,656+i*22);
    });
    p(s,tx('Diaboo v3.2.0 · Update from App Store','Regular',10,T4),W/2-106,742);
  }

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('✓ Notification light screens I-01 to I-03 built!');
})();
