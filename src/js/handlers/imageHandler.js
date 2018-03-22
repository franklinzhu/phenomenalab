import 'three';

export default function Image(
	_THUMB0,
	_THUMB1,
	_THUMB2,
	_THUMB3,
	_THUMB4,
	_THUMB5,
	_THUMB6,
	_THUMB7,
	_THUMB8,
	_THUMB9
) {
	var path = './project/';
	var format = '.png';

	this.urls = [
		_THUMB0,
		_THUMB1,
		_THUMB2,
		_THUMB3,
		_THUMB4,
		_THUMB5,
		_THUMB6,
		_THUMB7,
		_THUMB8,
		_THUMB9
	];
	this.material = [];
	this.progress = 0;

	for (var i = 0; i < this.urls.length; i++) {
		var texture = new THREE.TextureLoader().load(
			require(path + this.urls[i] + '.png')
		);
		var mat = new THREE.MeshBasicMaterial({
			map: texture
		});
		this.material.push(mat);
		this.progress++;
		console.log(
			'thumbnails' + this.progress / this.urls.length * 100 + '%' + 'loaded'
		);
	}

	this.initPlayer();
}

Image.prototype.initPlayer = function() {
	this.playerURLs = [
		'https://player.vimeo.com/video/207461532', //futureofmusic
		'https://player.vimeo.com/video/233104062', //gravity
		'https://player.vimeo.com/video/159760813', //helloplaynye
		'https://player.vimeo.com/video/162052542', //jane
		'https://player.vimeo.com/video/147616989', //myth
		'https://player.vimeo.com/video/235253501', //offf
		'https://player.vimeo.com/video/150122941', //pyramind
		'https://player.vimeo.com/video/187690451', //redaxes
		'http://sono.livyatanim.com/', //sono
		'https://player.vimeo.com/video/166021791' //thewalk
	];
};
