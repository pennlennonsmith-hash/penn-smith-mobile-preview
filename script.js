const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.nav');
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);menuButton.innerHTML=open?'CLOSE <b>−</b>':'MENU <b>+</b>';});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.innerHTML='MENU <b>+</b>'; }));
document.querySelector('#year').textContent=new Date().getFullYear();
const scrollRuler=document.querySelector('.scroll-ruler');
if(scrollRuler){
  const rulerStops=[...scrollRuler.querySelectorAll('button[data-project]')];
  const projectSections=rulerStops.map(button=>document.getElementById(button.dataset.project)).filter(Boolean);
  const updateRuler=()=>{
    const marker=window.scrollY+window.innerHeight*.46;
    const projectPositions=projectSections.map(section=>section.getBoundingClientRect().top+window.scrollY);
    let active=0;
    let progress=0;
    if(marker>=projectPositions[projectPositions.length-1]){
      active=projectPositions.length-1;
      progress=1;
    }else if(marker>projectPositions[0]){
      for(let index=0;index<projectPositions.length-1;index++){
        const start=projectPositions[index];
        const end=projectPositions[index+1];
        if(marker<end){
          const interval=(marker-start)/(end-start);
          progress=(index+interval)/(projectPositions.length-1);
          active=index+(interval>=.5?1:0);
          break;
        }
      }
    }
    rulerStops.forEach((button,index)=>{if(index===active)button.setAttribute('aria-current','location');else button.removeAttribute('aria-current');});
    scrollRuler.style.setProperty('--ruler-fill',`${progress*100}%`);
  };
  rulerStops.forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.project)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})));
  window.addEventListener('scroll',updateRuler,{passive:true});
  window.addEventListener('resize',updateRuler,{passive:true});
  updateRuler();
}
