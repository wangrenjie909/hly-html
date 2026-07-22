const images = [
  "images/img3.jpg",
  "images/img2.jpg",
  "images/u2986821151_m.jpg"
];

const titles = [
  "兰花的世界",
  "郁金香世界",
  "蓝花世界"
];

const intros = [
  "去荷兰花世界参观时<br>这里的花朵是蓝色的，很漂亮",
  "这是粉色的郁金香，很美丽<br>是本作者出去游玩看到的，网上找的",
  "你知道为什么现在已经是第三张蓝色的花吗？<br>因为我是双子座，双子座的幸运色是蓝色<br>所以我喜欢蓝色的花，这个花会好看一点<br>这个是我从第一张图片上编程课而想到的<br>把它画了下来，来做背景图，做草稿图"
];

let mode = 0;
let imgStep = 0;
let active = 'A';
const bgA = document.getElementById('bgA');
const bgB = document.getElementById('bgB');
bgA.style.backgroundImage = 'url("images/u=1792083036,3890024348&fm=253&fmt=auto&app=120&f=JPEG.webp")';

// 动画只播一次，主页返回时不重播
setTimeout(function() {
  var t = document.querySelector('#page1 .main-title');
  var a = document.querySelector('#page1 .hero-avatar');
  if (t) t.style.animation = 'none';
  if (a) { a.style.animation = 'none'; a.style.transform = 'translateY(0)'; }
}, 1500);

document.body.addEventListener('click', function(e) {
  // 只有点击文字区域或提示才切换页面
  var clickTarget = e.target;
  var allowTransition = clickTarget.closest('.text-box') || clickTarget.closest('.prompt') || clickTarget.closest('.main-title') || clickTarget.closest('.intro-text');
  if (!allowTransition) return;
  // 相册打开时不做任何事
  if (document.body.classList.contains('gallery-open')) return;
  
  // 星尘散落
  const colors = ['#FFFFFF','#C0D8FF','#A8C8FF','#FFE8C0','#FFD0E0'];
  for (let i = 0; i < 18; i++) {
    const star = document.createElement('div');
    star.className = 'stardust';
    const size = 3 + Math.random() * 6;
    star.style.width = star.style.height = size + 'px';
    star.style.background = colors[Math.floor(Math.random() * colors.length)];
    star.style.left = (e.clientX + (Math.random() - 0.5) * 30) + 'px';
    star.style.top = (e.clientY + (Math.random() - 0.5) * 30) + 'px';
    star.style.setProperty('--dx', (Math.random() - 0.5) * 200 + 'px');
    star.style.setProperty('--dy', (Math.random() - 0.5) * 200 + 'px');
    star.style.boxShadow = '0 0 6px ' + colors[0];
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 900);
  }
  
  // 点击柔光
  const glow = document.createElement('div');
  glow.className = 'click-glow';
  glow.style.setProperty('--cx', e.clientX + 'px');
  glow.style.setProperty('--cy', e.clientY + 'px');
  document.body.appendChild(glow);
  setTimeout(() => glow.remove(), 700);
  
  if (mode === 0) {
    mode = 1;
    document.getElementById('page1').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('page1').style.display = 'none';
      setTimeout(() => {
        document.getElementById('page2').style.display = 'block';
        document.getElementById('page2').style.opacity = '1';
      }, 100);
    }, 600);
    
  } else if (mode === 1) {
    mode = 2;
    document.getElementById('page2').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('page2').style.display = 'none';
      document.getElementById('page3').style.display = 'block';
      document.getElementById('page3').style.opacity = '1';
      document.getElementById('imgTitle').textContent = titles[0];
      document.getElementById('imgIntro').innerHTML = intros[0];
      document.body.style.background = 'linear-gradient(180deg,#FFFFFF 0%,#E8F0FA 30%,#D0E4F5 60%,#B8D4EC 100%)';
    }, 600);
    
  } else if (mode === 2) {
    imgStep++;
    
    if (imgStep < images.length) {
      if (active === 'A') {
        bgB.style.backgroundImage = 'url("' + images[imgStep] + '")';
        bgB.style.zIndex = '1'; bgB.style.opacity = '1'; bgA.style.opacity = '0'; active = 'B';
        setTimeout(() => { bgA.style.zIndex = '0'; bgA.style.backgroundImage = 'none'; }, 900);
      } else {
        bgA.style.backgroundImage = 'url("' + images[imgStep] + '")';
        bgA.style.zIndex = '1'; bgA.style.opacity = '1'; bgB.style.opacity = '0'; active = 'A';
        setTimeout(() => { bgB.style.zIndex = '0'; bgB.style.backgroundImage = 'none'; }, 900);
      }
      document.getElementById('imgTitle').textContent = titles[imgStep];
      document.getElementById('imgIntro').innerHTML = intros[imgStep];
      // 切换背景渐变色
      var bgs = [
        'linear-gradient(180deg,#FFFFFF 0%,#E8F0FA 30%,#D0E4F5 60%,#B8D4EC 100%)',
        'linear-gradient(180deg,#FFFFFF 0%,#FDF0F5 30%,#F8E0EC 60%,#F0C8D8 100%)',
        'linear-gradient(180deg,#FFFFFF 0%,#E8F0FA 30%,#D0E4F5 60%,#B8D4EC 100%)'
      ];
      document.body.style.background = bgs[imgStep];
    }
    
    if (imgStep >= images.length) {
      mode = 3;
      document.getElementById('page3').style.opacity = '0';
      document.getElementById('prompt').style.opacity = '0';
      setTimeout(() => {
        document.getElementById('page3').style.display = 'none';
        document.getElementById('prompt').style.display = 'block';
        document.getElementById('prompt').style.opacity = '1';
      }, 600);
    }
  } else if (mode === 3) {
    mode = 0; imgStep = 0;
    bgA.style.zIndex = '1'; bgA.style.opacity = '1'; bgA.style.backgroundImage = 'url("images/u=1792083036,3890024348&fm=253&fmt=auto&app=120&f=JPEG.webp")';
    bgB.style.zIndex = '0'; bgB.style.opacity = '0'; bgB.style.backgroundImage = 'none';
    active = 'A';
    setTimeout(() => {
      document.getElementById('page1').style.display = 'block';
      document.getElementById('page1').style.opacity = '1';
      document.getElementById('prompt').style.display = 'block';
      document.getElementById('prompt').style.opacity = '1';
    }, 600);
  }
});

