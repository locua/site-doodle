// instance mode

let s1 = (p) => {

    let objects = [],
        inc1 = 0,
        colinc = 2,
        inc2 = 0.178;
    let num_objects = 100,
        ip;

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        num_objects = p.random(100);
        for (let i = 0; i < num_objects; i++) {
            objects.push(new Be(p.random(100, p.width - 100), p.random(100, p.height - 100), 100, p.random(255)));
        }
        for (let i = 0; i < num_objects; i++) {
            objects.push(new Be(p.random(100, p.width - 100), p.random(100, p.height - 100), 10, p.random(255)));
        }
        p.colorMode(p.HSB);
        p.frameRate(60);
        p.pixelDensity(2);
        p.background(220, 200, 255);
    };

    p.draw = () => {
        // p.background(255,0.04);
        p.smooth();
        for (let i = 0; i < objects.length; i++) {
            objects[i].draw();
            objects[i].update();
        }
        if (p.frameCount > 100) {
            for (let i = 0; i < objects.length; i++) {
                objects[i].kill();
                if (objects[i].state == false) {
                    objects.splice(i, 1);
                }
            }
        }
        if (objects.length == 0) {
            console.info("FINI");
            p.noLoop();
        }
    };


    class Be {
        constructor(x, y, r, h) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.incx = p.random(-10,10);
            this.incy = p.random(-10,10);
            this.colinc = p.random(20);
            this.sinc = p.random(1);
            this.xscale = 5;
            this.yscale = 5;
            this.size = 10;
            this.state = true;
            this.hue = h;
            this.history = [];
            this.num_pieces = 50;
        }
        draw() {
            p.smooth();
            // noStroke();
            p.stroke(0, 0, 0, 0.2);
            // fill(((360)%(this.colinc)*30),150,200); // each object has varied colour
            p.fill(this.hue, 150, 200); // each object has a single colour.
            this.size = this.r * p.noise(this.sinc / 10);
            p.ellipse(this.x, this.y, this.size);
            p.fill(0);
            p.ellipse(this.x, this.y, this.r * p.noise(this.sinc*1.2) * 0.1);
        }
        draw2() {
            this.history.push([this.x, this.y]);
            if (this.history.length > 40) {
                this.history.splice(0, 1);
            }
            for (let i = 0; i < this.history.length; i++) {
                p.ellipse(this.history[i][0], this.history[i][1], this.r * 0.1);
            }
        }
        update() {
            if (this.x > p.width - 100) {
                this.x += (0 - p.noise(this.incx)) * this.xscale;
                this.incx += 20;
            } else if (this.x < 100) {
                this.x += (p.noise(this.incx)) * this.xscale;
                this.incx += 20;
            } else {
                this.x += (p.noise(this.incx) - 0.5) * this.xscale;
            }
            if (this.y > p.height - 100) {
                this.y += (0 - p.noise(this.incy)) * this.yscale;
                this.incy += 20;
            } else if (this.y < 100) {
                this.y += (p.noise(this.incy)) * this.yscale;
                this.incy += 20;
            } else this.y += (p.noise(this.incy) - 0.5) * this.yscale;

            this.incx += 0.012;
            this.incy += 0.012;

            this.colinc += 0.01;
            this.sinc += 0.1;
        }
        kill() {
            this.r -= 0.1;
            if (this.r < 0) {
                this.state = false;
            }
        }
    };
};

let myp5 = new p5(s1);
