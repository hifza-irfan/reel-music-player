/* ---------- Data ---------- */
const TRACKS = [
  { id:1,  title:"Anaa",              artist:"Sahir Ali Bagga & Hania Amir",     cat:"Vocals Only", dur:156, file:"songs/Anaa_ Vocals only_ By Sahir Ali Bagga and Hania Amir.mpeg" },
  { id:2,  title:"Aseer e Muhabbt",   artist:"Adnan Dhool & Seher Gul Khan",     cat:"Vocals Only", dur:228, file:"songs/Aseer e Muhabbt_ Vocals only_ By Adnan Dhool and Seher Gul Khan.mpeg" },
  { id:3,  title:"Aye Musht-e-Khaak", artist:"Shani Arshad & Yashal Shahid",     cat:"Vocals Only", dur:200, file:"songs/Aye Musht-e-Khaak_ Vocals only_ By Shani Arshad and Yashal Shahid.mp4" },
  { id:4,  title:"Beqara Ye Dil Tera",artist:"Asim Azhar & Qirat Haider",        cat:"Vocals Only", dur:139, file:"songs/Beqara Ye Dil Tera_ Vocals only_ By Asim Azhar and Qirat Haider.mp4" },
  { id:5,  title:"Chal Diye Tum Kahan",artist:"AUR",                             cat:"Vocals Only", dur:248, file:"songs/Chal Diye Tum Kahan_ Vocals only_ By AUR.mpeg" },
  { id:6,  title:"Dil Wali Gali Mein",artist:"Umair Ali Akbar & Shreya Basu",    cat:"Vocals Only", dur:168, file:"songs/Dil Wali Gali Mein_ Vocls only_ By  Umair Ali Akbar and Shreya Basu.mpeg" },
  { id:7,  title:"Hum Kahan Ke Sachay Thay", artist:"Yashal Shahid",             cat:"Vocals Only", dur:165, file:"songs/Hum Kahan Ke Sachay Thay_ Vocals only_ By Yashal Shahid.mpeg" },
  { id:8,  title:"I'm Done",          artist:"Maan Panu",                        cat:"Vocals Only", dur:137, file:"songs/I'm Done_ Vocals only_ By Maan Panu.mpeg" },
  { id:9, title:"Iqtidar",           artist:"Arshman Khan & Farrukh Mehervi",   cat:"Vocals Only", dur:202, file:"songs/Iqtidar_ Vocls only_ By Arshman Khan and Farrukh Mehervi.mp4" },
  { id:10, title:"Khasara",           artist:"Abdul Hannan & Samar Jafri",       cat:"Vocals Only", dur:143, file:"songs/Khasara_ Vocals only_ By Abdul Hannan and Samar Jafri.mpeg" },
  { id:11, title:"Mann Mayal",        artist:"Quratulain Balouch & Shuja Hyder", cat:"Vocals Only", dur:226, file:"songs/Mann Mayal_ Vocals only_ By Quratulain Balouch and Shuja Hyder.mpeg" },
  { id:12, title:"Mohra",             artist:"Yashal Shahid",                    cat:"Vocals Only", dur:177, file:"songs/Mohra_ Vocals only_ By  Yashal Shahid.mpeg" },
  { id:13, title:"Mushk",             artist:"Ali Zafar",                        cat:"Vocals Only", dur:171, file:"songs/Mushk_ Vocals only_ By Ali Zafar.mp4" },
  { id:14, title:"Paar Chanaa De",    artist:"Shilpa Rao & Noori",               cat:"Vocals Only", dur:436, file:"songs/Paar Chanaa De_ Vocals only_ By  Shilpa Rao and Noori.mp4" },
  { id:15, title:"Paaro",             artist:"Aditya Rikhari",                   cat:"Vocals Only", dur:110, file:"songs/Paaro_ Vocals only_ By Aditya Rikhari.mp4" },
  { id:16, title:"QarzeJaan",         artist:"Quratulain Balouch",               cat:"Vocals Only", dur:165, file:"songs/QarzeJaan_ Vocals only_ By Quratulain Balouch.mpeg" },
  { id:17, title:"Raaz-e-Ulfat",      artist:"Shani Arshad",                     cat:"Vocals Only", dur:223, file:"songs/Raaz-e-Ulfat_ Vocals only_ By  Shani Arshad.mpeg" },
  { id:18, title:"Ruposh",            artist:"Wajhi Farooki",                    cat:"Vocals Only", dur:177, file:"songs/Ruposh_ Vocals only_ By Wajhi Farooki.mp4" },
  { id:19, title:"Sahiba",            artist:"Aditya Rikhari",                   cat:"Vocals Only", dur:145, file:"songs/Sahiba_ Vocals only_ By Aditya Rikhari.mp4" },
  { id:20, title:"Saiyaara",          artist:"Faheem Abdullah",                  cat:"Vocals Only", dur:228, file:"songs/Saiyaara_ Vocals only_ By Faheem Abdullah.mp4" },
  { id:21, title:"Sang-e-Mah",        artist:"Atif Aslam",                       cat:"Vocals Only", dur:319, file:"songs/Sang-e-Mah_ Vocals only_ By Atif Aslam.mpeg" },
  { id:22, title:"Waqt Ki Baatein",   artist:"Gaurav Tiwari",                    cat:"Vocals Only", dur:190, file:"songs/Waqt Ki Baatein_ Vocals only_ By Gaurav Tiwari.mpeg" },
  { id:23, title:"Dil Dil Pakistan", artist:"Raweeha Fatima", cat:"Milli Naghmay", dur:227, file:"songs/Dil Dil Pakistan _ Raweeha Fatima _ 14 August Song _ Official Video _ M Media Gold.mp3" },
  { id:24, title:"Sahar Ka Waqt Tha | Qaseeda Burdah Shareef ", artist:" Darbane Mustafa", cat:"Naat-e-Nabi (SAWW)", dur:392, file:"songs/Sahar Ka Waqt Tha _ Qaseeda Burdah Shareef _ 2023 _ Darbane Mustafa.mp3" },
  { id:25, title:"Ladkiyon Ko Nasihat - Motivational Speech For Young Girls And Their Parents", artist:"Munawar Zama", cat:"Bayan", dur:384, file:"songs/Ladkiyon Ko Nasihat - Motivational Speech For Young Girls And Their Parents - Speaker Munawar Zama.mp3" },
];