// 返回主页
document.getElementById('navHomeBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  // 只关闭弹窗，不动主页
  document.body.classList.remove('gallery-open');
  document.getElementById('aboutOverlay').classList.remove('show');
  document.getElementById('hobbyOverlay').classList.remove('show');
  document.getElementById('contactOverlay').style.display = 'none';
  document.getElementById('gameOverlay').style.display = 'none';
  galOverlay.classList.remove('show');
  // 如果不在主页，回到第一屏
  if (mode !== 0) {
    mode = 0; imgStep = 0;
    document.body.style.background = '';
    bgA.style.zIndex = '1'; bgA.style.opacity = '1'; bgA.style.backgroundImage = 'url("images/u=1792083036,3890024348&fm=253&fmt=auto&app=120&f=JPEG.webp")';
    bgB.style.zIndex = '0'; bgB.style.opacity = '0'; bgB.style.backgroundImage = 'none';
    active = 'A';
    document.getElementById('page1').style.display = 'block'; document.getElementById('page1').style.opacity = '1';
    document.getElementById('page2').style.display = 'none'; document.getElementById('page2').style.opacity = '0';
    document.getElementById('page3').style.display = 'none'; document.getElementById('page3').style.opacity = '0';
    document.getElementById('prompt').style.display = 'block'; document.getElementById('prompt').style.opacity = '1';
  }
});

// 鼠标跟随星光
const starColors = ['#FFFFFF','#C0D8FF','#A8C8FF','#FFE8C0','#FFD0E0'];
let lastStar = 0;
document.body.addEventListener('mousemove', function(e) {
  if (document.body.classList.contains('gallery-open')) return;
  const now = Date.now();
  if (now - lastStar < 25) return;
  lastStar = now;
  for (let s = 0; s < 3; s++) {
    const star = document.createElement('div');
    star.className = 'stardust';
    const size = 1.5 + Math.random() * 4;
  star.style.width = star.style.height = size + 'px';
  star.style.background = starColors[Math.floor(Math.random() * starColors.length)];
  star.style.left = (e.clientX + (Math.random() - 0.5) * 10) + 'px';
  star.style.top = (e.clientY + (Math.random() - 0.5) * 10) + 'px';
  star.style.setProperty('--dx', (Math.random() - 0.5) * 40 + 'px');
  star.style.setProperty('--dy', (Math.random() - 0.5) * 40 + 'px');
  star.style.boxShadow = '0 0 4px ' + starColors[0];
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 800);
  }
});

