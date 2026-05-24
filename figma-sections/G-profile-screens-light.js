(async () => {
  // LIGHT THEME — G-01 to G-12: Profile screens
  const W=393,H=844,GAP=40,ROW_Y=21*924; // y=19404

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
  const BRD='#E2E8F0',INS='#7C3AED',TEAL='#0891B2';

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
  function fBtn(label,w,hex,textHex=SURF){
    const b=figma.createFrame();b.resize(w,52);b.fills=solid(hex);b.cornerRadius=14;
    b.layoutMode='HORIZONTAL';b.primaryAxisSizingMode='FIXED';b.counterAxisSizingMode='FIXED';
    b.primaryAxisAlignItems='CENTER';b.counterAxisAlignItems='CENTER';
    b.appendChild(tx(label,'SemiBold',15,textHex));return b;
  }
  function sb(s){p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);}
  function backBar(s,title){
    p(s,rc(W,56,SURF),0,44);p(s,rc(W,1,BRD),0,99);
    const bb=rc(34,34,SURF2,1,10);p(s,bb,20,55);
    bb.strokes=solid(BRD);bb.strokeWeight=1;
    p(s,tx('<','SemiBold',16,T1),27,60);
    p(s,tx(title,'Bold',18,T1),64,60);
  }
  function tabs(s,active=4){
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
  function settingsRow(s,label,sub,right,color,x,y){
    const row=figma.createFrame();row.resize(337,56);row.fills=solid(SURF);row.cornerRadius=14;
    row.strokes=solid(BRD);row.strokeWeight=1;
    p(s,row,x,y);
    const dot=rc(8,8,color,1,4);row.appendChild(dot);dot.x=16;dot.y=24;
    const l=tx(label,'Medium',14,T1);row.appendChild(l);l.x=34;l.y=14;
    if(sub){const s2=tx(sub,'Regular',11,T3);row.appendChild(s2);s2.x=34;s2.y=32;}
    const r=tx(right||'>','Regular',12,T4);row.appendChild(r);r.x=310;r.y=22;
    return row;
  }
  function toggleRow(s,label,sub,on,x,y){
    const row=figma.createFrame();row.resize(337,56);row.fills=solid(SURF);row.cornerRadius=14;
    row.strokes=solid(BRD);row.strokeWeight=1;
    p(s,row,x,y);
    const l=tx(label,'Medium',14,T1);row.appendChild(l);l.x=16;l.y=14;
    if(sub){const s2=tx(sub,'Regular',11,T3);row.appendChild(s2);s2.x=16;s2.y=32;}
    const tog=rc(44,24,on?PRI:SURF2,1,12);row.appendChild(tog);tog.x=281;tog.y=16;
    if(!on){tog.strokes=solid(BRD);tog.strokeWeight=1;}
    const thumb=rc(18,18,SURF,1,9);row.appendChild(thumb);thumb.x=on?303:284;thumb.y=19;
    return row;
  }
  function inputRow(s,label,val,x,y,w=337){
    const c=figma.createFrame();c.resize(w,64);c.fills=solid(SURF2);c.cornerRadius=14;
    c.strokes=solid(BRD);c.strokeWeight=1;
    p(s,c,x,y);
    const l=tx(label,'Medium',11,T3);c.appendChild(l);l.x=16;l.y=10;
    const v=tx(val,'Regular',14,T1);c.appendChild(v);v.x=16;v.y=32;
    return c;
  }
  function secH(s,text,y){p(s,tx(text,'SemiBold',11,T4),28,y);}

  // ─── G-01: Profile Root
  {
    const s=scr('G-01 — Profile Root',0);
    sb(s);
    p(s,rc(W,56,SURF),0,44);p(s,rc(W,1,BRD),0,99);
    p(s,tx('Profile','Bold',20,T1),28,60);
    const userCard=rc(337,100,SURF,1,20);p(s,userCard,28,108);
    userCard.strokes=solid(BRD);userCard.strokeWeight=1;
    const avatar=figma.createFrame();avatar.resize(64,64);avatar.cornerRadius=32;avatar.fills=solid(SURF3);
    p(s,avatar,44,118);
    p(s,tx('MA','Bold',22,PRI),56,132);
    p(s,tx('Mohamed Al-Rashid','SemiBold',16,T1),118,120);
    p(s,tx('Type 1 · MDI · Libre 3','Regular',12,T3),118,142);
    p(s,tx('Member since Jan 2024','Regular',11,T4),118,160);
    const mini=rc(337,56,SURF,1,16);p(s,mini,28,222);
    mini.strokes=solid(BRD);mini.strokeWeight=1;
    p(s,tx('118','Bold',16,SUC),44,234);p(s,tx('mg/dL','Regular',10,T3),80,240);
    p(s,rc(1,30,BRD),130,227);
    p(s,tx('87%','Bold',16,SUC),150,234);p(s,tx('TIR today','Regular',10,T3),178,240);
    p(s,rc(1,30,BRD),245,227);
    p(s,tx('6.8%','Bold',16,PRI),262,234);p(s,tx('A1c est.','Regular',10,T3),294,240);
    secH(s,'DIABETES SETTINGS',294);
    settingsRow(s,'Glucose Targets','70–180 mg/dL','>',SUC,28,314);
    settingsRow(s,'Alarms & Alerts','5 active','>',DAN,28,378);
    settingsRow(s,'Insulin & Bolus','NovoRapid · Tresiba','>',INS,28,442);
    secH(s,'DEVICE & DATA',510);
    settingsRow(s,'Sensor / CGM','FreeStyle Libre 3','>',TEAL,28,530);
    settingsRow(s,'Health Integrations','Apple Health synced','>',SUC,28,594);
    settingsRow(s,'Export & Reports','PDF, CSV','>',PRI,28,658);
    secH(s,'ACCOUNT',726);
    settingsRow(s,'Account Settings','','>',T4,28,746);
    tabs(s,4);
  }

  // ─── G-02: Account Settings
  {
    const s=scr('G-02 — Account Settings',1);
    sb(s);backBar(s,'Account');
    const avatar=figma.createFrame();avatar.resize(72,72);avatar.cornerRadius=36;avatar.fills=solid(SURF3);
    p(s,avatar,W/2-36,112);
    p(s,tx('MA','Bold',26,PRI),W/2-16,126);
    const editBadge=rc(24,24,PRI,1,12);p(s,editBadge,W/2+20,152);
    p(s,tx('+','Bold',14,SURF),W/2+27,158);
    inputRow(s,'Full name','Mohamed Al-Rashid',28,204);
    inputRow(s,'Email','mohamed@example.com',28,280);
    inputRow(s,'Phone (optional)','+1 555 000 1234',28,356);
    inputRow(s,'Date of birth','15 March 1990',28,432);
    secH(s,'DIABETES PROFILE',510);
    inputRow(s,'Diagnosis type','Type 1 Diabetes',28,530,161);
    inputRow(s,'Diagnosis year','2010',212,530,153);
    inputRow(s,'Treating doctor','Dr. Sarah Al-Rashid',28,606);
    inputRow(s,'Clinic / Hospital','City Diabetes Clinic',28,682);
    p(s,fBtn('Save Changes',337,PRI),28,764);
    tabs(s,4);
  }

  // ─── G-03: Alarms
  {
    const s=scr('G-03 — Alarms',2);
    sb(s);backBar(s,'Alarms & Alerts');
    secH(s,'GLUCOSE ALERTS',112);
    toggleRow(s,'Low Glucose Alert','Alarm at 70 mg/dL',true,28,132);
    toggleRow(s,'Urgent Low Alert','Alarm at 55 mg/dL',true,28,196);
    toggleRow(s,'High Glucose Alert','Alarm at 180 mg/dL',true,28,260);
    toggleRow(s,'Rapid Rise Alert','> 3 mg/dL/min rising',true,28,324);
    toggleRow(s,'Rapid Fall Alert','> 3 mg/dL/min falling',true,28,388);
    secH(s,'REMINDERS',456);
    toggleRow(s,'Post-meal Check','2h after logging a meal',true,28,476);
    toggleRow(s,'Daily Summary','Every day at 9 PM',false,28,540);
    toggleRow(s,'Sensor Expiry','24h before expiry',true,28,604);
    toggleRow(s,'Missed Reading','No data for > 30 min',true,28,668);
    secH(s,'SOUND & VIBRATION',736);
    settingsRow(s,'Alert Sound','Urgent ping','>',T4,28,756);
    tabs(s,4);
  }

  // ─── G-04: Basal
  {
    const s=scr('G-04 — Basal Settings',3);
    sb(s);backBar(s,'Basal Insulin');
    inputRow(s,'Basal insulin type','Tresiba (degludec)',28,112);
    inputRow(s,'Daily dose','26',28,188,161);
    inputRow(s,'Injection time','10:00 PM',212,188,153);
    secH(s,'BASAL RATE SCHEDULE',276);
    const sched=rc(337,180,SURF,1,16);p(s,sched,28,296);
    sched.strokes=solid(BRD);sched.strokeWeight=1;
    const periods=[['12:00 AM – 6:00 AM','0.85u/hr'],['6:00 AM – 12:00 PM','1.05u/hr'],['12:00 PM – 6:00 PM','0.95u/hr'],['6:00 PM – 12:00 AM','0.90u/hr']];
    periods.forEach(([time,rate],i)=>{
      p(s,tx(time,'Regular',12,T3),44,310+i*38);
      p(s,tx(rate,'SemiBold',14,T1),260,308+i*38);
      if(i<3){p(s,rc(305,1,BRD),44,346+i*38);}
    });
    secH(s,'INSULIN SENSITIVITY',496);
    inputRow(s,'Insulin Sensitivity Factor (ISF)','50 mg/dL per 1u',28,516);
    inputRow(s,'Target BG for corrections','120 mg/dL',28,592);
    secH(s,'INSULIN ON BOARD',680);
    inputRow(s,'Duration of Insulin Action (DIA)','4 hours',28,700);
    p(s,tx('These settings are used for correction suggestions.\nAlways consult your diabetes team before changing.','Regular',11,T3),28,778);
    tabs(s,4);
  }

  // ─── G-05: Bolus Helper
  {
    const s=scr('G-05 — Bolus Helper',4);
    sb(s);backBar(s,'Bolus Helper');
    inputRow(s,'Insulin-to-Carb Ratio (ICR)','1 unit per 16g carbs',28,112);
    inputRow(s,'Pre-meal target BG','120 mg/dL',28,188);
    secH(s,'MEAL-TIME RATIOS',266);
    const mealTimes=[['Breakfast','1:14','Higher due to dawn phenomenon'],['Lunch','1:16','Standard ratio'],['Dinner','1:15','Slightly higher at night']];
    mealTimes.forEach(([meal,ratio,note],i)=>{
      const row=rc(337,64,SURF,1,14);p(s,row,28,286+i*76);
      row.strokes=solid(BRD);row.strokeWeight=1;
      p(s,tx(meal,'SemiBold',14,T1),44,298+i*76);
      p(s,tx(note,'Regular',11,T3),44,316+i*76);
      const ratioVal=rc(64,36,SURF3,1,10);p(s,ratioVal,289,292+i*76);
      ratioVal.strokes=solid('#BFDBFE');ratioVal.strokeWeight=1;
      p(s,tx(ratio,'Bold',14,PRI),299,302+i*76);
    });
    secH(s,'ACTIVE INSULIN',526);
    toggleRow(s,'Account for active insulin','Subtract IOB from suggestions',true,28,546);
    inputRow(s,'Peak insulin time','75 minutes',28,614);
    secH(s,'BOLUS WIZARD',698);
    toggleRow(s,'Show bolus suggestions','Calculate dose automatically',true,28,718);
    toggleRow(s,'Confirm before logging','Ask before saving suggested dose',false,28,782);
    tabs(s,4);
  }

  // ─── G-06: Display Settings
  {
    const s=scr('G-06 — Display',5);
    sb(s);backBar(s,'Display');
    secH(s,'UNITS & LANGUAGE',112);
    inputRow(s,'Glucose unit','mg/dL',28,132,161);
    inputRow(s,'Language','English',212,132,153);
    secH(s,'APPEARANCE',218);
    const themeCard=rc(337,80,SURF,1,16);p(s,themeCard,28,238);
    themeCard.strokes=solid(BRD);themeCard.strokeWeight=1;
    p(s,tx('App theme','Medium',14,T1),44,250);
    p(s,rc(1,40,BRD),245,242));
    const lightSel=rc(80,40,PRI,1,12);p(s,lightSel,248,242);
    p(s,tx('Light','SemiBold',13,SURF),266,254);
    const darkSel=rc(80,40,SURF2,1,12);p(s,darkSel,337,242);
    p(s,tx('Dark','Regular',13,T3),350,254);
    toggleRow(s,'Large glucose numbers','Make dashboard glucose bigger',true,28,338);
    toggleRow(s,'Show mmol/L secondary','Show both units on dashboard',false,28,402);
    secH(s,'GLUCOSE GRAPH',470);
    inputRow(s,'Default graph view','3 hours',28,490,161);
    inputRow(s,'Y-axis range','40–350 mg/dL',212,490,153);
    toggleRow(s,'Show meal markers','Show food icons on graph',true,28,566);
    toggleRow(s,'Show insulin markers','Show dose icons on graph',true,28,630);
    secH(s,'WIDGETS',698);
    toggleRow(s,'Home screen widget','Show glucose on home screen',true,28,718);
    toggleRow(s,'Lock screen widget','Show on lock screen',false,28,782);
    tabs(s,4);
  }

  // ─── G-07: Export
  {
    const s=scr('G-07 — Export',6);
    sb(s);backBar(s,'Export & Reports');
    secH(s,'EXPORT DATA',112);
    const formats=[
      ['PDF Report','Formatted report for your doctor',PRI],
      ['CSV / Excel','Raw data for analysis',SUC],
      ['AGP Report','Ambulatory Glucose Profile',INS],
      ['Nightscout Export','JSON format for Nightscout',WARN],
    ];
    formats.forEach(([fmt,desc,color],i)=>{
      const card=rc(337,64,SURF,1,14);p(s,card,28,132+i*76);
      card.strokes=solid(BRD);card.strokeWeight=1;
      const dot=rc(8,8,color,1,4);p(s,dot,44,160+i*76);
      p(s,tx(fmt,'SemiBold',14,T1),62,152+i*76);
      p(s,tx(desc,'Regular',11,T3),62,170+i*76);
      const btn=rc(64,28,SURF2,1,8);p(s,btn,285,168+i*76);
      btn.strokes=solid(BRD);btn.strokeWeight=1;
      p(s,tx('Export','Medium',11,PRI),294,175+i*76);
    });
    secH(s,'DATE RANGE',450);
    inputRow(s,'From','May 17, 2026',28,470,161);
    inputRow(s,'To','May 23, 2026',212,470,153);
    secH(s,'INCLUDE IN EXPORT',554);
    toggleRow(s,'Glucose readings','All CGM data',true,28,574);
    toggleRow(s,'Meal logs','Food and carb entries',true,28,638);
    toggleRow(s,'Insulin logs','Bolus and basal entries',true,28,702);
    toggleRow(s,'Notes and symptoms','Free text notes',false,28,766);
    tabs(s,4);
  }

  // ─── G-08: Health Integrations
  {
    const s=scr('G-08 — Health',7);
    sb(s);backBar(s,'Health Integrations');
    const integrations=[
      ['Apple Health','Glucose, activity sync',DAN,true],
      ['Google Fit','Steps, heart rate',SUC,false],
      ['Samsung Health','Galaxy Watch support',PRI,false],
      ['Nightscout','Self-hosted CGM bridge',WARN,true],
      ['LibreView','Abbott cloud sync',PRI,false],
      ['Dexcom Clarity','Dexcom cloud sync',SUC,false],
    ];
    integrations.forEach(([name,desc,color,on],i)=>{
      const card=rc(337,64,SURF,1,14);p(s,card,28,112+i*76);
      card.strokes=solid(BRD);card.strokeWeight=1;
      const dot=rc(10,10,color,1,5);p(s,dot,44,151+i*76);
      p(s,tx(name,'SemiBold',14,T1),64,142+i*76);
      p(s,tx(desc,'Regular',11,T3),64,160+i*76);
      const tog=rc(44,24,on?color:SURF2,1,12);p(s,tog,285,148+i*76);
      if(!on){tog.strokes=solid(BRD);tog.strokeWeight=1;}
      const thumb=rc(18,18,SURF,1,9);p(s,thumb,on?307:288,151+i*76);
    });
    tabs(s,4);
  }

  // ─── G-09: Sensor / CGM
  {
    const s=scr('G-09 — Sensor CGM',8);
    sb(s);backBar(s,'Sensor / CGM');
    const curSensor=rc(337,90,SURF,1,20);p(s,curSensor,28,112);
    curSensor.strokes=solid(BRD);curSensor.strokeWeight=1;
    const sensorDot=rc(10,10,SUC,1,5);p(s,sensorDot,44,152);
    p(s,tx('FreeStyle Libre 3','SemiBold',16,T1),62,142);
    p(s,tx('Active · Expires May 30 · 7 days remaining','Regular',11,SUC),62,162);
    secH(s,'CONNECTION SETTINGS',220);
    inputRow(s,'Scan interval','5 minutes',28,240,161);
    inputRow(s,'Signal timeout','30 minutes',212,240,153);
    toggleRow(s,'Background scanning','Scan without opening app',true,28,316);
    toggleRow(s,'Bluetooth always-on','Keep BT active for Libre 3',true,28,380);
    secH(s,'CALIBRATION',448);
    toggleRow(s,'Enable calibration','Enter finger-prick to calibrate',false,28,468);
    secH(s,'SWITCH SENSOR',540);
    const sensorTypes=[
      ['FreeStyle Libre','Abbott NFC/BT',SUC,true],
      ['Dexcom G6/G7','Bluetooth',PRI,false],
      ['Nightscout','Open source',WARN,false],
      ['Manual entry','No CGM',T3,false],
    ];
    sensorTypes.forEach(([name,type,color,active],i)=>{
      const row=rc(337,52,SURF,1,14);p(s,row,28,560+i*60);
      row.strokes=solid(active?color:BRD,active?0.4:1);row.strokeWeight=1;
      const dot=rc(8,8,color,1,4);p(s,dot,44,580+i*60);
      p(s,tx(name,'Medium',14,active?T1:T3),62,572+i*60);
      p(s,tx(type,'Regular',11,T3),62,588+i*60);
      if(active){const chk=rc(20,20,SUC,1,10);p(s,chk,309,574+i*60);p(s,tx('✓','Bold',11,SURF),314,577+i*60);}
    });
    tabs(s,4);
  }

  // ─── G-10: Medications
  {
    const s=scr('G-10 — Medications',9);
    sb(s);backBar(s,'Medications');
    p(s,tx('Your current medications','Regular',13,T3),28,114);
    const meds=[
      ['NovoRapid','Insulin aspart · Rapid-acting','Meal bolus, corrections',INS],
      ['Tresiba','Insulin degludec · Long-acting','26u every day at 10 PM',PRI],
      ['Metformin 500mg','Biguanide · Oral','Twice daily with meals',SUC],
    ];
    meds.forEach(([name,type,dose,color],i)=>{
      const card=rc(337,88,SURF,1,16);p(s,card,28,140+i*104);
      card.strokes=solid(BRD);card.strokeWeight=1;
      const dot=rc(10,10,color,1,5);p(s,dot,44,180+i*104);
      p(s,tx(name,'Bold',15,T1),62,170+i*104);
      p(s,tx(type,'Regular',11,T3),62,188+i*104);
      p(s,tx(dose,'Medium',12,T2),62,206+i*104);
      const editBtn=rc(48,26,SURF2,1,8);p(s,editBtn,289,182+i*104);
      editBtn.strokes=solid(BRD);editBtn.strokeWeight=1;
      p(s,tx('Edit','Medium',11,PRI),298,188+i*104);
    });
    p(s,fBtn('+ Add Medication',337,SURF2,PRI),28,460);
    secH(s,'REMINDERS',528);
    toggleRow(s,'Medication reminders','Remind me to take medications',true,28,548);
    inputRow(s,'Reminder time','8:00 AM',28,616,161);
    inputRow(s,'Refill reminder','7 days before',212,616,153);
    secH(s,'SHARE WITH DOCTOR',698);
    p(s,fBtn('Share Medication List',337,PRI),28,718);
    tabs(s,4);
  }

  // ─── G-11: Caregiver Share
  {
    const s=scr('G-11 — Caregiver Share',10);
    sb(s);backBar(s,'Caregiver Share');
    p(s,tx('Share your glucose data with\ntrusted family or caregivers','Regular',14,T3),28,114);
    const c1=rc(337,80,SURF,1,16);p(s,c1,28,158);
    c1.strokes=solid(BRD);c1.strokeWeight=1;
    const av1=figma.createFrame();av1.resize(44,44);av1.cornerRadius=22;av1.fills=solid('#DCFCE7');
    p(s,av1,44,167);p(s,tx('FA','Bold',16,SUC),52,178);
    p(s,tx('Fatima Al-Rashid','SemiBold',14,T1),98,168);
    p(s,tx('Full access · Mother','Regular',11,SUC),98,188);
    p(s,tx('Active','Medium',11,SUC),98,206);
    const revokeBtn=rc(60,26,'#FEF2F2',1,8);p(s,revokeBtn,289,181);
    revokeBtn.strokes=solid('#FECACA');revokeBtn.strokeWeight=1;
    p(s,tx('Revoke','Medium',10,DAN),295,188);
    secH(s,'INVITE CAREGIVER',256);
    const inp2=figma.createFrame();inp2.resize(337,56);inp2.fills=solid(SURF2);inp2.cornerRadius=14;
    inp2.strokes=solid(BRD);inp2.strokeWeight=1;
    p(s,inp2,28,276);
    p(s,tx('Email address of caregiver','Regular',14,T4),44,294);
    p(s,fBtn('Send Invite',337,PRI),28,346);
    secH(s,'PERMISSIONS',414);
    const perms=[
      ['View glucose readings','Real-time and historical data',true],
      ['Receive hypo/hyper alerts','Emergency notifications',true],
      ['View meal logs','What you eat',false],
      ['View insulin doses','Bolus and basal data',false],
    ];
    perms.forEach(([perm,desc,on],i)=>{
      toggleRow(s,perm,desc,on,28,434+i*72);
    });
    p(s,tx('Caregivers can only view your data. They\ncannot edit settings or log entries.','Regular',11,T4),28,756);
    tabs(s,4);
  }

  // ─── G-12: Doctor View
  {
    const s=scr('G-12 — Doctor View',11);
    sb(s);backBar(s,'Doctor View');
    const docCard=rc(337,84,SURF,1,20);p(s,docCard,28,112);
    docCard.strokes=solid(BRD);docCard.strokeWeight=1;
    const docAv=figma.createFrame();docAv.resize(52,52);docAv.cornerRadius=26;docAv.fills=solid(SURF3);
    p(s,docAv,44,122);p(s,tx('SR','Bold',18,PRI),53,134);
    p(s,tx('Dr. Sarah Al-Rashid','SemiBold',15,T1),106,122);
    p(s,tx('Endocrinologist · City Diabetes Clinic','Regular',11,T3),106,142);
    p(s,tx('Next appointment: Jun 5, 2026','Regular',11,PRI),106,162);
    const access=rc(337,52,'#F0FDF4',1,14);p(s,access,28,210);
    access.strokes=solid('#BBF7D0');access.strokeWeight=1;
    p(s,tx('Doctor has view access to your data','SemiBold',13,SUC),44,222);
    p(s,tx('Last viewed: May 20, 2026','Regular',11,T3),44,240);
    secH(s,'RECENT DOCTOR NOTES',278);
    const notes=[
      ['May 10, 2026','TIR improving. Continue current regimen. Reduce evening basal by 0.5u if night lows persist.'],
      ['Apr 5, 2026','A1c down to 7.1%. Well done. Discuss CGM upgrade at next visit.'],
    ];
    notes.forEach(([date,note],i)=>{
      const card=rc(337,88,SURF,1,14);p(s,card,28,298+i*100);
      card.strokes=solid(BRD);card.strokeWeight=1;
      p(s,tx(date,'Medium',12,T3),44,310+i*100);
      const noteT=tx(note,'Regular',12,T2);noteT.textAutoResize='HEIGHT';noteT.resize(297,1);
      p(s,noteT,44,328+i*100);
    });
    secH(s,'SHARE WITH DOCTOR',516);
    p(s,fBtn('Send Latest Report',337,PRI),28,536);
    p(s,fBtn('Message Clinic',337,SURF2,T2),28,600);
    secH(s,'ACCESS CONTROL',668);
    toggleRow(s,'Doctor view access','Allow Dr. Al-Rashid to view data',true,28,688);
    const delBtn=figma.createFrame();delBtn.resize(337,52);delBtn.fills=solid('#FEF2F2');delBtn.cornerRadius=14;
    delBtn.strokes=solid('#FECACA');delBtn.strokeWeight=1;
    delBtn.layoutMode='HORIZONTAL';delBtn.primaryAxisSizingMode='FIXED';delBtn.counterAxisSizingMode='FIXED';
    delBtn.primaryAxisAlignItems='CENTER';delBtn.counterAxisAlignItems='CENTER';
    delBtn.appendChild(tx('Remove Doctor Access','SemiBold',15,DAN));
    p(s,delBtn,28,760);
    tabs(s,4);
  }

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('✓ Profile light screens G-01 to G-12 built!');
})();
