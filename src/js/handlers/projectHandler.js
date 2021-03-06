import 'three';
import { TweenMax, Power2, TimelineLite } from 'gsap';
import * as screenfull from 'screenfull';
var MobileDetect = require('mobile-detect');
import DeviceChecker from './utils/DeviceChecker';

import Actors from './modules/actors';
import Effector from './modules/effector';
import Navi from './modules/navigator';

export default function Projects(
	_PROJECTNUM,
	_PROJECTASSETS,
	_PROJECTWIDTH,
	_PROJECTHEIGHT,
	_PROJECTGAP,
	_ROW
) {
	this.assets = _PROJECTASSETS;

	this.projects = [];
	this.projectNum = _PROJECTNUM; //8;
	this.width = _PROJECTWIDTH; //200;
	this.height = _PROJECTHEIGHT; //width/1.33;
	this.gap = _PROJECTGAP; //5;
	this.row = _ROW; //3;
	this.mouse = new THREE.Vector2(1, -1);

	this.md = new MobileDetect(window.navigator.userAgent);
	var deviceChecker = new DeviceChecker();
	this.isRetina = deviceChecker.is_retina();

	this.mute = true;
	this.start = 0;

	console.log('built by Fengyi Franklin Zhu @ fengyizhu.com');

	this.init();
}

Projects.prototype.init = function() {
	this.scene = new THREE.Scene();

	this.actors = new Actors(
		this.width,
		this.height,
		this.gap,
		this.row,
		this.projectNum,
		this.assets.imgs, // this.projectMat,
		this.scene,
		this.md
	);

	this.camera = new THREE.PerspectiveCamera(
		25,
		window.innerWidth / window.innerHeight,
		1,
		10000
	);
	if (this.md.mobile()) {
		this.camera.position.set(0, 0, 4000);
		this.targetRotationX = 0;
		this.targetRotationY = 0;
	} else {
		this.camera.position.set(1200, 1900, 2200);
		this.navi = new Navi(this.camera);
	}
	this.camera.lookAt(new THREE.Vector3(0, 0, 0));

	this.effector = new Effector(
		this.mouse,
		this.camera,
		this.actors,
		this.assets,
		this.md,
		this.mute
	);

	this.renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	this.renderer.setPixelRatio(window.devicePixelRatio);
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.renderer.setClearColor('rgb(228,229,233)');
	if (this.md.mobile()) {
		this.renderer.shadowMap.enabled = false;
	} else {
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	}
	container.appendChild(this.renderer.domElement);

	this.initUI();
};

Projects.prototype.render = function() {
	if (this.md.mobile()) {
		this.actors.group.rotation.set(
			THREE.Math.lerp(this.actors.group.rotation.x, this.targetRotationX, 0.05),
			THREE.Math.lerp(this.actors.group.rotation.y, this.targetRotationY, 0.05),
			0
		);
	} else {
		this.navi.update(
			this.effector.showAbout,
			this.effector.showContact,
			this.effector.interactive
		);
	}
	this.renderer.render(this.scene, this.camera);
};

Projects.prototype.initUI = function() {
	var about = document.getElementsByClassName('inner')[0].children[1]
		.children[0];
	var contact = document.getElementsByClassName('inner')[0].children[1]
		.children[2];
	var esc = document.getElementById('esc');
	var topnote = document.getElementById('topnote');
	var mute = document.getElementById('un-mute');

	about.addEventListener('click', this.handleAbout.bind(this));
	contact.addEventListener('click', this.handleContact.bind(this));
	esc.addEventListener('click', this.handleEsc.bind(this));
	topnote.addEventListener('click', this.handleFullScreen.bind(this));
	mute.addEventListener('click', this.handleMute.bind(this));

	document.addEventListener('mousemove', this.mouseMove.bind(this));
	document.addEventListener('mousedown', this.mouseDown.bind(this));

	document.addEventListener('touchstart', this.touchStart.bind(this));
	// document.addEventListener('touchmove', this.touchMove.bind(this));
	document.addEventListener('touchend', this.touchEnd.bind(this));
	window.addEventListener('resize', this.resize.bind(this));
	window.addEventListener(
		'deviceorientation',
		this.deviceorientation.bind(this)
	);
};

Projects.prototype.handleAbout = function() {
	this.effector.handleAbout();
};

Projects.prototype.handleContact = function() {
	this.effector.handleContact();
};

Projects.prototype.handleEsc = function() {
	this.effector.handleEsc();
};

Projects.prototype.handleMute = function() {
	this.mute = this.mute ^ 1;
	this.effector.mute = this.mute;
};

Projects.prototype.handleFullScreen = function() {
	if (screenfull.enabled) {
		screenfull.toggle();
	}
};

Projects.prototype.touchStart = function() {
	this.mouse.x = event.touches[0].pageX / window.innerWidth * 2 - 1;
	this.mouse.y = -(event.touches[0].pageY / window.innerHeight * 2 - 1);

	this.effector.update();
	this.effector.mouseDown();
};

Projects.prototype.touchEnd = function() {
	//this.effector.mouseDown();
	// event.preventDefault();
	// this.mouse.x = event.touches[0].pageX / window.innerWidth * 2 - 1;
	// this.mouse.y = -(event.touches[0].pageY / window.innerHeight * 2 - 1);
};

Projects.prototype.mouseDown = function() {
	this.effector.mouseDown();
	this.start++;
	if (this.start == 1) {
		this.mute = this.mute ^ 1;
		this.effector.mute = this.mute;
		document.getElementById('un-mute').checked = true;
	}
	console.log(document.getElementById('un-mute'));
};

Projects.prototype.mouseMove = function(event) {
	event.preventDefault();
	this.effector.update();
	if (this.md.mobile()) {
	} else {
		this.mouse.x = event.clientX / window.innerWidth * 2 - 1;
		this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	}
};

Projects.prototype.resize = function() {
	this.w = window.innerWidth / 1;
	this.h = window.innerHeight / 1;

	this.camera.aspect = this.w / this.h;
	this.camera.updateProjectionMatrix();

	this.renderer.setSize(this.w, this.h);
};

Projects.prototype.deviceorientation = function(e) {
	this.y = THREE.Math.mapLinear(e.gamma || 0, -60, 60, -0.65, 0.65);
	this.x = THREE.Math.mapLinear(e.beta || 0, -60, 60, -0.25, 0.25);

	this.targetRotationX = this.x;
	this.targetRotationY = this.y;
};
