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
        game.physics.enable(this.ground, Phaser.Physics.ARCADE);
        this.ground.body.immovable = true;
		
		this.gunTowers = this.createGunTowers();
		this.meteors = this.createMeteors();
        this.meteorDroppingTime = game.time.now;

		console.info('main state created');
	},
	
	update: function() {
		this.dropMeteor();
        this.checkCollisions();
	},

    checkCollisions: function() {
        game.physics.arcade.overlap(this.ground, this.meteors, function(ground, meteor) {
            meteor.kill();
        }, null, this);
    },

    createGunTowers: function() {
        var gunTowers = [];
        for (var i = 0; i < GUN_TOWERS_N; i++) {
            var gunTowerX = game.world.width / GUN_TOWERS_N * (i + 0.5);
            var gunTower = game.add.sprite(gunTowerX, game.world.height - GROUND_HEIGHT, 'gunTower');
            gunTower.anchor.setTo(0.5, 1);

            gunTowers.push(gunTower);
        }
        return gunTowers;
    },
	
	createMeteors: function() {
		var meteors = game.add.group();
		meteors.enableBody = true;
		meteors.physicsBodyType = Phaser.Physics.ARCADE;
        meteors.createMultiple(30, 'meteor');
        meteors.setAll('anchor.x', 0.5);
        meteors.setAll('anchor.y', 1);
        meteors.setAll('outOfBoundsKill', true);
        meteors.setAll('checkWorldBounds', true);

		return meteors;
	},

    dropMeteor: function() {
        if (game.time.now < this.meteorDroppingTime) {
            return;
        }
        this.meteorDroppingTime = game.time.now + 5000;

        var meteor = this.meteors.getFirstExists(false);
        if (!meteor) {
            return;
        }

        meteor.reset(game.rnd.between(100, 700), 0);
        game.physics.arcade.accelerateToXY(meteor, game.rnd.between(100, 700), game.world.height);
    }
};

game.state.add('main', mainState);
game.state.start('main');
