(async () => {
  // All in-app dialogs, modals, toasts, bottom sheets
  const W=393,H=844,GAP=40,ROW_Y=13*924; // y=12012

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
  function scr(name,col){
    const f=figma.createFrame();f.name=name;f.resize(W,H);
    f.x=col*(W+GAP);f.y=ROW_Y;f.fills=solid('#0A0E17');
    figma.currentPage.appendChild(f);return f;
  }
  function fBtn(label,w,hex,textHex='#FFFFFF'){
    const b=figma.createFrame();b.resize(w,52);b.fills=solid(hex);b.cornerRadius=14;
    b.layoutMode='HORIZONTAL';b.primaryAxisSizingMode='FIXED';b.counterAxisSizingMode='FIXED';
    b.primaryAxisAlignItems='CENTER';b.counterAxisAlignItems='CENTER';
    b.appendChild(tx(label,'SemiBold',15,textHex));return b;
  }

  // Background: dimmed live screen
  function dimBg(s,bgColor='#0A0E17'){
    p(s,rc(W,H,bgColor),0,0);
    p(s,rc(W,H,'#000000',0.6),0,0);
    p(s,tx('9:41','SemiBold',15,'#FFFFFF'),20,14);
  }

  // Centered dialog card
  function dialog(s,w,h){
    const card=figma.createFrame();card.resize(w,h);card.cornerRadius=24;
    card.fills=solid('#0F172A');card.strokes=solid('#1E293B');card.strokeWeight=1;
    p(s,card,W/2-w/2,H/2-h/2);
    return card;
  }

  // Bottom sheet
  function sheet(s,h){
    const sh=figma.createFrame();sh.resize(W,h);sh.cornerRadius=24;
    sh.fills=solid('#0F172A');
    p(s,sh,0,H-h);
    const handle=rc(40,4,'#334155',1,2);sh.appendChild(handle);handle.x=W/2-20;handle.y=12;
    return sh;
  }

  // Icon circle
  function iconCircle(parent,size,hex,x,y){
    const c=rc(size,size,hex,0.15,size/2);parent.appendChild(c);c.x=x;c.y=y;return c;
  }

  // ─── M-01: Hypo Emergency Dialog ─────────────────────────────────
  {
    const s=scr('M-01 — Hypo Emergency',0);
    dimBg(s,'#0D0808');
    const d=dialog(s,320,380);
    const ring=rc(72,72,'#EF4444',0.15,36);d.appendChild(ring);ring.x=124;ring.y=24;
    const pulse=rc(84,84,'#EF4444',0.08,42);d.appendChild(pulse);pulse.x=118;pulse.y=18;
    p(s,tx('!','ExtraBold',36,'#EF4444'),W/2-9,H/2-190+40);
    const title=tx('Low Glucose','Bold',22,'#EF4444');title.textAlignHorizontal='CENTER';title.textAutoResize='NONE';title.resize(296,28);d.appendChild(title);title.x=12;title.y=108;
    const val=tx('58 mg/dL','ExtraBold',36,'#EF4444');val.textAlignHorizontal='CENTER';val.textAutoResize='NONE';val.resize(296,44);d.appendChild(val);val.x=12;val.y=140;
    const body=tx('Your glucose is dangerously low.\nEat 15g fast-acting carbohydrates immediately.','Regular',13,'#CBD5E1');body.textAlignHorizontal='CENTER';body.textAutoResize='HEIGHT';body.resize(280,1);d.appendChild(body);body.x=20;body.y=192;
    const actionBtn=figma.createFrame();actionBtn.resize(296,52);actionBtn.fills=solid('#EF4444');actionBtn.cornerRadius=14;
    actionBtn.layoutMode='HORIZONTAL';actionBtn.primaryAxisSizingMode='FIXED';actionBtn.counterAxisSizingMode='FIXED';
    actionBtn.primaryAxisAlignItems='CENTER';actionBtn.counterAxisAlignItems='CENTER';
    actionBtn.appendChild(tx('Call Emergency Contact','Bold',15,'#FFFFFF'));
    d.appendChild(actionBtn);actionBtn.x=12;actionBtn.y=258;
    const ackBtn=figma.createFrame();ackBtn.resize(296,44);ackBtn.fills=solid('#1A0808');ackBtn.cornerRadius=12;
    ackBtn.layoutMode='HORIZONTAL';ackBtn.primaryAxisSizingMode='FIXED';ackBtn.counterAxisSizingMode='FIXED';
    ackBtn.primaryAxisAlignItems='CENTER';ackBtn.counterAxisAlignItems='CENTER';
    ackBtn.appendChild(tx('I have eaten carbs','SemiBold',14,'#EF4444'));
    d.appendChild(ackBtn);ackBtn.x=12;ackBtn.y=318;
  }

  // ─── M-02: Hyper Warning Dialog ───────────────────────────────────
  {
    const s=scr('M-02 — Hyper Warning',1);
    dimBg(s,'#0D0D08');
    const d=dialog(s,320,320);
    const ring=rc(64,64,'#F59E0B',0.15,32);d.appendChild(ring);ring.x=128;ring.y=24;
    const title=tx('High Glucose','Bold',20,'#F59E0B');title.textAlignHorizontal='CENTER';title.textAutoResize='NONE';title.resize(296,26);d.appendChild(title);title.x=12;title.y=100;
    const val=tx('285 mg/dL','ExtraBold',32,'#F59E0B');val.textAlignHorizontal='CENTER';val.textAutoResize='NONE';val.resize(296,40);d.appendChild(val);val.x=12;val.y=130;
    const body=tx('Consider a correction dose based on your ISF.\nSuggested: 3u NovoRapid','Regular',13,'#CBD5E1');body.textAlignHorizontal='CENTER';body.textAutoResize='HEIGHT';body.resize(280,1);d.appendChild(body);body.x=20;body.y=178;
    const logBtn=figma.createFrame();logBtn.resize(296,48);logBtn.fills=solid('#F59E0B');logBtn.cornerRadius=14;
    logBtn.layoutMode='HORIZONTAL';logBtn.primaryAxisSizingMode='FIXED';logBtn.counterAxisSizingMode='FIXED';
    logBtn.primaryAxisAlignItems='CENTER';logBtn.counterAxisAlignItems='CENTER';
    logBtn.appendChild(tx('Log Correction Insulin','SemiBold',14,'#000000'));
    d.appendChild(logBtn);logBtn.x=12;logBtn.y=234;
    const dismissBtn=figma.createFrame();dismissBtn.resize(296,40);dismissBtn.fills=solid('#14120A');dismissBtn.cornerRadius=12;
    dismissBtn.layoutMode='HORIZONTAL';dismissBtn.primaryAxisSizingMode='FIXED';dismissBtn.counterAxisSizingMode='FIXED';
    dismissBtn.primaryAxisAlignItems='CENTER';dismissBtn.counterAxisAlignItems='CENTER';
    dismissBtn.appendChild(tx('Dismiss','Medium',14,'#94A3B8'));
    d.appendChild(dismissBtn);dismissBtn.x=12;dismissBtn.y=292;
  }

  // ─── M-03: Delete Confirm ─────────────────────────────────────────
  {
    const s=scr('M-03 — Delete Confirm',2);
    dimBg(s);
    const d=dialog(s,300,220);
    const ring=rc(52,52,'#EF4444',0.15,26);d.appendChild(ring);ring.x=124;ring.y=20;
    const title=tx('Delete Entry?','Bold',18,'#FFFFFF');title.textAlignHorizontal='CENTER';title.textAutoResize='NONE';title.resize(276,24);d.appendChild(title);title.x=12;title.y=86;
    const body=tx('This will permanently delete "Lunch — Pasta bolognese". This cannot be undone.','Regular',13,'#94A3B8');body.textAlignHorizontal='CENTER';body.textAutoResize='HEIGHT';body.resize(272,1);d.appendChild(body);body.x=14;body.y=116;
    const delBtn=figma.createFrame();delBtn.resize(276,48);delBtn.fills=solid('#EF4444');delBtn.cornerRadius=12;
    delBtn.layoutMode='HORIZONTAL';delBtn.primaryAxisSizingMode='FIXED';delBtn.counterAxisSizingMode='FIXED';
    delBtn.primaryAxisAlignItems='CENTER';delBtn.counterAxisAlignItems='CENTER';
    delBtn.appendChild(tx('Delete','SemiBold',15,'#FFFFFF'));
    d.appendChild(delBtn);delBtn.x=12;delBtn.y=158;
    const cancelBtn=figma.createFrame();cancelBtn.resize(276,0);// hidden, stacked
    const cancelT=tx('Cancel','Medium',14,'#94A3B8');cancelT.textAlignHorizontal='CENTER';cancelT.textAutoResize='NONE';cancelT.resize(276,24);d.appendChild(cancelT);cancelT.x=12;cancelT.y=170+4;
    // Position dialog correctly (overwrite center y)
    const dNode=s.children.find(n=>n.type==='FRAME'&&n.width===300);
    if(dNode){dNode.y=H/2-110;}
  }

  // ─── M-04: Success Toast ──────────────────────────────────────────
  {
    const s=scr('M-04 — Success Toast',3);
    dimBg(s);
    // Toast notification at bottom
    const toast=figma.createFrame();toast.resize(337,56);toast.cornerRadius=16;
    toast.fills=solid('#1A3A2A');toast.strokes=solid('#22C55E',0.5);toast.strokeWeight=1;
    p(s,toast,28,H-120);
    const chk=rc(28,28,'#22C55E',0.2,14);toast.appendChild(chk);chk.x=12;chk.y=14;
    p(s,tx('v','Bold',14,'#22C55E'),19,21);
    const msg=tx('Meal entry saved successfully','SemiBold',14,'#FFFFFF');toast.appendChild(msg);msg.x=52;msg.y=20;
    const undo=tx('Undo','Medium',12,'#3B82F6');toast.appendChild(undo);undo.x=290;undo.y=22;
    // Second variant — error toast
    const errToast=figma.createFrame();errToast.resize(337,56);errToast.cornerRadius=16;
    errToast.fills=solid('#1A0808');errToast.strokes=solid('#EF4444',0.5);errToast.strokeWeight=1;
    p(s,errToast,28,H-192);
    const excl=rc(28,28,'#EF4444',0.2,14);errToast.appendChild(excl);excl.x=12;excl.y=14;
    p(s,tx('!','Bold',14,'#EF4444'),19,21);
    const errMsg=tx('Failed to sync. Check your connection.','SemiBold',13,'#FFFFFF');errToast.appendChild(errMsg);errMsg.x=52;errMsg.y=20;
    const retry=tx('Retry','Medium',12,'#3B82F6');errToast.appendChild(retry);retry.x=284;retry.y=22;
  }

  // ─── M-05: Achievement Unlocked ───────────────────────────────────
  {
    const s=scr('M-05 — Achievement',4);
    dimBg(s);
    const d=dialog(s,320,300);
    const starBg=rc(80,80,'#F59E0B',0.12,40);d.appendChild(starBg);starBg.x=120;starBg.y=20;
    const star=tx('*','ExtraBold',48,'#F59E0B');star.textAlignHorizontal='CENTER';star.textAutoResize='NONE';star.resize(80,60);d.appendChild(star);star.x=120;star.y=28;
    const title=tx('Achievement Unlocked!','Bold',18,'#F59E0B');title.textAlignHorizontal='CENTER';title.textAutoResize='NONE';title.resize(296,24);d.appendChild(title);title.x=12;title.y=110;
    const badge=tx('7-Day Streak','ExtraBold',22,'#FFFFFF');badge.textAlignHorizontal='CENTER';badge.textAutoResize='NONE';badge.resize(296,28);d.appendChild(badge);badge.x=12;badge.y=138;
    const body=tx("You've logged your glucose every day for 7 days in a row. Keep it up!","Regular",13,"#CBD5E1");body.textAlignHorizontal='CENTER';body.textAutoResize='HEIGHT';body.resize(280,1);d.appendChild(body);body.x=20;body.y=172;
    const shareBtn=figma.createFrame();shareBtn.resize(144,48);shareBtn.fills=solid('#F59E0B');shareBtn.cornerRadius=12;
    shareBtn.layoutMode='HORIZONTAL';shareBtn.primaryAxisSizingMode='FIXED';shareBtn.counterAxisSizingMode='FIXED';
    shareBtn.primaryAxisAlignItems='CENTER';shareBtn.counterAxisAlignItems='CENTER';
    shareBtn.appendChild(tx('Share','SemiBold',14,'#000000'));
    d.appendChild(shareBtn);shareBtn.x=12;shareBtn.y=238;
    const doneBtn=figma.createFrame();doneBtn.resize(140,48);doneBtn.fills=solid('#1E293B');doneBtn.cornerRadius=12;
    doneBtn.layoutMode='HORIZONTAL';doneBtn.primaryAxisSizingMode='FIXED';doneBtn.counterAxisSizingMode='FIXED';
    doneBtn.primaryAxisAlignItems='CENTER';doneBtn.counterAxisAlignItems='CENTER';
    doneBtn.appendChild(tx('Done','Medium',14,'#94A3B8'));
    d.appendChild(doneBtn);doneBtn.x=164;doneBtn.y=238;
  }

  // ─── M-06: Reminder Setup ─────────────────────────────────────────
  {
    const s=scr('M-06 — Reminder Setup',5);
    dimBg(s);
    const sh=sheet(s,340);
    p(s,tx('Set Reminder','Bold',18,'#FFFFFF'),28,H-328);
    p(s,tx('Remind me to check my glucose at:','Regular',13,'#94A3B8'),28,H-302);
    // Time picker visual
    const timePicker=rc(337,100,'#1E293B',1,16);sh.appendChild(timePicker);timePicker.x=0;timePicker.y=60;
    const hour=tx('09','ExtraBold',36,'#FFFFFF');timePicker.appendChild(hour);hour.x=96;hour.y=30;
    const colon=tx(':','ExtraBold',36,'#94A3B8');timePicker.appendChild(colon);colon.x=148;colon.y=30;
    const min=tx('00','ExtraBold',36,'#94A3B8');timePicker.appendChild(min);min.x=162;min.y=30;
    const ampm=tx('AM','SemiBold',18,'#94A3B8');timePicker.appendChild(ampm);ampm.x=220;ampm.y=40;
    const up1=tx('^','Bold',14,'#3B82F6');timePicker.appendChild(up1);up1.x=106;up1.y=10;
    const dn1=tx('v','Bold',14,'#3B82F6');timePicker.appendChild(dn1);dn1.x=106;dn1.y=82;
    const up2=tx('^','Bold',14,'#475569');timePicker.appendChild(up2);up2.x=170;up2.y=10;
    const dn2=tx('v','Bold',14,'#475569');timePicker.appendChild(dn2);dn2.x=170;dn2.y=82;
    // Repeat
    const repLbl=tx('Repeat','Medium',13,'#FFFFFF');sh.appendChild(repLbl);repLbl.x=16;repLbl.y=175;
    const days=['M','Tu','W','Th','F','Sa','Su'];
    days.forEach((d2,i)=>{
      const dc=figma.createFrame();dc.resize(38,38);dc.cornerRadius=19;
      dc.fills=solid(i<5?'#3B82F6':'#1E293B');
      dc.layoutMode='HORIZONTAL';dc.primaryAxisSizingMode='FIXED';dc.counterAxisSizingMode='FIXED';
      dc.primaryAxisAlignItems='CENTER';dc.counterAxisAlignItems='CENTER';
      dc.appendChild(tx(d2,'SemiBold',11,i<5?'#FFFFFF':'#64748B'));
      sh.appendChild(dc);dc.x=16+i*44;dc.y=200;
    });
    const saveBtn=figma.createFrame();saveBtn.resize(361,52);saveBtn.fills=solid('#3B82F6');saveBtn.cornerRadius=14;
    saveBtn.layoutMode='HORIZONTAL';saveBtn.primaryAxisSizingMode='FIXED';saveBtn.counterAxisSizingMode='FIXED';
    saveBtn.primaryAxisAlignItems='CENTER';saveBtn.counterAxisAlignItems='CENTER';
    saveBtn.appendChild(tx('Save Reminder','Bold',15,'#FFFFFF'));
    sh.appendChild(saveBtn);saveBtn.x=16;saveBtn.y=260;
  }

  // ─── M-07: Post-meal Prompt ───────────────────────────────────────
  {
    const s=scr('M-07 — Post-meal Prompt',6);
    dimBg(s);
    const d=dialog(s,320,240);
    const ring=rc(52,52,'#3B82F6',0.15,26);d.appendChild(ring);ring.x=134;ring.y=16;
    const title=tx('Post-meal Check','Bold',18,'#3B82F6');title.textAlignHorizontal='CENTER';title.textAutoResize='NONE';title.resize(296,24);d.appendChild(title);title.x=12;title.y=80;
    const body=tx("It's been 2 hours since lunch.\nWhat is your glucose now?","Regular",13,"#CBD5E1");body.textAlignHorizontal='CENTER';body.textAutoResize='HEIGHT';body.resize(280,1);d.appendChild(body);body.x=20;body.y=110;
    const inpBg=rc(296,44,'#1E293B',1,12);d.appendChild(inpBg);inpBg.x=12;inpBg.y=152;
    const inpT=tx('Enter glucose (mg/dL)','Regular',13,'#475569');d.appendChild(inpT);inpT.x=28;inpT.y=166;
    const logBtn=figma.createFrame();logBtn.resize(144,44);logBtn.fills=solid('#3B82F6');logBtn.cornerRadius=12;
    logBtn.layoutMode='HORIZONTAL';logBtn.primaryAxisSizingMode='FIXED';logBtn.counterAxisSizingMode='FIXED';
    logBtn.primaryAxisAlignItems='CENTER';logBtn.counterAxisAlignItems='CENTER';
    logBtn.appendChild(tx('Log Reading','SemiBold',14,'#FFFFFF'));
    d.appendChild(logBtn);logBtn.x=12;logBtn.y=206;
    const skipBtn=figma.createFrame();skipBtn.resize(140,44);skipBtn.fills=solid('#1E293B');skipBtn.cornerRadius=12;
    skipBtn.layoutMode='HORIZONTAL';skipBtn.primaryAxisSizingMode='FIXED';skipBtn.counterAxisSizingMode='FIXED';
    skipBtn.primaryAxisAlignItems='CENTER';skipBtn.counterAxisAlignItems='CENTER';
    skipBtn.appendChild(tx('Skip','Medium',14,'#94A3B8'));
    d.appendChild(skipBtn);skipBtn.x=164;skipBtn.y=206;
  }

  // ─── M-08: Symptom Prompt ─────────────────────────────────────────
  {
    const s=scr('M-08 — Symptom Prompt',7);
    dimBg(s);
    const sh=sheet(s,360);
    p(s,tx('How are you feeling?','Bold',18,'#FFFFFF'),28,H-350);
    p(s,tx('Logging symptoms helps track glucose-related patterns.','Regular',12,'#94A3B8'),28,H-326);
    const symptoms=['Dizzy','Sweaty','Shaky','Tired','Hungry','Headache','Fine','Other'];
    symptoms.forEach((sym,i)=>{
      const row=Math.floor(i/4),col=i%4;
      const c=figma.createFrame();c.resize(76,42);c.cornerRadius=12;
      c.fills=solid(['Dizzy','Sweaty','Shaky'].includes(sym)?'#1A0808':'#1E293B');
      c.strokes=solid(['Dizzy','Sweaty','Shaky'].includes(sym)?'#EF4444':'#334155');c.strokeWeight=1;
      c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';
      c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';
      c.appendChild(tx(sym,'Medium',12,['Dizzy','Sweaty','Shaky'].includes(sym)?'#EF4444':'#94A3B8'));
      sh.appendChild(c);c.x=16+col*80;c.y=50+row*52;
    });
    const saveBtn=figma.createFrame();saveBtn.resize(361,52);saveBtn.fills=solid('#3B82F6');saveBtn.cornerRadius=14;
    saveBtn.layoutMode='HORIZONTAL';saveBtn.primaryAxisSizingMode='FIXED';saveBtn.counterAxisSizingMode='FIXED';
    saveBtn.primaryAxisAlignItems='CENTER';saveBtn.counterAxisAlignItems='CENTER';
    saveBtn.appendChild(tx('Log Symptoms','Bold',15,'#FFFFFF'));
    sh.appendChild(saveBtn);saveBtn.x=16;saveBtn.y=170;
    const skipBtn2=figma.createFrame();skipBtn2.resize(361,44);skipBtn2.fills=solid('#1E293B');skipBtn2.cornerRadius=12;
    skipBtn2.layoutMode='HORIZONTAL';skipBtn2.primaryAxisSizingMode='FIXED';skipBtn2.counterAxisSizingMode='FIXED';
    skipBtn2.primaryAxisAlignItems='CENTER';skipBtn2.counterAxisAlignItems='CENTER';
    skipBtn2.appendChild(tx('Skip for now','Medium',14,'#94A3B8'));
    sh.appendChild(skipBtn2);skipBtn2.x=16;skipBtn2.y=232;
  }

  // ─── M-09: Sensor Offline ─────────────────────────────────────────
  {
    const s=scr('M-09 — Sensor Offline',8);
    dimBg(s);
    const d=dialog(s,320,260);
    const ring=rc(56,56,'#64748B',0.15,28);d.appendChild(ring);ring.x=132;ring.y=16;
    const title=tx('Sensor Offline','Bold',18,'#94A3B8');title.textAlignHorizontal='CENTER';title.textAutoResize='NONE';title.resize(296,24);d.appendChild(title);title.x=12;title.y=84;
    const body=tx('Your FreeStyle Libre 3 is not transmitting.\nLast reading: 118 mg/dL · 45 min ago','Regular',13,'#CBD5E1');body.textAlignHorizontal='CENTER';body.textAutoResize='HEIGHT';body.resize(280,1);d.appendChild(body);body.x=20;body.y=114;
    const scanBtn=figma.createFrame();scanBtn.resize(296,48);scanBtn.fills=solid('#3B82F6');scanBtn.cornerRadius=12;
    scanBtn.layoutMode='HORIZONTAL';scanBtn.primaryAxisSizingMode='FIXED';scanBtn.counterAxisSizingMode='FIXED';
    scanBtn.primaryAxisAlignItems='CENTER';scanBtn.counterAxisAlignItems='CENTER';
    scanBtn.appendChild(tx('Scan Sensor (NFC)','SemiBold',14,'#FFFFFF'));
    d.appendChild(scanBtn);scanBtn.x=12;scanBtn.y=168;
    const manualBtn=figma.createFrame();manualBtn.resize(296,44);manualBtn.fills=solid('#1E293B');manualBtn.cornerRadius=12;
    manualBtn.layoutMode='HORIZONTAL';manualBtn.primaryAxisSizingMode='FIXED';manualBtn.counterAxisSizingMode='FIXED';
    manualBtn.primaryAxisAlignItems='CENTER';manualBtn.counterAxisAlignItems='CENTER';
    manualBtn.appendChild(tx('Enter manual reading','Medium',13,'#94A3B8'));
    d.appendChild(manualBtn);manualBtn.x=12;manualBtn.y=224;
  }

  // ─── M-10: No Internet ────────────────────────────────────────────
  {
    const s=scr('M-10 — No Internet',9);
    dimBg(s);
    const d=dialog(s,320,240);
    const ring=rc(52,52,'#64748B',0.15,26);d.appendChild(ring);ring.x=134;ring.y=16;
    const title=tx('No Internet Connection','Bold',18,'#94A3B8');title.textAlignHorizontal='CENTER';title.textAutoResize='NONE';title.resize(296,24);d.appendChild(title);title.x=12;title.y=80;
    const body=tx("Some features require internet. Your CGM data\ncontinues to be recorded offline and will sync\nwhen you're back online.","Regular",13,"#CBD5E1");body.textAlignHorizontal='CENTER';body.textAutoResize='HEIGHT';body.resize(280,1);d.appendChild(body);body.x=20;body.y=110;
    const retryBtn=figma.createFrame();retryBtn.resize(296,48);retryBtn.fills=solid('#3B82F6');retryBtn.cornerRadius=12;
    retryBtn.layoutMode='HORIZONTAL';retryBtn.primaryAxisSizingMode='FIXED';retryBtn.counterAxisSizingMode='FIXED';
    retryBtn.primaryAxisAlignItems='CENTER';retryBtn.counterAxisAlignItems='CENTER';
    retryBtn.appendChild(tx('Retry Connection','SemiBold',14,'#FFFFFF'));
    d.appendChild(retryBtn);retryBtn.x=12;retryBtn.y=178;
    const offlineBtn=figma.createFrame();offlineBtn.resize(296,44);offlineBtn.fills=solid('#1E293B');offlineBtn.cornerRadius=12;
    offlineBtn.layoutMode='HORIZONTAL';offlineBtn.primaryAxisSizingMode='FIXED';offlineBtn.counterAxisSizingMode='FIXED';
    offlineBtn.primaryAxisAlignItems='CENTER';offlineBtn.counterAxisAlignItems='CENTER';
    offlineBtn.appendChild(tx('Continue Offline','Medium',13,'#94A3B8'));
    d.appendChild(offlineBtn);offlineBtn.x=12;offlineBtn.y=226;
  }

  // ─── M-11: Notification Permission ───────────────────────────────
  {
    const s=scr('M-11 — Notification Permission',10);
    dimBg(s);
    const d=dialog(s,320,300);
    const ring=rc(72,72,'#3B82F6',0.12,36);d.appendChild(ring);ring.x=124;ring.y=20;
    const title=tx('Enable Alerts','Bold',20,'#FFFFFF');title.textAlignHorizontal='CENTER';title.textAutoResize='NONE';title.resize(296,26);d.appendChild(title);title.x=12;title.y=104;
    const body=tx("Diaboo needs permission to send you critical glucose alerts. Missing a hypo notification can be dangerous.","Regular",13,"#CBD5E1");body.textAlignHorizontal='CENTER';body.textAutoResize='HEIGHT';body.resize(280,1);d.appendChild(body);body.x=20;body.y=136;
    const bullets=['Hypo / hyper glucose alerts','Post-meal check reminders','Sensor offline warnings'];
    bullets.forEach((b2,i)=>{
      const dot=rc(6,6,'#3B82F6',1,3);d.appendChild(dot);dot.x=28;dot.y=196+i*22;
      const bt=tx(b2,'Regular',12,'#CBD5E1');d.appendChild(bt);bt.x=44;bt.y=193+i*22;
    });
    const allowBtn=figma.createFrame();allowBtn.resize(296,48);allowBtn.fills=solid('#3B82F6');allowBtn.cornerRadius=12;
    allowBtn.layoutMode='HORIZONTAL';allowBtn.primaryAxisSizingMode='FIXED';allowBtn.counterAxisSizingMode='FIXED';
    allowBtn.primaryAxisAlignItems='CENTER';allowBtn.counterAxisAlignItems='CENTER';
    allowBtn.appendChild(tx('Allow Notifications','Bold',15,'#FFFFFF'));
    d.appendChild(allowBtn);allowBtn.x=12;allowBtn.y=258;
    const laterT=tx("Maybe later — I understand the risk","Regular",11,"#475569");laterT.textAlignHorizontal='CENTER';laterT.textAutoResize='NONE';laterT.resize(296,16);d.appendChild(laterT);laterT.x=12;laterT.y=272+16;
  }

  // ─── M-12: Logout Confirm ─────────────────────────────────────────
  {
    const s=scr('M-12 — Logout Confirm',11);
    dimBg(s);
    const d=dialog(s,300,200);
    const ring=rc(48,48,'#EF4444',0.15,24);d.appendChild(ring);ring.x=126;ring.y=16;
    const title=tx('Log out?','Bold',18,'#FFFFFF');title.textAlignHorizontal='CENTER';title.textAutoResize='NONE';title.resize(276,24);d.appendChild(title);title.x=12;title.y=76;
    const body=tx("Your data stays on this device.\nYou'll need to log in again to sync.","Regular",13,"#94A3B8");body.textAlignHorizontal='CENTER';body.textAutoResize='HEIGHT';body.resize(272,1);d.appendChild(body);body.x=14;body.y=106;
    const logoutBtn=figma.createFrame();logoutBtn.resize(276,46);logoutBtn.fills=solid('#EF4444');logoutBtn.cornerRadius=12;
    logoutBtn.layoutMode='HORIZONTAL';logoutBtn.primaryAxisSizingMode='FIXED';logoutBtn.counterAxisSizingMode='FIXED';
    logoutBtn.primaryAxisAlignItems='CENTER';logoutBtn.counterAxisAlignItems='CENTER';
    logoutBtn.appendChild(tx('Log Out','SemiBold',15,'#FFFFFF'));
    d.appendChild(logoutBtn);logoutBtn.x=12;logoutBtn.y=152;
    const cancelT=tx('Cancel','Medium',13,'#94A3B8');cancelT.textAlignHorizontal='CENTER';cancelT.textAutoResize='NONE';cancelT.resize(276,18);d.appendChild(cancelT);cancelT.x=12;cancelT.y=164+18;
  }

  // ─── M-13: Rate App Prompt ────────────────────────────────────────
  {
    const s=scr('M-13 — Rate App',12);
    dimBg(s);
    const d=dialog(s,320,260);
    const logo=figma.createFrame();logo.resize(64,64);logo.cornerRadius=16;logo.fills=solid('#0F172A');
    d.appendChild(logo);logo.x=128;logo.y=16;
    const drop=rc(32,40,'#22D3EE',1,16);logo.appendChild(drop);drop.x=16;drop.y=12;
    const title=tx('Enjoying Diaboo?','Bold',20,'#FFFFFF');title.textAlignHorizontal='CENTER';title.textAutoResize='NONE';title.resize(296,26);d.appendChild(title);title.x=12;title.y=92;
    const body=tx("Your review helps others with diabetes\nfind a better management tool.","Regular",13,"#CBD5E1");body.textAlignHorizontal='CENTER';body.textAutoResize='HEIGHT';body.resize(280,1);d.appendChild(body);body.x=20;body.y=124;
    // Stars
    for(let i=0;i<5;i++){const star=tx('*','ExtraBold',28,'#F59E0B');d.appendChild(star);star.x=50+i*48;star.y=164;}
    const rateBtn=figma.createFrame();rateBtn.resize(296,48);rateBtn.fills=solid('#F59E0B');rateBtn.cornerRadius=12;
    rateBtn.layoutMode='HORIZONTAL';rateBtn.primaryAxisSizingMode='FIXED';rateBtn.counterAxisSizingMode='FIXED';
    rateBtn.primaryAxisAlignItems='CENTER';rateBtn.counterAxisAlignItems='CENTER';
    rateBtn.appendChild(tx('Rate on Play Store','SemiBold',14,'#000000'));
    d.appendChild(rateBtn);rateBtn.x=12;rateBtn.y=204;
    const noThanks=tx("Not now","Regular",11,"#475569");noThanks.textAlignHorizontal='CENTER';noThanks.textAutoResize='NONE';noThanks.resize(296,16);d.appendChild(noThanks);noThanks.x=12;noThanks.y=218+18;
  }

  // ─── M-14: Share / Export Sheet ──────────────────────────────────
  {
    const s=scr('M-14 — Share Export',13);
    dimBg(s);
    const sh=sheet(s,320);
    p(s,tx('Share Report','Bold',18,'#FFFFFF'),28,H-310);
    p(s,tx('Choose how to share your glucose report:','Regular',12,'#94A3B8'),28,H-286);
    const shareOpts=[
      ['PDF Report','Formatted A4 report','#3B82F6'],
      ['Share via WhatsApp','Send to caregiver','#22C55E'],
      ['Email to Doctor','dr.sarah@clinic.com','#8B5CF6'],
      ['Copy link','Share Nightscout URL','#F59E0B'],
      ['Save to Files','Local PDF copy','#94A3B8'],
    ];
    shareOpts.forEach(([opt,sub,color],i)=>{
      const row=figma.createFrame();row.resize(361,56);row.fills=solid('#1E293B',0.5);row.cornerRadius=14;
      sh.appendChild(row);row.x=16;row.y=40+i*66;
      const dot=rc(36,36,color,0.15,18);row.appendChild(dot);dot.x=12;dot.y=10;
      const labelT=tx(opt,'SemiBold',14,'#FFFFFF');row.appendChild(labelT);labelT.x=58;labelT.y=10;
      const subT=tx(sub,'Regular',11,'#64748B');row.appendChild(subT);subT.x=58;subT.y=30;
      const arr=tx('>','Regular',12,'#475569');row.appendChild(arr);arr.x=335;arr.y=22;
    });
    const cancelBtn=figma.createFrame();cancelBtn.resize(361,48);cancelBtn.fills=solid('#1E293B');cancelBtn.cornerRadius=12;
    cancelBtn.layoutMode='HORIZONTAL';cancelBtn.primaryAxisSizingMode='FIXED';cancelBtn.counterAxisSizingMode='FIXED';
    cancelBtn.primaryAxisAlignItems='CENTER';cancelBtn.counterAxisAlignItems='CENTER';
    cancelBtn.appendChild(tx('Cancel','Medium',15,'#94A3B8'));
    sh.appendChild(cancelBtn);cancelBtn.x=16;cancelBtn.y=376;
  }

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('Dialog screens M-01 to M-14 built!');
})();
