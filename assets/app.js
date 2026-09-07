const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
mainNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mainNav.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

function updateOpenStatus(){
  try{
    const parts = new Intl.DateTimeFormat('en-US', {timeZone:'America/Chicago', weekday:'short', hour:'2-digit', minute:'2-digit', hour12:false}).formatToParts(new Date());
    const val = type => parts.find(p => p.type === type)?.value;
    const day = val('weekday');
    const mins = Number(val('hour')) * 60 + Number(val('minute'));
    const schedule = {Mon:[240,1320],Tue:[240,1320],Wed:[240,1320],Thu:[240,1320],Fri:[240,1320],Sat:[240,1320],Sun:[270,1260]};
    const [start,end] = schedule[day] || [0,0];
    const badge = document.getElementById('openBadge');
    if(!badge) return;
    badge.textContent = mins >= start && mins < end ? 'Open now' : 'See hours';
  }catch(e){}
}
updateOpenStatus();
