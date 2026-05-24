(async () => {
  // Android home screen widgets — shown on a phone home screen mockup
  const W=393,H=844,GAP=40,ROW_Y=11*924; // y=10164

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
  function scr(name,col,fill='#1A1F2E'){
    const f=figma.createFrame();f.name=name;f.resize(W,H);
    f.x=col*(W+GAP);f.y=ROW_Y;f.fills=solid(fill);
    figma.currentPage.appendChild(f);return f;
  }

  // Home screen background
  function homeBg(s){
    p(s,rc(W,H,'#0D1117'),0,0);
    // Wallpaper gradient
    p(s,rc(W,H,'#1A2040',0.5),0,0);
    p(s,tx('9:41','ExtraBold',48,'#FFFFFF'),W/2-52,100);
    p(s,tx('Friday, May 23','Regular',16,'#FFFFFF',0.8),W/2-70,158);
    p(s,tx('|||','Regular',12,'#FFFFFF'),348,16);
    p(s,tx('9:41','SemiBold',14,'#FFFFFF'),20,14);
    // App dock at bottom
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
    // Widget 2×1 (about 160×80)
    const widget=figma.createFrame();widget.resize(160,80);widget.cornerRadius=16;
    widget.fills=solid('#0F172A',0.95);widget.strokes=solid('#22C55E',0.4);widget.strokeWeight=1;
    p(s,widget,W/2-80,220);
    // Logo small
    const logoSm=figma.createFrame();logoSm.resize(20,20);logoSm.cornerRadius=10;logoSm.fills=solid('#22D3EE',0.15);
    widget.appendChild(logoSm);logoSm.x=8;logoSm.y=8;
    const drop=rc(8,10,'#22D3EE',1,4);logoSm.appendChild(drop);drop.x=6;drop.y=5;
    const appName=tx('diaboo','Bold',10,'#94A3B8');widget.appendChild(appName);appName.x=32;appName.y=10;
    // Glucose
    const glucNum=tx('118','ExtraBold',32,'#22C55E');widget.appendChild(glucNum);glucNum.x=8;glucNum.y=30;
    const mgdl=tx('mg/dL','Regular',9,'#94A3B8');widget.appendChild(mgdl);mgdl.x=58;mgdl.y=50;
    const trend=tx('->','Bold',12,'#22C55E');widget.appendChild(trend);trend.x=108;trend.y=44;
    const timeL=tx('2m ago','Regular',8,'#475569');widget.appendChild(timeL);timeL.x=100;timeL.y=62;
    // Annotation
    const ann=rc(140,24,'#1D3461',0.9,8);p(s,ann,W/2-70,308);
    const annT=tx('2×1 compact widget','Regular',9,'#3B82F6');p(s,annT,W/2-62,316);

    // Also show a 1×1 version
    const w1x1=figma.createFrame();w1x1.resize(76,76);w1x1.cornerRadius=16;
    w1x1.fills=solid('#0F172A',0.95);w1x1.strokes=solid('#22C55E',0.4);w1x1.strokeWeight=1;
    p(s,w1x1,W/2-38,360);
    const num1x1=tx('118','ExtraBold',24,'#22C55E');num1x1.textAlignHorizontal='CENTER';num1x1.textAutoResize='NONE';num1x1.resize(76,28);
    w1x1.appendChild(num1x1);num1x1.x=0;num1x1.y=14;
    const trend1x1=tx('->','Bold',11,'#22C55E');trend1x1.textAlignHorizontal='CENTER';trend1x1.textAutoResize='NONE';trend1x1.resize(76,14);
    w1x1.appendChild(trend1x1);trend1x1.x=0;trend1x1.y=44;
    const ann2=rc(100,24,'#1D3461',0.9,8);p(s,ann2,W/2-50,444);
    const annT2=tx('1×1 icon widget','Regular',9,'#3B82F6');p(s,annT2,W/2-42,452);

    // Info card below
    const infoCard=rc(337,140,'#0F172A',1,16);p(s,infoCard,28,490);
    p(s,tx('Home Screen Widgets','SemiBold',14,'#FFFFFF'),44,506);
    p(s,tx('Diaboo provides 3 Android widget sizes:\n1×1: Glucose number + trend\n2×1: Glucose + trend + time ago\n4×2: Full chart with last 3h data','Regular',12,'#CBD5E1'),44,528);
    p(s,tx('Enable in: Long press home → Widgets → Diaboo','Regular',10,'#475569'),44,608);
  }

  // ─── K-02: Graph Widget (4×2) ─────────────────────────────────────
  {
    const s=scr('K-02 — Graph Widget',1);
    homeBg(s);
    // Large 4×2 widget (~337×160)
    const widget=figma.createFrame();widget.resize(337,160);widget.cornerRadius=20;
    widget.fills=solid('#0F172A',0.96);widget.strokes=solid('#22C55E',0.3);widget.strokeWeight=1;
    p(s,widget,28,200);
    // Header row inside widget
    const headerLbl=tx('diaboo','Bold',12,'#94A3B8');widget.appendChild(headerLbl);headerLbl.x=12;headerLbl.y=10;
    const glucBig=tx('118','ExtraBold',28,'#22C55E');widget.appendChild(glucBig);glucBig.x=12;glucBig.y=28;
    const mgdlW=tx('mg/dL','Medium',10,'#94A3B8');widget.appendChild(mgdlW);mgdlW.x=60;mgdlW.y=44;
    const trendW=tx('-> Steady','SemiBold',11,'#22C55E');widget.appendChild(trendW);trendW.x=12;trendW.y=64;
    const timeW=tx('Updated 2 min ago','Regular',9,'#475569');widget.appendChild(timeW);timeW.x=12;timeW.y=80;
    // Mini chart area
    const chartArea=rc(200,110,'#0B1221',1,12);widget.appendChild(chartArea);chartArea.x=125;chartArea.y=12;
    const pts=[105,112,108,114,122,116,120,115,118];
    pts.forEach((v,i)=>{
      const color=v<70?'#EF4444':v>180?'#F59E0B':'#22C55E';
      const px=Math.round(10+i*20);const py=Math.round(95-(v-80)/200*85);
      const dot=rc(4,4,color,0.9,2);chartArea.appendChild(dot);dot.x=px;dot.y=py;
      if(i>0){const py0=Math.round(95-(pts[i-1]-80)/200*85);const seg=rc(20,2,color,0.4,1);chartArea.appendChild(seg);seg.x=px-20;seg.y=Math.min(py,py0)+1;}
    });
    // Range lines on chart
    const ll=rc(180,1,'#EF4444',0.3);chartArea.appendChild(ll);ll.x=10;ll.y=Math.round(95-(70-80)/200*85);
    const hl=rc(180,1,'#F59E0B',0.3);chartArea.appendChild(hl);hl.x=10;hl.y=Math.round(95-(180-80)/200*85);
    const t3h=tx('3h','Regular',8,'#475569');chartArea.appendChild(t3h);t3h.x=10;t3h.y=98;
    const tnow=tx('Now','Regular',8,'#475569');chartArea.appendChild(tnow);tnow.x=170;tnow.y=98;
    // TIR
    const tirLbl=tx('TIR 87%','SemiBold',11,'#22C55E');widget.appendChild(tirLbl);tirLbl.x=12;tirLbl.y=100;
    const tirBar=rc(100,6,'#1E293B',1,3);widget.appendChild(tirBar);tirBar.x=12;tirBar.y=120;
    const tirFill=rc(87,6,'#22C55E',1,3);widget.appendChild(tirFill);tirFill.x=12;tirFill.y=120;
    // Annotation
    const ann=rc(200,24,'#1D3461',0.9,8);p(s,ann,W/2-100,368);
    const annT=tx('4×2 large graph widget','Regular',9,'#3B82F6');p(s,annT,W/2-74,376);
    // Info card
    const infoCard=rc(337,100,'#0F172A',1,16);p(s,infoCard,28,420);
    p(s,tx('Large Widget Features','SemiBold',14,'#FFFFFF'),44,436);
    p(s,tx('Live glucose + trend + 3-hour chart\nTime in range bar · Last updated time\nTap widget to open Diaboo app','Regular',12,'#CBD5E1'),44,458);
    p(s,tx('Widget updates every 5 minutes via background sync','Regular',10,'#475569'),44,506);
  }

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('Widget screens K-01 to K-02 built!');
})();
