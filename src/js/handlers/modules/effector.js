import Audios from './audios';

export default function Effector(
  _MOUSE,
  _CAMERA,
  _TARGET,
  _ASSETS,
  _MOBILE,
  _DEVICE
) {
  this.mouse = _MOUSE;
  this.camera = _CAMERA;
  this.originalCameraPosition = this.camera.position.clone();
  this.originalCameraRotation = this.camera.rotation.clone();
  this.target = _TARGET;

  this.assets = _ASSETS;
  this.mainVidURLs = this.assets.projectMainVidURLs;
  this.info = this.assets.projectInfo;
  this.makinVidURLs = this.assets.projectMakinVidURLs;
  this.credits = this.assets.projectCredits;

  this.md = _MOBILE;
  this.device = _DEVICE;

  this.showAbout = 0; //f
  this.showContact = 0; //f
  this.interactive = {
    value: 0
  }; //t
  this.interactive2 = {
    value: 1
  }; //t

  TweenMax.to(this.interactive, 3, {
    value: 1
  });

  this.raycaster = new THREE.Raycaster();
  this.audios = new Audios();
}

Effector.prototype.hover = function () {
  this.addSelectedObject = function (object) {
    this.selectedObjects = [];
    this.selectedObjects.push(object);
  };

  this.raycaster.setFromCamera(this.mouse, this.camera);
  var intersects = this.raycaster.intersectObjects(this.target.group.children);
  if (intersects.length > 0 && intersects[0].object.name !== 'plane') {
    this.selectedObject = intersects[0].object;
    this.addSelectedObject(this.selectedObject);

    for (var i = 0; i < this.target.group.children.length; i++) {
      if (this.target.group.children[i].uuid == this.selectedObjects[0].uuid) {
        this.selectedIndex = i;
        TweenMax.to(this.target.group.children[i].scale, 0.5, {
          z: 7,
          onComplete: this.audios.play(i, this.target.group.children.length)
        });
      } else {
        var d =
          (this.selectedObjects[0].position.x +
            this.selectedObjects[0].position.y) /
          2;
        TweenMax.to(this.target.group.children[i].scale, 0.5, {
          z: 1 + 2 * Math.abs(Math.sin(i + d)) * 0.8
        });
      }
    }

    this.noSelect = false;
  } else {
    for (var j = 0; j < this.target.group.children.length; j++) {
      TweenMax.to(this.target.group.children[j].scale, 0.5, {
        z: 1
      });
    }

    this.noSelect = true;
  }

  this.audios.hit = this.noSelect;
};

Effector.prototype.zoomCam = function () {
  var zoom = 700;

  if (this.noSelect == false) {
    this.interactive.value = 0;

    // $('#mainVid').prepend('<img id="theImg" src="//:0" />');
    // $('#theImg').attr('src', this.imgUrl[this.selectedIndex]);
    $('#iframe1').attr('src', this.mainVidURLs[this.selectedIndex]);
    $('#info').append(this.info[this.selectedIndex]);
    $('#iframe2').attr('src', this.makinVidURLs[this.selectedIndex]);
    $('#credits').append(this.credits[this.selectedIndex]);

    if (this.md.mobile()) {
      this.device.dispose();

      TweenMax.to(this.target.group.rotation, 2.5, {
        x: 0,
        y: 0,
        z: 0
      });

      TweenMax.to(this.camera.position, 2.5, {
        x: this.selectedObjects[0].position.x,
        y: this.selectedObjects[0].position.y,
        z: this.selectedObjects[0].position.z + zoom * 3,
        ease: Power1.easeOut,
        onComplete: this.handlePlayer
      });
    } else {
      TweenMax.to(this.camera.position, 2.5, {
        x: this.selectedObjects[0].position.x,
        y: this.selectedObjects[0].position.z + zoom,
        z: -this.selectedObjects[0].position.y,
        ease: Power1.easeOut
      });

      TweenMax.to(this.camera.rotation, 2.5, {
        x: -Math.PI / 2,
        y: 0,
        z: 0,
        ease: Power1.easeInOut,
        onComplete: this.handlePlayer
      });
    }
  } else {
    this.interactive.value = 1;
  }
};