const CATEGORIES = ["All", ...Array.from(new Set(TRACKS.map(t=>t.cat)))];

/* ---------- State ---------- */
let activeCat = "All";
let searchTerm = "";
let currentTrackId = null;
let isPlaying = false;
let elapsed = 0;
let timer = null;
let playlist = [];
let volume = 0.7;
let muted = false;

/* ---------- Web Audio (synth playback so tracks are actually audible) ---------- */
let audioCtx = null;
let activeNodes = [];
const realAudio = new Audio(); // plays actual files picked from your PC
function ensureAudio(){
  if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}
function stopSynth(){
  activeNodes.forEach(n => { try{ n.stop(); }catch(e){} });
  activeNodes = [];
}
function startSynth(track){
  ensureAudio();
  stopSynth();
  const now = audioCtx.currentTime;
  const master = audioCtx.createGain();
  master.gain.value = muted ? 0 : volume * 0.18;
  master.connect(audioCtx.destination);

  // simple evolving chord built from the track's root frequency
  const intervals = [1, 1.25, 1.5];
  intervals.forEach((mult, i) => {
    const osc = audioCtx.createOscillator();
    osc.type = i === 0 ? "sine" : "triangle";
    osc.frequency.value = track.root * mult;
    const g = audioCtx.createGain();
    g.gain.value = 0.6 / intervals.length;
    const lfo = audioCtx.createOscillator();
    lfo.frequency.value = 0.15 + i * 0.05;
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 0.15;
    lfo.connect(lfoGain);
    lfoGain.connect(g.gain);
    osc.connect(g);
    g.connect(master);
    osc.start(now);
    lfo.start(now);
    activeNodes.push(osc, lfo);
  });
  activeNodes.push({ stop: () => master.disconnect() });
  currentMasterGain = master;
}
let currentMasterGain = null;
function updateVolumeLive(){
  if(currentMasterGain) currentMasterGain.gain.value = muted ? 0 : volume * 0.18;
}

/* ---------- Elements ---------- */
const catList = document.getElementById('cat-list');
const chipRow = document.getElementById('chip-row');
const trackBody = document.getElementById('track-body');
const noResults = document.getElementById('no-results');
const pageTitle = document.getElementById('page-title');
const pageSub = document.getElementById('page-sub');
const searchInput = document.getElementById('search');
const playlistItems = document.getElementById('playlist-items');
const playlistEmpty = document.getElementById('playlist-empty');

const npTitle = document.getElementById('np-title');
const npArtist = document.getElementById('np-artist');
const reelCover = document.getElementById('reel-cover');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const seek = document.getElementById('seek');
const timeCur = document.getElementById('time-cur');
const timeDur = document.getElementById('time-dur');
const volumeSlider = document.getElementById('volume');
const muteBtn = document.getElementById('mute-btn');
const volIcon = document.getElementById('vol-icon');

/* ---------- Helpers ---------- */
function fmt(sec){
  sec = Math.max(0, Math.round(sec));
  const m = Math.floor(sec/60), s = sec%60;
  return `${m}:${String(s).padStart(2,'0')}`;
}
function getTrack(id){ return TRACKS.find(t => t.id === id); }

