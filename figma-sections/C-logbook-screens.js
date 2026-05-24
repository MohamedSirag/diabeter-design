(async () => {
  const W=393,H=844,GAP=40,ROW_Y=3*924; // y=2772

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
  function scr(name,col,fill='#0A0E17'){
    const f=figma.createFrame();f.name=name;f.resize(W,H);
    f.x=col*(W+GAP);f.y=ROW_Y;f.fills=solid(fill);
    figma.currentPage.appendChild(f);return f;
  }
  function fBtn(label,w,hex,textHex='#FFFFFF'){
    const b=figma.createFrame();b.resize(w,52);b.fills=solid(hex);b.cornerRadius=14;
    b.layoutMode='HORIZONTAL';b.primaryAxisSizingMode='FIXED';b.counterAxisSizingMode='FIXED';
    b.primaryAxisAlignItems='CENTER';b.counterAxisAlignItems='CENTER';
    b.appendChild(tx(label,'SemiBold',15,textHex));return b;
  }
  function sb(s){
    p(s,rc(W,44,'#0A0E17'),0,0);p(s,tx('9:41','SemiBold',15,'#FFFFFF'),20,14);
  }
  function ab(s,title){
    p(s,rc(W,56,'#0F172A'),0,44);
    p(s,tx(title,'Bold',20,'#FFFFFF'),28,60);
  }
  function tabs(s,active=1){
    const bar=figma.createFrame();bar.resize(W,80);bar.fills=solid('#0F172A');
    const div=rc(W,1,'#1E293B');bar.appendChild(div);div.x=0;div.y=0;
    p(s,bar,0,H-80);
    const names=['Live','Logbook','Camera','News','Profile'];
    const tw=W/5;
    names.forEach((n,i)=>{
      const isA=i===active;
      const lbl=tx(n,isA?'SemiBold':'Regular',11,isA?'#3B82F6':'#5F6F86');
      bar.appendChild(lbl);lbl.x=Math.round(i*tw+tw/2-n.length*3.3);lbl.y=52;
      if(isA){const dot=rc(4,4,'#3B82F6',1,2);bar.appendChild(dot);dot.x=Math.round(i*tw+tw/2-2);dot.y=8;}
    });
  }

  // Entry row (no auto-layout parent = OK to set x/y on children)
  function entryRow(s,icon,iconColor,title,meta,time,x,y){
    const row=figma.createFrame();row.resize(337,64);row.fills=solid('#0F172A');row.cornerRadius=14;
    p(s,row,x,y);
    const ib=rc(36,36,iconColor,0.15,18);row.appendChild(ib);ib.x=12;ib.y=14;
    const it=tx(icon,'Bold',14,iconColor);row.appendChild(it);it.x=20;it.y=20;
    const tt=tx(title,'Medium',13,'#FFFFFF');row.appendChild(tt);tt.x=58;tt.y=12;
    const mt=tx(meta,'Regular',11,'#94A3B8');row.appendChild(mt);mt.x=58;mt.y=32;
    const tm=tx(time,'Regular',10,'#475569');row.appendChild(tm);tm.x=270;tm.y=24;
    return row;
  }

  // Filter chip row
  function filterChips(s,chips,active,y){
    let cx=28;
    chips.forEach((chip,i)=>{
      const isA=i===active;
      const chip_f=figma.createFrame();
      chip_f.resize(chip.length*7+24,32);chip_f.cornerRadius=16;
      chip_f.fills=solid(isA?'#3B82F6':'#1E293B');
      chip_f.layoutMode='HORIZONTAL';chip_f.primaryAxisSizingMode='FIXED';chip_f.counterAxisSizingMode='FIXED';
      chip_f.primaryAxisAlignItems='CENTER';chip_f.counterAxisAlignItems='CENTER';
      chip_f.appendChild(tx(chip,isA?'SemiBold':'Regular',12,isA?'#FFFFFF':'#94A3B8'));
      p(s,chip_f,cx,y);cx+=chip.length*7+24+8;
    });
  }

  // Input field
  function inp(s,label,val,x,y,w=337){
    const c=figma.createFrame();c.resize(w,64);c.fills=solid('#1E293B');c.cornerRadius=14;
    p(s,c,x,y);
    const l=tx(label,'Medium',11,'#94A3B8');c.appendChild(l);l.x=16;l.y=10;
    const v=tx(val,'Regular',14,'#FFFFFF');c.appendChild(v);v.x=16;v.y=32;
    return c;
  }

  // Section date label
  function dateLabel(s,text,y){p(s,tx(text,'SemiBold',12,'#64748B'),28,y);}

  // ─── C-01: Logbook list ───────────────────────────────────────────
  {
    const s=scr('C-01 — Logbook List',0);
    sb(s);ab(s,'Logbook');
    // Stats bar
    const stats=rc(337,52,'#0F172A',1,14);p(s,stats,28,108);
    p(s,tx('Avg','Regular',10,'#64748B'),44,116);p(s,tx('112','Bold',16,'#3B82F6'),44,130);
    p(s,tx('TIR','Regular',10,'#64748B'),144,116);p(s,tx('87%','Bold',16,'#22C55E'),144,130);
    p(s,tx('Entries','Regular',10,'#64748B'),236,116);p(s,tx('24','Bold',16,'#FFFFFF'),236,130);
    p(s,rc(1,32,'#1E293B'),128,118),0,0;p(s,rc(1,32,'#1E293B'),220,118);
    // Filter chips
    filterChips(s,['All','Meal','Insulin','Exercise','Note','Ketone'],0,174);
    // Today
    dateLabel(s,'Today',218);
    entryRow(s,'M','#3B82F6','Lunch — Pasta bolognese','65g carbs','1:30 PM',28,238);
    entryRow(s,'I','#8B5CF6','NovoRapid 4u bolus','Rapid insulin','1:35 PM',28,310);
    entryRow(s,'G','#22C55E','Glucose 118 mg/dL','Manual reading','12:00 PM',28,382);
    entryRow(s,'E','#FB923C','Running 30 min','Low intensity','9:00 AM',28,454);
    // Yesterday
    dateLabel(s,'Yesterday',530);
    entryRow(s,'M','#3B82F6','Dinner — Rice, chicken','72g carbs','7:15 PM',28,550);
    entryRow(s,'I','#8B5CF6','Tresiba 26u basal','Long-acting','10:00 PM',28,622);
    entryRow(s,'K','#F59E0B','Ketone 0.4 mmol/L','Borderline','8:00 AM',28,694);
    // FAB
    const fab=figma.createFrame();fab.resize(56,56);fab.cornerRadius=28;fab.fills=solid('#3B82F6');
    fab.layoutMode='HORIZONTAL';fab.primaryAxisSizingMode='FIXED';fab.counterAxisSizingMode='FIXED';
    fab.primaryAxisAlignItems='CENTER';fab.counterAxisAlignItems='CENTER';
    fab.appendChild(tx('+','Bold',24,'#FFFFFF'));
    p(s,fab,W-76,H-148);
    tabs(s,1);
  }

  // ─── C-02: Add Meal sheet ─────────────────────────────────────────
  {
    const s=scr('C-02 — Add Meal',1);
    sb(s);
    // Dimmed bg
    p(s,rc(W,H-340,'#0A0E17',0.6),0,44);
    // Sheet
    const sheet=rc(W,500,'#0F172A',1,20);p(s,sheet,0,344);
    p(s,rc(40,4,'#334155',1,2),W/2-20,360);
    p(s,tx('Log Meal','Bold',18,'#FFFFFF'),28,378);
    p(s,tx('What did you eat?','Regular',13,'#94A3B8'),28,406);
    inp(s,'Food / Meal name','Pasta bolognese',28,428);
    inp(s,'Carbohydrates (g)','65',28,504);
    inp(s,'Portion size','1 plate (300g)',200,504,125);
    inp(s,'Insulin given (u)','4u NovoRapid',28,580);
    p(s,tx('Post-meal glucose reminder','Medium',13,'#FFFFFF'),28,658);
    const tog=rc(48,26,'#3B82F6',1,13);p(s,tog,301,656);
    const thumb=rc(20,20,'#FFFFFF',1,10);p(s,thumb,325,659);
    p(s,fBtn('Save Meal Entry',337,'#3B82F6'),28,698);
    tabs(s,1);
  }

  // ─── C-03: Add Insulin sheet ──────────────────────────────────────
  {
    const s=scr('C-03 — Add Insulin',2);
    sb(s);p(s,rc(W,H-380,'#0A0E17',0.6),0,44);
    const sheet=rc(W,540,'#0F172A',1,20);p(s,sheet,0,304);
    p(s,rc(40,4,'#334155',1,2),W/2-20,320);
    p(s,tx('Log Insulin','Bold',18,'#FFFFFF'),28,338);
    // Type selector
    p(s,rc(337,48,'#1E293B',1,14),28,368);
    p(s,rc(160,40,'#8B5CF6',1,10),32,372);
    p(s,tx('Bolus','SemiBold',14,'#FFFFFF'),88,384);
    p(s,tx('Basal','Medium',14,'#94A3B8'),236,384);
    inp(s,'Insulin type','NovoRapid (rapid)',28,428);
    inp(s,'Units','4',28,504,161);
    inp(s,'Time','Now 9:41 AM',201,504,164);
    inp(s,'Notes (optional)','Correction for lunch',28,580);
    // Bolus reason chips
    p(s,tx('Reason','Medium',12,'#94A3B8'),28,658);
    let cx=28;
    ['Meal','Correction','Pre-exercise','Other'].forEach((chip,i)=>{
      const c=figma.createFrame();c.resize(chip.length*7+20,30);c.cornerRadius=15;
      c.fills=solid(i===0?'#8B5CF6':'#1E293B');
      c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';
      c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';
      c.appendChild(tx(chip,'Medium',11,i===0?'#FFFFFF':'#94A3B8'));
      p(s,c,cx,676);cx+=chip.length*7+28;
    });
    p(s,fBtn('Save Insulin Entry',337,'#8B5CF6'),28,720);
    tabs(s,1);
  }

  // ─── C-04: Add Exercise sheet ─────────────────────────────────────
  {
    const s=scr('C-04 — Add Exercise',3);
    sb(s);p(s,rc(W,H-380,'#0A0E17',0.6),0,44);
    const sheet=rc(W,540,'#0F172A',1,20);p(s,sheet,0,304);
    p(s,rc(40,4,'#334155',1,2),W/2-20,320);
    p(s,tx('Log Exercise','Bold',18,'#FFFFFF'),28,338);
    inp(s,'Activity type','Running',28,370);
    inp(s,'Duration','30 min',28,446,161);
    inp(s,'Intensity','Low',201,446,164);
    inp(s,'Glucose before (mg/dL)','142',28,522,161);
    inp(s,'Glucose after (mg/dL)','118',201,522,164);
    // Intensity selector
    p(s,tx('Intensity','Medium',12,'#94A3B8'),28,600);
    const intens=['Low','Moderate','High','Max'];
    let ix=28;
    intens.forEach((level,i)=>{
      const c=figma.createFrame();c.resize(72,30);c.cornerRadius=15;
      c.fills=solid(i===0?'#FB923C':'#1E293B');
      c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';
      c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';
      c.appendChild(tx(level,'Medium',11,i===0?'#FFFFFF':'#94A3B8'));
      p(s,c,ix,618);ix+=80;
    });
    p(s,fBtn('Save Exercise Entry',337,'#FB923C'),28,666);
    tabs(s,1);
  }

  // ─── C-05: Add Note sheet ─────────────────────────────────────────
  {
    const s=scr('C-05 — Add Note',4);
    sb(s);p(s,rc(W,H-400,'#0A0E17',0.6),0,44);
    const sheet=rc(W,560,'#0F172A',1,20);p(s,sheet,0,284);
    p(s,rc(40,4,'#334155',1,2),W/2-20,300);
    p(s,tx('Add Note','Bold',18,'#FFFFFF'),28,320);
    // Note text area
    const ta=rc(337,160,'#1E293B',1,14);p(s,ta,28,354);
    p(s,tx('How are you feeling? Any symptoms?','Regular',14,'#475569'),44,380);
    // Tag chips
    p(s,tx('Quick tags','Medium',12,'#94A3B8'),28,530);
    const tags=['Sick','Stressed','Good day','Post-meal','Fasting','Sport'];
    let tx2=28;let ty=548;
    tags.forEach((tag,i)=>{
      const c=figma.createFrame();c.resize(tag.length*7+20,30);c.cornerRadius=15;
      c.fills=solid('#1E293B');
      c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';
      c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';
      c.appendChild(tx(tag,'Regular',11,'#94A3B8'));
      p(s,c,tx2,ty);tx2+=tag.length*7+28;
      if(tx2>320){tx2=28;ty+=40;}
    });
    p(s,fBtn('Save Note',337,'#475569','#FFFFFF'),28,720);
    tabs(s,1);
  }

  // ─── C-06: Add Ketone sheet ───────────────────────────────────────
  {
    const s=scr('C-06 — Add Ketone',5);
    sb(s);p(s,rc(W,H-400,'#0A0E17',0.6),0,44);
    const sheet=rc(W,560,'#0F172A',1,20);p(s,sheet,0,284);
    p(s,rc(40,4,'#334155',1,2),W/2-20,300);
    p(s,tx('Log Ketone','Bold',18,'#FFFFFF'),28,320);
    inp(s,'Ketone value (mmol/L)','0.4',28,354,337);
    // Risk indicator
    const risk=rc(337,56,'#141200',1,14);p(s,risk,28,430);
    p(s,tx('Borderline — monitor closely','SemiBold',14,'#F59E0B'),44,442);
    p(s,tx('0.6-1.5: High · >1.5: Contact doctor','Regular',11,'#94A3B8'),44,462);
    // Scale visual
    const scale=rc(337,12,'#1E293B',1,6);p(s,scale,28,502);
    const scaleGreen=rc(112,12,'#22C55E',1,6);p(s,scaleGreen,28,502);
    const scaleAmber=rc(112,12,'#F59E0B',1);p(s,scaleAmber,140,502);
    const scaleRed=rc(113,12,'#EF4444',1,6);p(s,scaleRed,252,502);
    p(s,tx('Normal','Regular',9,'#22C55E'),28,518);
    p(s,tx('High','Regular',9,'#F59E0B'),155,518);
    p(s,tx('Danger','Regular',9,'#EF4444'),282,518);
    // Method
    p(s,tx('Measurement method','Medium',12,'#94A3B8'),28,544);
    const methods=['Blood meter','Urine strip','Breath analyzer'];
    let mx=28;
    methods.forEach((m,i)=>{
      const c=figma.createFrame();c.resize(m.length*6.5+20,30);c.cornerRadius=15;
      c.fills=solid(i===0?'#F59E0B':'#1E293B');
      c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';
      c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';
      c.appendChild(tx(m,'Medium',11,i===0?'#000000':'#94A3B8'));
      p(s,c,mx,562);mx+=m.length*6.5+28;
    });
    p(s,fBtn('Save Ketone Reading',337,'#F59E0B','#000000'),28,608);
    tabs(s,1);
  }

  // ─── C-07: Filtered view (Insulin) ───────────────────────────────
  {
    const s=scr('C-07 — Logbook Filtered',6);
    sb(s);ab(s,'Logbook');
    const stats=rc(337,52,'#0F172A',1,14);p(s,stats,28,108);
    p(s,tx('Insulin entries','Medium',13,'#94A3B8'),44,116);
    p(s,tx('18 this week','Bold',16,'#8B5CF6'),44,132);
    p(s,tx('Avg dose','Medium',12,'#64748B'),220,116);p(s,tx('4.2u','Bold',16,'#FFFFFF'),220,132);
    filterChips(s,['All','Meal','Insulin','Exercise','Note','Ketone'],2,174);
    dateLabel(s,'Today',218);
    entryRow(s,'I','#8B5CF6','NovoRapid 4u bolus','Meal bolus · 1:35 PM','1:35 PM',28,238);
    entryRow(s,'I','#8B5CF6','NovoRapid 2u correction','Correction bolus','8:00 AM',28,310);
    dateLabel(s,'Yesterday',386);
    entryRow(s,'I','#8B5CF6','Tresiba 26u basal','Long-acting · 10:00 PM','10:00 PM',28,406);
    entryRow(s,'I','#8B5CF6','NovoRapid 5u bolus','Dinner bolus','7:20 PM',28,478);
    entryRow(s,'I','#8B5CF6','NovoRapid 3u bolus','Lunch bolus','12:45 PM',28,550);
    dateLabel(s,'May 21',626);
    entryRow(s,'I','#8B5CF6','Tresiba 26u basal','Long-acting · 10:00 PM','10:00 PM',28,646);
    entryRow(s,'I','#8B5CF6','NovoRapid 4u bolus','Dinner bolus · High BG','7:00 PM',28,718);
    tabs(s,1);
  }

  // ─── C-08: Entry detail / edit ────────────────────────────────────
  {
    const s=scr('C-08 — Entry Detail',7);
    sb(s);
    p(s,rc(W,56,'#0F172A'),0,44);
    const backBtn=rc(34,34,'#1E293B',1,10);p(s,backBtn,20,55);
    p(s,tx('<','SemiBold',16,'#FFFFFF'),27,60);
    p(s,tx('Entry Detail','Bold',18,'#FFFFFF'),64,60);
    const editBtn=rc(52,32,'#1E293B',1,8);p(s,editBtn,313,58);
    p(s,tx('Edit','Medium',13,'#3B82F6'),322,63);
    // Entry header
    const header=rc(337,80,'#0F172A',1,20);p(s,header,28,112);
    const ib=rc(44,44,'#3B82F6',0.15,22);p(s,ib,44,124);
    p(s,tx('M','Bold',18,'#3B82F6'),53,134);
    p(s,tx('Lunch — Pasta bolognese','SemiBold',16,'#FFFFFF'),98,120);
    p(s,tx('Today · 1:30 PM','Regular',12,'#94A3B8'),98,142);
    // Details grid
    const grid=rc(337,200,'#0F172A',1,20);p(s,grid,28,208);
    const fields=[['Carbohydrates','65 g'],['Insulin given','4u NovoRapid'],['Glucose before','142 mg/dL'],['Glucose after (2h)','118 mg/dL']];
    fields.forEach(([label,val],i)=>{
      const row=Math.floor(i/2),col=i%2;
      const fx=44+col*155,fy=224+row*80;
      p(s,tx(label,'Regular',11,'#64748B'),fx,fy);
      p(s,tx(val,'SemiBold',14,'#FFFFFF'),fx,fy+18);
    });
    // Notes
    p(s,tx('Notes','Medium',13,'#94A3B8'),28,426);
    const noteBg=rc(337,60,'#0F172A',1,14);p(s,noteBg,28,448);
    p(s,tx('Ate a larger portion than usual. A bit tired\nafter lunch — might need adjustment.','Regular',13,'#FFFFFF'),44,456);
    // Glucose response chart
    p(s,tx('Glucose response','Medium',13,'#94A3B8'),28,524);
    const chartBg=rc(337,100,'#0B1221',1,16);p(s,chartBg,28,546);
    const pts=[142,148,156,162,158,150,140,130,118];
    pts.forEach((v,i)=>{
      const px=Math.round(20+i*34);
      const py=Math.round(90-(v-100)/100*80);
      const dot=rc(5,5,v>180?'#F59E0B':'#22C55E',1,3);p(s,dot,28+px-2,546+py-2);
      if(i>0){const py0=Math.round(90-(pts[i-1]-100)/100*80);const seg=rc(34,2,'#22C55E',0.4,1);p(s,seg,28+(px-34),546+Math.min(py,py0)+1);}
    });
    p(s,tx('Pre-meal','Regular',9,'#475569'),32,636);p(s,tx('+2 hours','Regular',9,'#475569'),322,636);
    // Delete button
    p(s,fBtn('Delete Entry',337,'#1A0808','#EF4444'),28,660);
    tabs(s,1);
  }

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('Logbook screens C-01 to C-08 built!');
})();
