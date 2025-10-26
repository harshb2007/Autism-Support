
const files = [
  "calibration.py","config.py","data_logging.py","effects_audio.py","effects_light.py",
  "gesture_recognition.py","main_demo.py","myo_integration.py","repulsor_game.py",
  "simulator_core.py","ui_dashboard.py","vr_interface.py"
];
const fileList = document.getElementById('fileList');
const codeContent = document.getElementById('codeContent');
const currentFile = document.getElementById('currentFile');
const openRaw = document.getElementById('openRaw');

files.forEach(name => {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.textContent = name;
  btn.addEventListener('click', () => loadFile(name));
  li.appendChild(btn);
  fileList.appendChild(li);
});

async function loadFile(name){
  currentFile.textContent = name;
  openRaw.href = `codes/${name}`;
  document.querySelector('.code-view').setAttribute('aria-busy','true');
  try{
    const res = await fetch(`codes/${name}`);
    if(!res.ok) throw new Error(res.status + " " + res.statusText);
    const txt = await res.text();
    codeContent.textContent = txt;
    hljs.highlightElement(codeContent);
  }catch(err){
    codeContent.textContent = `// Unable to load ${name}\n// Make sure this file exists at /codes/${name}\n\n${err}`;
  }finally{
    document.querySelector('.code-view').setAttribute('aria-busy','false');
  }
}

document.getElementById('year').textContent = new Date().getFullYear();

const reduceBtn = document.getElementById('reduceMotion');
reduceBtn.addEventListener('click', () => {
  const pressed = reduceBtn.getAttribute('aria-pressed') === 'true';
  reduceBtn.setAttribute('aria-pressed', String(!pressed));
  document.documentElement.style.setProperty('scroll-behavior', pressed ? 'smooth' : 'auto');
  document.querySelectorAll('.ring').forEach(el => el.style.animation = pressed ? 'none' : '');
});

const hcBtn = document.getElementById('highContrast');
hcBtn.addEventListener('click', () => {
  const pressed = hcBtn.getAttribute('aria-pressed') === 'true';
  hcBtn.setAttribute('aria-pressed', String(!pressed));
  document.body.classList.toggle('hc');
});
