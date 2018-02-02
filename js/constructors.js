function Image(_THUMB0, _THUMB1, _THUMB2, _THUMB3, _THUMB4, _THUMB5, _THUMB6, _THUMB7, _THUMB8, _THUMB9){

  var path = "assets/thumbs/";
  var format = '.png';
  this.urls = [path + _THUMB0 + format,
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
  this.progress = 0;

  for(var i = 0; i < this.urls.length; i++){
    var texture = new THREE.TextureLoader().load( this.urls[i] );
    var mat = new THREE.MeshBasicMaterial({map: texture});
    this.material.push(mat);
    this.progress ++;
    console.log("thumbnails" + this.progress/this.urls.length * 100 + "%" + "loaded");
  }

}


var Projects = function(_PROJECTNUM, _PROJECTTHUMB, _PROJECTWIDTH, _PROJECTHEIGHT, _PROJECTGAP, _ROW, _RENDERER, _SHOWABOUT, _SHOWCONTACT){

  this.projectMat = _PROJECTTHUMB;
  this.projects = [];
  this.projectNum = _PROJECTNUM;//8;
  this.width = _PROJECTWIDTH;//200;
  this.height =  _PROJECTHEIGHT;//width/1.33;
  this.gap = _PROJECTGAP;//5;
  this.row = _ROW;//3;
  this.renderer = _RENDERER;
  this.mouse = new THREE.Vector2();

  this.showAbout = _SHOWABOUT;
  this.showContact = _SHOWCONTACT;

  this.init();

  document.addEventListener( 'mousemove', this.mouseMove.bind(this));
  document.addEventListener( 'mousedown', this.mouseDown.bind(this));
  window.addEventListener( 'resize', this.resize.bind(this));

}

Projects.prototype.init = function(){

  this.scene = new THREE.Scene();

  this.camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 10000 );
  this.camera.position.set(1200,1800,2200);
  this.camera.lookAt(new THREE.Vector3(0,-100,0));

  this.originalCameraPosition = this.camera.position.clone();
  this.originalCameraRotation = this.camera.rotation.clone();

  // this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
  // this.controls.addEventListener( 'change', this.render ); // remove when using animation loop
  // this.controls.enable = true;
  // this.controls.enableZoom = false;
  // this.controls.maxPolarAngle = Math.PI/2;

  var thickness = 15;
  var geo = new THREE.BoxBufferGeometry( this.width, this.height, thickness );
  geo.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,thickness/2));
  this.group = new THREE.Group();

  for(var i = 0; i < this.projectNum; i ++){
      var mat = [
              new THREE.MeshStandardMaterial({color: 'rgb(89,97,105)'}),
              new THREE.MeshStandardMaterial({color: 'rgb(89,97,105)'}),
              new THREE.MeshStandardMaterial({color: 'rgb(89,97,105)'}),
              new THREE.MeshStandardMaterial({color: 'rgb(89,97,105)'}),
              this.projectMat[i],
              new THREE.MeshStandardMaterial({color: 'rgb(89,97,105)'})
      ]

      var msh = new THREE.Mesh(geo, mat);
      msh.position.x = (i - Math.floor(i/this.row) * this.row) * (this.width + this.gap) - (this.row -1)*0.5*(this.width + this.gap);
      msh.position.y = (Math.floor(i/this.row)) * (-1)*(this.height + this.gap) + (Math.ceil(this.projectNum/this.row)-1) * 0.5 * (this.height + this.gap);
      msh.position.z = 0;
      this.projects.push(msh);
      this.group.add(msh);
  }

  this.group.rotation.set(-Math.PI/2,0,0);
  this.scene.add(this.group);

  var dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
  dirLight.position.set( 20, 10, 6 );
  this.scene.add( dirLight );
  var ambientLight = new THREE.AmbientLight(0xffffff, 1);
  this.scene.add(ambientLight);

  this.view = false;
}

Projects.prototype.render = function(){

  var raycaster = new THREE.Raycaster();
  var INTERSECTED;

  this.addSelectedObject = function( object ) {
    this.selectedObjects = [];
    this.selectedObjects.push( object );
  }

  raycaster.setFromCamera( this.mouse, this.camera );
  var intersects = raycaster.intersectObjects( this.group.children );
  if ( intersects.length > 0 ) {

      this.selectedObject = intersects[ 0 ].object;
      this.addSelectedObject(this.selectedObject);

      TweenMax.to(this.selectedObjects[0].scale, 3, {z:7,  onComplete:function(){
         TweenMax.to(this.selectedObjects[0].scale, 3, {z:1});
      }});

      var d = (this.selectedObjects[0].position.x + this.selectedObjects[0].position.y)/2;

      for(var i = 0; i < this.group.children.length; i ++){
        if(this.group.children[i] != this.selectedObjects[0].object){
          TweenMax.to(this.group.children[i].scale, 3, {z:1.0 + Math.abs(Math.sin(i + d)) * 0.8});
        }
      }

      this.noSelect = false;

  }else{
      for(var i = 0; i < this.group.children.length; i ++){
        TweenMax.to(this.group.children[i].scale, 3, {z:1});
      }

      this.noSelect = true;
  }

  if(showAbout == 1){
    TweenMax.to(this.group.position, 2, {y:-1000});
  }else{
    TweenMax.to(this.group.position, 2, {y:0});
  }

  if(showContact == 1){
    TweenMax.to(this.group.position, 2, {y:1000});
  }

  this.renderer.render(this.scene, this.camera);

}


Projects.prototype.mouseDown = function(){

  var zoom = 700;

  if(this.noSelect == false){
    TweenMax.to(this.camera.position, 2, {
      x: this.selectedObjects[0].position.x,
      y: this.selectedObjects[0].position.z + zoom,
      z: -this.selectedObjects[0].position.y,
    })

    TweenMax.to(this.camera.rotation, 2, {
      x: -Math.PI/2,
      y: 0,
      z: 0
    })
  }else{
    TweenMax.to(this.camera.position, 2, {
      x: this.originalCameraPosition.x,
      y: this.originalCameraPosition.y,
      z: this.originalCameraPosition.z,
    })

    TweenMax.to(this.camera.rotation, 2, {
      x: this.originalCameraRotation.x,
      y: this.originalCameraRotation.y,
      z: this.originalCameraRotation.z
    })

  }

}


Projects.prototype.mouseMove = function(event){

  event.preventDefault();
  this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

Projects.prototype.resize = function(){

  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();

  this.renderer.setSize( window.innerWidth, window.innerHeight );

}
