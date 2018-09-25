export default function Audios() {
	this.hit = null;
	this.mute = false;
	this.init();
}

Audios.prototype.init = function() {
	this.paths = [
		'sound1',
		'sound2',
		'sound3',
		'sound4',
		'sound5',
		'sound6',
		'sound7',
		'sound8'
	];

	this.tracks = [];
	for (var i = 0; i < this.paths.length; i++) {
		var audio = new Audio(
			require('./../../../../static/sounds/' + this.paths[i] + '.mp3')
		);
		this.tracks.push(audio);
	}
};

Audios.prototype.play = function(_INDEX, _LENGTH) {
	this.prev_index = this.index;
	this.index = _INDEX;
	this.length = _LENGTH;
	var kp = null;

	for (var i = 0; i < this.length; i++) {
		if (
			(i == this.index && this.index !== this.prev_index) ||
			(i == this.index && this.hit == true)
		) {
			if (i > this.tracks.length - 1) {
				var j = Math.round(Math.random() * (this.tracks.length - 1));
				this.tracks[j].currentTime = 0;
				if (this.mute == false) {
					this.tracks[j].play();
				}
			} else {
				var k = Math.round(Math.random() * (this.tracks.length - 1));
				this.tracks[k].currentTime = 0;
				if (this.mute == false) {
					this.tracks[k].play();
				}
			}
		}
	}
};
