var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create});

function preload() {
	console.log('loaded');
}

function create() {
	console.log('created');
}
