export default function Actors(
  _WIDTH,
  _HEIGHT,
  _PROJECTGAP,
  _ROW,
  _PROJECTNUM,
  _PROJECTTHUMB,
  _SCENE
) {
  this.width = _WIDTH;
  this.height = _HEIGHT;
  this.gap = _PROJECTGAP; //8;
  this.row = _ROW; //2;
  this.projectNum = _PROJECTNUM;
  this.projectMat = _PROJECTTHUMB;
  this.scene = _SCENE;

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
        color: 'rgb(89,97,105)'
      }),
      new THREE.MeshStandardMaterial({
        color: 'rgb(89,97,105)'
      }),
      new THREE.MeshStandardMaterial({
        color: 'rgb(89,97,105)'
      }),
      new THREE.MeshStandardMaterial({
        color: 'rgb(89,97,105)'
      }),
      this.projectMat[i],
      new THREE.MeshStandardMaterial({
        color: 'rgb(89,97,105)'
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
  var mshMat = new THREE.MeshStandardMaterial({
    color: 'rgb(89,97,105)',
    alphaMap: texture,
    transparent: true
  });
  var mshFloor = new THREE.Mesh(mshGeo, mshMat);
  mshFloor.name = 'plane';
  mshFloor.position.z = 100;

  this.group.add(mshFloor);

  this.group.rotation.set(-Math.PI / 2, 0, 0);
  this.group.position.y = -2200;
  this.scene.add(this.group);

  var dirLight = new THREE.DirectionalLight(0xffffff, 3);
  dirLight.position.set(20, 10, 6);
  this.scene.add(dirLight);
  var ambientLight = new THREE.AmbientLight(0xffffff, 1);
  this.scene.add(ambientLight);

  this.initAnimation();
};

Actors.prototype.initAnimation = function() {
  TweenMax.to(this.group.position, 3, {
    y: 0
  });
};
