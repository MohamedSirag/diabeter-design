(async () => {
  // LIGHT THEME — K-01 to K-02: Widget screens
  // Phone home screen background stays dark (OS context)
  // Widget components themselves use light/translucent styling
  const W=393,H=844,GAP=40,ROW_Y=25*924; // y=23100

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
    const f=figma.createFrame();f.name=name+'  [Light]';f.resize(W,H);
    f.x=col*(W+GAP);f.y=ROW_Y;f.fills=solid('#1A1F2E');
    figma.currentPage.appendChild(f);return f;
  }

  // Home screen background — stays dark (OS)
  function homeBg(s){
    p(s,rc(W,H,'#0D1117'),0,0);
    p(s,rc(W,H,'#1A2040',0.5),0,0);
    p(s,tx('9:41','ExtraBold',48,'#FFFFFF'),W/2-52,100);
    p(s,tx('Friday, May 23','Regular',16,'#FFFFFF',0.8),W/2-70,158);
    p(s,tx('|||','Regular',12,'#FFFFFF'),348,16);
    p(s,tx('9:41','SemiBold',14,'#FFFFFF'),20,14);
    const dock=rc(W,90,'#000000',0.5);p(s,dock,0,H-90);
    const dockApps=['Phone','Messages','Camera','Browser'];
    dockApps.forEach((app,i)=>{
      const appBg=rc(52,52,'#1E293B',0.8,14);p(s,appBg,28+i*88,H-78);
      const lbl=tx(app.slice(0,3),'Regular',8,'#CBD5E1');p(s,lbl,36+i*88,H-24);
    });
  }

  // ─── K-01: Small Widget (2×1) ─────────────────────────────────────
  {
    const s=scr('K-01 — Small Widget',0);
    homeBg(s);
    // Light widget on dark home screen
    const widget=figma.createFrame();widget.resize(160,80);widget.cornerRadius=16;
    widget.fills=solid(SURF,0.95);widget.strokes=solid(SUC,0.5);widget.strokeWeight=1;
    p(s,widget,W/2-80,220);
    // Logo
    const logoSm=figma.createFrame();logoSm.resize(20,20);logoSm.cornerRadius=10;logoSm.fills=solid('#0891B2',0.12);
    widget.appendChild(logoSm);logoSm.x=8;logoSm.y=8;
    const drop=rc(8,10,'#0891B2',1,4);logoSm.appendChild(drop);drop.x=6;drop.y=5;
    const appName=tx('diaboo','Bold',10,T4);widget.appendChild(appName);appName.x=32;appName.y=10;
    // Glucose
    const glucNum=tx('118','ExtraBold',32,SUC);widget.appendChild(glucNum);glucNum.x=8;glucNum.y=30;
    const mgdl=tx('mg/dL','Regular',9,T4);widget.appendChild(mgdl);mgdl.x=58;mgdl.y=50;
    const trend=tx('->','Bold',12,SUC);widget.appendChild(trend);trend.x=108;trend.y=44;
    const timeL=tx('2m ago','Regular',8,T4);widget.appendChild(timeL);timeL.x=100;timeL.y=62;
    // Annotation
    const ann=rc(150,24,SURF3,0.95,8);p(s,ann,W/2-75,308);
    ann.strokes=solid('#BFDBFE');ann.strokeWeight=1;
    p(s,tx('2×1 compact widget','Regular',9,PRI),W/2-67,316);

    // 1×1 version
    const w1x1=figma.createFrame();w1x1.resize(76,76);w1x1.cornerRadius=16;
    w1x1.fills=solid(SURF,0.95);w1x1.strokes=solid(SUC,0.5);w1x1.strokeWeight=1;
    p(s,w1x1,W/2-38,360);
    const num1x1=tx('118','ExtraBold',24,SUC);num1x1.textAlignHorizontal='CENTER';num1x1.textAutoResize='NONE';num1x1.resize(76,28);
    w1x1.appendChild(num1x1);num1x1.x=0;num1x1.y=14;
    const trend1x1=tx('->','Bold',11,SUC);trend1x1.textAlignHorizontal='CENTER';trend1x1.textAutoResize='NONE';trend1x1.resize(76,14);
    w1x1.appendChild(trend1x1);trend1x1.x=0;trend1x1.y=44;
    const ann2=rc(110,24,SURF3,0.95,8);p(s,ann2,W/2-55,444);
    ann2.strokes=solid('#BFDBFE');ann2.strokeWeight=1;
    p(s,tx('1×1 icon widget','Regular',9,PRI),W/2-47,452);

    // Info card
    const infoCard=rc(337,140,SURF,1,16);p(s,infoCard,28,490);
    infoCard.strokes=solid(BRD);infoCard.strokeWeight=1;
    p(s,tx('Home Screen Widgets','SemiBold',14,T1),44,506);
    p(s,tx('Diaboo provides 3 Android widget sizes:\n1×1: Glucose number + trend\n2×1: Glucose + trend + time ago\n4×2: Full chart with last 3h data','Regular',12,T2),44,528);
    p(s,tx('Enable in: Long press home → Widgets → Diaboo','Regular',10,T4),44,608);
  }

  // ─── K-02: Graph Widget (4×2) ─────────────────────────────────────
  {
    const s=scr('K-02 — Graph Widget',1);
    homeBg(s);
    // Large 4×2 widget — light
    const widget=figma.createFrame();widget.resize(337,160);widget.cornerRadius=20;
    widget.fills=solid(SURF,0.97);widget.strokes=solid(SUC,0.4);widget.strokeWeight=1;
    p(s,widget,28,200);
    const headerLbl=tx('diaboo','Bold',12,T4);widget.appendChild(headerLbl);headerLbl.x=12;headerLbl.y=10;
    const glucBig=tx('118','ExtraBold',28,SUC);widget.appendChild(glucBig);glucBig.x=12;glucBig.y=28;
    const mgdlW=tx('mg/dL','Medium',10,T4);widget.appendChild(mgdlW);mgdlW.x=60;mgdlW.y=44;
    const trendW=tx('-> Steady','SemiBold',11,SUC);widget.appendChild(trendW);trendW.x=12;trendW.y=64;
    const timeW=tx('Updated 2 min ago','Regular',9,T4);widget.appendChild(timeW);timeW.x=12;timeW.y=80;
    // Mini chart area — light bg with border
    const chartArea=rc(200,110,SURF2,1,12);chartArea.strokes=solid(BRD);chartArea.strokeWeight=1;
    widget.appendChild(chartArea);chartArea.x=125;chartArea.y=12;
    const pts=[105,112,108,114,122,116,120,115,118];
    pts.forEach((v,i)=>{
      const color=v<70?DAN:v>180?WARN:SUC;
      const px=Math.round(10+i*20);const py=Math.round(95-(v-80)/200*85);
      const dot=rc(4,4,color,0.9,2);chartArea.appendChild(dot);dot.x=px;dot.y=py;
      if(i>0){const py0=Math.round(95-(pts[i-1]-80)/200*85);const seg=rc(20,2,color,0.4,1);chartArea.appendChild(seg);seg.x=px-20;seg.y=Math.min(py,py0)+1;}
    });
    const ll=rc(180,1,DAN,0.3);chartArea.appendChild(ll);ll.x=10;ll.y=Math.round(95-(70-80)/200*85);
    const hl=rc(180,1,WARN,0.3);chartArea.appendChild(hl);hl.x=10;hl.y=Math.round(95-(180-80)/200*85);
    const t3h=tx('3h','Regular',8,T4);chartArea.appendChild(t3h);t3h.x=10;t3h.y=98;
    const tnow=tx('Now','Regular',8,T4);chartArea.appendChild(tnow);tnow.x=170;tnow.y=98;
    // TIR
    const tirLbl=tx('TIR 87%','SemiBold',11,SUC);widget.appendChild(tirLbl);tirLbl.x=12;tirLbl.y=100;
    const tirBar=rc(100,6,SURF2,1,3);tirBar.strokes=solid(BRD);tirBar.strokeWeight=1;
    widget.appendChild(tirBar);tirBar.x=12;tirBar.y=120;
    const tirFill=rc(87,6,SUC,1,3);widget.appendChild(tirFill);tirFill.x=12;tirFill.y=120;
    // Annotation
    const ann=rc(210,24,SURF3,0.95,8);p(s,ann,W/2-105,368);
    ann.strokes=solid('#BFDBFE');ann.strokeWeight=1;
    p(s,tx('4×2 large graph widget','Regular',9,PRI),W/2-78,376);
    // Info card
    const infoCard=rc(337,100,SURF,1,16);p(s,infoCard,28,420);
    infoCard.strokes=solid(BRD);infoCard.strokeWeight=1;
    p(s,tx('Large Widget Features','SemiBold',14,T1),44,436);
    p(s,tx('Live glucose + trend + 3-hour chart\nTime in range bar · Last updated time\nTap widget to open Diaboo app','Regular',12,T2),44,458);
    p(s,tx('Widget updates every 5 minutes via background sync','Regular',10,T4),44,506);
  }

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('✓ Widget light screens K-01 to K-02 built!');
})();
