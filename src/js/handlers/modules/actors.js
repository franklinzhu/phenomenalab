export default function Actors(
  _WIDTH,
  _HEIGHT,
  _PROJECTGAP,
  _ROW,
  _PROJECTNUM,
  _PROJECTTHUMB,
  _SCENE,
  _MOBILE
) {
  this.width = _WIDTH;
  this.height = _HEIGHT;
  this.gap = _PROJECTGAP; //8;
  this.row = _ROW; //2;
  this.projectNum = _PROJECTNUM;
  this.projectMat = _PROJECTTHUMB;
  this.scene = _SCENE;
  this.md = _MOBILE;

  this.init();
}

Actors.prototype.init = function() {
  var thickness = 15;
  var geo = new THREE.BoxBufferGeometry(this.width, this.height, thickness);
  geo.applyMatrix(new THREE.Matrix4()
    .makeTranslation(0, 0, thickness / 2));
  this.group = new THREE.Group();

  for (var i = 0; i < this.projectNum; i++) {
    var mat = [
      new THREE.MeshStandardMaterial({
        color: 'rgb(99,107,115)'
      }),
      new THREE.MeshStandardMaterial({
        color: 'rgb(99,107,115)'
      }),
      new THREE.MeshStandardMaterial({
        color: 'rgb(99,107,115)'
      }),
      new THREE.MeshStandardMaterial({
        color: 'rgb(99,107,115)'
      }),
      this.projectMat[i],
      new THREE.MeshStandardMaterial({
        color: 'rgb(99,107,115)'
      })
    ];

    var msh = new THREE.Mesh(geo, mat);
    msh.position.x =
      (i - Math.floor(i / this.row) * this.row) * (this.width + this.gap) -
      (this.row - 1) * 0.5 * (this.width + this.gap);
    msh.position.y =
      Math.floor(i / this.row) * -1 * (this.height + this.gap) +
      (Math.ceil(this.projectNum / this.row) - 1) *
      0.5 *
      (this.height + this.gap);
    msh.position.z = 100;
    msh.castShadow = true;
    msh.receiveShadow = true;
    this.group.add(msh);
  }

  var mshGeo = new THREE.PlaneBufferGeometry(
    this.height * 7.5,
    this.height * 7.5,
    32
  );

  var texture = new THREE.TextureLoader()
    .load(
      require('./../../../../static/imgs/ui/webgrid.png')
    );
  var mshMat = new THREE.MeshBasicMaterial({
    color: 'rgb(89,97,105)',
    alphaMap: texture,
    transparent: true
  });
  var mshFloor = new THREE.Mesh(mshGeo, mshMat);
  mshFloor.name = 'plane';
  mshFloor.position.z = 100;

  this.group.add(mshFloor);

  if (this.md.mobile()) {
    this.group.rotation.set(0, 0, 0);
  } else {
    this.group.rotation.set(-Math.PI / 2, 0, 0);
    this.group.position.y = -2200;
  }

  this.scene.add(this.group);

  this.light = new THREE.SpotLight(0xffffff, 0.1);
  this.light.position.set(1600, 900, -600);
  this.light.castShadow = true;
  this.light.penumbra = 0.8;
  this.light.angle = Math.PI / 2;
  this.light.shadow = new THREE.LightShadow(
    new THREE.PerspectiveCamera(40, 1, 200, 20000)
  );
  this.light.shadow.bias = -0.0000022;
  this.light.shadow.mapSize.width = 8192;
  this.light.shadow.mapSize.height = 8192;
  this.scene.add(this.light);

  var ambientLight = new THREE.AmbientLight(0xffffff, 1);
  this.scene.add(ambientLight);

  this.initAnimation();
};

Actors.prototype.initAnimation = function() {
  TweenMax.to(this.group.position, 3, {
    y: 0
  });

  TweenMax.to(this.light, 4, {
    intensity: 1.8
  });
};
