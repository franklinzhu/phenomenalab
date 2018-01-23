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

  this.camera = _CAMERA;
  this.mouse = _MOUSE;
  this.raycaster = _RAYCASTER;

  var originalPosition = this.camera.position.clone();
  var originalRotation = this.camera.rotation.clone();

  //geometryAxisAdjustment
  var thickness = 15;
  var geo = new THREE.BoxBufferGeometry( this.width, this.height, thickness );
  geo.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,thickness/2));
  var group = new THREE.Group();

  //raycasterStuffs
  var noSelect;
  var INTERSECTED;
  var selectedObjects = [];
  function addSelectedObject( object ) {
    selectedObjects = [];
    selectedObjects.push( object );
  }


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
      group.add(msh);
  }

  group.rotation.set(-Math.PI/2,0,0);

  this.component = group;

  this.mouseHover = function(){

    raycaster.setFromCamera( this.mouse, this.camera );
    var intersects = raycaster.intersectObjects( this.component.children );
    if ( intersects.length > 0 ) {

        var selectedObject = intersects[ 0 ].object;
        addSelectedObject(selectedObject);

        TweenMax.to(selectedObjects[0].scale, 3, {z:7,  onComplete:function(){
           TweenMax.to(selectedObjects[0].scale, 3, {z:1});
        }});

        var d = (selectedObjects[0].position.x + selectedObjects[0].position.y)/2;

        for(var i = 0; i < this.component.children.length; i ++){
          if(this.component.children[i] != selectedObjects[0].object){
            TweenMax.to(this.component.children[i].scale, 3, {z:1.0 + Math.abs(Math.sin(i + d)) * 0.8});
          }
        }

        noSelect = false;

    }else{
        for(var i = 0; i < this.component.children.length; i ++){
          TweenMax.to(this.component.children[i].scale, 3, {z:1});
        }

        noSelect = true;
    }

  }

    this.mouseDown = function(){
      var zoom = 700;

      if(noSelect == false){
        TweenMax.to(this.camera.position, 7.5, {
          x: selectedObjects[0].position.x,
          y: selectedObjects[0].position.z + zoom,
          z: -selectedObjects[0].position.y,
        })

        TweenMax.to(this.camera.rotation, 8, {
          x: -Math.PI/2,
          y: 0,
          z: 0
        })
      }else{
        TweenMax.to(this.camera.position, 6, {
          x: originalPosition.x,
          y: originalPosition.y,
          z: originalPosition.z,
        })

        TweenMax.to(this.camera.rotation, 6, {
          x: originalRotation.x,
          y: originalRotation.y,
          z: originalRotation.z
        })
      }

    }

}
