(async () => {
  // LIGHT THEME — A-06 to A-14: Auth + Health Setup
  const W=393,H=844,GAP=40,ROW_Y=15*924; // y=13860

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
  const TEAL='#0891B2',BRD='#E2E8F0';

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
  function fBtn(label,w,hex,tHex=SURF){
    const b=figma.createFrame();b.resize(w,56);b.fills=solid(hex);b.cornerRadius=16;
    b.layoutMode='HORIZONTAL';b.primaryAxisSizingMode='FIXED';b.counterAxisSizingMode='FIXED';
    b.primaryAxisAlignItems='CENTER';b.counterAxisAlignItems='CENTER';
    b.appendChild(tx(label,'Bold',16,tHex));return b;
  }
  function inp(s,label,val,x,y,w=337,type='text'){
    const c=figma.createFrame();c.resize(w,64);c.fills=solid(SURF2);c.cornerRadius=14;
    c.strokes=solid(BRD);c.strokeWeight=1;p(s,c,x,y);
    const l=tx(label,'Medium',11,T3);c.appendChild(l);l.x=16;l.y=10;
    const v=tx(type==='password'?'••••••••':val,'Regular',15,val?T1:T4);c.appendChild(v);v.x=16;v.y=32;
    return c;
  }
  function logo(size=56){
    const f=figma.createFrame();f.resize(size,size);f.cornerRadius=size*.3;f.fills=solid('#E0F7FA');
    const drop=rc(Math.round(size*.5),Math.round(size*.62),TEAL,1,Math.round(size*.25));
    f.appendChild(drop);drop.x=Math.round(size*.25);drop.y=Math.round(size*.18);
    const wave=rc(Math.round(size*.5),Math.round(size*.08),SURF,.7,2);
    f.appendChild(wave);wave.x=Math.round(size*.25);wave.y=Math.round(size*.46);
    return f;
  }
  function progressBar(s,step,total,y){
    const bg=rc(337,4,BRD,1,2);p(s,bg,28,y);
    const fill=rc(Math.round(337*step/total),4,PRI,1,2);p(s,fill,28,y);
  }

  // ─── A-06 Light: Sign In ────────────────────────────────────────────
  {
    const s=scr('A-06 — Sign In',0);
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    p(s,logo(64),W/2-32,72);
    p(s,ctx('Welcome back','ExtraBold',30,T1,337),28,152);
    p(s,ctx('Sign in to continue monitoring','Regular',14,T3,337),28,192);
    inp(s,'Email address','you@example.com',28,236);
    inp(s,'Password','',28,312,'text','password');
    const forgot=tx('Forgot password?','Medium',13,PRI);p(s,forgot,W-139,390);
    p(s,fBtn('Sign In',337,PRI),28,422);
    // Divider
    const div=rc(147,1,BRD);p(s,div,28,496);
    const orLabel=ctx('or continue with','Regular',12,T3,60);p(s,orLabel,167,490);
    const div2=rc(147,1,BRD);p(s,div2,222,496);
    // Social sign-in row
    const gBtn=figma.createFrame();gBtn.resize(161,52);gBtn.fills=solid(SURF);gBtn.cornerRadius=14;
    gBtn.strokes=solid(BRD);gBtn.strokeWeight=1;
    gBtn.layoutMode='HORIZONTAL';gBtn.primaryAxisSizingMode='FIXED';gBtn.counterAxisSizingMode='FIXED';
    gBtn.primaryAxisAlignItems='CENTER';gBtn.counterAxisAlignItems='CENTER';
    gBtn.appendChild(tx('G  Google','Medium',14,T2));p(s,gBtn,28,516);
    const aBtn=figma.createFrame();aBtn.resize(161,52);aBtn.fills=solid(SURF);aBtn.cornerRadius=14;
    aBtn.strokes=solid(BRD);aBtn.strokeWeight=1;
    aBtn.layoutMode='HORIZONTAL';aBtn.primaryAxisSizingMode='FIXED';aBtn.counterAxisSizingMode='FIXED';
    aBtn.primaryAxisAlignItems='CENTER';aBtn.counterAxisAlignItems='CENTER';
    aBtn.appendChild(tx('  Apple','Medium',14,T2));p(s,aBtn,204,516);
    p(s,ctx("Don't have an account?  Sign up",'Regular',14,T3,337),28,594);
    const signupLink=tx('Sign up','SemiBold',14,PRI);p(s,signupLink,W/2+36,594);
  }

  // ─── A-07 Light: Create Account ────────────────────────────────────
  {
    const s=scr('A-07 — Create Account',1);
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    p(s,logo(52),W/2-26,66);
    p(s,ctx('Create your account','ExtraBold',28,T1,337),28,132);
    p(s,ctx('Start your diabetes management journey','Regular',13,T3,337),28,168);
    inp(s,'Full name','Mohamed Al-Rashid',28,202);
    inp(s,'Email address','you@example.com',28,278);
    inp(s,'Password (min 8 chars)','',28,354,'text','password');
    inp(s,'Confirm password','',28,430,'text','password');
    // Terms checkbox
    const chkBg=rc(20,20,PRI,1,6);p(s,chkBg,28,510);
    p(s,tx('v','Bold',12,SURF),31,512);
    const termsLabel=tx('I agree to Terms of Service and Privacy Policy','Regular',12,T3);
    termsLabel.textAutoResize='HEIGHT';termsLabel.resize(285,1);
    p(s,termsLabel,58,510);
    p(s,fBtn('Create Account',337,PRI),28,550);
    p(s,ctx('Already have an account?  Sign in','Regular',14,T3,337),28,626);
    const signInLink=tx('Sign in','SemiBold',14,PRI);p(s,signInLink,W/2+44,626);
  }

  // ─── A-08 Light: Forgot Password ───────────────────────────────────
  {
    const s=scr('A-08 — Forgot Password',2);
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    const backBg=rc(40,40,SURF2,1,12);p(s,backBg,20,58);
    p(s,tx('<','SemiBold',16,T1),28,65);
    p(s,ctx('Forgot password?','ExtraBold',28,T1,337),28,120);
    p(s,ctx("Enter your email and we'll send\na reset link to your inbox.",'Regular',14,T3,337),28,164);
    // Illustration
    const illus=figma.createFrame();illus.resize(120,120);illus.cornerRadius=60;illus.fills=solid('#EFF6FF');
    p(s,illus,W/2-60,220);
    const emailIcon=rc(56,44,PRI,0.15,12);illus.appendChild(emailIcon);emailIcon.x=32;emailIcon.y=38;
    const atSign=tx('@','ExtraBold',24,PRI);illus.appendChild(atSign);atSign.x=48;atSign.y=44;
    inp(s,'Email address','you@example.com',28,362);
    p(s,fBtn('Send Reset Link',337,PRI),28,440);
    p(s,ctx('Check your spam folder if you\ndon\'t receive the email within 5 minutes.','Regular',12,T4,337),28,514);
  }

  // ─── A-09 Light: Email Verification ────────────────────────────────
  {
    const s=scr('A-09 — Email Verification',3);
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    const backBg=rc(40,40,SURF2,1,12);p(s,backBg,20,58);
    p(s,tx('<','SemiBold',16,T1),28,65);
    p(s,ctx('Verify your email','ExtraBold',28,T1,337),28,120);
    const emailSentLabel=ctx("We've sent a 6-digit code to\nyou@example.com",'Regular',14,T3,337);
    p(s,emailSentLabel,28,160);
    // OTP boxes
    const digits=['2','7','4','8','1','3'];
    digits.forEach((d,i)=>{
      const box=figma.createFrame();box.resize(48,60);box.fills=solid(SURF);box.cornerRadius=12;
      box.strokes=solid(i===2?PRI:BRD);box.strokeWeight=i===2?2:1;
      p(s,box,28+i*54,234);
      const dLabel=tx(d,'ExtraBold',28,T1);dLabel.textAlignHorizontal='CENTER';dLabel.textAutoResize='NONE';dLabel.resize(48,36);
      box.appendChild(dLabel);dLabel.x=0;dLabel.y=12;
    });
    p(s,fBtn('Verify Code',337,PRI),28,324);
    // Resend
    const resendCard=figma.createFrame();resendCard.resize(337,52);resendCard.fills=solid(SURF2);resendCard.cornerRadius=14;
    p(s,resendCard,28,396);
    const resendLabel=tx('Resend in 45 seconds','Regular',13,T3);resendCard.appendChild(resendLabel);resendLabel.x=16;resendLabel.y=18;
    const resendBtn=figma.createFrame();resendBtn.resize(80,34);resendBtn.fills=solid(PRI,0.1);resendBtn.cornerRadius=8;
    resendBtn.layoutMode='HORIZONTAL';resendBtn.primaryAxisSizingMode='FIXED';resendBtn.counterAxisSizingMode='FIXED';
    resendBtn.primaryAxisAlignItems='CENTER';resendBtn.counterAxisAlignItems='CENTER';
    resendBtn.appendChild(tx('Resend','SemiBold',12,PRI));
    resendCard.appendChild(resendBtn);resendBtn.x=249;resendBtn.y=9;
    p(s,ctx('Enter the 6-digit code exactly as received.\nThe code expires after 10 minutes.','Regular',12,T4,337),28,466);
  }

  // ─── A-10 Light: Diabetes Type (Setup 1/5) ─────────────────────────
  {
    const s=scr('A-10 — Diabetes Type',4);
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    progressBar(s,1,5,62);
    p(s,ctx('Step 1 of 5','Medium',12,T3,337),28,78);
    p(s,ctx('What type of diabetes\ndo you have?','ExtraBold',26,T1,337),28,104);
    const types=[
      ['Type 1','Autoimmune · insulin-dependent',PRI,true],
      ['Type 2','Insulin resistance · lifestyle & genetics',SUC,false],
      ['Type 1.5 / LADA','Late-onset autoimmune diabetes','#7C3AED',false],
      ['GDM','Gestational diabetes during pregnancy',WARN,false],
      ['Other / Unsure','I\'ll describe it in my profile',T3,false],
    ];
    types.forEach(([type,desc,color,sel],i)=>{
      const card=figma.createFrame();card.resize(337,68);card.fills=solid(sel?'#EFF6FF':SURF);
      card.cornerRadius=16;card.strokes=solid(sel?PRI:BRD);card.strokeWeight=sel?2:1;
      p(s,card,28,170+i*78);
      const dot=rc(10,10,color,1,5);card.appendChild(dot);dot.x=16;dot.y=29;
      const typeLabel=tx(type,'SemiBold',15,T1);card.appendChild(typeLabel);typeLabel.x=36;typeLabel.y=16;
      const descLabel=tx(desc,'Regular',11,T3);card.appendChild(descLabel);descLabel.x=36;descLabel.y=36;
      if(sel){const chk=figma.createFrame();chk.resize(24,24);chk.cornerRadius=12;chk.fills=solid(PRI);
        card.appendChild(chk);chk.x=305;chk.y=22;
        const chkT=tx('v','Bold',12,SURF);chk.appendChild(chkT);chkT.x=6;chkT.y=4;}
    });
    p(s,fBtn('Continue',337,PRI),28,H-136);
    p(s,ctx('1 of 5 · Health profile setup','Regular',11,T4,337),28,H-68);
  }

  // ─── A-11 Light: Insulin Setup (2/5) ───────────────────────────────
  {
    const s=scr('A-11 — Insulin Setup',5);
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    progressBar(s,2,5,62);
    p(s,ctx('Step 2 of 5','Medium',12,T3,337),28,78);
    p(s,ctx('How do you manage\nyour insulin?','ExtraBold',26,T1,337),28,104);
    const methods=[
      ['MDI','Multiple daily injections · pens/syringes','#7C3AED',true],
      ['Insulin Pump','Continuous subcutaneous infusion',PRI,false],
      ['Tablet / Non-insulin','Oral medications only',SUC,false],
      ['Diet controlled','No medications',WARN,false],
    ];
    methods.forEach(([m,desc,color,sel],i)=>{
      const card=figma.createFrame();card.resize(337,68);card.fills=solid(sel?'#F5F3FF':SURF);
      card.cornerRadius=16;card.strokes=solid(sel?'#7C3AED':BRD);card.strokeWeight=sel?2:1;
      p(s,card,28,170+i*78);
      const dot=rc(10,10,color,1,5);card.appendChild(dot);dot.x=16;dot.y=29;
      const mLabel=tx(m,'SemiBold',15,T1);card.appendChild(mLabel);mLabel.x=36;mLabel.y=16;
      const dLabel=tx(desc,'Regular',11,T3);card.appendChild(dLabel);dLabel.x=36;dLabel.y=36;
    });
    // MDI detail (shown when MDI selected)
    const detail=figma.createFrame();detail.resize(337,80);detail.fills=solid(SURF2);detail.cornerRadius=14;
    detail.strokes=solid(BRD);detail.strokeWeight=1;
    p(s,detail,28,490);
    const bInp=figma.createFrame();bInp.resize(155,56);bInp.fills=solid(SURF);bInp.cornerRadius=12;
    detail.appendChild(bInp);bInp.x=12;bInp.y=12;
    const bLabel=tx('Basal insulin','Medium',11,T3);bInp.appendChild(bLabel);bLabel.x=10;bLabel.y=8;
    const bVal=tx('Tresiba 26u','Regular',13,T1);bInp.appendChild(bVal);bVal.x=10;bVal.y=28;
    const rInp=figma.createFrame();rInp.resize(155,56);rInp.fills=solid(SURF);rInp.cornerRadius=12;
    detail.appendChild(rInp);rInp.x=170;rInp.y=12;
    const rLabel=tx('Rapid insulin','Medium',11,T3);rInp.appendChild(rLabel);rLabel.x=10;rLabel.y=8;
    const rVal=tx('NovoRapid','Regular',13,T1);rInp.appendChild(rVal);rVal.x=10;rVal.y=28;
    p(s,fBtn('Continue',337,PRI),28,H-136);
    p(s,ctx('2 of 5 · Health profile setup','Regular',11,T4,337),28,H-68);
  }

  // ─── A-12 Light: Connect Sensor (3/5) ──────────────────────────────
  {
    const s=scr('A-12 — Connect Sensor',6);
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    progressBar(s,3,5,62);
    p(s,ctx('Step 3 of 5','Medium',12,T3,337),28,78);
    p(s,ctx('Connect your glucose sensor','ExtraBold',24,T1,337),28,104);
    p(s,ctx('Choose your CGM or glucose monitor','Regular',14,T3,337),28,148);
    const sensors=[
      ['FreeStyle Libre','Abbott · NFC & Bluetooth',TEAL,true],
      ['Dexcom G6 / G7','Dexcom · Bluetooth',PRI,false],
      ['Nightscout / xDrip','Open-source bridge','#F97316',false],
      ['Manual readings','Finger-prick meter only',T3,false],
    ];
    sensors.forEach(([name,desc,color,sel],i)=>{
      const card=figma.createFrame();card.resize(337,72);card.fills=solid(sel?'#ECFEFF':SURF);
      card.cornerRadius=16;card.strokes=solid(sel?TEAL:BRD);card.strokeWeight=sel?2:1;
      p(s,card,28,182+i*82);
      const dot=rc(10,10,color,1,5);card.appendChild(dot);dot.x=16;dot.y=31;
      const nLabel=tx(name,'SemiBold',15,T1);card.appendChild(nLabel);nLabel.x=36;nLabel.y=18;
      const dLabel=tx(desc,'Regular',11,T3);card.appendChild(dLabel);dLabel.x=36;dLabel.y=38;
      if(sel){const badge=figma.createFrame();badge.resize(76,26);badge.fills=solid(TEAL,0.1);badge.cornerRadius=13;
        badge.layoutMode='HORIZONTAL';badge.primaryAxisSizingMode='FIXED';badge.counterAxisSizingMode='FIXED';
        badge.primaryAxisAlignItems='CENTER';badge.counterAxisAlignItems='CENTER';
        badge.appendChild(tx('Selected','SemiBold',11,TEAL));
        card.appendChild(badge);badge.x=249;badge.y=23;}
    });
    const skipLabel=tx('Skip for now — add sensor later','Medium',13,PRI);
    skipLabel.textAlignHorizontal='CENTER';skipLabel.textAutoResize='NONE';skipLabel.resize(337,18);
    p(s,skipLabel,28,H-80);
    p(s,fBtn('Connect & Continue',337,PRI),28,H-140);
  }

  // ─── A-13 Light: Set Targets (4/5) ─────────────────────────────────
  {
    const s=scr('A-13 — Set Targets',7);
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    progressBar(s,4,5,62);
    p(s,ctx('Step 4 of 5','Medium',12,T3,337),28,78);
    p(s,ctx('Set your glucose targets','ExtraBold',26,T1,337),28,104);
    p(s,ctx('These match standard ADA / NICE guidelines.\nAsk your diabetes team before changing.','Regular',13,T3,337),28,148);
    // Target range visual
    const rangeCard=figma.createFrame();rangeCard.resize(337,100);rangeCard.fills=solid(SURF);rangeCard.cornerRadius=16;
    rangeCard.strokes=solid(BRD);rangeCard.strokeWeight=1;
    p(s,rangeCard,28,210);
    const low=figma.createFrame();low.resize(155,68);low.fills=solid(SURF2);low.cornerRadius=12;
    rangeCard.appendChild(low);low.x=12;low.y=16;
    const lowLabel=tx('Low threshold','Medium',11,T3);low.appendChild(lowLabel);lowLabel.x=10;lowLabel.y=8;
    const lowVal=tx('70 mg/dL','Bold',20,DAN);low.appendChild(lowVal);lowVal.x=10;lowVal.y=30;
    const high=figma.createFrame();high.resize(155,68);high.fills=solid(SURF2);high.cornerRadius=12;
    rangeCard.appendChild(high);high.x=170;high.y=16;
    const highLabel=tx('High threshold','Medium',11,T3);high.appendChild(highLabel);highLabel.x=10;highLabel.y=8;
    const highVal=tx('180 mg/dL','Bold',20,WARN);high.appendChild(highVal);highVal.x=10;highVal.y=30;
    // Range bar
    const rangeBar=rc(337,12,BRD,1,6);p(s,rangeBar,28,328);
    const inRange=rc(180,12,SUC,0.3,6);p(s,inRange,90,328);
    const lowZone=rc(62,12,DAN,0.3);p(s,lowZone,28,328);
    const highZone=rc(85,12,WARN,0.3);p(s,highZone,252,328);
    p(s,tx('Low','Regular',10,DAN),28,344);
    p(s,tx('In range (70–180)','Regular',10,SUC),112,344);
    p(s,tx('High','Regular',10,WARN),302,344);
    // A1c target
    const a1cCard=figma.createFrame();a1cCard.resize(337,72);a1cCard.fills=solid(SURF);a1cCard.cornerRadius=16;
    a1cCard.strokes=solid(BRD);a1cCard.strokeWeight=1;
    p(s,a1cCard,28,372);
    const a1cLabel=tx('A1c target','Medium',11,T3);a1cCard.appendChild(a1cLabel);a1cLabel.x=16;a1cLabel.y=10;
    const a1cVal=tx('< 7.0%','Bold',22,PRI);a1cCard.appendChild(a1cVal);a1cVal.x=16;a1cVal.y=32;
    const a1cNote=tx('ADA recommended','Regular',10,T3);a1cCard.appendChild(a1cNote);a1cNote.x=110;a1cNote.y=40;
    // Time in Range goal
    const tirCard=figma.createFrame();tirCard.resize(337,72);tirCard.fills=solid(SURF);tirCard.cornerRadius=16;
    tirCard.strokes=solid(BRD);tirCard.strokeWeight=1;
    p(s,tirCard,28,456);
    const tirLabel=tx('TIR goal','Medium',11,T3);tirCard.appendChild(tirLabel);tirLabel.x=16;tirLabel.y=10;
    const tirVal=tx('> 70%','Bold',22,SUC);tirCard.appendChild(tirVal);tirVal.x=16;tirVal.y=32;
    const tirNote=tx('International consensus target','Regular',10,T3);tirCard.appendChild(tirNote);tirNote.x=88;tirNote.y=40;
    p(s,fBtn('Save Targets',337,PRI),28,H-136);
    p(s,ctx('4 of 5 · Health profile setup','Regular',11,T4,337),28,H-68);
  }

  // ─── A-14 Light: Setup Complete (5/5) ──────────────────────────────
  {
    const s=scr('A-14 — Setup Complete',8);
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    progressBar(s,5,5,62);
    // Success illustration
    const circle=figma.createFrame();circle.resize(128,128);circle.cornerRadius=64;circle.fills=solid('#DCFCE7');
    p(s,circle,W/2-64,100);
    const checkOuter=figma.createFrame();checkOuter.resize(80,80);checkOuter.cornerRadius=40;checkOuter.fills=solid(SUC);
    circle.appendChild(checkOuter);checkOuter.x=24;checkOuter.y=24;
    const checkLabel=tx('v','ExtraBold',40,SURF);checkOuter.appendChild(checkLabel);checkLabel.x=19;checkLabel.y=12;
    p(s,ctx("You're all set!",'ExtraBold',32,T1,337),28,248);
    p(s,ctx('Diaboo is ready. Your CGM is connected and\nglucose monitoring has started.','Regular',15,T2,337),28,296);
    // Setup summary card
    const summary=figma.createFrame();summary.resize(337,180);summary.fills=solid(SURF);summary.cornerRadius=20;
    summary.strokes=solid(BRD);summary.strokeWeight=1;
    p(s,summary,28,366);
    const items=[
      [SUC,'Type 1 Diabetes · MDI'],
      [SUC,'Basal: Tresiba · Bolus: NovoRapid'],
      [TEAL,'FreeStyle Libre 3 connected'],
      [PRI,'Targets: 70–180 mg/dL · A1c <7%'],
    ];
    items.forEach(([color,label],i)=>{
      const dot=rc(8,8,color,1,4);summary.appendChild(dot);dot.x=20;dot.y=24+i*38;
      const lbl=tx(label,'Medium',13,T1);summary.appendChild(lbl);lbl.x=38;lbl.y=20+i*38;
    });
    // Caregiver invite nudge
    const invite=figma.createFrame();invite.resize(337,64);invite.fills=solid('#EFF6FF');invite.cornerRadius=16;
    p(s,invite,28,562);
    const inviteLabel=tx('Add a caregiver?','SemiBold',14,T1);invite.appendChild(inviteLabel);inviteLabel.x=16;inviteLabel.y=12;
    const inviteSub=tx('Share live glucose with family · optional','Regular',11,T3);invite.appendChild(inviteSub);inviteSub.x=16;inviteSub.y=32;
    const inviteBtn=figma.createFrame();inviteBtn.resize(72,34);inviteBtn.fills=solid(PRI,0.1);inviteBtn.cornerRadius=8;
    inviteBtn.layoutMode='HORIZONTAL';inviteBtn.primaryAxisSizingMode='FIXED';inviteBtn.counterAxisSizingMode='FIXED';
    inviteBtn.primaryAxisAlignItems='CENTER';inviteBtn.counterAxisAlignItems='CENTER';
    inviteBtn.appendChild(tx('Invite','SemiBold',12,PRI));
    invite.appendChild(inviteBtn);inviteBtn.x=249;inviteBtn.y=15;
    p(s,fBtn('Start Monitoring',337,PRI),28,H-136);
    p(s,ctx('Setup complete · Welcome to Diaboo!','Regular',11,T4,337),28,H-68);
  }

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('Light: Auth & Setup A-06–A-14 built!');
})();
