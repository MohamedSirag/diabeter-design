(async () => {
  // LIGHT THEME — A-01 to A-05: Splash + Onboarding
  const W=393,H=844,GAP=40,ROW_Y=14*924; // y=12936

  await Promise.all([
    figma.loadFontAsync({family:'Montserrat',style:'Regular'}),
    figma.loadFontAsync({family:'Montserrat',style:'Medium'}),
    figma.loadFontAsync({family:'Montserrat',style:'SemiBold'}),
    figma.loadFontAsync({family:'Montserrat',style:'Bold'}),
    figma.loadFontAsync({family:'Montserrat',style:'ExtraBold'}),
  ]);

  // ── Light theme palette ──────────────────────────────────────────
  const BG='#F3F6FB', SURF='#FFFFFF', SURF2='#F1F5F9';
  const T1='#0F172A', T2='#334155', T3='#64748B', T4='#94A3B8';
  const PRI='#2563EB', SUC='#16A34A', WARN='#D97706', DAN='#DC2626';
  const TEAL='#0891B2', BRD='#E2E8F0';

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
  function scr(name,col){
    const f=figma.createFrame();f.name=name+'  [Light]';f.resize(W,H);
    f.x=col*(W+GAP);f.y=ROW_Y;f.fills=solid(BG);
    figma.currentPage.appendChild(f);return f;
  }
  function ctx(text,style,size,hex,w){
    const t=tx(text,style,size,hex);t.textAlignHorizontal='CENTER';t.textAutoResize='HEIGHT';t.resize(w,1);return t;
  }
  function dot(s,x,y,active){
    const d=rc(active?24:8,8,active?PRI:BRD,1,4);p(s,d,x,y);
  }
  function fBtn(label,w,hex,tHex=SURF){
    const b=figma.createFrame();b.resize(w,56);b.fills=solid(hex);b.cornerRadius=16;
    b.layoutMode='HORIZONTAL';b.primaryAxisSizingMode='FIXED';b.counterAxisSizingMode='FIXED';
    b.primaryAxisAlignItems='CENTER';b.counterAxisAlignItems='CENTER';
    b.appendChild(tx(label,'Bold',17,tHex));return b;
  }
  function logo(size=64){
    const f=figma.createFrame();f.resize(size,size);f.cornerRadius=size*.3;f.fills=solid('#E0F7FA');
    const drop=rc(Math.round(size*.5),Math.round(size*.62),TEAL,1,Math.round(size*.25));
    f.appendChild(drop);drop.x=Math.round(size*.25);drop.y=Math.round(size*.18);
    const wave=rc(Math.round(size*.5),Math.round(size*.08),SURF,.7,2);
    f.appendChild(wave);wave.x=Math.round(size*.25);wave.y=Math.round(size*.46);
    return f;
  }

  // ─── A-01 Light: Splash ───────────────────────────────────────────
  {
    const s=scr('A-01 — Splash',0);
    // Gradient bg using two rects
    p(s,rc(W,H,'#E8F0FE',0.5),0,0);
    p(s,rc(W,H,'#F3F6FB'),0,0);
    // Glow circle behind logo
    const glow=rc(260,260,'#BFDBFE',0.4,130);p(s,glow,W/2-130,H/2-180);
    p(s,logo(100),W/2-50,H/2-170);
    const title=ctx('diaboo','ExtraBold',42,T1,337);p(s,title,28,H/2-48);
    const sub=ctx('Smart Diabetes Management','Medium',16,T3,337);p(s,sub,28,H/2+10);
    // Loading dots
    [0,1,2].forEach((i)=>{const d=rc(8,8,i===1?PRI:BRD,1,4);p(s,d,W/2-12+i*16,H/2+120);});
    const copy=ctx('© 2026 Pyranext','Regular',11,T4,337);p(s,copy,28,H-52);
  }

  // ─── A-02 Light: Onboarding 1 ─────────────────────────────────────
  {
    const s=scr('A-02 — Onboarding 1',1);
    p(s,tx('Skip','Medium',14,T3),W-62,52);
    // Illustration card
    const illus=figma.createFrame();illus.resize(320,280);illus.cornerRadius=32;illus.fills=solid('#EFF6FF');
    p(s,illus,W/2-160,80);
    // CGM ring illustration
    const ring=figma.createFrame();ring.resize(160,160);ring.cornerRadius=80;
    ring.fills=solid(SURF);ring.strokes=solid(SUC,0.8);ring.strokeWeight=3;
    illus.appendChild(ring);ring.x=80;ring.y=56;
    const num=tx('118','ExtraBold',44,SUC);num.textAlignHorizontal='CENTER';num.textAutoResize='NONE';num.resize(160,52);ring.appendChild(num);num.x=0;num.y=42;
    const unit=tx('mg/dL','Medium',12,T3);unit.textAlignHorizontal='CENTER';unit.textAutoResize='NONE';unit.resize(160,16);ring.appendChild(unit);unit.x=0;unit.y=98;
    const trend=tx('-> Steady','SemiBold',11,SUC);trend.textAlignHorizontal='CENTER';trend.textAutoResize='NONE';trend.resize(160,16);ring.appendChild(trend);trend.x=0;trend.y=118;
    const tag=figma.createFrame();tag.resize(130,30);tag.cornerRadius=15;tag.fills=solid('#DCFCE7');
    tag.layoutMode='HORIZONTAL';tag.primaryAxisSizingMode='FIXED';tag.counterAxisSizingMode='FIXED';
    tag.primaryAxisAlignItems='CENTER';tag.counterAxisAlignItems='CENTER';
    tag.appendChild(tx('CGM Connected','SemiBold',11,SUC));
    illus.appendChild(tag);tag.x=95;tag.y=228;
    const title=ctx('Track Your Glucose','Bold',28,T1,337);p(s,title,28,390);
    const body=ctx('See your live glucose level at a glance with colour-coded alerts and trend arrows.','Regular',15,T2,337);p(s,body,28,434);
    // Dots
    [0,1,2,3].forEach(i=>dot(s,W/2-30+i*20,H-160,i===0));
    p(s,fBtn('Next','337',PRI),28,H-128);
  }

  // ─── A-03 Light: Onboarding 2 ─────────────────────────────────────
  {
    const s=scr('A-03 — Onboarding 2',2);
    p(s,tx('Skip','Medium',14,T3),W-62,52);
    const illus=figma.createFrame();illus.resize(320,280);illus.cornerRadius=32;illus.fills=solid('#FFF7ED');
    p(s,illus,W/2-160,80);
    // Entry icons
    const entries=[['M','#2563EB','Lunch 65g','1:30 PM'],['I','#7C3AED','4u bolus','1:35 PM'],['E','#EA580C','Run 30m','9:00 AM']];
    entries.forEach(([ico,color,label,time],i)=>{
      const row=figma.createFrame();row.resize(280,52);row.cornerRadius=14;row.fills=solid(SURF);
      row.strokes=solid(BRD);row.strokeWeight=1;
      illus.appendChild(row);row.x=20;row.y=20+i*76;
      const ib=rc(32,32,color,0.12,16);row.appendChild(ib);ib.x=10;ib.y=10;
      const it=tx(ico,'Bold',14,color);row.appendChild(it);it.x=17;it.y=16;
      const lt=tx(label,'SemiBold',13,T1);row.appendChild(lt);lt.x=52;lt.y=10;
      const tt=tx(time,'Regular',11,T3);row.appendChild(tt);tt.x=52;tt.y=28;
      const check=rc(20,20,SUC,0.15,10);row.appendChild(check);check.x=252;check.y=16;
    });
    const title=ctx('Log Everything','Bold',28,T1,337);p(s,title,28,390);
    const body=ctx('Track meals, insulin, exercise, ketones and notes in seconds. Build a complete health picture.','Regular',15,T2,337);p(s,body,28,434);
    [0,1,2,3].forEach(i=>dot(s,W/2-30+i*20,H-160,i===1));
    p(s,fBtn('Next','337',PRI),28,H-128);
  }

  // ─── A-04 Light: Onboarding 3 ─────────────────────────────────────
  {
    const s=scr('A-04 — Onboarding 3',3);
    p(s,tx('Skip','Medium',14,T3),W-62,52);
    const illus=figma.createFrame();illus.resize(320,280);illus.cornerRadius=32;illus.fills=solid('#F0FDF4');
    p(s,illus,W/2-160,80);
    // AI chat bubble visual
    const aiCard=figma.createFrame();aiCard.resize(260,200);aiCard.cornerRadius=16;aiCard.fills=solid(SURF);
    aiCard.strokes=solid(BRD);aiCard.strokeWeight=1;
    illus.appendChild(aiCard);aiCard.x=30;aiCard.y=40;
    const aiIcon=figma.createFrame();aiIcon.resize(32,32);aiIcon.cornerRadius=16;aiIcon.fills=solid('#DBEAFE');
    aiCard.appendChild(aiIcon);aiIcon.x=12;aiIcon.y=12;
    const aiLbl=tx('AI','Bold',13,PRI);aiCard.appendChild(aiLbl);aiLbl.x=20;aiLbl.y=18;
    const resp=tx('Based on your pattern, consider\nreducing your breakfast ICR by 10%.\nYour post-meal spikes are consistent.','Regular',11,T2);resp.textAutoResize='HEIGHT';resp.resize(220,1);aiCard.appendChild(resp);resp.x=12;resp.y=54;
    const chip1=figma.createFrame();chip1.resize(120,26);chip1.cornerRadius=13;chip1.fills=solid('#DBEAFE');
    chip1.layoutMode='HORIZONTAL';chip1.primaryAxisSizingMode='FIXED';chip1.counterAxisSizingMode='FIXED';chip1.primaryAxisAlignItems='CENTER';chip1.counterAxisAlignItems='CENTER';
    chip1.appendChild(tx('Adjust ICR','Medium',11,PRI));aiCard.appendChild(chip1);chip1.x=12;chip1.y=158;
    const chip2=figma.createFrame();chip2.resize(90,26);chip2.cornerRadius=13;chip2.fills=solid('#DCFCE7');
    chip2.layoutMode='HORIZONTAL';chip2.primaryAxisSizingMode='FIXED';chip2.counterAxisSizingMode='FIXED';chip2.primaryAxisAlignItems='CENTER';chip2.counterAxisAlignItems='CENTER';
    chip2.appendChild(tx('Log meal','Medium',11,SUC));aiCard.appendChild(chip2);chip2.x=140;chip2.y=158;
    const title=ctx('Smart AI Insights','Bold',28,T1,337);p(s,title,28,390);
    const body=ctx('Diaboo AI learns your patterns and gives personalised suggestions to improve your control.','Regular',15,T2,337);p(s,body,28,434);
    [0,1,2,3].forEach(i=>dot(s,W/2-30+i*20,H-160,i===2));
    p(s,fBtn('Next','337',PRI),28,H-128);
  }

  // ─── A-05 Light: Onboarding 4 ─────────────────────────────────────
  {
    const s=scr('A-05 — Onboarding 4',4);
    p(s,tx('Skip','Medium',14,T3),W-62,52);
    const illus=figma.createFrame();illus.resize(320,280);illus.cornerRadius=32;illus.fills=solid('#FFF1F2');
    p(s,illus,W/2-160,80);
    // Alert notification
    const notif=figma.createFrame();notif.resize(280,64);notif.cornerRadius=16;notif.fills=solid(SURF);
    notif.strokes=solid('#FCA5A5');notif.strokeWeight=2;
    illus.appendChild(notif);notif.x=20;notif.y=24;
    const notifDot=rc(36,36,'#FEE2E2',1,18);notif.appendChild(notifDot);notifDot.x=14;notifDot.y=14;
    const notifIco=tx('!','Bold',18,DAN);notif.appendChild(notifIco);notifIco.x=21;notifIco.y=20;
    const notifTt=tx('Low Glucose Alert','Bold',14,T1);notif.appendChild(notifTt);notifTt.x=60;notifTt.y=12;
    const notifSb=tx('58 mg/dL · Eat 15g carbs now','Regular',11,T3);notif.appendChild(notifSb);notifSb.x=60;notifSb.y=30;
    // Good alert
    const notif2=figma.createFrame();notif2.resize(280,56);notif2.cornerRadius=14;notif2.fills=solid(SURF);
    notif2.strokes=solid('#A7F3D0');notif2.strokeWeight=1;
    illus.appendChild(notif2);notif2.x=20;notif2.y=104;
    const n2Dot=rc(32,32,'#DCFCE7',1,16);notif2.appendChild(n2Dot);n2Dot.x=12;n2Dot.y=12;
    const n2Ico=tx('v','Bold',14,SUC);notif2.appendChild(n2Ico);n2Ico.x=18;n2Ico.y=17;
    const n2Tt=tx('Back in range!','SemiBold',13,T1);notif2.appendChild(n2Tt);n2Tt.x=54;n2Tt.y=8;
    const n2Sb=tx('76 mg/dL · Great job recovering','Regular',11,T3);notif2.appendChild(n2Sb);n2Sb.x=54;n2Sb.y=26;
    // Caregiver card
    const cg=figma.createFrame();cg.resize(280,72);cg.cornerRadius=14;cg.fills=solid(SURF);
    cg.strokes=solid(BRD);cg.strokeWeight=1;
    illus.appendChild(cg);cg.x=20;cg.y=176;
    const cgAv=figma.createFrame();cgAv.resize(36,36);cgAv.cornerRadius=18;cgAv.fills=solid('#EDE9FE');
    cg.appendChild(cgAv);cgAv.x=12;cgAv.y=18;
    const cgLbl=tx('FA','Bold',13,'#7C3AED');cg.appendChild(cgLbl);cgLbl.x=18;cgLbl.y=25;
    const cgTt=tx('Fatima (Mum) is watching','Medium',12,T1);cg.appendChild(cgTt);cgTt.x=58;cgTt.y=16;
    const cgSb=tx('She will be alerted if your BG drops low','Regular',10,T3);cg.appendChild(cgSb);cgSb.x=58;cgSb.y=34;
    const title=ctx('Stay Safe with Alerts','Bold',28,T1,337);p(s,title,28,390);
    const body=ctx('Critical glucose alerts reach you — and chosen caregivers — in seconds. Never miss a dangerous moment.','Regular',15,T2,337);p(s,body,28,434);
    [0,1,2,3].forEach(i=>dot(s,W/2-30+i*20,H-160,i===3));
    p(s,fBtn("Let's Get Started",'337',PRI),28,H-128);
  }

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('Light: Onboarding A-01–A-05 built!');
})();