// 点击星光不动页面 — 酷炫爆裂特效
document.getElementById('heroStar').addEventListener('click', function(e) {
  e.stopPropagation();

  // 迸发星尘
  var colors = ['#FFFFFF','#C0D8FF','#A8C8FF','#FFE8C0','#E8D0FF'];
  for (var i = 0; i < 30; i++) {
    var star = document.createElement('div');
    star.className = 'stardust';
    var size = 2 + Math.random() * 5;
    star.style.width = star.style.height = size + 'px';
    star.style.background = colors[Math.floor(Math.random() * colors.length)];
    star.style.left = (e.clientX + (Math.random() - 0.5) * 6) + 'px';
    star.style.top = (e.clientY + (Math.random() - 0.5) * 6) + 'px';
    var angle = Math.random() * Math.PI * 2;
    var dist = 80 + Math.random() * 250;
    star.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    star.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    star.style.boxShadow = '0 0 10px ' + colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(star);
    setTimeout(function() { star.remove(); }, 1200);
  }

  // 冲击光环
  var ring = document.createElement('div');
  ring.style.cssText = 'position:fixed;left:' + e.clientX + 'px;top:' + e.clientY + 'px;' +
    'width:10px;height:10px;border-radius:50%;border:2px solid rgba(168,216,255,0.4);' +
    'transform:translate(-50%,-50%);pointer-events:none;z-index:20;' +
    'animation:starRing 0.8s ease-out forwards;';
  document.body.appendChild(ring);
  setTimeout(function() { ring.remove(); }, 1000);

  // 闪光
  var flash = document.createElement('div');
  flash.style.cssText = 'position:fixed;left:' + e.clientX + 'px;top:' + e.clientY + 'px;' +
    'width:4px;height:4px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.6),transparent 60%);' +
    'transform:translate(-50%,-50%);pointer-events:none;z-index:20;' +
    'animation:starFlash 0.6s ease-out forwards;';
  document.body.appendChild(flash);
  setTimeout(function() { flash.remove(); }, 800);
});

// 猜件点击不动页面
function widgetClick(e) {
  e.stopPropagation();
  var answers = ['是的','不是','可能吧','一定','再想想','当然','不好说','可以哦','别想了','试试看'];
  var el = document.getElementById('widgetAnswer');
  el.textContent = answers[Math.floor(Math.random() * answers.length)];
  el.style.color = 'rgba(255,255,255,0.7)';
  el.style.fontSize = '14px';
  setTimeout(function() { el.style.color = 'rgba(255,255,255,0.4)'; el.style.fontSize = '12px'; }, 2000);
}

// 飘落星光
function createFallingStar() {
  if (document.body.classList.contains('gallery-open')) return;
  for (var s = 0; s < 2; s++) {
    var star = document.createElement('div');
    star.className = 'falling-star';
    var size = 3 + Math.random() * 5;
    star.style.width = star.style.height = size + 'px';
    star.style.background = ['#FFFFFF','#C0D8FF','#A8C8FF','#FFE8C0','#E8D0FF'][Math.floor(Math.random() * 5)];
    star.style.left = Math.random() * 100 + '%';
    star.style.top = '-10px';
    star.style.boxShadow = '0 0 6px ' + star.style.background;
    star.style.animationDuration = (7 + Math.random() * 10) + 's';
    star.style.animationDelay = (Math.random() * 2) + 's';
    document.body.appendChild(star);
    setTimeout(function() { star.remove(); }, 20000);
  }
}
setInterval(createFallingStar, 200);

// 显示/隐藏秘密
function toggleSecret(e) {
  e.stopPropagation();
  e.preventDefault();
  var secret = document.getElementById('secretContent');
  var btn = e.target;
  if (secret.style.display === 'none') {
    secret.style.display = 'block';
    btn.textContent = '隐藏秘密';
  } else {
    secret.style.display = 'none';
    btn.textContent = '显示秘密';
  }
}

