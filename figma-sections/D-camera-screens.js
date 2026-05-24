(async () => {
  const W=393,H=844,GAP=40,ROW_Y=4*924; // y=3696

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
  function scr(name,col,fill='#000000'){
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
  function tabs(s,active=2){
    const bar=figma.createFrame();bar.resize(W,80);bar.fills=solid('#000000',0.8);
    const div=rc(W,1,'#1E293B');bar.appendChild(div);div.x=0;div.y=0;
    p(s,bar,0,H-80);
    const names=['Live','Logbook','Camera','News','Profile'];
    const tw=W/5;
    names.forEach((n,i)=>{
      const isA=i===active;
      const lbl=tx(n,isA?'SemiBold':'Regular',11,isA?'#3B82F6':'#FFFFFF');
      bar.appendChild(lbl);lbl.x=Math.round(i*tw+tw/2-n.length*3.3);lbl.y=52;
      if(isA){const dot=rc(4,4,'#3B82F6',1,2);bar.appendChild(dot);dot.x=Math.round(i*tw+tw/2-2);dot.y=8;}
    });
  }

  // ─── D-01: Camera Viewfinder ──────────────────────────────────────
  {
    const s=scr('D-01 — Camera Viewfinder',0,'#000000');
    // Camera feed (dark)
    p(s,rc(W,H,'#080C14'),0,0);
    // Subtle food shapes in background
    p(s,rc(180,120,'#1A1A2E',0.6,16),50,200);
    p(s,rc(120,90,'#1A2E1A',0.5,12),200,240);
    // Status bar (overlay)
    p(s,tx('9:41','SemiBold',15,'#FFFFFF'),20,14);
    p(s,tx('|||','Regular',12,'#FFFFFF'),348,16);
    // Top bar
    const topBar=rc(W,64,'#000000',0.5);p(s,topBar,0,0);
    const closeBtn=rc(36,36,'#FFFFFF',0.15,18);p(s,closeBtn,20,14);
    p(s,tx('x','Bold',16,'#FFFFFF'),28,21);
    p(s,tx('AI Carb Counter','SemiBold',16,'#FFFFFF'),W/2-70,22);
    const flashBtn=rc(36,36,'#FFFFFF',0.15,18);p(s,flashBtn,337,14);
    p(s,tx('*','Bold',16,'#FFFFFF'),345,21);
    // Scanning frame
    const frameOuter=figma.createFrame();frameOuter.resize(280,280);frameOuter.cornerRadius=20;
    frameOuter.fills=[];frameOuter.strokes=solid('#3B82F6',0.9);frameOuter.strokeWeight=2;
    p(s,frameOuter,W/2-140,160);
    // Corner accents
    const corners=[[0,0],[256,0],[0,256],[256,256]];
    corners.forEach(([cx,cy])=>{
      const ca=figma.createFrame();ca.resize(24,24);ca.fills=[];
      ca.strokes=solid('#3B82F6');ca.strokeWeight=3;
      frameOuter.appendChild(ca);ca.x=cx-2;ca.y=cy-2;
    });
    // Scan line
    const scanLine=rc(276,2,'#3B82F6',0.7);p(s,scanLine,W/2-138,280);
    // Instruction
    const instrBg=rc(280,48,'#000000',0.7,12);p(s,instrBg,W/2-140,456);
    p(s,tx('Point at your food to analyse carbs','Regular',13,'#FFFFFF'),W/2-118,472);
    // Bottom controls
    const ctrlBg=rc(W,120,'#000000',0.6);p(s,ctrlBg,0,H-200);
    // Gallery btn
    const galleryBtn=rc(52,52,'#FFFFFF',0.15,14);p(s,galleryBtn,56,H-176);
    p(s,tx('[]','Bold',18,'#FFFFFF'),63,H-165);
    // Shutter
    const shutterOuter=figma.createFrame();shutterOuter.resize(80,80);shutterOuter.cornerRadius=40;
    shutterOuter.fills=[];shutterOuter.strokes=solid('#FFFFFF',0.8);shutterOuter.strokeWeight=3;
    p(s,shutterOuter,W/2-40,H-200);
    const shutterInner=rc(64,64,'#FFFFFF',1,32);p(s,shutterInner,W/2-32,H-192);
    // Switch btn
    const switchBtn=rc(52,52,'#FFFFFF',0.15,14);p(s,switchBtn,285,H-176);
    p(s,tx('<>','Bold',16,'#FFFFFF'),293,H-165);
    // Glucose chip overlay
    const glucoseBg=rc(120,36,'#0F172A',0.9,18);p(s,glucoseBg,W/2-60,548);
    p(s,tx('118 mg/dL  ->','SemiBold',12,'#22C55E'),W/2-46,560);
    tabs(s,2);
  }

  // ─── D-02: AI Analyzing ───────────────────────────────────────────
  {
    const s=scr('D-02 — AI Analyzing',1,'#000000');
    p(s,rc(W,H,'#080C14'),0,0);
    p(s,tx('9:41','SemiBold',15,'#FFFFFF'),20,14);
    // Food image area (blurred/frozen)
    p(s,rc(280,280,'#1A2030',0.8,20),W/2-140,140);
    p(s,rc(200,16,'#3B82F6',0.3),W/2-100,276);
    // Scanning overlay
    const scanOverlay=rc(W,H,'#0A0E17',0.7);p(s,scanOverlay,0,0);
    // Analysis card
    const card=figma.createFrame();card.resize(337,300);card.fills=solid('#0F172A');card.cornerRadius=20;
    p(s,card,28,272);
    // AI logo
    const aiCircle=rc(52,52,'#3B82F6',0.15,26);card.appendChild(aiCircle);aiCircle.x=143;aiCircle.y=20;
    const aiLbl=tx('AI','Bold',18,'#3B82F6');card.appendChild(aiLbl);aiLbl.x=163;aiLbl.y=31;
    const title=tx('Analysing your meal...','SemiBold',17,'#FFFFFF');card.appendChild(title);title.x=63;title.y=86;
    const sub=tx('Powered by Gemini Vision AI','Regular',12,'#64748B');card.appendChild(sub);sub.x=90;sub.y=110;
    // Loading steps
    const steps=[
      ['Identifying food items','#22C55E',true],
      ['Estimating portions','#3B82F6',true],
      ['Calculating carbohydrates','#3B82F6',false],
      ['Generating insights','#475569',false],
    ];
    steps.forEach(([step,color,done],i)=>{
      const dot=rc(8,8,color,done?1:0.3,4);card.appendChild(dot);dot.x=20;dot.y=148+i*32;
      const lbl=tx(step,'Medium',13,done?color:'#475569');card.appendChild(lbl);lbl.x=38;lbl.y=144+i*32;
      if(done&&i<2){const chk=tx('v','Bold',11,'#22C55E');card.appendChild(chk);chk.x=300;chk.y=144+i*32;}
    });
    // Progress bar
    const progBg=rc(297,4,'#1E293B',1,2);card.appendChild(progBg);progBg.x=20;progBg.y=276;
    const progFill=rc(180,4,'#3B82F6',1,2);card.appendChild(progFill);progFill.x=20;progFill.y=276;
    // Glucose chip
    const glucoseBg=rc(120,36,'#0F172A',0.9,18);p(s,glucoseBg,W/2-60,580);
    p(s,tx('118 mg/dL  ->','SemiBold',12,'#22C55E'),W/2-46,592);
    tabs(s,2);
  }

  // ─── D-03: AI Result ──────────────────────────────────────────────
  {
    const s=scr('D-03 — AI Result',2,'#0A0E17');
    p(s,rc(W,44,'#0A0E17'),0,0);p(s,tx('9:41','SemiBold',15,'#FFFFFF'),20,14);
    // Top bar
    p(s,rc(W,56,'#0F172A'),0,44);
    const backBtn=rc(34,34,'#1E293B',1,10);p(s,backBtn,20,55);
    p(s,tx('<','SemiBold',16,'#FFFFFF'),27,60);
    p(s,tx('AI Meal Analysis','Bold',18,'#FFFFFF'),66,60);
    // Food thumbnail strip
    p(s,rc(W,90,'#1E293B'),0,100);
    p(s,tx('Pasta bolognese','Bold',16,'#FFFFFF'),28,112);
    p(s,tx('Analysed just now · Confidence: 94%','Regular',12,'#94A3B8'),28,134);
    // Main carb card
    const carbCard=rc(337,90,'#1D3461',1,20);p(s,carbCard,28,206);
    p(s,tx('Total Carbohydrates','Medium',13,'#94A3B8'),44,218);
    p(s,tx('65','ExtraBold',52,'#3B82F6'),44,234);
    p(s,tx('g','SemiBold',22,'#3B82F6'),102,255);
    p(s,tx('Net carbs after fibre','Regular',11,'#64748B'),44,282);
    p(s,tx('58g net','SemiBold',13,'#3B82F6'),252,282);
    // Macro breakdown
    const macro=rc(337,80,'#0F172A',1,20);p(s,macro,28,310);
    const macros=[['Protein','28g','#22C55E'],['Fat','18g','#F59E0B'],['Fibre','7g','#94A3B8'],['Sugar','12g','#EF4444']];
    macros.forEach(([label,val,color],i)=>{
      const mx=44+i*82;
      p(s,tx(label,'Regular',10,'#64748B'),mx,320);
      p(s,tx(val,'Bold',15,color),mx,338);
    });
    // Identified items
    p(s,tx('Identified items','SemiBold',13,'#FFFFFF'),28,406);
    const items=[
      ['Penne pasta','200g','45g carbs'],
      ['Bolognese sauce','150g','14g carbs'],
      ['Parmesan','20g','1g carbs'],
      ['Bread slice','35g','17g carbs'],
    ];
    items.forEach(([name,portion,carb],i)=>{
      const row=rc(337,52,'#0F172A',1,12);p(s,row,28,428+i*60);
      p(s,tx(name,'Medium',13,'#FFFFFF'),44,436+i*60);
      p(s,tx(portion,'Regular',11,'#94A3B8'),44,454+i*60);
      p(s,tx(carb,'SemiBold',13,'#3B82F6'),270,444+i*60);
    });
    // Insulin suggestion
    const insSug=rc(337,56,'#1D3461',1,14);p(s,insSug,28,672);
    p(s,tx('Suggested bolus: 4u NovoRapid','SemiBold',14,'#3B82F6'),44,684);
    p(s,tx('Based on 65g carbs · ICR 1:16 · BG 142','Regular',11,'#94A3B8'),44,704);
    p(s,fBtn('Log This Meal',337,'#3B82F6'),28,742);
    tabs(s,2);
  }

  // ─── D-04: AI Q&A Chat ────────────────────────────────────────────
  {
    const s=scr('D-04 — AI Chat',3,'#0A0E17');
    p(s,rc(W,44,'#0A0E17'),0,0);p(s,tx('9:41','SemiBold',15,'#FFFFFF'),20,14);
    p(s,rc(W,56,'#0F172A'),0,44);
    const backBtn=rc(34,34,'#1E293B',1,10);p(s,backBtn,20,55);
    p(s,tx('<','SemiBold',16,'#FFFFFF'),27,60);
    p(s,tx('Ask Diaboo AI','Bold',18,'#FFFFFF'),66,60);
    const aiBadge=rc(54,24,'#1D3461',1,12);p(s,aiBadge,304,64);
    p(s,tx('Gemini','Medium',10,'#3B82F6'),311,70);
    // Chat messages
    // User message 1
    const um1=rc(220,48,'#3B82F6',1,14);p(s,um1,145,116);
    p(s,tx('How much insulin for 65g carbs?','Regular',12,'#FFFFFF'),158,128);
    p(s,tx('9:39 AM','Regular',10,'#FFFFFF',0.6),290,140);
    // AI response
    const ai1=rc(300,96,'#0F172A',1,14);p(s,ai1,28,178);
    p(s,tx('Based on your ICR of 1:16 and current BG\nof 142 mg/dL, I suggest 4u NovoRapid.\nThis accounts for both meal and a small\ncorrection component.','Regular',12,'#CBD5E1'),44,188);
    p(s,tx('9:39 AM','Regular',10,'#475569'),300,266);
    // User message 2
    const um2=rc(195,48,'#3B82F6',1,14);p(s,um2,170,292);
    p(s,tx('What if I exercise after eating?','Regular',12,'#FFFFFF'),184,304);
    p(s,tx('9:40 AM','Regular',10,'#FFFFFF',0.6),296,316);
    // AI response 2
    const ai2=rc(300,112,'#0F172A',1,14);p(s,ai2,28,354);
    p(s,tx('If you plan moderate exercise within 2 hours\nafter eating, consider reducing the bolus\nby 20-30%. So 3u instead of 4u. Keep\nfast carbs handy in case of hypoglycemia.\nAlways check with your diabetes team.','Regular',12,'#CBD5E1'),44,364);
    p(s,tx('9:40 AM','Regular',10,'#475569'),300,458);
    // User message 3
    const um3=rc(178,32,'#3B82F6',1,14);p(s,um3,187,484);
    p(s,tx('OK, thank you!','Regular',12,'#FFFFFF'),200,492);
    // AI response 3
    const ai3=rc(260,48,'#0F172A',1,14);p(s,ai3,28,530);
    p(s,tx('Happy to help! Stay safe and enjoy\nyour meal. Remember to log it!','Regular',12,'#CBD5E1'),44,538);
    // Suggestions
    p(s,tx('Suggested questions','Medium',11,'#64748B'),28,592);
    const sugs=['What are my targets?','Log this meal','Set a reminder'];
    let sx=28;
    sugs.forEach(q=>{
      const c=figma.createFrame();c.resize(q.length*7+20,30);c.cornerRadius=15;
      c.fills=solid('#1E293B');c.strokes=solid('#334155');c.strokeWeight=1;
      c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';
      c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';
      c.appendChild(tx(q,'Regular',11,'#94A3B8'));
      p(s,c,sx,612);sx+=q.length*7+28;
    });
    // Input bar
    const inputBar=rc(W,64,'#0F172A');p(s,inputBar,0,H-144);
    const inputBg=rc(289,44,'#1E293B',1,14);p(s,inputBg,28,H-140);
    p(s,tx('Ask anything about your diabetes...','Regular',13,'#475569'),44,H-128);
    const sendBtn=rc(44,44,'#3B82F6',1,12);p(s,sendBtn,333,H-140);
    p(s,tx('>','Bold',16,'#FFFFFF'),342,H-128);
    tabs(s,2);
  }

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('Camera screens D-01 to D-04 built!');
})();
