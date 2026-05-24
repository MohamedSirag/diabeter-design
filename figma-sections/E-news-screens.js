(async () => {
  const W=393,H=844,GAP=40,ROW_Y=5*924; // y=4620

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
  function tabs(s,active=3){
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

  // Article card
  function articleCard(s,tag,tagColor,title,source,time,x,y,featured=false){
    const card=figma.createFrame();
    card.resize(337,featured?160:100);card.fills=solid('#0F172A');card.cornerRadius=16;
    p(s,card,x,y);
    if(featured){
      // Image area
      const img=rc(337,90,tagColor,0.12,16);card.appendChild(img);img.x=0;img.y=0;
      // Tag chip
      const tagBg=figma.createFrame();tagBg.resize(tag.length*7+16,24);tagBg.cornerRadius=12;
      tagBg.fills=solid(tagColor);tagBg.layoutMode='HORIZONTAL';tagBg.primaryAxisSizingMode='FIXED';
      tagBg.counterAxisSizingMode='FIXED';tagBg.primaryAxisAlignItems='CENTER';tagBg.counterAxisAlignItems='CENTER';
      tagBg.appendChild(tx(tag,'SemiBold',10,'#FFFFFF'));
      card.appendChild(tagBg);tagBg.x=12;tagBg.y=62;
      const tt=tx(title,'SemiBold',14,'#FFFFFF');tt.textAutoResize='HEIGHT';tt.resize(297,1);
      card.appendChild(tt);tt.x=12;tt.y=96;
      const meta=tx(source+' · '+time,'Regular',11,'#64748B');
      card.appendChild(meta);meta.x=12;meta.y=140;
    } else {
      // Compact
      const tagBg=figma.createFrame();tagBg.resize(tag.length*7+16,22);tagBg.cornerRadius=11;
      tagBg.fills=solid(tagColor,0.15);tagBg.layoutMode='HORIZONTAL';tagBg.primaryAxisSizingMode='FIXED';
      tagBg.counterAxisSizingMode='FIXED';tagBg.primaryAxisAlignItems='CENTER';tagBg.counterAxisAlignItems='CENTER';
      tagBg.appendChild(tx(tag,'Medium',10,tagColor));
      card.appendChild(tagBg);tagBg.x=12;tagBg.y=12;
      const tt=tx(title,'SemiBold',13,'#FFFFFF');tt.textAutoResize='HEIGHT';tt.resize(250,1);
      card.appendChild(tt);tt.x=12;tt.y=42;
      const meta=tx(source+' · '+time,'Regular',10,'#64748B');
      card.appendChild(meta);meta.x=12;meta.y=80;
      // Thumbnail placeholder
      const thumb=rc(52,72,tagColor,0.2,10);card.appendChild(thumb);thumb.x=273;thumb.y=14;
    }
    return card;
  }

  // ─── E-01: News Feed ──────────────────────────────────────────────
  {
    const s=scr('E-01 — News Feed',0);
    p(s,rc(W,44,'#0A0E17'),0,0);p(s,tx('9:41','SemiBold',15,'#FFFFFF'),20,14);
    p(s,rc(W,56,'#0F172A'),0,44);
    p(s,tx('News','Bold',20,'#FFFFFF'),28,60);
    // Search bar
    const searchBg=rc(337,40,'#1E293B',1,12);p(s,searchBg,28,108);
    p(s,tx('Search diabetes news...','Regular',13,'#475569'),52,120);
    // Category chips
    const cats=['All','Research','Nutrition','Tech','Community','Events'];
    let cx=28;
    cats.forEach((cat,i)=>{
      const c=figma.createFrame();c.resize(cat.length*7+20,32);c.cornerRadius=16;
      c.fills=solid(i===0?'#3B82F6':'#1E293B');
      c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';
      c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';
      c.appendChild(tx(cat,i===0?'SemiBold':'Regular',12,i===0?'#FFFFFF':'#94A3B8'));
      p(s,c,cx,162);cx+=cat.length*7+28;
    });
    // Featured article
    articleCard(s,'Research','#3B82F6','New CGM Algorithm Reduces False Hypo Alerts by 40% in Clinical Trial','Diabetes Care','2h ago',28,210,true);
    // Article list
    articleCard(s,'Nutrition','#22C55E','Mediterranean Diet Improves HbA1c in Type 2 Diabetes Study','DiabetesMine','4h ago',28,386);
    articleCard(s,'Tech','#8B5CF6','Dexcom G8 Preview: Smaller Sensor, 21-Day Wear','TechCrunch Health','6h ago',28,498);
    articleCard(s,'Community','#F59E0B','Living with Type 1: Marathon Running Success Stories','Beyond T1','8h ago',28,610);
    articleCard(s,'Research','#3B82F6','Islet Cell Transplant Shows 5-Year Insulin Independence','NEJM','1d ago',28,722);
    tabs(s,3);
  }

  // ─── E-02: Article Detail ─────────────────────────────────────────
  {
    const s=scr('E-02 — Article Detail',1);
    p(s,rc(W,44,'#0A0E17'),0,0);p(s,tx('9:41','SemiBold',15,'#FFFFFF'),20,14);
    p(s,rc(W,56,'#0F172A'),0,44);
    const backBtn=rc(34,34,'#1E293B',1,10);p(s,backBtn,20,55);
    p(s,tx('<','SemiBold',16,'#FFFFFF'),27,60);
    const shareBtn=rc(34,34,'#1E293B',1,10);p(s,shareBtn,339,55);
    p(s,tx('^','SemiBold',14,'#FFFFFF'),346,62);
    // Hero image area
    const hero=rc(W,200,'#1D3461',1,0);p(s,hero,0,100);
    const heroOverlay=rc(W,200,'#0A0E17',0.4);p(s,heroOverlay,0,100);
    const tagBg=figma.createFrame();tagBg.resize(88,26);tagBg.cornerRadius=13;tagBg.fills=solid('#3B82F6');
    tagBg.layoutMode='HORIZONTAL';tagBg.primaryAxisSizingMode='FIXED';tagBg.counterAxisSizingMode='FIXED';
    tagBg.primaryAxisAlignItems='CENTER';tagBg.counterAxisAlignItems='CENTER';
    tagBg.appendChild(tx('Research','SemiBold',11,'#FFFFFF'));
    p(s,tagBg,28,258);
    // Article title
    const title=tx('New CGM Algorithm Reduces False Hypo Alerts by 40% in Clinical Trial','Bold',18,'#FFFFFF');
    title.textAutoResize='HEIGHT';title.resize(337,1);
    p(s,title,28,298);
    // Meta
    p(s,tx('Diabetes Care · 2 hours ago · 5 min read','Regular',12,'#64748B'),28,360);
    p(s,rc(337,1,'#1E293B'),28,384);
    // Body text
    const para1=tx('Researchers at Stanford University have developed a novel algorithm for continuous glucose monitors that significantly reduces false hypoglycemia alerts while maintaining safety.','Regular',14,'#CBD5E1');
    para1.textAutoResize='HEIGHT';para1.resize(337,1);p(s,para1,28,396);
    const para2=tx('The study, published in Diabetes Care, followed 234 patients with Type 1 diabetes over 6 months. False low alerts dropped by 40% without missing any actual hypoglycemic events.','Regular',14,'#CBD5E1');
    para2.textAutoResize='HEIGHT';para2.resize(337,1);p(s,para2,28,488);
    // Key finding callout
    const callout=rc(337,56,'#1D3461',1,14);p(s,callout,28,572);
    p(s,tx('Key finding: 40% reduction in false alerts\nwith 0% increase in missed hypo events.','SemiBold',13,'#3B82F6'),44,580);
    const para3=tx('"This could meaningfully reduce alarm fatigue in CGM users," said lead researcher Dr. Sarah Chen.','Regular',14,'#CBD5E1');
    para3.textAutoResize='HEIGHT';para3.resize(337,1);p(s,para3,28,642);
    // Related articles section
    p(s,tx('Related','SemiBold',13,'#94A3B8'),28,708);
    const rel=rc(337,72,'#0F172A',1,14);p(s,rel,28,730);
    p(s,tx('CGM Alarm Fatigue: Practical Solutions','Medium',13,'#FFFFFF'),44,742);
    p(s,tx('DiabetesMine · 3 days ago','Regular',11,'#64748B'),44,762);
    tabs(s,3);
  }

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('News screens E-01 to E-02 built!');
})();