Effector.prototype.update = function () {
  if (
    this.showAbout != 0 ||
    this.showContact != 0 ||
    this.interactive.value != 1
  ) {} else {
    this.hover();
  }
};

Effector.prototype.handlePlayer = function () {
  $('#video').fadeIn(1000);
};

Effector.prototype.handleEsc = function () {
  if (this.interactive.value == 0) {
    $('#iframe1').attr('src', '//:0');
    $('#info').empty();
    $('#iframe2').attr('src', '//:0');
    $('#credits').empty();
    $('#video').scrollTop(0);
    $('#video').fadeOut(100);

    for (var j = 0; j < this.target.group.children.length; j++) {
      TweenMax.to(this.target.group.children[j].scale, 3, {
        z: 1
      });
    }
    if (this.md.mobile()) {
      TweenMax.to(this.camera.position, 1.5, {
        x: this.originalCameraPosition.x,
        y: this.originalCameraPosition.y,
        z: this.originalCameraPosition.z,
        onComplete: this.device.connect
      });
    } else {
      TweenMax.to(this.camera.position, 1.5, {
        x: this.originalCameraPosition.x,
        y: this.originalCameraPosition.y,
        z: this.originalCameraPosition.z
      });
    }

    TweenMax.to(this.camera.rotation, 1.5, {
      x: this.originalCameraRotation.x,
      y: this.originalCameraRotation.y,
      z: this.originalCameraRotation.z
    });
    TweenMax.to(this.interactive, 1.5, {
      value: 1
    });
  }
};

Effector.prototype.handleAbout = function () {
  if (this.interactive.value == 1) {
    this.showAbout = this.showAbout ^ 1;
    if (this.showContact == 1) {
      this.showContact = this.showContact ^ 1;
      $('#contact').fadeOut(500);
    }
    $('#about')
      .delay(700)
      .fadeToggle('slow', 'linear');
    if (this.showAbout == 1) {
      TweenMax.to(this.target.group.position, 2, {
        y: -600
      });

      TweenMax.to(this.target.light.position, 2, {
        y: 300
      });
      document.getElementsByClassName(
          'inner'
        )[0].children[1].children[0].style.pointerEvents =
        'none';
    } else {
      TweenMax.to(this.target.group.position, 2, {
        y: 0
      });

      TweenMax.to(this.target.light.position, 2, {
        y: 900
      });
      document.getElementsByClassName(
          'inner'
        )[0].children[1].children[0].style.pointerEvents =
        'auto';
    }
  }
};

Effector.prototype.handleContact = function () {
  if (this.interactive.value == 1) {
    this.showContact = this.showContact ^ 1;
    if (this.showAbout == 1) {
      this.showAbout = this.showAbout ^ 1;
      $('#about').fadeOut(500);
    }
    $('#contact')
      .delay(500)
      .fadeToggle('slow', 'linear');

    if (this.showContact == 1) {
      TweenMax.to(this.target.group.position, 2, {
        y: 600
      });

      TweenMax.to(this.target.light.position, 2, {
        y: 1500
      });
      document.getElementsByClassName(
          'inner'
        )[0].children[1].children[2].style.pointerEvents =
        'none';
    } else {
      TweenMax.to(this.target.group.position, 2, {
        y: 0
      });

      TweenMax.to(this.target.light.position, 2, {
        y: 900
      });
      document.getElementsByClassName(
          'inner'
        )[0].children[1].children[2].style.pointerEvents =
        'auto';
    }
  }
};

Effector.prototype.mouseDown = function () {
  if (this.interactive.value == 1) {
    this.zoomCam();
  }

  if (this.showContact == 1) {
    this.handleContact();
  }
  if (this.showAbout == 1) {
    this.handleAbout();
  }
};
