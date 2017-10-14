tableId = "game";

bomb = "*";
clear = " ";
number = ".";

row = "<tr>";
rowEnd = "</tr>";
col = "<td>";
colEnd = "</td>";
content = '<input type="button" value="{x_x_x}" onclick="clickButton({y_y_y})">';

var Game = function(n){
  /*
  * Inizializzazione delle proprietà
  */
  this.table = tableId;
  this.numberN = n;

  this.playGround = new Array(this.numberN);
  this.playGroundVisual = new Array(this.numberN);

  /*
  * Inizio costruttore
  */
  for(var i = 0; i < this.numberN; i++) this.playGround[i] = new Array(this.numberN);
  for(var i = 0; i < this.numberN; i++) this.playGroundVisual[i] = new Array(this.numberN);


  for(var i = 0; i < this.numberN; i++) for(var j = 0; j < this.numberN; j++) this.playGround[i][j] = (Math.random() < .9) ? '.' : bomb;
  for(var i = 0; i < this.numberN; i++) for(var j = 0; j < this.numberN; j++) this.playGroundVisual[i][j] = clear;

  for(var i = 0; i < this.numberN ; i++){
    for(var j = 0; j < this.numberN; j++){
      this.playGround[i][j] = this.playGround[i][j] == bomb ? bomb : this.numBombsAround(j, i);
    }
  }



  /*
  * Metodi interni
  */
  this.getPlayGround = function(){
    return this.playGround;
  }

  this.setPlayGroundVisual = function(val, i, j){
    this.playGroundVisual[i][j] = val ;
  }

  this.createTable = function(){
    var tableString = "";
    for(var i = 0; i < this.numberN; i++){
      tableString += row;
       var actualContent = content;
      for(var j = 0; j < this.numberN; j++){
        tableString += col + content.replace("{x_x_x}", this.playGroundVisual[i][j]).replace("{y_y_y}",  i + "," + j ) + colEnd;
      }
      tableString += row;
    }
    document.getElementById(tableId).innerHTML = tableString;
  };
};


Game.prototype.numBombsAround = function (x, y) {
  var cont = 0;
  var numBombsNear = new Array();

  if((x > 0 && x < this.numberN - 1) && (y > 0 && y < this.numberN - 1)){
    numBombsNear.push(this.playGround[y][x + 1], this.playGround[y][x - 1], this.playGround[y + 1][x + 1], this.playGround[y + 1][x - 1], this.playGround[y - 1][x + 1], this.playGround[y - 1][x - 1], this.playGround[y + 1][x], this.playGround[y - 1][x]);
  } else if (x == 0) {
    if(y == 0) numBombsNear.push(this.playGround[y][x + 1], this.playGround[y + 1][x + 1], this.playGround[y + 1][x]);
    else if (y == this.numberN - 1) numBombsNear.push(this.playGround[y][x + 1],  this.playGround[y - 1][x], this.playGround[y - 1][x + 1]);
    else numBombsNear.push(this.playGround[y][x + 1], this.playGround[y + 1][x + 1], this.playGround[y + 1][x], this.playGround[y - 1][x], this.playGround[y - 1][x + 1]);
  } else if(x == this.numberN - 1){
    if(y == 0) numBombsNear.push(this.playGround[y][x - 1], this.playGround[y + 1][x - 1], this.playGround[y + 1][x]);
    else if (y == this.numberN - 1) numBombsNear.push(this.playGround[y][x - 1],  this.playGround[y - 1][x], this.playGround[y - 1][x - 1]);
    else numBombsNear.push(this.playGround[y][x - 1], this.playGround[y + 1][x - 1], this.playGround[y + 1][x], this.playGround[y - 1][x], this.playGround[y - 1][x - 1]);
  } else if (y == 0) {
    numBombsNear.push(this.playGround[y][x + 1], this.playGround[y][x - 1], this.playGround[y + 1][x + 1], this.playGround[y + 1][x - 1], this.playGround[y + 1][x]);
  } else if (y == this.numberN - 1) {
    numBombsNear.push(this.playGround[y][x + 1], this.playGround[y][x - 1], this.playGround[y - 1][x + 1], this.playGround[y - 1][x - 1], this.playGround[y - 1][x]);
  }

  for (var i in numBombsNear) if(numBombsNear[i] == bomb) cont++;
  return ((cont == 0) ? " " : cont) ;
  var x;
};

Game.prototype.blankArea = function (i, j) {
  //console.log("i: " + i + " j: " + j);
  if(i < 0 || i > this.numberN - 1 || j < 0 || j > this.numberN - 1) return;
  else if(this.playGround[i][j] == bomb || this.playGround[i][j] != clear) return;
  else {
    this.playGround[i][j] = "#";
    this.playGroundVisual[i][j] = "#";
    this.createTable();
    this.blankArea(i + 1, j);
    this.blankArea(i - 1, j);
    this.blankArea(i, j + 1);
    this.blankArea(i, j - 1);

    this.blankArea(i + 1, j + 1);
    this.blankArea(i + 1 , j - 1);
    this.blankArea(i - 1, j + 1);
    this.blankArea(i - 1, j - 1);
  }
};

function clickButton(i, j){
  var value = prato.getPlayGround()[i][j];
  if(value == clear) prato.blankArea(i, j);
  else {
    prato.setPlayGroundVisual(value, i, j);
    prato.createTable();
  }

}




function main(){
  document.getElementById("prova").innerHTML = "swag";
  prato = new Game(9);
  prato.createTable();
  console.log(prato.getPlayGround());
  //prato.blankArea(0,0);


}

window.onload = main();
