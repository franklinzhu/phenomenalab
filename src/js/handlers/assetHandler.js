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
    console.log('Loading done');
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

  this.initURLs();
  this.initInfo();
}

Assets.prototype.initURLs = function () {
  this.playerURLs = [
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
};

Assets.prototype.initInfo = function () {
  this.projectInfo = [
    'Future of Music', //futureofmusic
    'Gravity', //gravity
    'Hello Playnye', //helloplaynye
    'Jane', //jane
    'Myth', //myth
    'OFFF', //offf
    'Pyramind', //pyramind
    'Red Axes', //redaxes
    'Sono', //sono
    'The Walk' //thewalk
  ];
};
