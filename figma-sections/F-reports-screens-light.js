(async () => {
  // LIGHT THEME — F-01 to F-04: Reports screens
  const W=393,H=844,GAP=40,ROW_Y=20*924; // y=18480

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

  function statsGrid(s,stats,y){
    const grid=rc(337,stats.length>2?110:66,SURF,1,16);p(s,grid,28,y);
    grid.strokes=solid(BRD);grid.strokeWeight=1;
    stats.forEach(([label,val,color],i)=>{
      const col=i%2,row=Math.floor(i/2);
      const sx=44+col*168,sy=y+12+row*52;
      p(s,tx(label,'Regular',11,T3),sx,sy);
      p(s,tx(val,'Bold',18,color||T1),sx,sy+16);
    });
  }

  function tirDonut(s,tir,low,high,x,y,size=110){
    const bg=rc(size,size,SURF2,1,size/2);p(s,bg,x,y);
    bg.strokes=solid(BRD);bg.strokeWeight=1;
    const inner=rc(size-24,size-24,SURF,1,(size-24)/2);p(s,inner,x+12,y+12);
    const tirLbl=tx(tir+'%','ExtraBold',22,SUC);tirLbl.textAlignHorizontal='CENTER';tirLbl.textAutoResize='NONE';tirLbl.resize(size-24,28);
    p(s,tirLbl,x+12,y+(size-24)/2-14);
    const tirSub=tx('in range','Regular',9,T3);tirSub.textAlignHorizontal='CENTER';tirSub.textAutoResize='NONE';tirSub.resize(size-24,12);
    p(s,tirSub,x+12,y+(size-24)/2+16);
  }

  function barChart(s,data,x,y,w=337,h=80){
    const bg=rc(w,h,SURF2,1,14);p(s,bg,x,y);
    bg.strokes=solid(BRD);bg.strokeWeight=1;
    const bw=Math.floor((w-16)/(data.length*1.5));
    const maxV=Math.max(...data.map(d=>d.v))+20;
    data.forEach((d,i)=>{
      const bx=x+8+i*Math.floor((w-16)/data.length);
      const bh=Math.round((d.v/maxV)*(h-20));
      const color=d.v<70?DAN:d.v>180?WARN:SUC;
      const bar=rc(bw,bh,color,0.8,3);p(s,bar,bx,y+h-bh-12);
      const lbl=tx(d.label,'Regular',8,T4);p(s,lbl,bx,y+h-10);
    });
  }

  function reportHeader(s,title,activePeriod){
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    p(s,rc(W,56,SURF),0,44);p(s,rc(W,1,BRD),0,99);
    p(s,tx(title,'Bold',20,T1),28,60);
    p(s,rc(337,40,SURF2,1,12),28,108);
    const periods=['7d','30d','90d','Custom'];
    const pw=337/4;
    periods.forEach((per,i)=>{
      const isA=per===activePeriod;
      if(isA){const hl=rc(pw-4,32,PRI,1,10);p(s,hl,30+i*pw,112);}
      const lbl=tx(per,isA?'SemiBold':'Regular',13,isA?SURF:T3);
      lbl.textAlignHorizontal='CENTER';lbl.textAutoResize='NONE';lbl.resize(pw-4,32);
      p(s,lbl,30+i*pw,120);
    });
  }

  const weekDays=[
    {v:112,label:'M'},{v:98,label:'Tu'},{v:145,label:'W'},
    {v:125,label:'Th'},{v:108,label:'F'},{v:190,label:'Sa'},{v:118,label:'Su'},
  ];

  // ─── F-01: 7-day Report
  {
    const s=scr('F-01 — Report 7d',0);
    reportHeader(s,'Reports','7d');
    p(s,tx('May 17 – 23, 2026','Medium',12,T3),28,162);
    statsGrid(s,[['Average BG','118 mg/dL',PRI],['Time in Range','87%',SUC],['Std Deviation','24',T3],['A1c Estimate','6.8%',SUC]],182);
    tirDonut(s,87,3,10,28,308);
    p(s,tx('Time in Range breakdown','Medium',12,T3),156,308);
    const legend=[['In Range (70-180)','87%',SUC],['High (>180)','10%',WARN],['Low (<70)','3%',DAN]];
    legend.forEach(([label,pct,color],i)=>{
      const dot=rc(8,8,color,1,4);p(s,dot,156,332+i*22);
      p(s,tx(label,'Regular',11,T3),170,330+i*22);
      p(s,tx(pct,'SemiBold',11,color),322,330+i*22);
    });
    p(s,tx('Daily average glucose','Medium',12,T3),28,440);
    barChart(s,weekDays,28,460);
    const trend=rc(337,56,SURF,1,16);p(s,trend,28,556);
    trend.strokes=solid(BRD);trend.strokeWeight=1;
    p(s,tx('+2.1 mg/dL improvement vs previous 7 days','SemiBold',13,SUC),44,568);
    p(s,tx('Trend: Steady improvement. Keep it up!','Regular',11,T3),44,586);
    p(s,tx('Insulin summary','Medium',12,T3),28,628);
    statsGrid(s,[['Total bolus','32u',INS],['Total basal','182u',INS],['Avg bolus/day','4.6u',T1],['Avg daily total','26u',T1]],648);
    p(s,fBtn('Export PDF',161,SURF2,T2),28,770);
    p(s,fBtn('Share with Doctor',161,PRI),200,770);
    tabs(s,4);
  }

  // ─── F-02: 30-day Report
  {
    const s=scr('F-02 — Report 30d',1);
    reportHeader(s,'Reports','30d');
    p(s,tx('Apr 24 – May 23, 2026','Medium',12,T3),28,162);
    statsGrid(s,[['Average BG','122 mg/dL',PRI],['Time in Range','83%',SUC],['A1c Estimate','7.1%',WARN],['Sensor Wear','94%',T3]],182);
    tirDonut(s,83,5,12,28,308);
    const legend=[['In Range (70-180)','83%',SUC],['High (>180)','12%',WARN],['Low (<70)','5%',DAN]];
    legend.forEach(([label,pct,color],i)=>{
      const dot=rc(8,8,color,1,4);p(s,dot,156,332+i*22);
      p(s,tx(label,'Regular',11,T3),170,330+i*22);
      p(s,tx(pct,'SemiBold',11,color),322,330+i*22);
    });
    p(s,tx('30-day glucose trend','Medium',12,T3),28,440);
    const bg=rc(337,90,SURF2,1,14);p(s,bg,28,460);
    bg.strokes=solid(BRD);bg.strokeWeight=1;
    for(let i=0;i<30;i++){
      const v=100+Math.round(Math.sin(i/4)*30)+20;
      const color=v<70?DAN:v>180?WARN:SUC;
      const dot=rc(3,3,color,0.8,2);p(s,dot,34+i*10,460+80-Math.round((v-60)/200*70));
    }
    p(s,tx('Apr 24','Regular',9,T4),32,548);p(s,tx('May 23','Regular',9,T4),322,548);
    p(s,tx('Patterns detected','Medium',12,T3),28,566);
    const patterns=[
      ['Morning highs after breakfast','Weekdays 8-10 AM',WARN],
      ['Good overnight control','Midnight - 7 AM',SUC],
      ['Post-lunch spikes on weekends','Saturdays',WARN],
    ];
    patterns.forEach(([pat,when,color],i)=>{
      const card=rc(337,48,SURF,1,12);p(s,card,28,588+i*56);
      card.strokes=solid(BRD);card.strokeWeight=1;
      const dot=rc(6,6,color,1,3);p(s,dot,44,612+i*56);
      p(s,tx(pat,'Medium',12,T1),56,606+i*56);
      p(s,tx(when,'Regular',11,T3),56,622+i*56);
    });
    p(s,fBtn('Export PDF',161,SURF2,T2),28,770);
    p(s,fBtn('Share with Doctor',161,PRI),200,770);
    tabs(s,4);
  }

  // ─── F-03: 90-day Report
  {
    const s=scr('F-03 — Report 90d',2);
    reportHeader(s,'Reports','90d');
    p(s,tx('Feb 23 – May 23, 2026','Medium',12,T3),28,162);
    statsGrid(s,[['Average BG','126 mg/dL',PRI],['Time in Range','79%',WARN],['A1c Estimate','7.4%',WARN],['Sensor Wear','89%',T3]],182);
    tirDonut(s,79,6,15,28,308);
    const legend=[['In Range (70-180)','79%',WARN],['High (>180)','15%',WARN],['Low (<70)','6%',DAN]];
    legend.forEach(([label,pct,color],i)=>{
      const dot=rc(8,8,color,1,4);p(s,dot,156,332+i*22);
      p(s,tx(label,'Regular',11,T3),170,330+i*22);
      p(s,tx(pct,'SemiBold',11,color),322,330+i*22);
    });
    p(s,tx('A1c estimate trend','Medium',12,T3),28,440);
    const a1cBg=rc(337,70,SURF2,1,14);p(s,a1cBg,28,460);
    a1cBg.strokes=solid(BRD);a1cBg.strokeWeight=1;
    const a1cVals=[7.8,7.6,7.4];
    a1cVals.forEach((v,i)=>{
      const bx=60+i*100;
      const bh=Math.round((v/9)*50);
      const color=v>7.5?DAN:v>7?WARN:SUC;
      const bar=rc(40,bh,color,0.8,4);p(s,bar,28+bx,460+60-bh);
      p(s,tx(v.toFixed(1)+'%','SemiBold',11,color),28+bx+8,460+60-bh-16);
      const months=['Feb','Mar','May'];
      p(s,tx(months[i],'Regular',9,T4),28+bx+12,522);
    });
    p(s,tx('Progress toward goals','Medium',12,T3),28,546);
    const goals=[['A1c target <7.0%',74,WARN],['TIR target >80%',79,WARN],['Hypo events <1/wk',88,SUC]];
    goals.forEach(([goal,pct,color],i)=>{
      p(s,tx(goal,'Medium',12,T1),28,570+i*52);
      const bgBar=rc(337,8,SURF2,1,4);p(s,bgBar,28,590+i*52);
      bgBar.strokes=solid(BRD);bgBar.strokeWeight=1;
      const fill=rc(Math.round(337*pct/100),8,color,1,4);p(s,fill,28,590+i*52);
      p(s,tx(pct+'%','SemiBold',11,color),320,582+i*52);
    });
    p(s,fBtn('Export PDF',161,SURF2,T2),28,770);
    p(s,fBtn('Share with Doctor',161,PRI),200,770);
    tabs(s,4);
  }

  // ─── F-04: Doctor Logbook Export
  {
    const s=scr('F-04 — Doctor Logbook',3);
    p(s,rc(W,44,BG),0,0);p(s,tx('9:41','SemiBold',15,T1),20,14);
    p(s,rc(W,56,SURF),0,44);p(s,rc(W,1,BRD),0,99);
    p(s,tx('Doctor Logbook','Bold',20,T1),28,60);
    p(s,rc(337,40,SURF2,1,12),28,108);
    const periods=['7d','14d','30d','90d'];
    const pw=337/4;
    periods.forEach((per,i)=>{
      const isA=per==='14d';
      if(isA){const hl=rc(pw-4,32,PRI,1,10);p(s,hl,30+i*pw,112);}
      const lbl=tx(per,isA?'SemiBold':'Regular',13,isA?SURF:T3);
      lbl.textAlignHorizontal='CENTER';lbl.textAutoResize='NONE';lbl.resize(pw-4,32);
      p(s,lbl,30+i*pw,120);
    });
    const docCard=rc(337,70,SURF,1,16);p(s,docCard,28,162);
    docCard.strokes=solid(BRD);docCard.strokeWeight=1;
    const docAv=rc(44,44,SURF3,1,22);p(s,docAv,44,173);
    docAv.strokes=solid('#BFDBFE');docAv.strokeWeight=1;
    p(s,tx('Dr','Bold',14,PRI),55,185);
    p(s,tx('Dr. Sarah Al-Rashid','SemiBold',14,T1),98,173);
    p(s,tx('Endocrinologist · Diabetology Clinic','Regular',11,T3),98,193);
    p(s,tx('Last shared: May 10','Regular',10,T4),98,211);
    statsGrid(s,[['Avg BG','119 mg/dL',PRI],['TIR','86%',SUC],['Hypos','3 events',DAN],['Total Entries','184',T3]],248);
    p(s,tx('Glucose log preview','Medium',12,T3),28,374);
    const tableHdr=rc(337,32,SURF2,1,8);p(s,tableHdr,28,394);
    const cols=['Date','Time','BG','Type','Dose'];
    const colW=[72,60,60,80,60];
    let cx=44;
    cols.forEach((col,i)=>{p(s,tx(col,'SemiBold',11,T3),cx,402);cx+=colW[i];});
    const rows=[
      ['May 23','1:35 PM','118','Bolus','4u'],
      ['May 23','8:00 AM','142','Bolus','2u'],
      ['May 22','7:15 PM','198','Bolus','5u'],
      ['May 22','10:00 PM','--','Basal','26u'],
    ];
    rows.forEach((row,ri)=>{
      const rowBg=rc(337,36,ri%2===0?SURF:SURF2,1,0);p(s,rowBg,28,426+ri*36);
      let rcx=44;
      row.forEach((cell,ci)=>{
        const color=ci===2?parseInt(cell)>180?WARN:parseInt(cell)<70?DAN:T1:T2;
        p(s,tx(cell,'Regular',11,cell==='--'?T4:color),rcx,434+ri*36);rcx+=colW[ci];
      });
    });
    p(s,tx('... 176 more entries','Regular',11,T4),28,580);
    p(s,rc(337,1,BRD),28,598);
    p(s,tx('Send to doctor','SemiBold',14,T1),28,614);
    p(s,fBtn('Export as PDF',337,SURF2,T2),28,642);
    p(s,fBtn('Send via App',337,PRI),28,706);
    p(s,tx('Your doctor will receive a formatted PDF report\nwith all glucose data, meals, and insulin logs.','Regular',11,T3),28,772);
    tabs(s,4);
  }

  const newScreens=figma.currentPage.children.filter(n=>n.y===ROW_Y);
  if(newScreens.length>0)figma.viewport.scrollAndZoomIntoView(newScreens);
  figma.notify('✓ Reports light screens F-01 to F-04 built!');
})();
