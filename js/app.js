// Enemies our player must avoid
var win = 0;
var loose = 0;
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x +  this.speed * dt;
    if(this.x > 500) {
        this.x = 0;
    }

    //handle collision with player,
    //player = x + offset enemy x=> collide; x player + offset < enemy -> enemy already forward
    if (this.x + 60 > player.x && this.x < player.x + 30 && this.y + 10 > player.y ) {
        loose++;
        console.log(this.x, player.x);
        console.log(this.y, player.y);
        player.x = 200;
        player.y = 350;
        $("#loose").text(loose);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // console.log(this.x);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/char-boy.png";

    
}


//update method
Player.prototype.update = function() {
    //check over boundary
    if(this.x > 430) {
        this.x = 430;
    } else if (this.x < 0){
        this.x = 0;
    } else if (this.y > 430) {
        this.y = 450;
    } else if (this.y < 30) {
        this.y = 350;
        win++;
        $("#win2").text(win);
        $("#win").css("visibility", "visible");
        setTimeout(function(){
            $("#win").css("visibility", "hidden");
        }, 500);
    }
};

//render method

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player input
Player.prototype.handleInput = function(key) {
    switch(key){
        case "left":
            this.x -= 80;
            break;
        case "right":
            this.x += 80;
            break;
        case "up":
            this.y -= 80;
            break;
        case "down":
            this.y += 80;
    }
}

//handle reset
$("button").on("click", function(){
    console.log("test");
    loose = 0;
    win = 0;
    $("#win").text(win);
    $("#loose2").text(loose);
    
})

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// var player = new Player(200, 200, 20);
var allEnemies = [];
var player = new Player(200, 350, 0);

function createEnemy() {
        var enemy1 = new Enemy(0, 50, (Math.random() + 1) * 50);
        allEnemies.push(enemy1);
        var enemy2 = new Enemy(0, 135, (Math.random() + 1) * 50);
        allEnemies.push(enemy2);
        var enemy3 = new Enemy(0, 220, (Math.random() + 1) * 50);
        allEnemies.push(enemy3);
}
createEnemy();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//button reset game


