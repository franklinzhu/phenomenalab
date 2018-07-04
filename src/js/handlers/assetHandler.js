import 'three';
var MobileDetect = require('mobile-detect');

export default function Assets(
  _THUMB0,
  _THUMB1,
  _THUMB2,
  _THUMB3,
  _THUMB4,
  _THUMB5,
  _THUMB6,
  _THUMB7,
  _THUMB8,
  _THUMB9
) {
  this.urls = [
    _THUMB0,
    _THUMB1,
    _THUMB2,
    _THUMB3,
    _THUMB4,
    _THUMB5,
    _THUMB6,
    _THUMB7,
    _THUMB8,
    _THUMB9
  ];
  this.imgs = [];
  this.progress = 0;
  this.md = new MobileDetect(window.navigator.userAgent);

  var manager = new THREE.LoadingManager();
  manager.onLoad = function () {
    // console.log('Loading done');
    $('#loader').fadeOut(1500);
  };
  var loader = new THREE.TextureLoader(manager);

  if (this.md.mobile()) {
    for (var i = 0; i < this.urls.length; i++) {
      var texture = loader.load(
        require('./../../../static/imgs/project/' + this.urls[i] + '.png')
      );
      var mat = new THREE.MeshBasicMaterial({
        map: texture
      });
      this.imgs.push(mat);
      this.progress++;
    }
  } else {
    for (var j = 0; j < this.urls.length; j++) {
      var textureS = loader.load(
        require('./../../../static/imgs/project/' + this.urls[j] + '.png')
      );
      var matS = new THREE.MeshStandardMaterial({
        map: textureS,
        roughness: 1.0
      });
      this.imgs.push(matS);
      this.progress++;
    }
  }

  this.init();
}

Assets.prototype.init = function () {
  this.projectMainVidURLs = [
    'https://player.vimeo.com/video/207461532', //futureofmusic
    'https://player.vimeo.com/video/233104062', //gravity
    'https://player.vimeo.com/video/159760813', //helloplaynye
    'https://player.vimeo.com/video/162052542', //jane
    'https://player.vimeo.com/video/147616989', //myth
    'https://player.vimeo.com/video/235253501', //offf
    'https://player.vimeo.com/video/150122941', //pyramind
    'https://player.vimeo.com/video/187690451', //redaxes
    'http://sono.livyatanim.com/', //sono
    'https://player.vimeo.com/video/166021791' //thewalk
  ];

  this.projectInfo = [
    '<p>Future of Music</p>', //futureofmusic
    '<p>Gravity</p>', //gravity
    '<p>HELLO PLAY - NYE PROMO</p> Phenomena Labs collabrated with director Greg Barth to create this promotional video for Hello Play, a Belgian online electronic music platform. The mission was to create the 3D physical simulations that were later on 3D printed and shot on set.<br><br><br> Featured on:<br><br>Fubiz, Creative review "Ads of The Week", Trendhunter, PSFK.com<br>Stash Media, Shots Magazine, AOL go Buzz60, Laughing Squid<br>Gizmodo, Behance Gallery, Nice Fucking Graphic, LBBOnline, Viralstack<br>3DPrint.com, 3dprintingindustry.com, 3Ders.org, Creative Pool Magazine<br><br><br>Making of Video:', //helloplaynye
    '<p>Jane</p>', //jane
    '<p>Myth</p>', //myth
    '<p>OFFF</p>', //offf
    '<p>Pyramind</p>', //pyramind
    '<p>Red Axes</p>', //redaxes
    '<p>Sono</p>', //sono
    '<p>The Walk</p>' //thewalk
  ];

  this.projectMakinVidURLs = [
    'https://player.vimeo.com/video/207461532', //futureofmusic
    'https://player.vimeo.com/video/233104062', //gravity
    'https://player.vimeo.com/video/159760813', //helloplaynye
    'https://player.vimeo.com/video/162052542', //jane
    'https://player.vimeo.com/video/147616989', //myth
    'https://player.vimeo.com/video/235253501', //offf
    'https://player.vimeo.com/video/150122941', //pyramind
    'https://player.vimeo.com/video/187690451', //redaxes
    'http://sono.livyatanim.com/', //sono
    'https://player.vimeo.com/video/166021791' //thewalk
  ];

  this.projectCredits = [
    'Credits:', //futureofmusic
    'Credits:', //gravity
    'Credits:<br><br>Director - Greg Barth<br>Production Company - Blinkink<br>Client - Digizik', //helloplaynye
    'Credits:', //jane
    'Credits:', //myth
    'Credits:', //offf
    'Credits:', //pyramind
    'Credits:', //redaxes
    'Credits:', //sono
    'Credits:' //thewalk
  ];
};
