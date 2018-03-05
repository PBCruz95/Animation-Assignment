define([
    "entity",
    "animate"
], function (
    Entity,
    Animate
){


    class Player extends Entity {

        constructor (game, x, y, img=null, ctx=null, scale=1.5, spriteWidth=200, spriteHeight=200) {
            super(game, x, y, img, ctx);
            this.origY = this.y; //For jumping

            this.scale = scale;
            this.spriteWidth = spriteWidth;
            this.spriteHeight = spriteHeight;
            this.yVelocity = 0;

            this.movementSpeed = (8);
            this.jumpStrength = (20);
            this.jumpsLeft = 2;
            this.maxJumps = 2;
            this.jumpTimer = 0;
            this.jumpCooldown = 20;

            this.velocityCooldown = 0;
            this.velocityCooldownTimer = 0;

            this.states = {
                "running": false,
                "jumping": false,
                "facingRight": true,
                "lookingUp" : false,
                "lookingDown" : false,
                "grounded": true,
            };

            this.animations = {
                "idle": new Animate(this.img, [37.28, 56], 0, 825, 5, 22, true, this.scale),
                "run": new Animate(this.img, [48, 65], 1, 1300, 2, 26, true, this.scale),
                "ascend": new Animate(this.img, [spriteWidth, spriteHeight], 2, 8, 3, 4, true, this.scale, 2),
                "descend": new Animate(this.img, [spriteWidth, spriteHeight], 2, 14, 3, 4, true, this.scale, 8),
                "lookUp": new Animate(this.img, [32, 56], 3.6, 32, 1, 1, true, this.scale),
                "lookDown": new Animate(this.img, [35, 56], 4.7, 32, 1, 1, true, this.scale)
            };
        }

        update () {
            /////////// all button checks go here ///////////
            // check if button pressed
            // Moving left and right are mutually exclusive, thus else-if
            // this.setStates(running, jumping, shooting, cleaving, facingRight, grounded, slashing, shotlocked, framelocked, energized, dashing, hasDashed)
            if (this.game.controlKeys[this.game.controls.right].active) { //run right
                if (!this.states.facingRight) { this.states.facingRight = true };
                this.states.running = true;

            } else if (this.game.controlKeys[this.game.controls.left].active) { //run left
                if (this.states.facingRight) { this.states.facingRight = false };
                this.states.running = true;

            } else if (this.game.controlKeys[this.game.controls.lookUp].active) { //look up
                this.states.lookingUp = true;

            } else if (this.game.controlKeys[this.game.controls.lookDown].active) { //look down
                this.states.lookingDown = true;
            }

            if (this.game.controlKeys[this.game.controls.jump].active && !this.states.jumping) { // jump
                this.states.jumping = true;
            }


            // check if button NOT pressed, if state is supposed to change...
            if (!(this.game.controlKeys[this.game.controls.right].active || this.game.controlKeys[this.game.controls.left].active)
                && this.states.running) {
                this.states.running = false;
            }

            if (!(this.game.controlKeys[this.game.controls.lookUp].active) && this.states.lookingUp) {
                this.states.lookingUp = false;
            }

            if (!(this.game.controlKeys[this.game.controls.lookDown].active) && this.states.lookingDown) {
                this.states.lookingDown = false;
            }


            ///////////// THEN do actions //////////////
            if (this.jumpTimer > 0) {
                this.jumpTimer -= 1;
            }
            // Running
            if (this.states.running) {
                if (this.states.facingRight) {
                    this.x += this.movementSpeed;
                    this.centerX += this.movementSpeed;
                    this.boundX += this.movementSpeed;
                } else {
                    this.x -= this.movementSpeed;
                    this.centerX -= this.movementSpeed;
                    this.boundX -= this.movementSpeed;
                }
            }
            //Jumping
            if (this.states.jumping) {
                this.states.jumping = false;

                if (this.jumpsLeft > 0 && this.jumpTimer == 0) {
                    this.jumpsLeft -= 1;
                    this.jumpTimer = this.jumpCooldown;
                    this.yVelocity = 0;
                    this.yVelocity -= this.jumpStrength;
                }
            }

            //Grounded state logic
            // if (this.yVelocity === 0 && this.velocityCooldownTimer > 0) {
            //     this.velocityCooldownTimer--;
            // }
            // else if (this.yVelocity === 0 && this.velocityCooldownTimer === 0) {
            //     this.states.grounded = true;
            // }
            // else if (this.yVelocity != 0) {
            //     this.velocityCooldownTimer = this.velocityCooldown;
            //     this.states.grounded = false;
            // }

            // update velocities based on gravity and friction
        //     this.yVelocity += this.gravity * this.gravity;
        //     this.y += this.yVelocity;
        //     this.lastBoundY = this.boundY;
        //     this.boundY += this.yVelocity;
        }

        draw(ctx) {
            // if (this.yVelocity < 0 && !this.states.shooting && !this.states.dashing) {//ascending
            //     this.animation = this.animations.ascend;
            // }

            // else if (this.yVelocity > 0 && !this.states.shooting && !this.states.dashing) {//descending
            //     this.animation = this.animations.descend;
            // }
            if (this.states.running) {//gunrunning
                this.animation = this.animations.run;
            }

            else if (this.states.lookingUp) {
                this.animation = this.animations.lookUp;
            }

            else if (this.states.lookingDown) {
                this.animation = this.animations.lookDown;
            }
            
            else { //idle

                this.animation = this.animations.idle;
            }

            this.drawImg(ctx);
        }

        setStates(running, jumping, lookingUp, lookingDown, facingRight, grounded) {
            this.states.running = running;
            this.states.jumping = jumping;
            this.states.lookingUp = lookingUp;
            this.states.lookingDown = lookingDown;
            this.states.facingRight = facingRight;
        }

        drawImg (ctx) {
            this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);
        }
    }

    return Player;
});



