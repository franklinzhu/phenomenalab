import 'three/OrbitControls';

export default function Navi(_CAMERA) {
  this.camera = _CAMERA;
  this.init();
}

Navi.prototype.init = function() {
  var degree =
    Math.PI / 2 -
    Math.asin(
      this.camera.position.y /
      this.camera.position.distanceTo(new THREE.Vector3(0, 0, 0))
    );
  this.controls = new THREE.OrbitControls(this.camera);
  this.controls.enableDamping = true;
  this.controls.dampingFactor = 0.6;
  this.controls.target = new THREE.Vector3(0, 0, 0);
  this.controls.enableZoom = false;
  this.controls.enablePan = false;
  this.controls.minPolarAngle = degree;
  this.controls.maxPolarAngle = degree;
};

Navi.prototype.update = function(
  _SHOWABOUT,
  _SHOWCONTACT,
  _INTERACTIVE
) {
  this.showAbout = _SHOWABOUT;
  this.showContact = _SHOWCONTACT;
  this.interactive = _INTERACTIVE;

  if (
    this.showAbout != 0 ||
    this.showContact != 0 ||
    this.interactive.value != 1
  ) {
    this.controls.enableRotate = false;
  } else {
    this.controls.enableRotate = true;
    this.controls.update();
  }
};