/* ---------- Render: sidebar categories ---------- */
function renderCategories(){
  catList.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const count = cat === "All" ? TRACKS.length : TRACKS.filter(t=>t.cat===cat).length;
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = cat === activeCat ? 'active' : '';
    btn.innerHTML = `<span>${cat}</span><span class="count">${count}</span>`;
    btn.onclick = () => { activeCat = cat; render(); };
    li.appendChild(btn);
    catList.appendChild(li);
  });
}

function renderChips(){
  chipRow.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const chip = document.createElement('button');
    chip.className = 'chip' + (cat === activeCat ? ' active' : '');
    chip.textContent = cat;
    chip.onclick = () => { activeCat = cat; render(); };
    chipRow.appendChild(chip);
  });
}

/* ---------- Render: track table ---------- */
function filteredTracks(){
  return TRACKS.filter(t => {
    const matchCat = activeCat === "All" || t.cat === activeCat;
    const q = searchTerm.trim().toLowerCase();
    const matchSearch = !q || t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
}

function renderTracks(){
  const list = filteredTracks();
  pageTitle.textContent = activeCat;
  pageSub.textContent = `${list.length} track${list.length===1?'':'s'}${searchTerm ? ` matching "${searchTerm}"` : ''} · click a row to play`;

  trackBody.innerHTML = '';
  noResults.style.display = list.length ? 'none' : 'block';

  list.forEach((t, i) => {
    const tr = document.createElement('tr');
    if(t.id === currentTrackId) tr.classList.add('playing');
    const inPlaylist = playlist.includes(t.id);
    tr.innerHTML = `
      <td class="idx-cell">
        <span class="num">${i+1}</span>
        <span class="mini-play">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">${(t.id===currentTrackId && isPlaying) ? '<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>' : '<path d="M8 5v14l11-7z"/>'}</svg>
        </span>
      </td>
      <td>
        <div class="title-cell">
          <div class="t-row">
            <span class="playing-dot${(t.id===currentTrackId && isPlaying) ? ' on' : ''}"></span>
            <span class="t">${t.title}</span>
          </div>
          <span class="a">${t.artist}</span>
        </div>
      </td>
      <td class="tag-cell"><span>${t.cat}</span></td>
      <td class="dur-cell">${fmt(t.dur)}</td>
      <td class="add-cell">
        <button title="${inPlaylist ? 'Remove from playlist' : 'Add to playlist'}" class="${inPlaylist ? 'added' : ''}" data-id="${t.id}">${inPlaylist ? '✓' : '+'}</button>
      </td>
    `;
    tr.querySelector('td:not(.add-cell)') && (tr.onclick = (e) => {
      if(e.target.closest('.add-cell')) return;
      playTrack(t.id);
    });
    tr.querySelector('.add-cell button').onclick = (e) => {
      e.stopPropagation();
      togglePlaylist(t.id);
    };
    trackBody.appendChild(tr);
  });
}

/* ---------- Render: playlist sidebar ---------- */
function renderPlaylist(){
  playlistItems.innerHTML = '';
  playlistEmpty.style.display = playlist.length ? 'none' : 'block';
  playlist.forEach(id => {
    const t = getTrack(id);
    const li = document.createElement('li');
    li.innerHTML = `<span>${t.title}</span>`;
    const btn = document.createElement('button');
    btn.textContent = '✕';
    btn.title = 'Remove';
    btn.onclick = () => togglePlaylist(id);
    li.appendChild(btn);
    li.querySelector('span').style.cursor = 'pointer';
    li.querySelector('span').onclick = () => playTrack(id);
    playlistItems.appendChild(li);
  });
}

function togglePlaylist(id){
  if(playlist.includes(id)) playlist = playlist.filter(x => x !== id);
  else playlist.push(id);
  render();
}

/* ---------- Playback ---------- */
function playTrack(id){
  currentTrackId = id;
  elapsed = 0;
  const t = getTrack(id);
  npTitle.textContent = t.title;
  npArtist.textContent = `${t.artist} · ${t.cat}`;
  timeDur.textContent = fmt(t.dur || 0);
  seek.max = t.dur || 0;
  seek.value = 0;
  updateSeekFill();

  const sharedOrLocalUrl = t.file || t.localUrl;
  if(sharedOrLocalUrl){
    stopSynth();
    realAudio.src = sharedOrLocalUrl;
    realAudio.volume = muted ? 0 : volume;
    realAudio.currentTime = 0;
    realAudio.play();
    realAudio.onloadedmetadata = () => {
      t.dur = Math.round(realAudio.duration);
      seek.max = t.dur;
      timeDur.textContent = fmt(t.dur);
    };
  } else {
    realAudio.pause();
    startSynth(t);
  }
  setPlaying(true);
  render();
}

function setPlaying(state){
  isPlaying = state;
  const t = getTrack(currentTrackId);
  const isLocal = t && (t.file || t.localUrl);
  playIcon.innerHTML = state
    ? '<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>'
    : '<path d="M8 5v14l11-7z"/>';
  reelCover.classList.toggle('spinning', state);

  if(isLocal){
    if(state) realAudio.play(); else realAudio.pause();
    clearInterval(timer);
    if(state){ timer = setInterval(tick, 1000); }
    return;
  }

  if(state){
    clearInterval(timer);
    timer = setInterval(tick, 1000);
    ensureAudio();
    if(audioCtx.state === 'suspended') audioCtx.resume();
  } else {
    clearInterval(timer);
    stopSynth();
  }
}

function tick(){
  const t = getTrack(currentTrackId);
  if(!t) return;

  if(t.file || t.localUrl){
    elapsed = realAudio.currentTime;
    if(realAudio.ended){ nextTrack(); return; }
  } else {
    elapsed += 1;
    if(elapsed >= t.dur){ nextTrack(); return; }
  }
  seek.value = elapsed;
  timeCur.textContent = fmt(elapsed);
  updateSeekFill();
}

function updateSeekFill(){
  const max = Number(seek.max) || 1;
  const pct = (Number(seek.value)/max) * 100;
  seek.style.background = `linear-gradient(to right, var(--amber) ${pct}%, var(--line) ${pct}%)`;
}

function currentOrder(){
  return filteredTracks().length ? filteredTracks() : TRACKS;
}

function nextTrack(){
  const order = currentOrder();
  const idx = order.findIndex(t => t.id === currentTrackId);
  const next = order[(idx + 1) % order.length] || order[0];
  if(next) playTrack(next.id);
}
function prevTrack(){
  const order = currentOrder();
  const idx = order.findIndex(t => t.id === currentTrackId);
  const prev = order[(idx - 1 + order.length) % order.length] || order[0];
  if(prev) playTrack(prev.id);
}

/* ---------- Events ---------- */
playBtn.onclick = () => {
  if(currentTrackId === null){
    const first = currentOrder()[0];
    if(first) playTrack(first.id);
    return;
  }
  if(isPlaying){ setPlaying(false); }
  else {
    ensureAudio();
    startSynth(getTrack(currentTrackId));
    setPlaying(true);
  }
};
document.getElementById('next-btn').onclick = () => { if(currentTrackId!==null) nextTrack(); };
document.getElementById('prev-btn').onclick = () => { if(currentTrackId!==null) prevTrack(); };

seek.addEventListener('input', () => {
  elapsed = Number(seek.value);
  timeCur.textContent = fmt(elapsed);
  updateSeekFill();
});

volumeSlider.addEventListener('input', () => {
  volume = Number(volumeSlider.value) / 100;
  if(volume > 0) muted = false;
  updateVolumeLive();
  updateVolIcon();
});
muteBtn.onclick = () => {
  muted = !muted;
  updateVolumeLive();
  updateVolIcon();
};
function updateVolIcon(){
  const v = muted ? 0 : volume;
  volIcon.innerHTML = v === 0
    ? '<path d="M16.5 12L20 8.5 18.6 7 15 10.5 11.5 7 10 8.5 13.5 12 10 15.5 11.5 17 15 13.5 18.6 17 20 15.5z"/><path d="M3 10v4h4l5 5V5L7 10H3z"/>'
    : '<path d="M3 10v4h4l5 5V5L7 10H3z"/><path d="M16 8a5 5 0 010 8" stroke="currentColor" stroke-width="2" fill="none"/>';
}

searchInput.addEventListener('input', (e) => { searchTerm = e.target.value; render(); });

document.getElementById('add-song-btn').onclick = () => document.getElementById('file-picker').click();

document.getElementById('file-picker').addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  if(!files.length) return;
  files.forEach(file => {
    const url = URL.createObjectURL(file);
    const nextId = Math.max(0, ...TRACKS.map(t => t.id)) + 1;
    TRACKS.push({
      id: nextId,
      title: file.name.replace(/\.[^/.]+$/, ""),
      artist: "My Library",
      cat: "My Uploads",
      dur: 0,
      localUrl: url
    });
  });
  if(!CATEGORIES.includes("My Uploads")) CATEGORIES.push("My Uploads");
  activeCat = "My Uploads";
  render();
  e.target.value = ''; // allow re-selecting the same file later
});

/* ---------- Init ---------- */
function render(){
  renderCategories();
  renderChips();
  renderTracks();
  renderPlaylist();
}
render();
updateVolIcon();