import "three";
import { TweenMax, Power2, TimelineLite } from "gsap";
import "jquery";
import toggleFullscreen, {
  fullscreenChange,
  isFullscreen
} from "toggle-fullscreen";

export default function Projects(
  _PROJECTNUM,
  _PROJECTTHUMB,
  _PROJECTURLS,
  _PROJECTWIDTH,
  _PROJECTHEIGHT,
  _PROJECTGAP,
  _ROW
) {
  this.projectMat = _PROJECTTHUMB;
  this.projects = [];
  this.projectNum = _PROJECTNUM; //8;
  this.width = _PROJECTWIDTH; //200;
  this.height = _PROJECTHEIGHT; //width/1.33;
  this.gap = _PROJECTGAP; //5;
  this.row = _ROW; //3;
  this.mouse = new THREE.Vector2();
  this.url = _PROJECTURLS;

  this.showAbout = 0;    //f
  this.showContact = 0;  //f
  this.interactive = 1;  //t

  this.init();
}

Projects.prototype.init = function() {
  this.scene = new THREE.Scene();

  this.camera = new THREE.PerspectiveCamera(
    25,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  this.camera.position.set(1200, 1800, 2200);
  this.camera.lookAt(new THREE.Vector3(0, -100, 0));

  this.originalCameraPosition = this.camera.position.clone();
  this.originalCameraRotation = this.camera.rotation.clone();

  this.initContents();

  this.renderer = new THREE.WebGLRenderer({ antialias: true });
  this.renderer.setPixelRatio(window.devicePixelRatio);
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  this.renderer.setClearColor("rgb(228,229,233)");
  container.appendChild(this.renderer.domElement);

  this.initUI();
};

Projects.prototype.render = function() {
  //this.group.rotation.z += 0.001;
  if (this.showAbout != 0 || this.showContact != 0 || this.interactive == 0) {
  } else {
    this.hover();
  }
  //this.moveCam();
  this.renderer.render(this.scene, this.camera);
};

Projects.prototype.initContents = function() {
  var thickness = 15;
  var geo = new THREE.BoxBufferGeometry(this.width, this.height, thickness);
  geo.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, thickness / 2));
  this.group = new THREE.Group();

  for (var i = 0; i < this.projectNum; i++) {
    var mat = [
      new THREE.MeshStandardMaterial({ color: "rgb(89,97,105)" }),
      new THREE.MeshStandardMaterial({ color: "rgb(89,97,105)" }),
      new THREE.MeshStandardMaterial({ color: "rgb(89,97,105)" }),
      new THREE.MeshStandardMaterial({ color: "rgb(89,97,105)" }),
      this.projectMat[i],
      new THREE.MeshStandardMaterial({ color: "rgb(89,97,105)" })
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
    msh.position.z = 0;
    this.projects.push(msh);
    this.group.add(msh);
  }

  this.group.rotation.set(-Math.PI / 2, 0, 0);
  this.scene.add(this.group);

  var dirLight = new THREE.DirectionalLight(0xffffff, 3);
  dirLight.position.set(20, 10, 6);
  this.scene.add(dirLight);
  var ambientLight = new THREE.AmbientLight(0xffffff, 1);
  this.scene.add(ambientLight);
};

Projects.prototype.hover = function() {
  var raycaster = new THREE.Raycaster();
  var INTERSECTED;

  this.addSelectedObject = function(object) {
    this.selectedObjects = [];
    this.selectedObjects.push(object);
  };

  raycaster.setFromCamera(this.mouse, this.camera);
  var intersects = raycaster.intersectObjects(this.group.children);
  if (intersects.length > 0) {
    this.selectedObject = intersects[0].object;

    this.addSelectedObject(this.selectedObject);

    for (var i = 0; i < this.group.children.length; i++) {
      if (this.group.children[i].uuid == this.selectedObjects[0].uuid) {
        this.selectedIndex = i;
        TweenMax.to(this.group.children[i].scale, 2, { z: 7 });
      } else {
        var d =
          (this.selectedObjects[0].position.x +
            this.selectedObjects[0].position.y) /
          2;
        TweenMax.to(this.group.children[i].scale, 2, {
          z: 1 + 2 * Math.abs(Math.sin(i + d)) * 0.8
        });
      }
    }

    this.noSelect = false;
  } else {
    for (var i = 0; i < this.group.children.length; i++) {
      TweenMax.to(this.group.children[i].scale, 3, { z: 1 });
    }

    this.noSelect = true;
  }
};

