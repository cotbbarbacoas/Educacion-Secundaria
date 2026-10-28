function drawFigure(id){
 const line=(x1,y1,x2,y2,extra='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${extra}/>`;
 const text=(x,y,t)=>`<text x="${x}" y="${y}" fill="#17253b" stroke="none" font-size="18" text-anchor="middle">${t}</text>`;
 const svg=(body,title,box='0 0 400 300')=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}" role="img" aria-label="${title}"><title>${title}</title><g fill="none" stroke="#17253b" stroke-width="1.8" stroke-linejoin="round">${body}</g></svg>`;
 switch(String(id)){
 case '4':{
  let s='';for(let i=0;i<=4;i++){s+=line(100+i*50,25,100+i*50,225)+line(100,25+i*50,300,25+i*50);}
  for(const [r,c,t] of [[0,0,'V'],[0,2,'★'],[1,0,'M'],[1,1,'V'],[2,1,'A'],[3,1,'R']])s+=text(125+c*50,57+r*50,t);
  return svg(s,'Cuadrícula de 4 por 4. Fila 1: V, vacío, estrella, vacío. Fila 2: M, V, vacío, vacío. Fila 3: vacío, A, vacío, vacío. Fila 4: vacío, R, vacío, vacío.','0 0 400 250');
 }
 case '7':return svg(`<path d="M75 245 L190 30 L305 275 M95 207 L305 275 M75 245 L260 180"/>${text(63,258,'P')+text(190,22,'Q')+text(318,287,'R')+text(84,204,'S')+text(273,179,'T')+text(153,224,'X')}`,'Segmentos PQ y QR; S está en PQ, T está en QR y X es la intersección de SR y PT.');
 case '9':return svg(`<rect x="90" y="30" width="240" height="240"/>${line(174,30,174,270)+line(90,186,330,186)}${text(80,290,'A')+text(80,191,'B')+text(163,205,'C')+text(176,290,'D')+text(83,23,'E')+text(174,23,'F')+text(337,23,'G')+text(344,191,'H')+text(337,290,'I')}`,'Cuadrado AEGI dividido por FD vertical y BH horizontal: ABCD es el cuadrado inferior izquierdo y EBCF es el rectángulo superior izquierdo.');
 case '12':return '<img src="wall.png" width="1520" height="874" style="display:block;max-width:100%;height:auto" alt="Pared original de bloques: tres rectángulos o cuadrados en cada una de tres filas escalonadas; la fila superior tiene un hueco entre su primer rectángulo y el cuadrado central.">';
 case '14':{
  const sizes=[46,23,46,46,69,30,58,58];let x=20,s='';sizes.forEach((w,i)=>{let y=115+(i%2===0?w:-w);s+=`M${x} 115 V${y} H${x+w} V115 `;x+=w;});
  return svg(`<path d="${s}"/>${line(20,115,x,115,'stroke="#2563eb" stroke-dasharray="5 4"')}${text(10,121,'A')+text(x+12,121,'B')}`,'Ocho cuadrados alternan por encima y debajo de AB. La línea punteada AB mide 38 cm; el trayecto continuo recorre tres lados de cada cuadrado.','0 0 420 205');
 }
 case '16':{
  const pts=[[200,35],[336,134],[284,294],[116,294],[64,134]];let s=`<polygon fill="#56acd3" points="${pts.map(p=>p.join(',')).join(' ')}"/>`;
  const vals=['8','','X','2','','6','','1','','4'];
  for(let i=0;i<10;i++){const a=pts[Math.floor(i/2)],b=pts[(Math.floor(i/2)+1)%5],x=i%2?(a[0]+b[0])/2:a[0],y=i%2?(a[1]+b[1])/2:a[1];s+=`<circle cx="${x}" cy="${y}" r="25" fill="white"/>`+text(x,y+6,vals[i]);}
  return svg(s,'Pentágono con círculos en vértices y puntos medios. Desde el vértice superior en sentido horario: 8, vacío, X, 2, vacío, 6, vacío, 1, vacío, 4.','20 0 360 335');
 }
 case '17':return svg(`<rect x="80" y="25" width="240" height="240"/><path d="M80 25 A120 120 0 0 1 80 265 M320 25 A120 120 0 0 0 320 265"/><path d="M80 265 A120 120 0 0 0 200 145 Z M320 265 A120 120 0 0 1 200 145 Z" fill="#858585"/><path d="M80 265 L200 145 L320 265"/>${text(68,283,'A')+text(332,283,'B')+text(332,25,'C')+text(68,25,'D')+text(219,146,'P')}`,'Cuadrado ABCD de lado 6, con A y B abajo. Semicircunferencias interiores sobre los lados AD y BC se tocan en P. Sombreados los dos segmentos circulares entre AP, BP y sus arcos.');
 case '19':return svg(`<path d="M160 21 L106 210 L268 304.5 Z"/><path d="M160 241.5 L160 210 L232 210 L268 304.5 Z" fill="#8c8c8c"/><path d="M160 21 L160 241.5 M106 210 L232 210"/><path d="M160 200 L170 200 L170 210"/>${text(160,16,'A')+text(92,214,'B')+text(280,317,'C')+text(155,262,'D')+text(246,210,'E')+text(151,205,'F')+text(175,128,'7')+text(133,203,'2')+text(125,239,'a')+text(220,285,'2a')+text(215,115,'2b')+text(271,257,'b')}`,'Triángulo ABC. D en BC con BD=a y DC=2a; E en AC con AE=2b y EC=b. AD es perpendicular a BE en F; AF=7 y BF=2. Sombreado el cuadrilátero DFEC.','0 0 400 335');
 default:return '';
 }
}
