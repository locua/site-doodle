var pic, backgroundP;
var num_nodes = 10;
var nodes = [];

function preload() {
  pic = loadImage("assets/smile.png");
  backgroundP = loadImage("assets/background.jpg");
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  w = width, h = height;
  initPosArr = [{x:w*0.4, y:h*0.2},{x:w*0.6, y:h*0.2},
                {x:w*0.2, y:h*0.4},{x:w*0.8, y:h*0.4},
                {x:w*0.2, y:h*0.6},{x:w*0.8, y:h*0.6},
                {x:w*0.4, y:h*0.8},{x:w*0.6, y:h*0.8},
                {x:w*0.4, y:h*0.5},{x:w*0.6, y:h*0.5}];
  console.log(initPosArr);
  //tint(255, 100,100);
  //frameRate(20);
  textSize(32);
  fill(255);
  link1 = createA("http://doc.gold.ac.uk/~ljame002", '1. my site ...');
  link2 = createA("http://doc.gold.ac.uk/~ljame002/draw/ex/index.html", '2. party here ...');
  link3 = createA("http://duckduckgo.com", "3. search ....");
  link4 = createA("http://youtube.com", "3. watch ....");
  link5 = createA("https://en.wikipedia.org/wiki/Special:Random", "3. read ....");

  link6 = createA("http://doc.gold.ac.uk/~ljame002", "Welcome Home >>> ");
  para2 = createP("_O_");
  //para1.id("p");
  link2.id('a');
  link1.id("a");

  for (var i = 0; i < initPosArr.length; i++) {
      //nodes[i] = new Node(random(100, width-100), random(100, height -100), random(-0.5, 0.5), random(-0.5, 0.5));
      nodes[i] = new Node(initPosArr[i].x, initPosArr[i].y, random(-0.5, 0.5), random(-0.5, 0.5));

  }
}

function draw() {
  //background(255, 165, 10);
  // image(pic, 300, 300, 100, 100);
  imageMode(CORNER);

  image(backgroundP, 0, 0, innerWidth, innerHeight);
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].move();
    nodes[i].render();
      for( var j = 0; j < nodes.length; j ++) {
        nodes[i].connect(nodes[j]);
        if(i != j && nodes[i].intersects(nodes[j])) {
          nodes[i].changeDirection();
          nodes[i].changeDirection();
        }
    }

  }

  noStroke();
    //text('hello world', nodes[0].x_pos, nodes[0].y_pos)
    link1.position(nodes[1].x_pos, nodes[1].y_pos - 80);
    link2.position(nodes[2].x_pos, nodes[2].y_pos - 80);
    link3.position(nodes[3].x_pos, nodes[3].y_pos - 80);
    link4.position(nodes[4].x_pos, nodes[4].y_pos - 80);
    link5.position(nodes[5].x_pos, nodes[5].y_pos - 80);
    link6.position(nodes[6].x_pos, nodes[6].y_pos - 80);
    para2.position(nodes[0].x_pos, nodes[0].y_pos - 80);

}

class Node {
  constructor(x, y, xs, ys) {
    this.x_pos = x;
    this.y_pos = y;
    this.xspeed = xs;
    this.yspeed = ys;

  }
  render() {
    imageMode(CENTER);
    image(pic, this.x_pos, this.y_pos, 150, 150);
    fill(0);

    ellipse(this.x_pos, this.y_pos, 20, 20);
  }
  move() {
    this.x_pos += this.xspeed;
    this.y_pos += this.yspeed;
    if (this.x_pos >= width - 75 || this.x_pos <= 75) {
      this.xspeed = this.xspeed * -1;
    }
    if (this.y_pos >= height - 75 || this.y_pos <= 75) {
      this.yspeed = this.yspeed * -1;
    }
  }
  connect(other) {
    stroke(175, 238, 238);
    let d = dist(this.x_pos, this.y_pos, other.x_pos, other.y_pos);
    if(d < 500) {
        line(this.x_pos, this.y_pos,other.x_pos, other.y_pos);
      }
    }
  intersects(other) {
      let d = dist(this.x_pos, this.y_pos, other.x_pos, other.y_pos);
      if(d<=180) {
      //console.log('beep beep');
        return true;
      } else {
        return false;
      }
    }
    changeDirection() {

      //console.log('change');
    }
  }
