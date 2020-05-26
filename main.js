var flappy = {
    preload: function() { 
        game.load.image('bird', 'assets/bird1.png'); 
        game.load.image('pipe', 'assets/pipe.png');
    },

    create: function() { 
        game.stage.backgroundColor = '#71c5cf';

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.bird = game.add.sprite(400, 245, 'bird');
        this.bird.anchor.setTo(-0.2, 0.5); 

        this.pipes = game.add.group(); 


        game.physics.arcade.enable(this.bird);
    
        this.bird.body.gravity.y = 1000;  
    
        var spaceKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);   
        this.timer = game.time.events.loop(1500, this.add_column, this); 
        
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", 
            { font: "30px Arial", fill: "#ffffff" }); 
    },

    jump: function() {
        if (this.bird.alive == false)
    return;  
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
        var animation = game.add.tween(this.bird);

        // Change the angle of the bird
        animation.to({angle: -20}, 100);

        animation.start(); 
    },
    
    restart: function() { // Restart the game
        game.state.start('main');
    },

    add_one_block: function(x, y) { // Creates a pipe at the position x and y
        var pipe = game.add.sprite(x, y, 'pipe');
    
        this.pipes.add(pipe);
    
        game.physics.arcade.enable(pipe);
    
        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200; 
    
        //Kills the pipe when it's no longer visible 
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },
    add_column: function() { // Randomly creates a hole
        var hole = Math.floor(Math.random() * 6) + 1; // Ensures that the hole is neither at top nor at the end
    

        for (var i = 0; i < 9; i++)
            if (i != hole && i != hole + 1) 
                this.add_one_block(1200, i * 60 + 10);
        this.score += 1;
        this.labelScore.text = this.score;  
    },
    update: function() { // It contains the game's logic and checks it every 60 times per second  
        
        if (this.bird.y < 0 || this.bird.y > 490)
        this.restart();
        game.physics.arcade.overlap(
            this.bird, this.pipes, this.restart, null, this);
        if (this.bird.angle < 20)
        this.bird.angle += 1; 

    },
};

var game = new Phaser.Game(1360, 550);

game.state.add('main', flappy); 

game.state.start('main');