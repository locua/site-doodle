var num_nodes = 10;
var nodes = [];
let infobox;
let sels = [];
let selCons=[];

var concepts = [
"Inspiration",
"Creative process",
"Imagination",
"Moving together",
"Organic processes",
"Feedback",
"Somatics",
"Poetics",
"Imagining moving together",
"Tools of audio creation",
"Images",
"Exploration",
"Witnessing",
"Group scores",
"Logic",
"Language",
"Silences",
"Decentralise creativity",
"Professional development"];

function preload() {
}

function setup() {
  let cnv = createCanvas(innerWidth, 600);
  w = width, h = height;
  textSize(32);
  fill(255);
  for (var i = 0; i < concepts.length; i++) {
      nodes[i] = new Node(random(50, width-50), random(50, height -50), random(-0.2, 0.8), random(-0.2, 0.8), concepts[i]);
  }
  cnv.parent('cnv');

  infobox = createP("");
  infobox.style('font-size', '20px');
  infobox.id('info');
  infobox.position(20,20);
}

function draw() {
  imageMode(CORNER);
  background(255);
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].move();
    nodes[i].render();
      for(let j = 0; j < nodes.length; j ++) {
        nodes[i].connect(nodes[j]);
    }
  }
  displaySelected();
}

class Node {
  constructor(x, y, xs, ys, con) {
    this.selected = false;
    this.x_pos = x;
    this.y_pos = y;
    this.xspeed = xs;
    this.yspeed = ys;
    this.concept = con;
    this.txt = createP(this.concept);
    this.txt.style('font-size', '20px');
    this.xsold = 0;
    this.ysold = 0;
    this.mystring = "a string";
  }
  changetxt(){
    infobox.html(this.concept);
  }
  hover(){
    let dm = dist(this.x_pos, this.y_pos, mouseX, mouseY);
    if(dm<=25){
      return true;
    }else{
      return false;
    }
  }
  render() {
    imageMode(CENTER);
    fill(100, 40);
    ellipse(this.x_pos, this.y_pos, 50, 50);
    if(this.selected)
      fill(255,20,20,150);
    else
      fill(20, 20);
    ellipse(this.x_pos, this.y_pos, 20, 20);
    this.txt.position(this.x_pos, this.y_pos);
  }
  move() {
    this.x_pos += this.xspeed;
    this.y_pos += this.yspeed;
    if (this.x_pos >= width - 50 || this.x_pos <= 50) {
      this.xspeed = this.xspeed * -1;
    }
    if (this.y_pos >= height - 50 || this.y_pos <= 50) {
      this.yspeed = this.yspeed * -1;
    }
  }
  connect(other) {
    stroke(175, 238, 238,40);
    line(this.x_pos, this.y_pos,other.x_pos, other.y_pos);
  }
  intersects(other) {
      let d = dist(this.x_pos, this.y_pos, other.x_pos, other.y_pos);
      if(d<=180) {
        return true;
      } else {
        return false;
      }
  }
}

let sss = {};

function mouseClicked(){
  for (let i = 0; i < nodes.length; i++){
    let _c = nodes[i].concept;
    if(nodes[i].hover()){
      if(!nodes[i].selected){
        nodes[i].selected = true;
        let e = document.getElementsByClassName(_c);
        console.log(e);
        let ps =[];
        if(e!=null){
          for(let i =0; i < e.length;i++){
            e[i].style.color = "red";
            ps.push(e[i].offsetTop);
          }
          moveElements(e);
        }
        sss[_c]=ps;
        console.log(ps);
      }
      else{
        let index = selCons.indexOf(_c);
        if (index !== -1) {
          selCons.splice(index, 1);
        }
        let ops = sss[_c];
        let e = document.getElementsByClassName(_c);
        if(e!=null){
          for(let i = 0; i < e.length;i++){
            e[i].style.color = "black";
            e[i].style.position = "static";
            e[i].style.top = ops[i]+"px";
          }
        }
        nodes[i].selected = false;
      }
    }
  }
}

function returnEl(e){
  let t = 20; 
  for(let i =0; i < e.length;i++){
    let pos = 20+(150*i);
    e[i].style.position = "relative";
    e[i].style.top = pos+"px";
  }
}

function moveElements(e){
  let t = 20; 
  for(let i =0; i < e.length;i++){
    let pos = 20+(150*i);
    e[i].style.position = "absolute";
    e[i].style.top = pos+"px";
  }
  $( ".Inspiration" ).fadeIn();
}


function displaySelected(){
  let themes = "Selected themes:\n";
  let tot = 0;
  for(let i = 0; i < selCons.length; i++){
    if(i>0)
      themes+=",\n";
    themes+=selCons[i];
  }
  if(tot>0)
    themes+=".";
  themes="";
  infobox.html(themes);  
}
