function StickManGame() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.stickMan = { x: 50, y: 50, size: 20 };
    this.isJumping = false;
    this.gravity = 0.5;
    this.jumpStrength = 10;
    this.velocityY = 0;

    this.init = function() {
        document.addEventListener('keydown', this.handleInput.bind(this));
        this.update();
    };

    this.handleInput = function(event) {
        if (event.code === 'Space' && !this.isJumping) {
            this.isJumping = true;
            this.velocityY = -this.jumpStrength;
        }
    };

    this.update = function() {
        this.clearCanvas();
        this.applyGravity();
        this.drawStickMan();
        requestAnimationFrame(this.update.bind(this));
    };

    this.clearCanvas = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    this.applyGravity = function() {
        if (this.isJumping) {
            this.stickMan.y += this.velocityY;
            this.velocityY += this.gravity;

            if (this.stickMan.y >= this.canvas.height - this.stickMan.size) {
                this.stickMan.y = this.canvas.height - this.stickMan.size;
                this.isJumping = false;
                this.velocityY = 0;
            }
        }
    };

    this.drawStickMan = function() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(this.stickMan.x, this.stickMan.y, this.stickMan.size, this.stickMan.size);
    };
}

window.onload = function() {
    const game = new StickManGame();
    game.init();
};