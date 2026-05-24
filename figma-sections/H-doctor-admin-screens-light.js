(async () => {
  // LIGHT THEME — H-01 to H-05: Doctor/Admin screens
  const W=393,H=844,GAP=40,ROW_Y=22*924; // y=20328

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
  function fBtn(label,w,hex,textHex=SURF){
    const b=figma.createFrame();b.resize(w,52);b.fills=solid(hex);b.cornerRadius=14;
    b.layoutMode='HORIZONTAL';b.primaryAxisSizingMode='FIXED';b.counterAxisSizingMode='FIXED';
    b.primaryAxisAlignItems='CENTER';b.counterAxisAlignItems='CENTER';
    b.appendChild(tx(label,'SemiBold',15,textHex));return b;
  }
  function sb(s){
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
  }

  function patientRow(s,initials,name,bg,tir,status,color,x,y){
    const row=figma.createFrame();row.resize(337,68);row.fills=solid(SURF);row.cornerRadius=14;
    row.strokes=solid(BRD);row.strokeWeight=1;
    p(s,row,x,y);
    const av=figma.createFrame();av.resize(40,40);av.cornerRadius=20;av.fills=solid(color,0.12);
    row.appendChild(av);av.x=12;av.y=14;
    const il=tx(initials,'Bold',14,color);row.appendChild(il);il.x=21-(initials.length>2?3:0);il.y=22;
    const nl=tx(name,'SemiBold',13,T1);row.appendChild(nl);nl.x=62;nl.y=14;
    const sl=tx(status,'Regular',11,color);row.appendChild(sl);sl.x=62;sl.y=34;
    const bgT=tx(bg,'Bold',14,parseInt(bg)>180?WARN:parseInt(bg)<70?DAN:SUC);row.appendChild(bgT);bgT.x=230;bgT.y=14;
    const tirT=tx(tir+' TIR','Regular',11,T4);row.appendChild(tirT);tirT.x=230;tirT.y=34;
    const arrow=tx('>','Regular',13,T4);row.appendChild(arrow);arrow.x=318;arrow.y=26;
    return row;
  }

  // ─── H-01: Doctor Dashboard ───────────────────────────────────────
  {
    const s=scr('H-01 — Doctor Dashboard',0);
    sb(s);
    p(s,rc(W,56,SURF),0,44);p(s,rc(W,1,BRD),0,99);
    p(s,tx('Patient List','Bold',20,T1),28,60);
    const badge=rc(96,28,SURF3,1,14);p(s,badge,277,62);
    badge.strokes=solid('#BFDBFE');badge.strokeWeight=1;
    p(s,tx('Doctor View','Medium',10,PRI),285,70);
    const searchBg=rc(337,40,SURF2,1,12);p(s,searchBg,28,108);
    searchBg.strokes=solid(BRD);searchBg.strokeWeight=1;
    p(s,tx('Search patients...','Regular',13,T4),52,120);
    const ftabs=['All (24)','Alerts (5)','Review (8)'];
    let fx=28;
    ftabs.forEach((tab,i)=>{
      const c=figma.createFrame();c.resize(tab.length*7+16,32);c.cornerRadius=16;
      c.fills=solid(i===0?PRI:SURF2);if(i!==0){c.strokes=solid(BRD);c.strokeWeight=1;}
      c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';
      c.appendChild(tx(tab,i===0?'SemiBold':'Regular',12,i===0?SURF:T2));
      p(s,c,fx,162);fx+=tab.length*7+24;
    });
    p(s,tx('Alerts — need review','SemiBold',11,DAN,0.9),28,212);
    patientRow(s,'MA','Mohamed Al-Rashid','58','61%','Hypo 58 mg/dL NOW',DAN,28,232);
    patientRow(s,'SA','Sara Ahmed','285','44%','High — 3h above 250',WARN,28,308);
    p(s,tx('Stable patients','SemiBold',11,SUC,0.9),28,388);
    patientRow(s,'KM','Khalid Mohammed','118','87%','In range · Good control',SUC,28,408);
    patientRow(s,'LA','Layla Al-Ahmad','132','82%','In range · Slight rise',SUC,28,484);
    patientRow(s,'HJ','Hassan Jabir','145','79%','In range · Trend OK',PRI,28,560);
    patientRow(s,'NA','Noor Al-Farsi','168','76%','Near high · Monitor',WARN,28,636);
    const footer=rc(W,60,SURF);p(s,footer,0,H-80);
    footer.strokes=solid(BRD);footer.strokeWeight=1;
    p(s,tx('24 patients · 5 alerts · 8 need review','Regular',12,T4),28,H-56);
  }

  // ─── H-02: Doctor Patient View ────────────────────────────────────
  {
    const s=scr('H-02 — Doctor Patient View',1);
    sb(s);
    p(s,rc(W,56,SURF),0,44);p(s,rc(W,1,BRD),0,99);
    const bb=rc(34,34,SURF2,1,10);p(s,bb,20,55);bb.strokes=solid(BRD);bb.strokeWeight=1;
    p(s,tx('<','SemiBold',16,T1),27,60);
    p(s,tx('Mohamed Al-Rashid','Bold',17,T1),64,60);
    const ph=rc(337,80,SURF,1,16);p(s,ph,28,108);
    ph.strokes=solid(BRD);ph.strokeWeight=1;
    const av=figma.createFrame();av.resize(48,48);av.cornerRadius=24;av.fills=solid(DAN,0.1);
    p(s,av,44,118);p(s,tx('MA','Bold',18,DAN),52,130);
    p(s,tx('Type 1 · MDI · FreeStyle Libre 3','Regular',11,T4),102,118);
    p(s,tx('58 mg/dL · Hypo alert NOW','SemiBold',13,DAN),102,138);
    p(s,tx('Age 34 · Diagnosed 2010','Regular',11,T3),102,158);
    const ts=rc(337,64,SURF,1,14);p(s,ts,28,200);
    ts.strokes=solid(BRD);ts.strokeWeight=1;
    const tstat=[['Avg BG','142',WARN],['TIR','61%',DAN],['Hypos','3 today',DAN],['Last reading','58',DAN]];
    tstat.forEach(([l,v,c],i)=>{p(s,tx(l,'Regular',10,T3),40+i*84,210);p(s,tx(v,'Bold',14,c),40+i*84,226);});
    p(s,tx('24-hour glucose','Medium',12,T3),28,280);
    const chartBg=rc(337,80,SURF2,1,14);p(s,chartBg,28,298);
    chartBg.strokes=solid(BRD);chartBg.strokeWeight=1;
    const pts=[118,125,142,180,210,195,178,160,142,130,118,105,95,80,68,58];
    pts.forEach((v,i)=>{
      const color=v<70?DAN:v>180?WARN:SUC;
      const px=Math.round(16+i*19.5);const py=Math.round(70-(v-40)/300*65);
      const dot=rc(4,4,color,1,2);p(s,dot,28+px-2,298+py-2);
      if(i>0){const py0=Math.round(70-(pts[i-1]-40)/300*65);const seg=rc(20,2,color,0.5,1);p(s,seg,28+(px-20),298+Math.min(py,py0)+1);}
    });
    p(s,tx('Your notes','Medium',12,T3),28,396);
    const noteBg=rc(337,72,SURF,1,14);p(s,noteBg,28,416);
    noteBg.strokes=solid(BRD);noteBg.strokeWeight=1;
    p(s,tx('May 10: TIR improving. Consider reducing evening\nbasal by 0.5u if night lows continue.','Regular',12,T2),44,426);
    const addNote=rc(337,44,SURF2,1,14);p(s,addNote,28,498);
    addNote.strokes=solid(BRD);addNote.strokeWeight=1;
    p(s,tx('Add a note...','Regular',13,T4),44,514);
    p(s,tx('Quick actions','Medium',12,T3),28,556);
    p(s,fBtn('Send Message',161,PRI),28,576);
    const updateBtn=fBtn('Update Targets',161,SURF2,T2);updateBtn.strokes=solid(BRD);updateBtn.strokeWeight=1;
    p(s,updateBtn,200,576);
    const schedBtn=fBtn('Schedule Appointment',337,SURF2,T2);schedBtn.strokes=solid(BRD);schedBtn.strokeWeight=1;
    p(s,schedBtn,28,640);
    p(s,fBtn('Export Patient Report',337,SURF3,PRI),28,704);
  }

  // ─── H-03: Admin Dashboard ────────────────────────────────────────
  {
    const s=scr('H-03 — Admin Dashboard',2);
    sb(s);
    p(s,rc(W,56,SURF),0,44);p(s,rc(W,1,BRD),0,99);
    p(s,tx('Admin Panel','Bold',20,T1),28,60);
    const badge=rc(72,28,'#FEF2F2',1,14);p(s,badge,293,62);
    badge.strokes=solid('#FECACA');badge.strokeWeight=1;
    p(s,tx('Admin','Medium',10,DAN),307,70);
    const metricsGrid=rc(337,100,SURF,1,16);p(s,metricsGrid,28,108);
    metricsGrid.strokes=solid(BRD);metricsGrid.strokeWeight=1;
    const metrics=[['Total Users','1,284',PRI],['Active Today','347',SUC],['Doctors','24','#7C3AED'],['Alerts Today','18',DAN]];
    metrics.forEach(([l,v,c],i)=>{
      const mx=44+i*84;
      p(s,tx(l,'Regular',9,T3),mx,118);
      p(s,tx(v,'Bold',18,c),mx,134);
    });
    const stabs=['Users','Doctors','Reports','Config'];
    let tx2=28;
    stabs.forEach((tab,i)=>{
      const c=figma.createFrame();c.resize(72,36);c.cornerRadius=10;
      c.fills=solid(i===0?PRI:SURF2);if(i!==0){c.strokes=solid(BRD);c.strokeWeight=1;}
      c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';
      c.appendChild(tx(tab,i===0?'SemiBold':'Regular',12,i===0?SURF:T2));
      p(s,c,tx2,222);tx2+=80;
    });
    p(s,tx('Recent system alerts','SemiBold',12,T3),28,274);
    const alerts=[
      ['Critical','User MA: Hypo alert 58 mg/dL','2 min ago',DAN],
      ['Warning','Sensor offline: 3 users','15 min ago',WARN],
      ['Info','New user registration','1h ago',PRI],
      ['Warning','API latency spike (220ms)','2h ago',WARN],
    ];
    alerts.forEach(([type,msg,time,color],i)=>{
      const row=rc(337,48,SURF,1,12);p(s,row,28,294+i*56);
      row.strokes=solid(BRD);row.strokeWeight=1;
      const dot=rc(8,8,color,1,4);p(s,dot,44,314+i*56);
      p(s,tx(msg,'Medium',12,T1),62,306+i*56);
      p(s,tx(time,'Regular',10,T4),62,322+i*56);
      const badge2=rc(type.length*6+14,20,color,0.1,6);p(s,badge2,285,316+i*56);
      p(s,tx(type,'Medium',9,color),292,320+i*56);
    });
    p(s,tx('System health','SemiBold',12,T3),28,526);
    const health=[['API','99.9%',SUC],['Database','98.2%',SUC],['Push Notifications','97.5%',WARN]];
    health.forEach(([svc,uptime,color],i)=>{
      const row=rc(337,40,SURF,1,10);p(s,row,28,546+i*48);
      row.strokes=solid(BRD);row.strokeWeight=1;
      p(s,tx(svc,'Medium',13,T1),44,556+i*48);
      const bar=rc(200,4,SURF2,1,2);p(s,bar,44,572+i*48);
      const fill=rc(Math.round(200*parseFloat(uptime)/100),4,color,1,2);p(s,fill,44,572+i*48);
      p(s,tx(uptime,'SemiBold',12,color),312,556+i*48);
    });
    p(s,tx('Recently registered','SemiBold',12,T3),28,700);
    patientRow(s,'NB','Nadia Bakr — new user','--','--','Registered 1h ago',PRI,28,720);
  }

  // ─── H-04: Sick Day Mode ──────────────────────────────────────────
  {
    const s=scr('H-04 — Sick Day Mode',3,'#FFF5F5');
    p(s,rc(W,44,'#FFF5F5'),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    p(s,rc(W,56,'#FFF0F0'),0,44);p(s,rc(W,1,'#FECACA'),0,99);
    p(s,tx('Sick Day Mode','Bold',20,DAN),28,60);
    const banner=rc(337,56,'#FEF2F2',1,14);p(s,banner,28,108);
    banner.strokes=solid('#FECACA');banner.strokeWeight=1;
    p(s,tx('Sick Day Mode ACTIVE','Bold',14,DAN),44,120);
    p(s,tx('Enhanced monitoring · Check ketones every 2–4h','Regular',11,T2),44,140);
    p(s,tx('Sick day protocol','SemiBold',14,T1),28,182);
    const checks=[
      ['Check blood glucose','Every 2–4 hours',true],
      ['Test ketones','Blood or urine strip',true],
      ['Drink fluids','Aim for 8oz per hour',false],
      ['Continue insulin','Even if not eating',true],
      ['Contact doctor if >250 + ketones','Call immediately',false],
    ];
    checks.forEach(([task,sub,done],i)=>{
      const row=rc(337,60,SURF,1,14);p(s,row,28,204+i*68);
      row.strokes=solid(BRD);row.strokeWeight=1;
      const chkBg=rc(24,24,done?SUC:SURF2,1,12);p(s,chkBg,44,216+i*68);
      if(!done){chkBg.strokes=solid(BRD);chkBg.strokeWeight=1;}
      p(s,tx(done?'v':' ','Bold',12,done?SURF:T4),49,219+i*68);
      p(s,tx(task,'Medium',13,done?T1:T3),78,208+i*68);
      p(s,tx(sub,'Regular',11,T4),78,226+i*68);
    });
    p(s,tx('Quick log ketones','Medium',12,T3),28,556);
    const ketInput=figma.createFrame();ketInput.resize(337,56);ketInput.fills=solid(SURF2);ketInput.cornerRadius=14;
    ketInput.strokes=solid(BRD);ketInput.strokeWeight=1;
    p(s,ketInput,28,576);
    p(s,tx('Ketone value (mmol/L)','Regular',13,T4),44,592);
    p(s,fBtn('Log Ketone & Glucose',337,DAN),28,648);
    p(s,tx('Emergency contacts','SemiBold',12,T3),28,716);
    const ec=rc(337,48,SURF,1,14);p(s,ec,28,736);
    ec.strokes=solid(BRD);ec.strokeWeight=1;
    p(s,tx('Dr. Sarah Al-Rashid','Medium',13,T1),44,748);
    p(s,tx('Tap to call · 555-0100','Regular',11,PRI),44,766);
    const offBtn=fBtn('Turn Off Sick Day Mode',337,SURF2,T2);
    offBtn.strokes=solid(BRD);offBtn.strokeWeight=1;
    p(s,offBtn,28,800);
  }

  // ─── H-05: Food Library ───────────────────────────────────────────
  {
    const s=scr('H-05 — Food Library',4);
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    p(s,rc(W,56,SURF),0,44);p(s,rc(W,1,BRD),0,99);
    p(s,tx('Food Library','Bold',20,T1),28,60);
    const searchBg=rc(337,44,SURF2,1,14);p(s,searchBg,28,108);
    searchBg.strokes=solid(BRD);searchBg.strokeWeight=1;
    p(s,tx('Search foods, meals, recipes...','Regular',13,T4),52,122);
    const cats=['All','Common','My foods','Recipes','Favourites'];
    let cx=28;
    cats.forEach((cat,i)=>{
      const c=figma.createFrame();c.resize(cat.length*7+20,32);c.cornerRadius=16;
      c.fills=solid(i===0?PRI:SURF2);if(i!==0){c.strokes=solid(BRD);c.strokeWeight=1;}
      c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';
      c.appendChild(tx(cat,i===0?'SemiBold':'Regular',12,i===0?SURF:T2));
      p(s,c,cx,164);cx+=cat.length*7+28;
    });
    p(s,tx('Recently used','SemiBold',12,T3),28,210);
    const foods=[
      ['Pasta bolognese','200g portion','65g carbs','18g protein','12g fat'],
      ['Whole grain bread','1 slice (35g)','17g carbs','4g protein','1g fat'],
      ['Rice (cooked)','100g','28g carbs','2.5g protein','0.3g fat'],
      ['Apple','1 medium (182g)','25g carbs','0.5g protein','0.3g fat'],
      ['Greek yogurt','150g','9g carbs','15g protein','5g fat'],
    ];
    foods.forEach(([name,portion,carbs,prot,fat],i)=>{
      const row=rc(337,72,SURF,1,14);p(s,row,28,230+i*80);
      row.strokes=solid(BRD);row.strokeWeight=1;
      p(s,tx(name,'SemiBold',14,T1),44,242+i*80);
      p(s,tx(portion,'Regular',11,T3),44,260+i*80);
      p(s,tx(carbs,'Bold',12,PRI),44,278+i*80);
      p(s,tx(prot,'Regular',11,T3),104,278+i*80);
      p(s,tx(fat,'Regular',11,T3),178,278+i*80);
      const addBtn=rc(40,30,SURF2,1,8);p(s,addBtn,289,279+i*80);
      addBtn.strokes=solid(BRD);addBtn.strokeWeight=1;
      p(s,tx('+','Bold',16,PRI),298,284+i*80);
    });
    const addCust=fBtn('+ Add Custom Food',337,SURF2,PRI);
    addCust.strokes=solid(BRD);addCust.strokeWeight=1;
    p(s,addCust,28,664);
    p(s,fBtn('Scan Barcode',337,PRI),28,728);
  }

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('✓ Doctor/Admin light screens H-01 to H-05 built!');
})();
