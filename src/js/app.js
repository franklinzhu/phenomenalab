import '../css/style.css';
import 'jquery';
import DeviceChecker from './handlers/DeviceChecker';
import Assets from './handlers/assetHandler';
import Projects from './handlers/projectHandler';
var MobileDetect = require('mobile-detect');

//preload all thumbnails
var assets = new Assets(
  'futureofmusic',
  'gravity',
  'helloplaynye',
  'jane',
  'myth',
  'offf',
  'pyramind',
  'redaxes',
  'sono',
  'thewalk'
);
var projects;
var deviceChecker = new DeviceChecker();

function init() {
  var isRetina = deviceChecker.is_retina();
  var md = new MobileDetect(window.navigator.userAgent);
  var projectNum = 10; //
  projects = new Projects(
    md.mobile(), //whetherisMobile
    isRetina, //whetherisRetina
    projectNum, //number of projects
    assets.imgs, //load all the Projects imgs
    assets.playerURLs, //load all the projects links
    assets.projectInfo, //load all the projects links
    441, //project block width
    248, //project block height
    8, //gap width between projects blocks
    2 //ho wmany projects in a row
  );
}

function animate() {
  requestAnimationFrame(animate);
  projects.render();
}

document.addEventListener('DOMContentLoaded', function() {
  if (assets.progress == assets.imgs.length) {
    $('#loader')
      .fadeOut(500);
    init();
    animate();
  }
});
