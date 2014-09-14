var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

var mainState = {
	preload: function() {
		game.load.image('ground', 'assets/img/ground.png');

		console.info('main state preloaded');
	},

	create: function() {
		game.stage.backgroundColor = '#124184';

		this.ground = game.add.sprite(0, game.world.height - 20, 'ground');
		this.gunTowers = [];

		console.info('main state created');
	}
};

game.state.add('main', mainState);
game.state.start('main');
