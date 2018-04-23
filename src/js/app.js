import '../css/style.css';
import 'jquery';
import Assets from './handlers/assetHandler';
import Projects from './handlers/projectHandler';

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

function init() {
  var projectNum = 10; //
  projects = new Projects(
    projectNum, //number of projects
    assets.imgs, //load each projects thumbnails
    assets.playerURLs, //load each projects vimeo links
    assets.projectInfo, //load each projects infos
    441, //project block width
    248, //project block height
    8, //gap width between projects blocks
    2 //how many projects in a row
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
