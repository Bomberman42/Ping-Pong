//Váriaveis da Bolinha
var xBolinha = 300;
var yBolinha = 200;
var dBolinha = 20;

//Váriaveis da Raquete
var xRaquete = 5;
var yRaquete = 150;
var cRaquete = 10;
var aRaquete = 90;

//Placar do jogo
var meusPontos = 0;
var pontosOponente = 0;

//variaveis do oponete
var xRaqueteOponente = 585;
var yRaqueteOponente = 150;
var valocidadeYOponente;

var colidir = false;

//Velocidade da Bolinha
var velocidadeXBolinha = 6;
var velocidadeYBolinha = 6;
var raio = dBolinha / 2;

//Sons do jogo
var raquetada;
var ponto;
var trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentoBolinha();
  colisaoBolinha();
  mostraRaquete(xRaquete, yRaquete);  
  movimentoRaquete();
  colisaoRaquete();
  colisaoRaquetesBiblioteca(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaquetesBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha,yBolinha, dBolinha);
}

function movimentoBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBolinha(){
  if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1
  }
  
  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1
  }
} 

function mostraRaquete(x,y){
  rect(x, y, cRaquete, aRaquete)
}

function movimentoRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }    
}

function colisaoRaquete(){
  if(xBolinha - raio < xRaquete + cRaquete && yBolinha - raio < yRaquete + aRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function colisaoRaquetesBiblioteca(x,y){
  colidir=
  collideRectCircle(x, y, cRaquete, aRaquete, xBolinha, yBolinha, raio);
  if (colidir){
     velocidadeXBolinha *= -1;
    raquetada.play();
  }
};

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - cRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
} 

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150,10,40,20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255,140,0));
  rect(450,10,40,20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente += 1 
    ponto.play();
  }
}




