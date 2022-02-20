let objects = [],inc1=0,colinc=2,inc2=0.178;
let num_objects=500;

function setup() {
    createCanvas(windowWidth, windowHeight);
    num_objects=random(10);
    for(let i=0; i < num_objects;i++){
        objects.push(new Object(random(width),random(height),100,random(255)));
    }
    for(let i=0; i < num_objects;i++){
        objects.push(new Object(random(width),random(height),10,random(255)));
    }
    colorMode(HSB);
    frameRate(60);
    pixelDensity(2);
    background(220,200,255);
}

function draw() {
    // background(255,0.04);
    smooth();
    for (let i=0;i < objects.length;i++){
      objects[i].draw();
      objects[i].update();
    }
    if(frameCount > 100){
        for(let i=0;i<objects.length;i++){
            objects[i].kill();
            if(objects[i].state==false){
                objects.splice(i,1);
            }
        }
    }
    if(objects.length==0){
        console.info("FINI");
        noLoop();
    }
}


class Object {
    constructor(x,y,r,h) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.incx=random(10);
      this.incy=random(10);
      this.colinc=random(20);
      this.sinc=random(1);
      this.xscale=8;
      this.yscale=8;
      this.size = 10;
      this.state=true;
      this.hue=h;
      this.history = []
      this.num_pieces = 50;
  }
  draw() {
      smooth()
      //noStroke()
      stroke(0,0,0,0.2)
      // fill(((360)%(this.colinc)*30),150,200); // each object has varied colour
      fill(this.hue,150,200);// each object has a single colour.
      this.size = this.r*noise(this.sinc/10);
      ellipse(this.x,this.y,this.size);
      fill(0);
      ellipse(this.x,this.y,this.r*0.1);
  }
  draw2(){
      this.history.push([this.x,this.y]);
      if(this.history.length>40){
          this.history.splice(0,1);
      }
      for(let i=0;i<this.history.length;i++){
          ellipse(this.history[i][0],this.history[i][1],this.r*0.1);
      }
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
      this.r-=0.1;
      if(this.r<0){
          this.state=false;
      }
  }
}
