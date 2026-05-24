(async () => {
  // LIGHT THEME — D-01 to D-04: Camera / AI screens
  const W=393,H=844,GAP=40,ROW_Y=18*924; // y=16632

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
  const BRD='#E2E8F0',INS='#7C3AED';

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
  function tabs(s,active=2){
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

  // ─── D-01: Camera Viewfinder ── stays dark (it's a real camera UI)
  {
    const s=scr('D-01 — Camera Viewfinder','0','#000000');
    p(s,rc(W,H,'#080C14'),0,0);
    p(s,rc(180,120,'#1A1A2E',0.6,16),50,200);
    p(s,rc(120,90,'#1A2E1A',0.5,12),200,240);
    p(s,tx('9:41','SemiBold',15,'#FFFFFF'),20,14);
    p(s,tx('|||','Regular',12,'#FFFFFF'),348,16);
    const topBar=rc(W,64,'#000000',0.5);p(s,topBar,0,0);
    const closeBtn=rc(36,36,'#FFFFFF',0.15,18);p(s,closeBtn,20,14);
    p(s,tx('x','Bold',16,'#FFFFFF'),28,21);
    p(s,tx('AI Carb Counter','SemiBold',16,'#FFFFFF'),W/2-70,22);
    const flashBtn=rc(36,36,'#FFFFFF',0.15,18);p(s,flashBtn,337,14);
    p(s,tx('*','Bold',16,'#FFFFFF'),345,21);
    const frameOuter=figma.createFrame();frameOuter.resize(280,280);frameOuter.cornerRadius=20;
    frameOuter.fills=[];frameOuter.strokes=solid(PRI,0.9);frameOuter.strokeWeight=2;
    p(s,frameOuter,W/2-140,160);
    const scanLine=rc(276,2,PRI,0.7);p(s,scanLine,W/2-138,280);
    const instrBg=rc(280,48,'#000000',0.7,12);p(s,instrBg,W/2-140,456);
    p(s,tx('Point at your food to analyse carbs','Regular',13,'#FFFFFF'),W/2-118,472);
    const ctrlBg=rc(W,120,'#000000',0.6);p(s,ctrlBg,0,H-200);
    const galleryBtn=rc(52,52,'#FFFFFF',0.15,14);p(s,galleryBtn,56,H-176);
    p(s,tx('[]','Bold',18,'#FFFFFF'),63,H-165);
    const shutterOuter=figma.createFrame();shutterOuter.resize(80,80);shutterOuter.cornerRadius=40;
    shutterOuter.fills=[];shutterOuter.strokes=solid('#FFFFFF',0.8);shutterOuter.strokeWeight=3;
    p(s,shutterOuter,W/2-40,H-200);
    const shutterInner=rc(64,64,'#FFFFFF',1,32);p(s,shutterInner,W/2-32,H-192);
    const switchBtn=rc(52,52,'#FFFFFF',0.15,14);p(s,switchBtn,285,H-176);
    p(s,tx('<>','Bold',16,'#FFFFFF'),293,H-165);
    const glucoseBg=rc(120,36,'#FFFFFF',0.9,18);p(s,glucoseBg,W/2-60,548);
    p(s,tx('118 mg/dL  →','SemiBold',12,SUC),W/2-46,560);
    // Light tab bar
    const bar=figma.createFrame();bar.resize(W,80);bar.fills=solid(SURF,0.95);
    const div=rc(W,1,BRD);bar.appendChild(div);div.x=0;div.y=0;
    p(s,bar,0,H-80);
    const names=['Live','Logbook','Camera','News','Profile'];const tw=W/5;
    names.forEach((n,i)=>{
      const isA=i===2;
      const lbl=tx(n,isA?'SemiBold':'Regular',11,isA?PRI:T3);
      bar.appendChild(lbl);lbl.x=Math.round(i*tw+tw/2-n.length*3.3);lbl.y=52;
      if(isA){const dot=rc(4,4,PRI,1,2);bar.appendChild(dot);dot.x=Math.round(i*tw+tw/2-2);dot.y=8;}
    });
  }

  // ─── D-02: AI Analyzing
  {
    const s=scr('D-02 — AI Analyzing',1,'#000000');
    p(s,rc(W,H,'#080C14'),0,0);
    p(s,tx('9:41','SemiBold',15,'#FFFFFF'),20,14);
    p(s,rc(280,280,'#1A2030',0.8,20),W/2-140,140);
    p(s,rc(200,16,PRI,0.3),W/2-100,276);
    const scanOverlay=rc(W,H,'#0A0E17',0.7);p(s,scanOverlay,0,0);
    // Analysis card — light
    const card=figma.createFrame();card.resize(337,300);card.fills=solid(SURF);card.cornerRadius=20;
    card.strokes=solid(BRD);card.strokeWeight=1;
    p(s,card,28,272);
    const aiCircle=rc(52,52,PRI,0.1,26);card.appendChild(aiCircle);aiCircle.x=143;aiCircle.y=20;
    const aiLbl=tx('AI','Bold',18,PRI);card.appendChild(aiLbl);aiLbl.x=163;aiLbl.y=31;
    const title=tx('Analysing your meal...','SemiBold',17,T1);card.appendChild(title);title.x=63;title.y=86;
    const sub=tx('Powered by Gemini Vision AI','Regular',12,T3);card.appendChild(sub);sub.x=90;sub.y=110;
    const steps=[
      ['Identifying food items',SUC,true],
      ['Estimating portions',PRI,true],
      ['Calculating carbohydrates',PRI,false],
      ['Generating insights',T4,false],
    ];
    steps.forEach(([step,color,done],i)=>{
      const dot=rc(8,8,color,done?1:0.3,4);card.appendChild(dot);dot.x=20;dot.y=148+i*32;
      const lbl=tx(step,'Medium',13,done?color:T4);card.appendChild(lbl);lbl.x=38;lbl.y=144+i*32;
      if(done&&i<2){const chk=tx('✓','Bold',11,SUC);card.appendChild(chk);chk.x=300;chk.y=144+i*32;}
    });
    const progBg=rc(297,4,SURF2,1,2);card.appendChild(progBg);progBg.x=20;progBg.y=276;
    const progFill=rc(180,4,PRI,1,2);card.appendChild(progFill);progFill.x=20;progFill.y=276;
    const glucoseBg=rc(130,36,SURF,0.95,18);p(s,glucoseBg,W/2-65,580);
    glucoseBg.strokes=solid(BRD);glucoseBg.strokeWeight=1;
    p(s,tx('118 mg/dL  →','SemiBold',12,SUC),W/2-46,592);
    tabs(s,2);
  }

  // ─── D-03: AI Result
  {
    const s=scr('D-03 — AI Result',2);
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    p(s,rc(W,56,SURF),0,44);p(s,rc(W,1,BRD),0,99);
    const backBtn=rc(34,34,SURF2,1,10);p(s,backBtn,20,55);
    backBtn.strokes=solid(BRD);backBtn.strokeWeight=1;
    p(s,tx('<','SemiBold',16,T1),27,60);
    p(s,tx('AI Meal Analysis','Bold',18,T1),66,60);
    p(s,rc(W,90,SURF2),0,100);p(s,rc(W,1,BRD),0,189);
    p(s,tx('Pasta bolognese','Bold',16,T1),28,112);
    p(s,tx('Analysed just now · Confidence: 94%','Regular',12,T3),28,134);
    // Carb card — light blue
    const carbCard=rc(337,90,SURF3,1,20);p(s,carbCard,28,206);
    carbCard.strokes=solid('#BFDBFE');carbCard.strokeWeight=1;
    p(s,tx('Total Carbohydrates','Medium',13,T3),44,218);
    p(s,tx('65','ExtraBold',52,PRI),44,234);
    p(s,tx('g','SemiBold',22,PRI),102,255);
    p(s,tx('Net carbs after fibre','Regular',11,T3),44,282);
    p(s,tx('58g net','SemiBold',13,PRI),252,282);
    // Macro breakdown
    const macro=rc(337,80,SURF,1,20);p(s,macro,28,310);
    macro.strokes=solid(BRD);macro.strokeWeight=1;
    const macros=[['Protein','28g',SUC],['Fat','18g',WARN],['Fibre','7g',T3],['Sugar','12g',DAN]];
    macros.forEach(([label,val,color],i)=>{
      const mx=44+i*82;
      p(s,tx(label,'Regular',10,T3),mx,320);
      p(s,tx(val,'Bold',15,color),mx,338);
    });
    p(s,tx('Identified items','SemiBold',13,T1),28,406);
    const items=[
      ['Penne pasta','200g','45g carbs'],
      ['Bolognese sauce','150g','14g carbs'],
      ['Parmesan','20g','1g carbs'],
      ['Bread slice','35g','17g carbs'],
    ];
    items.forEach(([name,portion,carb],i)=>{
      const row=rc(337,52,SURF,1,12);p(s,row,28,428+i*60);
      row.strokes=solid(BRD);row.strokeWeight=1;
      p(s,tx(name,'Medium',13,T1),44,436+i*60);
      p(s,tx(portion,'Regular',11,T3),44,454+i*60);
      p(s,tx(carb,'SemiBold',13,PRI),270,444+i*60);
    });
    const insSug=rc(337,56,SURF3,1,14);p(s,insSug,28,672);
    insSug.strokes=solid('#BFDBFE');insSug.strokeWeight=1;
    p(s,tx('Suggested bolus: 4u NovoRapid','SemiBold',14,PRI),44,684);
    p(s,tx('Based on 65g carbs · ICR 1:16 · BG 142','Regular',11,T3),44,704);
    p(s,fBtn('Log This Meal',337,PRI),28,742);
    tabs(s,2);
  }

  // ─── D-04: AI Chat
  {
    const s=scr('D-04 — AI Chat',3);
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    p(s,rc(W,56,SURF),0,44);p(s,rc(W,1,BRD),0,99);
    const backBtn=rc(34,34,SURF2,1,10);p(s,backBtn,20,55);
    backBtn.strokes=solid(BRD);backBtn.strokeWeight=1;
    p(s,tx('<','SemiBold',16,T1),27,60);
    p(s,tx('Ask Diaboo AI','Bold',18,T1),66,60);
    const aiBadge=rc(54,24,SURF3,1,12);p(s,aiBadge,304,64);
    aiBadge.strokes=solid('#BFDBFE');aiBadge.strokeWeight=1;
    p(s,tx('Gemini','Medium',10,PRI),311,70);
    // User messages (primary color bubbles)
    const um1=rc(220,48,PRI,1,14);p(s,um1,145,116);
    p(s,tx('How much insulin for 65g carbs?','Regular',12,SURF),158,128);
    p(s,tx('9:39 AM','Regular',10,SURF,0.6),290,140);
    // AI response (light surface)
    const ai1=rc(300,96,SURF,1,14);p(s,ai1,28,178);
    ai1.strokes=solid(BRD);ai1.strokeWeight=1;
    p(s,tx('Based on your ICR of 1:16 and current BG\nof 142 mg/dL, I suggest 4u NovoRapid.\nThis accounts for both meal and a small\ncorrection component.','Regular',12,T2),44,188);
    p(s,tx('9:39 AM','Regular',10,T4),300,266);
    const um2=rc(195,48,PRI,1,14);p(s,um2,170,292);
    p(s,tx('What if I exercise after eating?','Regular',12,SURF),184,304);
    p(s,tx('9:40 AM','Regular',10,SURF,0.6),296,316);
    const ai2=rc(300,112,SURF,1,14);p(s,ai2,28,354);
    ai2.strokes=solid(BRD);ai2.strokeWeight=1;
    p(s,tx('If you plan moderate exercise within 2 hours\nafter eating, consider reducing the bolus\nby 20-30%. So 3u instead of 4u. Keep\nfast carbs handy in case of hypoglycemia.\nAlways check with your diabetes team.','Regular',12,T2),44,364);
    p(s,tx('9:40 AM','Regular',10,T4),300,458);
    const um3=rc(178,32,PRI,1,14);p(s,um3,187,484);
    p(s,tx('OK, thank you!','Regular',12,SURF),200,492);
    const ai3=rc(260,48,SURF,1,14);p(s,ai3,28,530);
    ai3.strokes=solid(BRD);ai3.strokeWeight=1;
    p(s,tx('Happy to help! Stay safe and enjoy\nyour meal. Remember to log it!','Regular',12,T2),44,538);
    p(s,tx('Suggested questions','Medium',11,T3),28,592);
    const sugs=['What are my targets?','Log this meal','Set a reminder'];
    let sx=28;
    sugs.forEach(q=>{
      const c=figma.createFrame();c.resize(q.length*7+20,30);c.cornerRadius=15;
      c.fills=solid(SURF2);c.strokes=solid(BRD);c.strokeWeight=1;
      c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';
      c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';
      c.appendChild(tx(q,'Regular',11,T2));
      p(s,c,sx,612);sx+=q.length*7+28;
    });
    const inputBar=rc(W,64,SURF);p(s,inputBar,0,H-144);
    inputBar.strokes=solid(BRD);inputBar.strokeWeight=1;
    const inputBg=rc(289,44,SURF2,1,14);p(s,inputBg,28,H-140);
    inputBg.strokes=solid(BRD);inputBg.strokeWeight=1;
    p(s,tx('Ask anything about your diabetes...','Regular',13,T4),44,H-128);
    const sendBtn=rc(44,44,PRI,1,12);p(s,sendBtn,333,H-140);
    p(s,tx('>','Bold',16,SURF),342,H-128);
    tabs(s,2);
  }

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('✓ Camera light screens D-01 to D-04 built!');
})();
