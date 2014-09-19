var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

var GUN_TOWERS_N = 3;
var GROUND_HEIGHT = 20;

var mainState = {
	preload: function() {
		game.load.image('ground', 'assets/img/ground.png');
		game.load.image('gunTower', 'assets/img/gunTower.png');
		game.load.image('meteor', 'assets/img/meteor.png');
		game.load.image('bullet', 'assets/img/bullet.png');

		console.info('main state preloaded');
	},

	create: function() {
		game.stage.backgroundColor = '#124184';

		this.ground = game.add.sprite(0, game.world.height - GROUND_HEIGHT, 'ground');
		
		this.gunTowers = [];
		for (var i = 0; i < GUN_TOWERS_N; i++) {
			var gunTowerX = game.world.width / GUN_TOWERS_N * (i + 0.5);
			var gunTower = this.createGunTower(gunTowerX, game.world.height - GROUND_HEIGHT);
			gunTower.anchor.setTo(0.5, 1);
			
			this.gunTowers.push(gunTower);
		}
		
		this.meteors = this.createMeteors();

		console.info('main state created');
	},
	
	createGunTower: function(x, y) {
		return game.add.sprite(x, y, 'gunTower');
	},
	
	update: function() {
		
	},
	
	createMeteors: function() {
		var meteors = game.add.group();
		meteors.enableBody = true;
		meteors.physicsBodyType = Phaser.Physics.ARCADE;
		
		return meteors;
	},
	
	createMeteor: function() {
		var meteor = game.add.sprite(game.rnd.between(100, 700), 0, 'meteor');
		meteor.anchor.setTo(0.5, 1);
		
		this.meteors.push(meteor);
		
		var delay = Phaser.Timer.SECOND * game.rnd.realInRange(0.5, 2);
		game.time.events.add(delay, this.createMeteor, this);
	}
};

game.state.add('main', mainState);
game.state.start('main');
