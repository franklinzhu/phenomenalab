if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var group, camera, scene, raycaster, renderer;
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();

var projects;
var thumbnails;

var depthMaterial, effectComposer, depthRenderTarget;
var ssaoPass;

init();
animate();

function Image(_THUMB0, _THUMB1, _THUMB2, _THUMB3, _THUMB4, _THUMB5, _THUMB6, _THUMB7, _THUMB8, _THUMB9){

  var path = "assets/thumbs/";
  var format = '.png';
  var urls = [path + _THUMB0 + format,
              path + _THUMB1 + format,
              path + _THUMB2 + format,
              path + _THUMB3 + format,
              path + _THUMB4 + format,
              path + _THUMB5 + format,
              path + _THUMB6 + format,
              path + _THUMB7 + format,
              path + _THUMB8 + format,
              path + _THUMB9 + format]
  this.material = [];

  for(var i = 0; i < urls.length; i++){
    var texture = new THREE.TextureLoader().load( urls[i] );
    var mat = new THREE.MeshStandardMaterial({map: texture, transparent: true});
    this.material.push(mat);
  }

}


function Project(_PROJECTNUM, _PROJECTTHUMB, _PROJECTWIDTH, _PROJECTHEIGHT, _PROJECTGAP, _ROW, _CAMERA, _MOUSE, _RAYCASTER){

  this.projectMat = _PROJECTTHUMB;
  this.projects = [];
  this.projectNum = _PROJECTNUM;//8;
  this.width = _PROJECTWIDTH;//200;
  this.height =  _PROJECTHEIGHT;//width/1.33;
  this.gap = _PROJECTGAP;//5;
  this.row = _ROW;//3;
  var thickness = 30;
  var geo = new THREE.BoxBufferGeometry( this.width, this.height, thickness );
  geo.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,thickness/2));
  var group = new THREE.Group();
  var t = 0;
  var loader = new THREE.OBJLoader();

  this.camera = _CAMERA;
  this.mouse = _MOUSE;
  this.raycaster = _RAYCASTER;
  var INTERSECTED;

  for(var i = 0; i < this.projectNum; i ++){
      var mat = [
              new THREE.MeshStandardMaterial({color: 'rgb(89,97,105)'}),
              new THREE.MeshStandardMaterial({color: 'rgb(89,97,105)'}),
              new THREE.MeshStandardMaterial({color: 'rgb(89,97,105)'}),
              new THREE.MeshStandardMaterial({color: 'rgb(89,97,105)'}),
              this.projectMat[i],
              new THREE.MeshStandardMaterial({color: 'rgb(89,97,105)'})
      ]

      console.log(mat[4]);
      var msh = new THREE.Mesh(geo, mat);
      msh.position.x = (i - Math.floor(i/this.row) * this.row) * (this.width + this.gap) - (this.row -1)*0.5*(this.width + this.gap);
      msh.position.y = (Math.floor(i/this.row)) * (-1)*(this.height + this.gap) + (Math.ceil(this.projectNum/this.row)-1) * 0.5 * (this.height + this.gap);
      msh.position.z = 0;
      this.projects.push(msh);
      group.add(msh);
  }

  group.rotation.set(-Math.PI/2,0,0);

  this.component = group;

  this.hover = function(){

    // t += 0.02;

    var selectedObjects = [];

    function addSelectedObject( object ) {
      selectedObjects = [];
      selectedObjects.push( object );
    }

    var from = {
         x: this.camera.position.x,
         y: this.camera.position.y,
         z: this.camera.position.z
    };

    var to = {};

    raycaster.setFromCamera( this.mouse, this.camera );
    var intersects = raycaster.intersectObjects( this.component.children );
    if ( intersects.length > 0 ) {
					// if ( INTERSECTED != intersects[ 0 ].object ) {
    //         if ( INTERSECTED ) INTERSECTED.material[4].metalness = 0.5;
				// 		INTERSECTED = intersects[ 0 ].object;
    //         INTERSECTED.material[4].metalness = 0.4;
    //         //INTERSECTED.scale.z = 1 + Math.abs(Math.sin(t)) * 5;
    //         //console.log(INTERSECTED.position.x);
    //         // to = {
    //         //   x: INTERSECTED.position.x,
    //         //   y: INTERSECTED.position.z + 1000,
    //         //   z: -INTERSECTED.position.y
    //         // };


    //         // TweenMax.to(this.camera.position, 10, to);
    //         // this.camera.lookAt(new THREE.Vector3(INTERSECTED.position.x,INTERSECTED.position.y,0));
    //         // console.log(this.camera.position);
					
				// } else {
    //       //INTERSECTED.scale.z = 1;
    //       if ( INTERSECTED ) INTERSECTED.material[4].metalness = 0.5;
    //       if ( INTERSECTED )TweenMax.to(INTERSECTED.scale, 1, {z:1});
    //       //TweenMax.to(INTERSECTED.scale, 1, {z:1});
    //       //console.log(INTERSECTED);
				// 	INTERSECTED = null;

				// }
        //INTERSECTED = intersects[ 0 ].object;
        var selectedObject = intersects[ 0 ].object;
        addSelectedObject(selectedObject);
     
        TweenMax.to(selectedObjects[0].scale, 1, {z:8,  onComplete:function(){
           TweenMax.to(selectedObjects[0].scale, 1, {z:1});
        }});

        var d = (selectedObjects[0].position.x + selectedObjects[0].position.y)/2;

        for(var i = 0; i < this.component.children.length; i ++){
          if(this.component.children[i] != selectedObjects[0].object){
            TweenMax.to(this.component.children[i].scale, 1, {z:1 + Math.abs(Math.sin(i + d)) * 0.8});
          }
        }
  
    }else{
        for(var i = 0; i < this.component.children.length; i ++){
          TweenMax.to(this.component.children[i].scale, 1, {z:1});
        }
    }
  }
}



