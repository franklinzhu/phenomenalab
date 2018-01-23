if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var group, camera, scene, raycaster, renderer;
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();

var projects;
var thumbnails;

// var depthMaterial, effectComposer, depthRenderTarget;
// var ssaoPass;

init();
animate();

function init() {

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor('rgb(227,229,233)');
  container.appendChild( renderer.domElement );

  // camera
  camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set(1200,1800,2200);
  camera.lookAt(new THREE.Vector3(0,-100,0));
  scene.add( camera );

  // light
  var dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
  dirLight.position.set( 20, 10, 6 );
  scene.add( dirLight );
  var ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  //Projects
  var projectNum = 10;
  //addAllThumbNails
  thumbnails = new Image('gravity', 'helloplaynye', 'jane', 'myth', 'offf', 'pyramind', 'redaxes', 'sono', 'thewalk', 'vans');
  //addAllProjects
  projects = new Project( projectNum, thumbnails.material, 441, 248, 2, 2, camera, mouse, raycaster);//_PROJECTNUM, _PROJECTTHUMB, _PROJECTWIDTH, _PROJECTHEIGHT, _PROJECTGAP, _ROW, _CAMERA, _MOUSE, _RAYCASTER
  scene.add(projects.component);

  // Init postprocessing
  // initPostprocessing();

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  window.addEventListener( 'resize', onWindowResize, false );

}

function onDocumentMouseMove( event ) {

	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function onDocumentMouseDown( event ){

  projects.mouseDown();

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  // Resize renderTargets
  // ssaoPass.uniforms[ 'size' ].value.set( window.innerWidth, window.innerHeight );
  // var pixelRatio = renderer.getPixelRatio();
  // var newWidth  = Math.floor( window.innerWidth / pixelRatio ) || 1;
  // var newHeight = Math.floor( window.innerHeight / pixelRatio ) || 1;
  // depthRenderTarget.setSize( newWidth, newHeight );
  // effectComposer.setSize( newWidth, newHeight );

}


function animate() {

  requestAnimationFrame( animate );
  render();

}

function render() {

  projects.mouseHover();
  renderer.render(scene, camera);
  // scene.overrideMaterial = depthMaterial;
  // renderer.render( scene, camera, depthRenderTarget, true );
  // // Render renderPass and SSAO shaderPass
  // scene.overrideMaterial = null;
  // effectComposer.render();

}