// 关闭秘密
function closeSecret(e) {
  e.stopPropagation();
  e.preventDefault();
  document.getElementById('secretContent').style.display = 'none';
  var btns = document.querySelectorAll('button');
  for (var i = 0; i < btns.length; i++) {
    if (btns[i].textContent === '隐藏秘密') { btns[i].textContent = '显示秘密'; break; }
  }
}

// 头像 → 相册（从黄莉芸文件随机选）
const folderImgs = [
  "images/gallery/0f9bb3f21433a030ee15963668c80456.jpg",
  "images/gallery/10b206d289980976b78500b2022a0f4c.jpg",
  "images/gallery/1202e7575e8f1b2cb6088a7b4df0e701.jpg",
  "images/gallery/16d0cea1801d477575bcc7f7d9f529be.jpg",
  "images/gallery/20846323f292b6e59afb98e2eaf8746a.jpg",
  "images/gallery/2dcd367e6687d2c38dcd24704c908a89.jpg",
  "images/gallery/307cd4ea4f7982fc192ff161f874190f.jpg",
  "images/gallery/3b51b0454c54d1b0a8b51eab8932aa25.jpg",
  "images/gallery/46f565e6b547c7eab66f18d5188ea07a.jpg",
  "images/gallery/471783e61e5dd526b08a328f3674db3e.jpg",
  "images/gallery/49ef05588174bf90bcc6cbbe84c3dce2.jpg",
  "images/gallery/4b51cb4723fc98682f1e8d5b9e57ba7d.jpg",
  "images/gallery/4c7d1ffab33ef92da80b3cf75c2de328.jpg",
  "images/gallery/4cebfdc3c514ffeab2e25bfd5584a4f4.jpg",
  "images/gallery/4eecceee9988377376f64d766997d2f9.jpg",
  "images/gallery/57edf9470bbf6b4ecbbf314830e4cd2b.jpg",
  "images/gallery/5e11eb7a10b525387d56b8b5b74c169e.jpg",
  "images/gallery/62c1011d8a015687eebf127f3fc49cdf.jpg",
  "images/gallery/63a09ff20adebd4042b216cb16ffd937.jpg",
  "images/gallery/6daa65fb46d91c707e9128e1811fcf87.jpg",
  "images/gallery/6dc2f7056dd3fee1f401eff47cf6aac9.jpg",
  "images/gallery/74bd2e42ed548f4ee560c445bbf14f62.jpg",
  "images/gallery/79b52c753b17fed75614076c69440fcb.jpg",
  "images/gallery/7a2bffdf0d71949b6d13d14d1f5cec25.jpg",
  "images/gallery/7c9202eba495c619a91bfa75238fe2c5.jpg",
  "images/gallery/80b2f464555773f131c4645946f9dedd.jpg",
  "images/gallery/8239bae0e2f5e4510ef23bc3f6b4f5a4.jpg",
  "images/gallery/917a5433a4872d602a31bbac4fe86d30.jpg",
  "images/gallery/952ef28069947e6ec333a5e510ed57a5.jpg",
  "images/gallery/97f29942806c4ee0b75d86ddbe3a6274.jpg",
  "images/gallery/9a7bfd8f1aa9511a5fc09af7f65275b6.jpg",
  "images/gallery/9a810ead9a878b23fa8171ef94840526.jpg",
  "images/gallery/a46a251eda6da5f8f975cd6d72394fcb.jpg",
  "images/gallery/ad4418221d8f41c933ccd1fb06b728a7.jpg",
  "images/gallery/bed68e76a3538ed1b7fece8f1187e9a1.jpg",
  "images/gallery/bfae9a64d7a287e529ca77836c89cb91.jpg",
  "images/gallery/c027aa60f656a1b2e5991d29bb238843.jpg",
  "images/gallery/c33fe33c202d845eef2606ba9dba364c.jpg",
  "images/gallery/c9609c83f4a396589d569e0f46e4490c.jpg",
  "images/gallery/d2638d36ace77f80ccc2f65553626020.jpg",
  "images/gallery/dc8b32eec79a7e7ac54858a9fe052182.jpg",
  "images/gallery/dfcdf5a9781b0e027e1c90e04f16fadc.jpg",
  "images/gallery/e6fb1c6ae22c1ca38fdcd511bc8ef624.jpg",
  "images/gallery/ea300728ccc3ad618c4f85caa420d5b4.jpg",
  "images/gallery/ec9c49339e91bb4bac9a2e4407e1196b.jpg",
  "images/gallery/f12b44edde4342a17632e6a85752387a.jpg",
  "images/gallery/f30bd80ac9ca846d3d39a6845dc0846f.jpg",
  "images/gallery/f54afd45664dac4a862d0d63a546ae84.jpg",
  "images/gallery/faf41bfaec82de19507298c6333cf1a4.jpg",
  "images/gallery/fcc937a4c9c323e5b0d194b31dbb7326.jpg",
  "images/gallery/58ee3d6d55fbb2fb20400512b0a24cae4723dcbe.jpeg"
];
let gIdx = 0;
const galOverlay = document.getElementById('galleryOverlay');
const galImg = document.getElementById('galleryImg');
const galCounter = document.getElementById('galleryCounter');