function init() {

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor(0xffffff);
  container.appendChild( renderer.domElement );

  // camera
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set(800,1200,1200);
  camera.lookAt(new THREE.Vector3(0,0,0));
  scene.add( camera );

  // light
  var dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
  dirLight.position.set( 20, 10, 6 );
  scene.add( dirLight );
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);


  var projectNum = 10;
  //addAllThumbNails
  thumbnails = new Image('gravity', 'helloplaynye', 'jane', 'myth', 'offf', 'pyramind', 'redaxes', 'sono', 'thewalk', 'vans');
  //addAllProjects
  projects = new Project( projectNum, thumbnails.material, 441, 248, 2, 2, camera, mouse, raycaster);//_PROJECTNUM, _PROJECTTHUMB, _PROJECTWIDTH, _PROJECTHEIGHT, _PROJECTGAP, _ROW, _CAMERA, _MOUSE, _RAYCASTER
  scene.add(projects.component);


  // Init postprocessing
  initPostprocessing();


  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  window.addEventListener( 'resize', onWindowResize, false );

}

function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  // Resize renderTargets
  ssaoPass.uniforms[ 'size' ].value.set( window.innerWidth, window.innerHeight );
  var pixelRatio = renderer.getPixelRatio();
  var newWidth  = Math.floor( window.innerWidth / pixelRatio ) || 1;
  var newHeight = Math.floor( window.innerHeight / pixelRatio ) || 1;
  depthRenderTarget.setSize( newWidth, newHeight );
  effectComposer.setSize( newWidth, newHeight );

}


function animate() {

  requestAnimationFrame( animate );
  render();

}

function render() {

    projects.hover();
    // scene.overrideMaterial = depthMaterial;
    // renderer.render( scene, camera, depthRenderTarget, true );
    // // Render renderPass and SSAO shaderPass
    // scene.overrideMaterial = null;
    // effectComposer.render();
    renderer.render(scene, camera);

}
