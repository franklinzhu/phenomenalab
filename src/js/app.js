import '../css/style.css';
import 'jquery';
import Image from './handlers/imageHandler';
import Projects from './handlers/projectHandler';

//preload all thumbnails
var thumbnails = new Image(
	'futureofmusic',
	'gravity',
	'helloplaynye',
	'jane',
	'myth',
	'offf',
	'pyramind',
	'redaxes',
	'sono',
	'thewalk'
);
var projects;

function init() {
	var projectNum = 10;
	projects = new Projects(
		projectNum, //number of projects
		thumbnails.material, //load all the Projects imgs
		thumbnails.playerURLs, //load all the projects links
		441, //project block width
		248, //project block height
		8, //gap width between projects blocks
		2 //ho wmany projects in a row
	);
}

function animate() {
	requestAnimationFrame(animate);
	projects.render();
}

document.addEventListener('DOMContentLoaded', function() {
	if (thumbnails.progress == thumbnails.material.length) {
		$('#loader').fadeOut(500);
		init();
		animate();
	}
});