Projects.prototype.zoomCam = function() {
  var zoom = 700;

  if (this.noSelect == false) {
    this.interactive = 0;

    $("#iframe").attr("src", this.url[this.selectedIndex]);

    TweenMax.to(this.camera.position, 3, {
      x: this.selectedObjects[0].position.x,
      y: this.selectedObjects[0].position.z + zoom,
      z: -this.selectedObjects[0].position.y,
      ease: Power1.easeOut
    });

    TweenMax.to(this.camera.rotation, 3, {
      x: -Math.PI / 2,
      y: 0,
      z: 0,
      ease: Power1.easeInOut,
      onComplete: this.handlePlayer
    });
  } else {
    this.interactive = 1;
  }
};

Projects.prototype.moveCam = function() {
  this.camera.position.x += (this.mouse.x - this.camera.position.x) * 0.05;
  this.camera.position.y += (this.mouse.y - this.camera.position.y) * 0.05;

  this.camera.lookAt(this.scene.position);
};

//UI
Projects.prototype.initUI = function() {
  var about = document.getElementsByClassName("inner")[0].children[1]
    .children[0];
  var contact = document.getElementsByClassName("inner")[0].children[1]
    .children[2];
  var esc = document.getElementById("esc");
  this.topnote = document.getElementById("topnote");

  about.addEventListener("click", this.handleAbout.bind(this));
  contact.addEventListener("click", this.handleContact.bind(this));
  esc.addEventListener("click", this.handleEsc.bind(this));
  this.topnote.addEventListener("click", this.handleFullScreen.bind(this));

  document.addEventListener("mousemove", this.mouseMove.bind(this));
  document.addEventListener("mousedown", this.mouseDown.bind(this));
  window.addEventListener("resize", this.resize.bind(this));
};

Projects.prototype.handlePlayer = function() {
  $("#video").fadeIn(1000);
};

Projects.prototype.handleAbout = function() {
  if (this.interactive == 1) {
    this.showAbout = this.showAbout ^ 1;
    if (this.showContact == 1) {
      this.showContact = this.showContact ^ 1;
      $("#contact").fadeOut(500);
    }
    $("#about")
      .delay(700)
      .fadeToggle("slow", "linear");
    if (this.showAbout == 1) {
      TweenMax.to(this.group.position, 2, { y: -600 });
    } else {
      TweenMax.to(this.group.position, 2, { y: 0 });
    }
  }
};

Projects.prototype.handleContact = function() {
  if (this.interactive == 1) {
    this.showContact = this.showContact ^ 1;
    if (this.showAbout == 1) {
      this.showAbout = this.showAbout ^ 1;
      $("#about").fadeOut(500);
    }
    $("#contact")
      .delay(500)
      .fadeToggle("slow", "linear");

    if (this.showContact == 1) {
      TweenMax.to(this.group.position, 2, { y: 600 });
    } else {
      TweenMax.to(this.group.position, 2, { y: 0 });
    }
  }
};

Projects.prototype.handleEsc = function(){
  if(this.interactive == 0){
    $("#iframe").attr("src", "//:0");
    $("#video").fadeOut(100);

    TweenMax.to(this.camera.position, 2, {
          x: this.originalCameraPosition.x,
          y: this.originalCameraPosition.y,
          z: this.originalCameraPosition.z
        });
    TweenMax.to(this.camera.rotation, 2, {
          x: this.originalCameraRotation.x,
          y: this.originalCameraRotation.y,
          z: this.originalCameraRotation.z
        });

    this.interactive = 1;
    console.log("exit");
  }
}

Projects.prototype.handleFullScreen = function() {
  toggleFullscreen(this.topnote);
  this.resize();
};

Projects.prototype.mouseDown = function() {
  if (this.interactive == 1) {
    this.zoomCam();
  }
};

Projects.prototype.mouseMove = function(event) {
  event.preventDefault();
  this.mouse.x = event.clientX / window.innerWidth * 2 - 1;
  this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // this.mouse.x = ( event.clientX - window.innerWidth/2 ) / 2;
  // this.mouse.y = ( event.clientY - window.innerHeight/2 ) / 2;
};

Projects.prototype.resize = function() {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();

  this.renderer.setSize(window.innerWidth, window.innerHeight);
};
