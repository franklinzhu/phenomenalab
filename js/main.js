if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

//preload all thumbnails
var thumbnails = new Image('gravity', 'helloplaynye', 'jane', 'myth', 'offf', 'pyramind', 'redaxes', 'sono', 'thewalk', 'vans');
var projects;
var renderer;

function init() {
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor('rgb(228,229,233)');
  container.appendChild( renderer.domElement );

  var projectNum = 10;
  //add all the projects (_PROJECTNUM, _PROJECTTHUMB, _PROJECTWIDTH, _PROJECTHEIGHT, _PROJECTGAP, _ROW, _RENDERER)
  projects = new Projects(projectNum, thumbnails.material, 441, 248, 8, 2, renderer, showAbout, showContact);
}

function animate() {
  requestAnimationFrame( animate );
  projects.render();
}


document.addEventListener('DOMContentLoaded', function(){
  if(thumbnails.progress == thumbnails.material.length){
    init();
    animate()
  }
});