function showGallery(idx) {
  if (idx < 0 || idx >= folderImgs.length) return;
  gIdx = idx;
  galImg.src = folderImgs[gIdx];
  galCounter.textContent = (gIdx + 1) + ' / ' + folderImgs.length;
  document.getElementById('galleryEndHint').textContent = 
    (gIdx === folderImgs.length - 1) ? '当前是最后一张' : '';
}

// 随机选头像 - 已改用文字按钮

document.getElementById('navAlbumBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  document.body.classList.add('gallery-open');
  var randIdx = Math.floor(Math.random() * folderImgs.length);
  document.body.classList.add('gallery-open');
  galOverlay.classList.add('show');
  showGallery(randIdx);
});

// 关于我
document.getElementById('navAboutBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  document.body.classList.add('gallery-open');
  document.getElementById('aboutOverlay').classList.add('show');
});

// 时钟
function updateClock() {
  var now = new Date();
  var h = now.getHours().toString().padStart(2,'0');
  var m = now.getMinutes().toString().padStart(2,'0');
  var s = now.getSeconds().toString().padStart(2,'0');
  document.getElementById('clockDisplay').textContent = h + ':' + m + ':' + s;
}
updateClock();
setInterval(updateClock, 1000);

// 优雅音乐
document.getElementById('navMusicBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  if (window.musicPlaying) {
    window.musicPlaying = false;
    if (window.musicCtx) { window.musicCtx.close(); window.musicCtx = null; }
    document.getElementById('navMusicBtn').textContent = '播放音乐';
    return;
  }
  var ctx = new (window.AudioContext || window.webkitAudioContext)();
  window.musicCtx = ctx;
  window.musicPlaying = true;
  document.getElementById('navMusicBtn').textContent = '停止音乐';
  
  // 主音量
  var masterGain = ctx.createGain();
  masterGain.gain.value = 0.4;
  masterGain.connect(ctx.destination);
  
  // 旋律音符和和弦进行
  var melody = [
    {note: 523.25, time: 0, dur: 1.2},
    {note: 587.33, time: 1.0, dur: 0.8},
    {note: 659.25, time: 1.8, dur: 1.0},
    {note: 523.25, time: 2.8, dur: 0.6},
    {note: 659.25, time: 3.4, dur: 0.8},
    {note: 783.99, time: 4.2, dur: 1.5},
    {note: 587.33, time: 5.7, dur: 0.6},
    {note: 659.25, time: 6.3, dur: 0.8},
    {note: 523.25, time: 7.1, dur: 1.8}
  ];
  
  function playSequence(startTime) {
    // 播放旋律
    melody.forEach(function(m) {
      var osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = m.note;
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.001, startTime + m.time);
      g.gain.linearRampToValueAtTime(0.18, startTime + m.time + 0.15);
      g.gain.linearRampToValueAtTime(0.12, startTime + m.time + m.dur * 0.5);
      g.gain.exponentialRampToValueAtTime(0.001, startTime + m.time + m.dur);
      osc.connect(g);
      g.connect(masterGain);
      osc.start(startTime + m.time);
      osc.stop(startTime + m.time + m.dur);
    });
    
    // 背景和弦（柔和铺垫）
    var chords = [
      {freqs: [261.63, 392.00, 523.25], time: 0},
      {freqs: [293.66, 440.00, 587.33], time: 3.5},
      {freqs: [329.63, 493.88, 659.25], time: 7.0}
    ];
    chords.forEach(function(ch) {
      ch.freqs.forEach(function(f) {
        var o2 = ctx.createOscillator();
        o2.type = 'sine';
        o2.frequency.value = f;
        var g2 = ctx.createGain();
        g2.gain.setValueAtTime(0.001, startTime + ch.time);
        g2.gain.linearRampToValueAtTime(0.09, startTime + ch.time + 0.5);
        g2.gain.linearRampToValueAtTime(0.06, startTime + ch.time + 2.5);
        g2.gain.exponentialRampToValueAtTime(0.001, startTime + ch.time + 4);
        o2.connect(g2);
        g2.connect(masterGain);
        o2.start(startTime + ch.time);
        o2.stop(startTime + ch.time + 4);
      });
    });
  }
  
  playSequence(ctx.currentTime);
  // 循环
  function loop() {
    if (!window.musicPlaying) return;
    setTimeout(function() {
      if (!window.musicPlaying) return;
      playSequence(ctx.currentTime);
      loop();
    }, 9500);
  }
  loop();
});

