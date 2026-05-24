(async () => {
  const W=393,H=844,GAP=40,ROW_Y=8*924; // y=7392

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
  function sb(s){p(s,rc(W,44,'#0A0E17'),0,0);p(s,tx('9:41','SemiBold',15,'#FFFFFF'),20,14);}

  // Patient row for doctor dashboard
  function patientRow(s,initials,name,bg,tir,status,color,x,y){
    const row=figma.createFrame();row.resize(337,68);row.fills=solid('#0F172A');row.cornerRadius=14;
    p(s,row,x,y);
    const av=figma.createFrame();av.resize(40,40);av.cornerRadius=20;av.fills=solid(color,0.2);
    row.appendChild(av);av.x=12;av.y=14;
    const il=tx(initials,'Bold',14,color);row.appendChild(il);il.x=21-(initials.length>2?3:0);il.y=22;
    const nl=tx(name,'SemiBold',13,'#FFFFFF');row.appendChild(nl);nl.x=62;nl.y=14;
    const sl=tx(status,'Regular',11,color);row.appendChild(sl);sl.x=62;sl.y=34;
    const bgT=tx(bg,'Bold',14,parseInt(bg)>180?'#F59E0B':parseInt(bg)<70?'#EF4444':'#22C55E');row.appendChild(bgT);bgT.x=230;bgT.y=14;
    const tirT=tx(tir+' TIR','Regular',11,'#94A3B8');row.appendChild(tirT);tirT.x=230;tirT.y=34;
    const arrow=tx('>','Regular',13,'#475569');row.appendChild(arrow);arrow.x=318;arrow.y=26;
    return row;
  }

  // ─── H-01: Doctor Dashboard ───────────────────────────────────────
  {
    const s=scr('H-01 — Doctor Dashboard',0,'#080C14');
    sb(s);
    p(s,rc(W,56,'#0D1525'),0,44);
    p(s,tx('Patient List','Bold',20,'#FFFFFF'),28,60);
    const badge=rc(80,28,'#1D3461',1,14);p(s,badge,285,62);
    p(s,tx('Doctor View','Medium',10,'#3B82F6'),295,70);
    // Search
    const searchBg=rc(337,40,'#1E293B',1,12);p(s,searchBg,28,108);
    p(s,tx('Search patients...','Regular',13,'#475569'),52,120);
    // Filter tabs
    const ftabs=['All (24)','Alerts (5)','Review (8)'];
    let fx=28;
    ftabs.forEach((tab,i)=>{
      const c=figma.createFrame();c.resize(tab.length*7+16,32);c.cornerRadius=16;
      c.fills=solid(i===0?'#3B82F6':'#1E293B');c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';
      c.appendChild(tx(tab,i===0?'SemiBold':'Regular',12,i===0?'#FFFFFF':'#94A3B8'));
      p(s,c,fx,162);fx+=tab.length*7+24;
    });
    // Patient list
    p(s,tx('Alerts — need review','SemiBold',11,'#EF4444',0.8),28,212);
    patientRow(s,'MA','Mohamed Al-Rashid','58','61%','Hypo 58 mg/dL NOW','#EF4444',28,232);
    patientRow(s,'SA','Sara Ahmed','285','44%','High — 3h above 250','#F59E0B',28,308);
    p(s,tx('Stable patients','SemiBold',11,'#22C55E',0.8),28,388);
    patientRow(s,'KM','Khalid Mohammed','118','87%','In range · Good control','#22C55E',28,408);
    patientRow(s,'LA','Layla Al-Ahmad','132','82%','In range · Slight rise','#22C55E',28,484);
    patientRow(s,'HJ','Hassan Jabir','145','79%','In range · Trend OK','#3B82F6',28,560);
    patientRow(s,'NA','Noor Al-Farsi','168','76%','Near high · Monitor','#F59E0B',28,636);
    // Stats footer
    const footer=rc(W,60,'#0D1525');p(s,footer,0,H-80);
    p(s,tx('24 patients · 5 alerts · 8 need review','Regular',12,'#94A3B8'),28,H-56);
  }

  // ─── H-02: Doctor Patient View ────────────────────────────────────
  {
    const s=scr('H-02 — Doctor Patient View',1,'#080C14');
    sb(s);
    p(s,rc(W,56,'#0D1525'),0,44);
    const bb=rc(34,34,'#1E293B',1,10);p(s,bb,20,55);p(s,tx('<','SemiBold',16,'#FFFFFF'),27,60);
    p(s,tx('Mohamed Al-Rashid','Bold',17,'#FFFFFF'),64,60);
    // Patient header
    const ph=rc(337,80,'#0D1525',1,16);p(s,ph,28,108);
    const av=figma.createFrame();av.resize(48,48);av.cornerRadius=24;av.fills=solid('#EF4444',0.15);
    p(s,av,44,118);p(s,tx('MA','Bold',18,'#EF4444'),52,130);
    p(s,tx('Type 1 · MDI · FreeStyle Libre 3','Regular',11,'#94A3B8'),102,118);
    p(s,tx('58 mg/dL · Hypo alert NOW','SemiBold',13,'#EF4444'),102,138);
    p(s,tx('Age 34 · Diagnosed 2010','Regular',11,'#64748B'),102,158);
    // Today stats
    const ts=rc(337,64,'#0F172A',1,14);p(s,ts,28,200);
    const tstat=[['Avg BG','142','#F59E0B'],['TIR','61%','#EF4444'],['Hypos','3 today','#EF4444'],['Last reading','58','#EF4444']];
    tstat.forEach(([l,v,c],i)=>{p(s,tx(l,'Regular',10,'#64748B'),40+i*84,210);p(s,tx(v,'Bold',14,c),40+i*84,226);});
    // 24h chart
    p(s,tx('24-hour glucose','Medium',12,'#94A3B8'),28,280);
    const chartBg=rc(337,80,'#0B1221',1,14);p(s,chartBg,28,298);
    const pts=[118,125,142,180,210,195,178,160,142,130,118,105,95,80,68,58];
    pts.forEach((v,i)=>{
      const color=v<70?'#EF4444':v>180?'#F59E0B':'#22C55E';
      const px=Math.round(16+i*19.5);const py=Math.round(70-(v-40)/300*65);
      const dot=rc(4,4,color,1,2);p(s,dot,28+px-2,298+py-2);
      if(i>0){const py0=Math.round(70-(pts[i-1]-40)/300*65);const seg=rc(20,2,color,0.5,1);p(s,seg,28+(px-20),298+Math.min(py,py0)+1);}
    });
    // Notes from doctor
    p(s,tx('Your notes','Medium',12,'#94A3B8'),28,396);
    const noteBg=rc(337,72,'#0F172A',1,14);p(s,noteBg,28,416);
    p(s,tx('May 10: TIR improving. Consider reducing evening\nbasal by 0.5u if night lows continue.','Regular',12,'#CBD5E1'),44,426);
    const addNote=rc(337,44,'#1E293B',1,14);p(s,addNote,28,498);
    p(s,tx('Add a note...','Regular',13,'#475569'),44,514);
    // Actions
    p(s,tx('Quick actions','Medium',12,'#94A3B8'),28,556);
    p(s,fBtn('Send Message',161,'#3B82F6'),28,576);
    p(s,fBtn('Update Targets',161,'#1E293B','#94A3B8'),200,576);
    p(s,fBtn('Schedule Appointment',337,'#1E293B','#94A3B8'),28,640);
    p(s,fBtn('Export Patient Report',337,'#1E293B','#3B82F6'),28,704);
  }

  // ─── H-03: Admin Dashboard ────────────────────────────────────────
  {
    const s=scr('H-03 — Admin Dashboard',2,'#080C14');
    sb(s);
    p(s,rc(W,56,'#0D1525'),0,44);
    p(s,tx('Admin Panel','Bold',20,'#FFFFFF'),28,60);
    const badge=rc(72,28,'#DC2626',0.2,14);p(s,badge,293,62);
    p(s,tx('Admin','Medium',10,'#EF4444'),307,70);
    // Key metrics
    const metricsGrid=rc(337,100,'#0F172A',1,16);p(s,metricsGrid,28,108);
    const metrics=[['Total Users','1,284','#3B82F6'],['Active Today','347','#22C55E'],['Doctors','24','#8B5CF6'],['Alerts Today','18','#EF4444']];
    metrics.forEach(([l,v,c],i)=>{
      const mx=44+i*84;
      p(s,tx(l,'Regular',9,'#64748B'),mx,118);
      p(s,tx(v,'Bold',18,c),mx,134);
    });
    // Section tabs
    const stabs=['Users','Doctors','Reports','Config'];
    let tx2=28;
    stabs.forEach((tab,i)=>{
      const c=figma.createFrame();c.resize(72,36);c.cornerRadius=10;
      c.fills=solid(i===0?'#3B82F6':'#1E293B');c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';
      c.appendChild(tx(tab,i===0?'SemiBold':'Regular',12,i===0?'#FFFFFF':'#94A3B8'));
      p(s,c,tx2,222);tx2+=80;
    });
    // Recent alerts
    p(s,tx('Recent system alerts','SemiBold',12,'#94A3B8'),28,274);
    const alerts=[
      ['Critical','User MA: Hypo alert 58 mg/dL','2 min ago','#EF4444'],
      ['Warning','Sensor offline: 3 users','15 min ago','#F59E0B'],
      ['Info','New user registration','1h ago','#3B82F6'],
      ['Warning','API latency spike (220ms)','2h ago','#F59E0B'],
    ];
    alerts.forEach(([type,msg,time,color],i)=>{
      const row=rc(337,48,'#0F172A',1,12);p(s,row,28,294+i*56);
      const dot=rc(8,8,color,1,4);p(s,dot,44,314+i*56);
      p(s,tx(msg,'Medium',12,'#FFFFFF'),62,306+i*56);
      p(s,tx(time,'Regular',10,'#475569'),62,322+i*56);
      const badge2=rc(type.length*6+14,20,color,0.15,6);p(s,badge2,285,316+i*56);
      p(s,tx(type,'Medium',9,color),292,320+i*56);
    });
    // System health
    p(s,tx('System health','SemiBold',12,'#94A3B8'),28,526);
    const health=[['API','99.9%','#22C55E'],['Database','98.2%','#22C55E'],['Push Notifications','97.5%','#F59E0B']];
    health.forEach(([svc,uptime,color],i)=>{
      const row=rc(337,40,'#0F172A',1,10);p(s,row,28,546+i*48);
      p(s,tx(svc,'Medium',13,'#FFFFFF'),44,556+i*48);
      const bar=rc(200,4,'#1E293B',1,2);p(s,bar,44,572+i*48);
      const fill=rc(Math.round(200*parseFloat(uptime)/100),4,color,1,2);p(s,fill,44,572+i*48);
      p(s,tx(uptime,'SemiBold',12,color),312,556+i*48);
    });
    // Recent users
    p(s,tx('Recently registered','SemiBold',12,'#94A3B8'),28,700);
    patientRow(s,'NB','Nadia Bakr — new user','--','--','Registered 1h ago','#3B82F6',28,720);
  }

  // ─── H-04: Sick Day Mode ──────────────────────────────────────────
  {
    const s=scr('H-04 — Sick Day Mode',3,'#0D0808');
    sb(s);
    p(s,rc(W,56,'#160808'),0,44);
    p(s,tx('Sick Day Mode','Bold',20,'#EF4444'),28,60);
    // Status banner
    const banner=rc(337,56,'#EF4444',0.15,14);p(s,banner,28,108);
    p(s,rc(337,56,'',0,14),28,108);// corner
    banner.cornerRadius=14;
    p(s,tx('Sick Day Mode ACTIVE','Bold',14,'#EF4444'),44,120);
    p(s,tx('Enhanced monitoring · Check ketones every 2–4h','Regular',11,'#CBD5E1'),44,140);
    // Sick day checklist
    p(s,tx('Sick day protocol','SemiBold',14,'#FFFFFF'),28,182);
    const checks=[
      ['Check blood glucose','Every 2–4 hours',true],
      ['Test ketones','Blood or urine strip',true],
      ['Drink fluids','Aim for 8oz per hour',false],
      ['Continue insulin','Even if not eating',true],
      ['Contact doctor if >250 + ketones','Call immediately',false],
    ];
    checks.forEach(([task,sub,done],i)=>{
      const row=rc(337,60,'#0F172A',1,14);p(s,row,28,204+i*68);
      const chkBg=rc(24,24,done?'#22C55E':'#334155',1,12);p(s,chkBg,44,216+i*68);
      p(s,tx(done?'v':' ','Bold',12,done?'#FFFFFF':'#475569'),49,219+i*68);
      p(s,tx(task,'Medium',13,done?'#FFFFFF':'#94A3B8'),78,208+i*68);
      p(s,tx(sub,'Regular',11,'#64748B'),78,226+i*68);
    });
    // Quick log
    p(s,tx('Quick log ketones','Medium',12,'#94A3B8'),28,556);
    const ketInput=figma.createFrame();ketInput.resize(337,56);ketInput.fills=solid('#1E293B');ketInput.cornerRadius=14;
    p(s,ketInput,28,576);
    p(s,tx('Ketone value (mmol/L)','Regular',13,'#475569'),44,592);
    p(s,fBtn('Log Ketone & Glucose',337,'#EF4444'),28,648);
    // Emergency contacts
    p(s,tx('Emergency contacts','SemiBold',12,'#94A3B8'),28,716);
    const ec=rc(337,48,'#0F172A',1,14);p(s,ec,28,736);
    p(s,tx('Dr. Sarah Al-Rashid','Medium',13,'#FFFFFF'),44,748);
    p(s,tx('Tap to call · 555-0100','Regular',11,'#3B82F6'),44,766);
    p(s,fBtn('Turn Off Sick Day Mode',337,'#1E293B','#94A3B8'),28,800);
  }

  // ─── H-05: Food Library ───────────────────────────────────────────
  {
    const s=scr('H-05 — Food Library',4);
    sb(s);
    p(s,rc(W,56,'#0F172A'),0,44);
    p(s,tx('Food Library','Bold',20,'#FFFFFF'),28,60);
    // Search
    const searchBg=rc(337,44,'#1E293B',1,14);p(s,searchBg,28,108);
    p(s,tx('Search foods, meals, recipes...','Regular',13,'#475569'),52,122);
    // Category chips
    const cats=['All','Common','My foods','Recipes','Favourites'];
    let cx=28;
    cats.forEach((cat,i)=>{
      const c=figma.createFrame();c.resize(cat.length*7+20,32);c.cornerRadius=16;
      c.fills=solid(i===0?'#3B82F6':'#1E293B');c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';
      c.appendChild(tx(cat,i===0?'SemiBold':'Regular',12,i===0?'#FFFFFF':'#94A3B8'));
      p(s,c,cx,164);cx+=cat.length*7+28;
    });
    // Food items
    p(s,tx('Recently used','SemiBold',12,'#94A3B8'),28,210);
    const foods=[
      ['Pasta bolognese','200g portion','65g carbs','18g protein','12g fat'],
      ['Whole grain bread','1 slice (35g)','17g carbs','4g protein','1g fat'],
      ['Rice (cooked)','100g','28g carbs','2.5g protein','0.3g fat'],
      ['Apple','1 medium (182g)','25g carbs','0.5g protein','0.3g fat'],
      ['Greek yogurt','150g','9g carbs','15g protein','5g fat'],
    ];
    foods.forEach(([name,portion,carbs,prot,fat],i)=>{
      const row=rc(337,72,'#0F172A',1,14);p(s,row,28,230+i*80);
      p(s,tx(name,'SemiBold',14,'#FFFFFF'),44,242+i*80);
      p(s,tx(portion,'Regular',11,'#64748B'),44,260+i*80);
      p(s,tx(carbs,'Bold',12,'#3B82F6'),44,278+i*80);
      p(s,tx(prot,'Regular',11,'#64748B'),104,278+i*80);
      p(s,tx(fat,'Regular',11,'#64748B'),178,278+i*80);
      const addBtn=rc(40,30,'#1E293B',1,8);p(s,addBtn,289,279+i*80);
      p(s,tx('+','Bold',16,'#3B82F6'),298,284+i*80);
    });
    p(s,fBtn('+ Add Custom Food',337,'#1E293B','#3B82F6'),28,664);
    p(s,fBtn('Scan Barcode',337,'#3B82F6'),28,728);
  }

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('Screens H-01 to H-05 built!');
})();
