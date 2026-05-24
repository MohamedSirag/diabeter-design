(async () => {
  // LIGHT THEME — B-01 to B-05: Live glucose screens
  const W=393,H=844,GAP=40,ROW_Y=16*924; // y=14784

  await Promise.all([
    figma.loadFontAsync({family:'Montserrat',style:'Regular'}),
    figma.loadFontAsync({family:'Montserrat',style:'Medium'}),
    figma.loadFontAsync({family:'Montserrat',style:'SemiBold'}),
    figma.loadFontAsync({family:'Montserrat',style:'Bold'}),
    figma.loadFontAsync({family:'Montserrat',style:'ExtraBold'}),
  ]);

  const BG='#F3F6FB',SURF='#FFFFFF',SURF2='#F1F5F9';
  const T1='#0F172A',T2='#334155',T3='#64748B',T4='#94A3B8';
  const PRI='#2563EB',SUC='#16A34A',WARN='#D97706',DAN='#DC2626';
  const ORG='#EA580C',BRD='#E2E8F0',CHART='#EEF2F7';

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
  function ctx(text,style,size,hex,w){
    const t=tx(text,style,size,hex);t.textAlignHorizontal='CENTER';t.textAutoResize='HEIGHT';t.resize(w,1);return t;
  }
  function fBtn(label,w,hex,textHex=SURF){
    const b=figma.createFrame();b.resize(w,52);b.fills=solid(hex);b.cornerRadius=14;
    b.layoutMode='HORIZONTAL';b.primaryAxisSizingMode='FIXED';b.counterAxisSizingMode='FIXED';
    b.primaryAxisAlignItems='CENTER';b.counterAxisAlignItems='CENTER';
    b.appendChild(tx(label,'SemiBold',15,textHex));return b;
  }

  function sb(s,fill=BG){
    p(s,rc(W,44,fill),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
  }
  function ab(s,fill=SURF){
    p(s,rc(W,56,fill),0,44);
    const logo=figma.createFrame();logo.resize(28,28);logo.cornerRadius=14;logo.fills=solid('#0891B2',0.12);
    const d=rc(14,18,'#0891B2',1,7);logo.appendChild(d);d.x=7;d.y=5;
    p(s,logo,20,56);
    p(s,tx('diaboo','Bold',20,T1),54,60);
    const bell=rc(34,34,SURF2,1,10);p(s,bell,339,53);
    p(s,tx('!','SemiBold',14,T3),349,59);
  }
  function tabs(s,active=0){
    const bar=figma.createFrame();bar.resize(W,80);bar.fills=solid(SURF);
    const div=rc(W,1,BRD);bar.appendChild(div);div.x=0;div.y=0;
    p(s,bar,0,H-80);
    const names=['Live','Logbook','Camera','News','Profile'];
    const tw=W/5;
    names.forEach((n,i)=>{
      const isA=i===active;
      const lbl=tx(n,isA?'SemiBold':'Regular',11,isA?PRI:T4);
      bar.appendChild(lbl);lbl.x=Math.round(i*tw+tw/2-n.length*3.3);lbl.y=52;
      if(isA){const dot=rc(4,4,PRI,1,2);bar.appendChild(dot);dot.x=Math.round(i*tw+tw/2-2);dot.y=8;}
    });
  }

  function gRing(s,value,color,y=148){
    const outer=figma.createFrame();outer.resize(216,216);outer.cornerRadius=108;
    outer.fills=solid(color,0.06);outer.strokes=solid(color,0.2);outer.strokeWeight=1;
    p(s,outer,W/2-108,y-8);
    const ring=figma.createFrame();ring.resize(200,200);ring.cornerRadius=100;
    ring.fills=solid(SURF);ring.strokes=solid(color,0.9);ring.strokeWeight=3;
    p(s,ring,W/2-100,y);
    const num=tx(String(value),'ExtraBold',60,color);num.textAlignHorizontal='CENTER';num.textAutoResize='NONE';num.resize(200,72);ring.appendChild(num);num.x=0;num.y=55;
    const unit=tx('mg/dL','Medium',13,T3);unit.textAlignHorizontal='CENTER';unit.textAutoResize='NONE';unit.resize(200,18);ring.appendChild(unit);unit.x=0;unit.y=130;
    return ring;
  }

  function chart(s,vals,y,w=337,h=96){
    const bg=rc(w,h,CHART,1,16);p(s,bg,28,y);
    const pts=vals.length;const sp=(w-32)/(pts-1);
    const hi=Math.max(...vals)+20,lo=Math.min(...vals)-20;
    const toY=v=>Math.round((h-12)-(v-lo)/(hi-lo)*(h-20))+6;
    const bTop=toY(180),bBot=toY(70);
    if(bBot>bTop){const band=rc(w-4,bBot-bTop,SUC,0.1);p(s,band,30,y+bTop);}
    const ll=rc(w-4,1,DAN,0.4);p(s,ll,30,y+toY(70));
    const hl=rc(w-4,1,WARN,0.4);p(s,hl,30,y+toY(180));
    vals.forEach((v,i)=>{
      const col=v<70?DAN:v>180?WARN:SUC;
      const px=Math.round(16+i*sp);const py=toY(v);
      const dot=rc(5,5,col,1,3);p(s,dot,28+px-2,y+py-2);
      if(i>0){
        const px0=Math.round(16+(i-1)*sp),py0=toY(vals[i-1]);
        const dx=px-px0,dy=Math.abs(py-py0);
        if(dy<40){const seg=rc(Math.round(Math.sqrt(dx*dx+dy*dy)),2,col,0.5,1);p(s,seg,28+px0+dx/2-Math.round(Math.sqrt(dx*dx+dy*dy)/2),y+Math.min(py,py0)+dy/2);}
      }
    });
    p(s,tx('3h ago','Regular',9,T4),32,y+h-12);
    p(s,tx('Now','Regular',9,T4),28+w-38,y+h-12);
  }

  function pill(s,label,val,hex,x,y){
    const c=figma.createFrame();c.resize(100,54);c.fills=solid(SURF);c.cornerRadius=14;
    c.strokes=solid(hex,0.3);c.strokeWeight=1;p(s,c,x,y);
    const l=tx(label,'Regular',10,T3);c.appendChild(l);l.x=10;l.y=8;
    const v=tx(val,'Bold',16,hex);c.appendChild(v);v.x=10;v.y=28;
  }

  function banner(s,title,body,hex,y){
    const b=figma.createFrame();b.resize(337,58);b.fills=solid(hex,0.08);b.cornerRadius=14;
    b.strokes=solid(hex,0.45);b.strokeWeight=1;p(s,b,28,y);
    const t=tx(title,'SemiBold',14,hex);b.appendChild(t);t.x=14;t.y=9;
    const d=tx(body,'Regular',11,T2);b.appendChild(d);d.x=14;d.y=30;
  }

  // ─── B-01 Light: Normal 118 mg/dL ────────────────────────────────
  {
    const s=scr('B-01 — Live Normal',0);
    sb(s);ab(s);
    p(s,tx('Friday, May 23 · 9:41 AM','Regular',12,T3),28,108);
    const ring=gRing(s,118,SUC,142);
    const trend=tx('-> Steady','SemiBold',13,SUC);ring.appendChild(trend);trend.x=58;trend.y=154;
    p(s,tx('Updated 2 min ago','Regular',11,T4),W/2-62,354);
    chart(s,[105,112,108,114,122,116,120,115,118],380);
    pill(s,'Time in Range','87%',SUC,28,494);
    pill(s,'Average','112',PRI,143,494);
    pill(s,'Readings','48/48',T3,258,494);
    p(s,fBtn('+ Log Entry',161,PRI),28,562);
    p(s,fBtn('Share Report',161,SURF2,T2),200,562);
    p(s,rc(337,1,BRD),28,630);
    p(s,tx('Recent entries','Medium',12,T3),28,640);
    const e1=rc(337,46,SURF,1,12);p(s,e1,28,660);e1.strokes=solid(BRD);e1.strokeWeight=1;
    p(s,tx('Lunch — Pasta, salad','Medium',13,T1),44,668);p(s,tx('65g carbs · 1:30 PM','Regular',11,T3),44,684);
    const e2=rc(337,46,SURF,1,12);p(s,e2,28,714);e2.strokes=solid(BRD);e2.strokeWeight=1;
    p(s,tx('NovoRapid 4u bolus','Medium',13,T1),44,722);p(s,tx('Rapid insulin · 1:35 PM','Regular',11,T3),44,738);
    tabs(s,0);
  }

  // ─── B-02 Light: Hypo 58 mg/dL ────────────────────────────────────
  {
    const s=scr('B-02 — Live Hypo',1,'#FFF5F5');
    sb(s,'#FFF5F5');ab(s,'#FFFFFF');
    banner(s,'LOW GLUCOSE — Take action now','Eat 15g fast-acting carbs immediately',DAN,108);
    const outer=figma.createFrame();outer.resize(216,216);outer.cornerRadius=108;
    outer.fills=solid(DAN,0.07);outer.strokes=solid(DAN,0.3);outer.strokeWeight=8;
    p(s,outer,W/2-108,174);
    const ring=figma.createFrame();ring.resize(196,196);ring.cornerRadius=98;
    ring.fills=solid('#FFF5F5');ring.strokes=solid(DAN,1);ring.strokeWeight=3;
    p(s,ring,W/2-98,182);
    const num=tx('58','ExtraBold',62,DAN);num.textAlignHorizontal='CENTER';num.textAutoResize='NONE';num.resize(196,72);ring.appendChild(num);num.x=0;num.y=50;
    const unit=tx('mg/dL','Medium',13,T3);unit.textAlignHorizontal='CENTER';unit.textAutoResize='NONE';unit.resize(196,18);ring.appendChild(unit);unit.x=0;unit.y=126;
    const trend=tx('vv  Dropping fast','SemiBold',12,DAN);trend.textAlignHorizontal='CENTER';trend.textAutoResize='NONE';trend.resize(196,18);ring.appendChild(trend);trend.x=0;trend.y=150;
    p(s,tx('Updated 1 min ago · Very urgent','Regular',11,DAN,0.8),W/2-98,390);
    chart(s,[142,138,128,118,104,90,78,66,58],412);
    const call=figma.createFrame();call.resize(337,52);call.fills=solid(DAN);call.cornerRadius=14;
    call.layoutMode='HORIZONTAL';call.primaryAxisSizingMode='FIXED';call.counterAxisSizingMode='FIXED';
    call.primaryAxisAlignItems='CENTER';call.counterAxisAlignItems='CENTER';
    call.appendChild(tx('Call Emergency Contact','Bold',15,SURF));
    p(s,call,28,522);
    p(s,fBtn('+ Log Carbs Eaten',337,'#FEE2E2',DAN),28,588);
    const proto=rc(337,80,'#FEF2F2',1,14);p(s,proto,28,652);proto.strokes=solid('#FECACA');proto.strokeWeight=1;
    p(s,tx('Hypoglycemia Protocol','SemiBold',13,DAN),44,664);
    p(s,tx('1. Eat 15g fast carbs (3 glucose tabs)','Regular',12,T2),44,682);
    p(s,tx('2. Wait 15 min · Recheck · Repeat if <70','Regular',12,T2),44,698);
    tabs(s,0);
  }

  // ─── B-03 Light: Hyper 285 mg/dL ──────────────────────────────────
  {
    const s=scr('B-03 — Live Hyper',2,'#FFFBEB');
    sb(s,'#FFFBEB');ab(s,SURF);
    banner(s,'High Glucose Warning','Consider correction dose — review your plan',WARN,108);
    const ring=gRing(s,285,WARN,174);
    const trend=tx('^ Rising','SemiBold',13,WARN);ring.appendChild(trend);trend.x=68;trend.y=154;
    p(s,tx('Updated 3 min ago','Regular',11,T4),W/2-58,386);
    chart(s,[142,158,175,195,215,240,258,272,285],408);
    pill(s,'Time in Range','42%',DAN,28,522);
    pill(s,'Average','198',WARN,143,522);
    pill(s,'Readings','44/48',T3,258,522);
    const sug=rc(337,58,'#FFFBEB',1,14);p(s,sug,28,592);sug.strokes=solid('#FDE68A');sug.strokeWeight=1;
    p(s,tx('Suggested correction: 3u NovoRapid','SemiBold',14,WARN),44,604);
    p(s,tx('Based on ISF 50 · Check ketones if >250','Regular',11,T3),44,622);
    p(s,fBtn('+ Log Insulin',161,PRI),28,664);
    p(s,fBtn('Check Ketones',161,SURF2,T2),200,664);
    tabs(s,0);
  }

  // ─── B-04 Light: Rapid Drop 142 ───────────────────────────────────
  {
    const s=scr('B-04 — Live Rapid Drop',3,'#FFF7ED');
    sb(s,'#FFF7ED');ab(s,SURF);
    banner(s,'Dropping Fast  vv','Glucose falling quickly — prepare to act',ORG,108);
    const ring=gRing(s,142,ORG,174);
    const trend=tx('vv Fast drop','SemiBold',12,ORG);ring.appendChild(trend);trend.x=50;trend.y=154;
    p(s,tx('Updated 1 min ago','Regular',11,T4),W/2-58,386);
    chart(s,[208,202,194,184,174,168,160,152,142],408);
    const pred=rc(337,54,'#FFF7ED',1,14);p(s,pred,28,520);pred.strokes=solid('#FDBA74');pred.strokeWeight=1;
    p(s,tx('Predicted low in ~22 min (projected: 62)','SemiBold',13,ORG),44,532);
    p(s,tx('Rate: -5.4 mg/dL per min','Regular',11,T3),44,550);
    pill(s,'Time in Range','71%',SUC,28,590);
    pill(s,'Rate','-5.4/m',ORG,143,590);
    pill(s,'Projected','62',DAN,258,590);
    p(s,fBtn('Prepare Fast Carbs',337,ORG,SURF),28,660);
    tabs(s,0);
  }

  // ─── B-05 Light: No CGM ───────────────────────────────────────────
  {
    const s=scr('B-05 — No CGM',4);
    sb(s);ab(s);
    banner(s,'Sensor Offline','No glucose data — last reading 4 hours ago',T3,108);
    const ring=figma.createFrame();ring.resize(200,200);ring.cornerRadius=100;
    ring.fills=solid(SURF);ring.strokes=solid(BRD,1);ring.strokeWeight=2;
    p(s,ring,W/2-100,180);
    const dash=tx('--','ExtraBold',60,T4);dash.textAlignHorizontal='CENTER';dash.textAutoResize='NONE';dash.resize(200,72);ring.appendChild(dash);dash.x=0;dash.y=54;
    const unit=tx('mg/dL','Medium',13,T4);unit.textAlignHorizontal='CENTER';unit.textAutoResize='NONE';unit.resize(200,18);ring.appendChild(unit);unit.x=0;unit.y=130;
    const sub=tx('No signal','Medium',12,T4);sub.textAlignHorizontal='CENTER';sub.textAutoResize='NONE';sub.resize(200,18);ring.appendChild(sub);sub.x=0;sub.y=152;
    p(s,tx('Last known: 118 mg/dL · 4h ago','Regular',12,T4),W/2-98,392);
    const sensorCard=rc(337,64,SURF,1,14);p(s,sensorCard,28,428);sensorCard.strokes=solid(BRD);sensorCard.strokeWeight=1;
    p(s,tx('FreeStyle Libre 3','SemiBold',14,T3),44,440);
    p(s,tx('Signal lost · Sensor may have expired or moved','Regular',11,T3),44,460);
    p(s,fBtn('Scan Sensor (NFC)',337,SURF2,T2),28,508);
    p(s,fBtn('Reconnect Bluetooth',337,PRI),28,574);
    p(s,fBtn('+ Log Manual Reading',337,SURF2,T2),28,640);
    const note=ctx('Manual readings let you keep tracking even when your CGM is unavailable','Regular',11,T4,313);
    p(s,note,40,710);
    tabs(s,0);
  }

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('Light: Live screens B-01–B-05 built!');
})();