// 我的爱好
document.getElementById('navHobbyBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  document.body.classList.add('gallery-open');
  document.getElementById('hobbyOverlay').classList.add('show');
});

// 小游戏
var gameScore = 0, gameTime = 30, gameRunning = false, gameTimer = null, gameStarTimer = null;
var gameMode = 1; // 1=点星星 2=接星星
var catchKeys = {left:false,right:false};
var basketLeft = 50;

function switchGame(mode) {
  if (gameRunning) return;
  gameMode = mode;
  document.getElementById('gameTab1').style.background = mode === 1 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)';
  document.getElementById('gameTab1').style.color = mode === 1 ? '#FFF' : 'rgba(255,255,255,0.5)';
  document.getElementById('gameTab2').style.background = mode === 2 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)';
  document.getElementById('gameTab2').style.color = mode === 2 ? '#FFF' : 'rgba(255,255,255,0.5)';
  document.getElementById('gameTab3').style.background = mode === 3 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)';
  document.getElementById('gameTab3').style.color = mode === 3 ? '#FFF' : 'rgba(255,255,255,0.5)';
  document.getElementById('gameTimer').style.display = mode === 3 ? 'none' : '';
  document.getElementById('gameScore').style.display = mode === 3 ? 'none' : '';
  document.getElementById('gameArea').className = 'game-area' + (mode === 2 ? ' catch-game' : '');
  resetGame();
  if (mode === 2) {
    document.getElementById('gameArea').innerHTML = '<div class="catch-basket" id="catchBasket">🧺</div>';
    basketLeft = 50;
  } else if (mode === 3) {
    document.getElementById('gameArea').innerHTML = '<div style="padding:20px;color:#C0D8FF;font-size:16px;"><div style="margin-bottom:12px;">猜一个 1~100 的数字</div><input id="guessInput" style="width:80px;padding:8px;border:none;border-radius:8px;text-align:center;font-size:22px;font-family:inherit;outline:none;background:rgba(255,255,255,0.1);color:#FFF;" maxlength="3" placeholder="?"><div id="guessHint" style="margin-top:12px;font-size:18px;color:#FFD700;">输入数字开始</div><div id="guessCount" style="margin-top:6px;font-size:14px;color:#B0C8D8;"></div><div style="margin-top:16px;font-size:12px;color:rgba(255,255,255,0.3);line-height:1.6;">💡 提示：输入数字后点「猜！」或按回车<br>系统会提示「大了」或「小了」<br>直到猜中为止！</div></div>';
    document.getElementById('gameStartBtn').textContent = '猜！';
    document.getElementById('gameStartBtn').onclick = null;
    // 猜数字游戏用单独的onclick
    var secretNum = Math.floor(Math.random() * 100) + 1;
    var guessCount = 0;
    document.getElementById('gameStartBtn').onclick = function() {
      var input = document.getElementById('guessInput');
      if (!input) return;
      var val = parseInt(input.value);
      if (!val || val < 1 || val > 100) { document.getElementById('guessHint').textContent = '请输入 1~100 的数字'; return; }
      guessCount++;
      if (val === secretNum) {
        document.getElementById('guessHint').textContent = '🎉 猜对了！就是 ' + secretNum + '，用了 ' + guessCount + ' 次';
        document.getElementById('gameStartBtn').textContent = '再来一局';
        document.getElementById('gameStartBtn').onclick = function() { switchGame(3); };
      } else if (val < secretNum) {
        document.getElementById('guessHint').textContent = '⬆️ 小了，再大一点';
        document.getElementById('guessCount').textContent = '已猜 ' + guessCount + ' 次';
        input.value = ''; input.focus();
      } else {
        document.getElementById('guessHint').textContent = '⬇️ 大了，再小一点';
        document.getElementById('guessCount').textContent = '已猜 ' + guessCount + ' 次';
        input.value = ''; input.focus();
      }
    };
    var keyHandler = function(e) {
      if (e.key === 'Enter') document.getElementById('gameStartBtn').click();
    };
    document.getElementById('guessInput').addEventListener('keydown', keyHandler);
    setTimeout(function() { var inp = document.getElementById('guessInput'); if (inp) inp.focus(); }, 100);
  }
}

