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
	_PROJECTTHUMB,
	_PROJECTURLS,
	_PROJECTINFOS,
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
	this.mouse = new THREE.Vector2(1, -1);
	this.url = _PROJECTURLS;
	this.info = _PROJECTINFOS;

	this.initialOffset = null;
	this.gammaRotation = 0;
	this.betaRotation = 0;
	this.gR = 0;
	this.bR = 0;

	this.md = new MobileDetect(window.navigator.userAgent);
	var deviceChecker = new DeviceChecker();
	this.isRetina = deviceChecker.is_retina();

	console.log('retina display is ' + this.isRetina);
	if (this.md.mobile()) {
		console.log('using mobile device');
	} else {
		console.log('not using mobile device');
	}

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
		this.projectMat,
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
	} else {
		this.camera.position.set(1200, 1900, 2200);
		this.navi = new Navi(this.camera);
	}
	this.camera.lookAt(new THREE.Vector3(0, 0, 0));

	this.effector = new Effector(
		this.mouse,
		this.camera,
		this.actors,
		this.url,
		this.info,
		this.md
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
		this.gR = Math.min(Math.max(this.gammaRotation, -90), 90);
		this.bR = Math.min(Math.max(this.betaRotation, 50), 120);

		this.camera.position.y +=
			((this.bR - 60) * 5 - this.camera.position.y) * 0.015;
		this.camera.position.x += (-this.gR * 10 - this.camera.position.x) * 0.095;

		this.camera.lookAt(this.scene.position);
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

	about.addEventListener('click', this.handleAbout.bind(this));
	contact.addEventListener('click', this.handleContact.bind(this));
	esc.addEventListener('click', this.handleEsc.bind(this));
	topnote.addEventListener('click', this.handleFullScreen.bind(this));

	document.addEventListener('mousemove', this.mouseMove.bind(this));
	document.addEventListener('mousedown', this.mouseDown.bind(this));
	document.addEventListener('touchstart', this.touchDown.bind(this));
	//document.addEventListener('touchend', this.touchEnd.bind(this));
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

Projects.prototype.handleFullScreen = function() {
	if (screenfull.enabled) {
		screenfull.toggle();
	}
};

Projects.prototype.mouseDown = function() {
	this.effector.mouseDown();
};

Projects.prototype.touchDown = function() {
	// event.preventDefault();
	this.effector.mouseDown();
	this.effector.update();
	this.mouse.x = event.touches[0].pageX / window.innerWidth * 2 - 1;
	this.mouse.y = -(event.touches[0].pageY / window.innerHeight * 2 - 1);
	console.log(this.mouse.y);
};

Projects.prototype.touchEnd = function() {
	event.preventDefault();
	this.mouse.x = event.touches[0].pageX / window.innerWidth * 2 - 1;
	this.mouse.y = -(event.touches[0].pageY / window.innerHeight * 2 - 1);
};

Projects.prototype.mouseMove = function(event) {
	event.preventDefault();
	this.effector.update();
	if (this.md.mobile()) {
		// this.mouse.x = event.touches[0].pageX / window.innerWidth * 2 - 1;
		// this.mouse.y = -(event.touches[0].pageY / window.innerHeight * 2 - 1);
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
	this.betaRotation = e.beta ? e.beta : 0;
	this.gammaRotation = e.gamma ? e.gamma : 0;
};
