(async () => {
  // LIGHT THEME — J-01 to J-03: Overlay bubble screens
  // Phone home screen background stays dark (it's the OS, not our app)
  // The bubble/card components themselves use light theme
  const W=393,H=844,GAP=40,ROW_Y=24*924; // y=22176

  await Promise.all([
    figma.loadFontAsync({family:'Montserrat',style:'Regular'}),
    figma.loadFontAsync({family:'Montserrat',style:'Medium'}),
    figma.loadFontAsync({family:'Montserrat',style:'SemiBold'}),
    figma.loadFontAsync({family:'Montserrat',style:'Bold'}),
    figma.loadFontAsync({family:'Montserrat',style:'ExtraBold'}),
  ]);

  const SURF='#FFFFFF',SURF2='#F1F5F9',SURF3='#EFF6FF';
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
  function scr(name,col){
    // Frame background: dark home screen (OS context, not our UI)
    const f=figma.createFrame();f.name=name+'  [Light]';f.resize(W,H);
    f.x=col*(W+GAP);f.y=ROW_Y;f.fills=solid('#1A1F2E');
    figma.currentPage.appendChild(f);return f;
  }

  // Fake dark phone home screen (OS — unchanged from dark version)
  function phoneBg(s){
    p(s,rc(W,H,'#0D1117'),0,0);
    const apps=['Gmail','Maps','Music','Photos','Chrome','Settings','Calendar','Contacts'];
    apps.forEach((app,i)=>{
      const row=Math.floor(i/4),col=i%4;
      const appBg=rc(52,52,'#1E293B',0.6,14);
      p(s,appBg,52+col*76,200+row*90);
      const lbl=tx(app.slice(0,3),'Regular',8,'#94A3B8');
      p(s,lbl,52+col*76+8,230+row*90);
    });
    p(s,tx('9:41','SemiBold',14,'#FFFFFF'),20,14);
    p(s,tx('|||','Regular',12,'#FFFFFF'),348,16);
    p(s,rc(W,H,'#000000',0.2),0,0);
  }

  // ─── J-01: Bubble Compact ─────────────────────────────────────────
  {
    const s=scr('J-01 — Bubble Compact',0);
    phoneBg(s);
    const ctx2=tx('Floating over other apps','Regular',10,T4);ctx2.textAlignHorizontal='CENTER';ctx2.textAutoResize='NONE';ctx2.resize(300,14);
    p(s,ctx2,47,440);
    // Compact bubble — light theme card with strong border
    const bubble=figma.createFrame();bubble.resize(72,72);bubble.cornerRadius=36;
    bubble.fills=solid(SURF,0.97);bubble.strokes=solid(SUC,0.9);bubble.strokeWeight=3;
    p(s,bubble,297,94);
    const num=tx('118','ExtraBold',18,SUC);num.textAlignHorizontal='CENTER';num.textAutoResize='NONE';num.resize(70,22);
    bubble.appendChild(num);num.x=1;num.y=16;
    const unit=tx('mg/dL','Regular',8,T4);unit.textAlignHorizontal='CENTER';unit.textAutoResize='NONE';unit.resize(70,12);
    bubble.appendChild(unit);unit.x=1;unit.y=40;
    const arr=tx('->','Bold',10,SUC);
    bubble.appendChild(arr);arr.x=28;arr.y=54;
    const handle=tx('drag','Regular',8,T4);p(s,handle,316,172);
    // Annotation
    const ann=rc(110,24,SURF3,1,8);p(s,ann,172,112);
    ann.strokes=solid('#BFDBFE');ann.strokeWeight=1;
    p(s,tx('Tap to expand','Regular',9,PRI),178,120);
    p(s,rc(30,1,PRI,0.4),276,124);
  }

  // ─── J-02: Bubble Expanded ────────────────────────────────────────
  {
    const s=scr('J-02 — Bubble Expanded',1);
    phoneBg(s);
    // Expanded overlay card — light
    const card=figma.createFrame();card.resize(280,220);card.cornerRadius=20;
    card.fills=solid(SURF,0.98);card.strokes=solid(BRD);card.strokeWeight=1;
    p(s,card,57,280);
    // Header
    const headerBg=rc(280,44,SURF2,1,20);card.appendChild(headerBg);headerBg.x=0;headerBg.y=0;
    const logoSm=figma.createFrame();logoSm.resize(24,24);logoSm.cornerRadius=12;logoSm.fills=solid('#0891B2',0.12);
    card.appendChild(logoSm);logoSm.x=10;logoSm.y=10;
    const logoDrop=rc(10,14,'#0891B2',1,5);logoSm.appendChild(logoDrop);logoDrop.x=7;logoDrop.y=5;
    const headerLbl=tx('diaboo','Bold',14,T1);card.appendChild(headerLbl);headerLbl.x=40;headerLbl.y=14;
    const closeBtn=rc(24,24,SURF2,1,12);closeBtn.strokes=solid(BRD);closeBtn.strokeWeight=1;
    card.appendChild(closeBtn);closeBtn.x=248;closeBtn.y=10;
    const closeX=tx('x','SemiBold',12,T3);card.appendChild(closeX);closeX.x=255;closeX.y=14;
    // Glucose value
    const glucoseVal=tx('118','ExtraBold',48,SUC);card.appendChild(glucoseVal);glucoseVal.x=12;glucoseVal.y=52;
    const mgdl=tx('mg/dL','Medium',11,T4);card.appendChild(mgdl);mgdl.x=80;mgdl.y=80;
    const trendLbl=tx('-> Steady','SemiBold',12,SUC);card.appendChild(trendLbl);trendLbl.x=12;trendLbl.y=106;
    const timeLbl=tx('2 min ago','Regular',10,T4);card.appendChild(timeLbl);timeLbl.x=12;timeLbl.y=122;
    // Mini chart
    const chartBg=rc(180,36,SURF2,1,10);chartBg.strokes=solid(BRD);chartBg.strokeWeight=1;
    card.appendChild(chartBg);chartBg.x=88;chartBg.y=58;
    const pts=[105,112,108,114,118];
    pts.forEach((v,i)=>{
      const px=8+i*36;const py=28-Math.round((v-90)/100*24);
      const dot=rc(4,4,SUC,0.9,2);chartBg.appendChild(dot);dot.x=px;dot.y=py;
      if(i>0){const py0=28-Math.round((pts[i-1]-90)/100*24);const seg=rc(36,2,SUC,0.4,1);chartBg.appendChild(seg);seg.x=px-36;seg.y=Math.min(py,py0)+1;}
    });
    // Quick actions
    const divider=rc(256,1,BRD);card.appendChild(divider);divider.x=12;divider.y=148;
    const logBtn=figma.createFrame();logBtn.resize(116,36);logBtn.fills=solid(PRI);logBtn.cornerRadius=10;
    logBtn.layoutMode='HORIZONTAL';logBtn.primaryAxisSizingMode='FIXED';logBtn.counterAxisSizingMode='FIXED';
    logBtn.primaryAxisAlignItems='CENTER';logBtn.counterAxisAlignItems='CENTER';
    logBtn.appendChild(tx('+ Log','SemiBold',13,SURF));
    card.appendChild(logBtn);logBtn.x=12;logBtn.y=158;
    const openBtn=figma.createFrame();openBtn.resize(116,36);openBtn.fills=solid(SURF2);openBtn.cornerRadius=10;
    openBtn.strokes=solid(BRD);openBtn.strokeWeight=1;
    openBtn.layoutMode='HORIZONTAL';openBtn.primaryAxisSizingMode='FIXED';openBtn.counterAxisSizingMode='FIXED';
    openBtn.primaryAxisAlignItems='CENTER';openBtn.counterAxisAlignItems='CENTER';
    openBtn.appendChild(tx('Open App','Medium',13,T2));
    card.appendChild(openBtn);openBtn.x=152;openBtn.y=158;
  }

  // ─── J-03: Quick Log ──────────────────────────────────────────────
  {
    const s=scr('J-03 — Quick Log',2);
    phoneBg(s);
    // Quick log sheet — light
    const sheet=figma.createFrame();sheet.resize(280,320);sheet.cornerRadius=20;
    sheet.fills=solid(SURF,0.98);sheet.strokes=solid(BRD);sheet.strokeWeight=1;
    p(s,sheet,57,240);
    const hdrBg=rc(280,44,SURF2,1,20);sheet.appendChild(hdrBg);hdrBg.x=0;hdrBg.y=0;
    const hdrLbl=tx('Quick Log','Bold',16,T1);sheet.appendChild(hdrLbl);hdrLbl.x=100;hdrLbl.y=13;
    const closeBt=rc(24,24,SURF2,1,12);closeBt.strokes=solid(BRD);closeBt.strokeWeight=1;
    sheet.appendChild(closeBt);closeBt.x=248;closeBt.y=10;
    const closeXT=tx('x','SemiBold',12,T3);sheet.appendChild(closeXT);closeXT.x=255;closeXT.y=14;
    // Log type tabs
    const tabBg=rc(256,36,SURF2,1,12);tabBg.strokes=solid(BRD);tabBg.strokeWeight=1;
    sheet.appendChild(tabBg);tabBg.x=12;tabBg.y=52;
    const logTypes=['Meal','Insulin','Note'];
    logTypes.forEach((type,i)=>{
      const isA=i===0;
      if(isA){const hl=rc(78,28,PRI,1,9);sheet.appendChild(hl);hl.x=16+i*84;hl.y=56;}
      const lbl=tx(type,isA?'SemiBold':'Regular',12,isA?SURF:T3);lbl.textAlignHorizontal='CENTER';lbl.textAutoResize='NONE';lbl.resize(78,28);
      sheet.appendChild(lbl);lbl.x=16+i*84;lbl.y=62;
    });
    // Meal quick log
    const inpBg=rc(256,48,SURF2,1,12);inpBg.strokes=solid(BRD);inpBg.strokeWeight=1;
    sheet.appendChild(inpBg);inpBg.x=12;inpBg.y=100;
    const inpLbl=tx('Food name','Regular',10,T4);sheet.appendChild(inpLbl);inpLbl.x=24;inpLbl.y=108;
    const inpVal=tx('Pasta bolognese','Regular',13,T1);sheet.appendChild(inpVal);inpVal.x=24;inpVal.y=124;
    const carbBg=rc(120,48,SURF2,1,12);carbBg.strokes=solid(BRD);carbBg.strokeWeight=1;
    sheet.appendChild(carbBg);carbBg.x=12;carbBg.y=158;
    const carbLbl=tx('Carbs (g)','Regular',10,T4);sheet.appendChild(carbLbl);carbLbl.x=24;carbLbl.y=166;
    const carbVal=tx('65','Bold',18,T1);sheet.appendChild(carbVal);carbVal.x=24;carbVal.y=182;
    const insBg=rc(120,48,SURF2,1,12);insBg.strokes=solid(BRD);insBg.strokeWeight=1;
    sheet.appendChild(insBg);insBg.x=148;insBg.y=158;
    const insLbl=tx('Insulin (u)','Regular',10,T4);sheet.appendChild(insLbl);insLbl.x=160;insLbl.y=166;
    const insVal=tx('4','Bold',18,T1);sheet.appendChild(insVal);insVal.x=160;insVal.y=182;
    // Save btn
    const saveBtn=figma.createFrame();saveBtn.resize(256,44);saveBtn.fills=solid(PRI);saveBtn.cornerRadius=12;
    saveBtn.layoutMode='HORIZONTAL';saveBtn.primaryAxisSizingMode='FIXED';saveBtn.counterAxisSizingMode='FIXED';
    saveBtn.primaryAxisAlignItems='CENTER';saveBtn.counterAxisAlignItems='CENTER';
    saveBtn.appendChild(tx('Save Entry','SemiBold',14,SURF));
    sheet.appendChild(saveBtn);saveBtn.x=12;saveBtn.y=220;
    const openFullLbl=tx('Open full app for more details','Regular',10,T4);sheet.appendChild(openFullLbl);openFullLbl.x=56;openFullLbl.y=274;
  }

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('✓ Overlay bubble light screens J-01 to J-03 built!');
})();