document.getElementById('navGameBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  document.body.classList.add('gallery-open');
  document.getElementById('gameOverlay').style.display = 'flex';
  switchGame(1);
});

function resetGame() {
  gameScore = 0; gameTime = 30; gameRunning = false;
  document.getElementById('gameScore').textContent = '得分：0';
  document.getElementById('gameTimer').textContent = '⏱ 30秒';
  document.getElementById('gameStartBtn').textContent = '开始游戏';
  if (gameTimer) clearInterval(gameTimer);
  if (gameStarTimer) clearInterval(gameStarTimer);
}

document.getElementById('gameStartBtn').addEventListener('click', function() {
  if (gameRunning) return;
  gameRunning = true;
  gameScore = 0; gameTime = 30;
  document.getElementById('gameScore').textContent = '得分：0';
  document.getElementById('gameTimer').textContent = '⏱ 30秒';
  document.getElementById('gameStartBtn').textContent = '游戏中...';
  
  if (gameMode === 1) {
    // ⭐ 点星星
    document.getElementById('gameArea').innerHTML = '';
    gameTimer = setInterval(function() {
      gameTime--;
      document.getElementById('gameTimer').textContent = '⏱ ' + gameTime + '秒';
      if (gameTime <= 0) {
        clearInterval(gameTimer); clearInterval(gameStarTimer); gameRunning = false;
        document.getElementById('gameStartBtn').textContent = '得分：' + gameScore + '分 再来一局';
        document.getElementById('gameArea').innerHTML = '<div style="color:#FFD700;font-size:20px;padding-top:100px;">⭐ 得分：' + gameScore + '</div>';
      }
    }, 1000);
    function addStar() {
      if (!gameRunning) return;
      var area = document.getElementById('gameArea');
      var star = document.createElement('div');
      star.className = 'game-star';
      star.textContent = '⭐'; star.style.left = (5 + Math.random() * 85) + '%';
      star.style.top = '-10px';
      star.style.animation = 'gameFall ' + (1.2 + Math.random() * 1) + 's linear forwards';
      star.style.fontSize = (14 + Math.random() * 10) + 'px';
      star.addEventListener('click', function(e) { e.stopPropagation(); if (!gameRunning) return; gameScore++; document.getElementById('gameScore').textContent = '得分：' + gameScore; this.remove(); });
      area.appendChild(star);
      setTimeout(function() { if (star.parentNode) star.remove(); }, 2500);
    }
    addStar();
    gameStarTimer = setInterval(addStar, 250);
    
  } else if (gameMode === 2) {
    // 🧺 接星星
    document.getElementById('gameArea').innerHTML = '<div class="catch-basket" id="catchBasket">🧺</div>';
    basketLeft = 50;
    document.getElementById('catchBasket').style.left = '50%';
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') { basketLeft = Math.max(5, basketLeft - 4); if (document.getElementById('catchBasket')) document.getElementById('catchBasket').style.left = basketLeft + '%'; }
      if (e.key === 'ArrowRight') { basketLeft = Math.min(90, basketLeft + 4); if (document.getElementById('catchBasket')) document.getElementById('catchBasket').style.left = basketLeft + '%'; }
    });
    
    gameTimer = setInterval(function() {
      gameTime--;
      document.getElementById('gameTimer').textContent = '⏱ ' + gameTime + '秒';
      if (gameTime <= 0) {
        clearInterval(gameTimer); clearInterval(gameStarTimer); gameRunning = false;
        document.getElementById('gameStartBtn').textContent = '得分：' + gameScore + '分 再来一局';
        document.getElementById('gameArea').innerHTML = '<div style="color:#FFD700;font-size:20px;padding-top:100px;">🧺 得分：' + gameScore + '</div>';
      }
    }, 1000);
    
    function dropItem() {
      if (!gameRunning) return;
      var area = document.getElementById('gameArea');
      var el = document.createElement('div');
      el.className = 'catch-fall';
      var colors = ['#FFD700','#FFB7C5','#C0D8FF','#E8D0FF'];
      el.style.background = colors[Math.floor(Math.random()*colors.length)];
      el.style.left = (5 + Math.random() * 85) + '%';
      el.style.boxShadow = '0 0 8px ' + el.style.background;
      el.style.animationDuration = (1.5 + Math.random() * 1) + 's';
      area.appendChild(el);
      
      var check = setInterval(function() {
        if (!el.parentNode) { clearInterval(check); return; }
        var basket = document.getElementById('catchBasket');
        if (!basket) { clearInterval(check); return; }
        var elLeft = parseFloat(el.style.left);
        var elTop = parseFloat(getComputedStyle(el).transform.split(',')[5] || 0);
        if (elTop > 240 && Math.abs(elLeft - basketLeft) < 8) {
          gameScore++; document.getElementById('gameScore').textContent = '得分：' + gameScore;
          el.remove(); clearInterval(check);
        }
      }, 50);
      
      setTimeout(function() { if (el.parentNode) el.remove(); }, 5000);
    }
    
    for (var i = 0; i < 3; i++) setTimeout(dropItem, i * 300);
    gameStarTimer = setInterval(dropItem, 600);
  }
  
  else if (gameMode === 3) {
    // 🔢 猜数字 — 用 onclick 处理，不触发外层逻辑
    return;
  }
});

