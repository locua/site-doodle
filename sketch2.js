let balls = [],inc1=0,colinc=2,inc2=0.178;
let num_balls=30;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255,200,200);
    for(let i=0; i < num_balls;i++){
        balls.push(new Ball(random(width),random(height),100));
    }
    for(let i=0; i < num_balls;i++){
        balls.push(new Ball(random(width),random(height),10));
    }
    background(220,0.4);
    colorMode(HSB);
    frameRate(60);
}

function draw() {
    //background(255,0.04);
    for (let i=0;i < balls.length;i++){
      balls[i].draw();
      balls[i].update();
    }
    if(frameCount > 300){
        for(let i=0;i<balls.length;i++){
            balls[i].kill();
            if(balls[i].state==false){
                balls[i].pop();
            }
        }
    }
}


class Ball {
    constructor(x,y,r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.incx=random(10);
      this.incy=random(10);
      this.colinc=random(20);
      this.sinc=random(1);
      this.xscale=4;
      this.yscale=4;
      this.size = 10;
      this.state=true;
  }
  draw() {
      smooth()
      //noStroke()
      stroke(0,0,0,0.2)
      fill(((360)%(this.colinc*4)),150,200);
      this.size = this.r*noise(this.sinc/10);
      ellipse(this.x,this.y,this.size);
      fill(0);
      ellipse(this.x,this.y,2);
  }
  update(){
      this.x+=(noise(this.incx)-0.5)*this.xscale;
      this.y+=(noise(this.incy)-0.5)*this.yscale;
      this.incx+=0.013;
      this.incy+=0.012;
      this.colinc+=0.01;
      this.sinc+=0.1;
  }
  kill(){
      while(this.r>0){
      }
      this.r-=0.1;
      if(this.r<0){
          this.state=false;
      }
  }
}