document.getElementById('gameOverlay').addEventListener('click', function(e) {
  if (e.target === this) { this.style.display = 'none'; document.body.classList.remove('gallery-open'); resetGame(); }
});

// 联系我
document.getElementById('navContactBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  document.body.classList.add('gallery-open');
  document.getElementById('contactOverlay').style.display = 'flex';
});

// 添加评论
function addComment() {
  var input = document.getElementById('msgInput');
  var text = input.value.trim();
  if (!text) return;
  var now = new Date();
  var time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
  var item = document.createElement('div');
  item.className = 'comment-item';
  item.innerHTML = text + ' <span class="time">' + time + '</span>';
  document.getElementById('commentList').appendChild(item);
  input.value = '';
}

document.getElementById('hobbyOverlay').addEventListener('click', function(e) {
  if (e.target === this) { this.classList.remove('show'); document.body.classList.remove('gallery-open'); }
});
document.getElementById('contactOverlay').addEventListener('click', function(e) {
  if (e.target === this) { this.style.display = 'none'; document.body.classList.remove('gallery-open'); }
});
document.getElementById('galleryPrev').addEventListener('click', function() {
  showGallery(gIdx - 1);
});
document.getElementById('galleryNext').addEventListener('click', function() {
  showGallery(gIdx + 1);
});
galOverlay.addEventListener('click', function(e) {
  if (e.target === galOverlay) {
    document.body.classList.remove('gallery-open');
    galOverlay.classList.remove('show');
  }
});

// 作品集下拉
document.getElementById('navPortfolioBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  document.getElementById('portfolioDropdown').classList.toggle('show');
});
document.addEventListener('click', function() {
  document.getElementById('portfolioDropdown').classList.remove('show');
});
