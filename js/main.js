var Game = function(nX, nY){
  /*
  * Inizializzazione delle proprietà
  */

  /// constant
  this.constN = 9;
  this.bombPerc = .15;

  this.tableButtonPLay = '<input type="button" value="{x_x_x}" style="{z_z_z}" onclick="clickButton({y_y_y})">';
  this.HTMLelement = {
    row: "<tr>",
    rowEnd: "</tr>",
    col: "<td>",
    colEnd: "</td>",
  };

  /// game element

  this.willBeNumber = ".";

  this.elements = {
    bomb: 'B',
    clear: ' ',
    space: '#',
    number: '.'
  };

  this.dim = {
    x: nX,
    y: nY
  };


  this.endGame = false;
  //this.numberN = n;

  this.tableId = "game";


  this.getX = function(){return this.dim.x;}
  this.getY = function(){return this.dim.y;}

  this.getEndGame = function(){
    return this.endGame;
  }

  this.setEndGame = function(){
    this.endGame = true;
    for(var i = 0; i < this.getY(); i++){
      for(var j = 0; j < this.getX(); j++){
        this.playGroundVisual[i][j] = this.playGround[i][j] != this.elements.clear ? this.playGround[i][j] : this.elements.space ;
      }
    }
  }
  /*
  * Metodi interni
  */

  this.ini = function(){
    // creazione delle matrici
    this.playGround = new Array(this.getY());
    this.playGroundVisual = new Array(this.getY());
    for(var i = 0; i < this.getY(); i++) this.playGround[i] = new Array(this.getX());
    for(var i = 0; i < this.getY(); i++) this.playGroundVisual[i] = new Array(this.getX());
    //this.playGroundVisual = this.playGround.slice();


    // inizializzazione delle matrici
    for(var i = 0; i < this.getY(); i++) for(var j = 0; j < this.getX(); j++) this.playGround[i][j] = (Math.random() < (1 - this.bombPerc)) ? this.elements.number : this.elements.bomb;
    for(var i = 0; i < this.getY(); i++) for(var j = 0; j < this.getX(); j++) this.playGroundVisual[i][j] = this.elements.clear;




    for(var i = 0; i < this.getY(); i++){
      for(var j = 0; j < this.getX(); j++){
        this.playGround[i][j] = this.playGround[i][j] == this.elements.bomb ? this.elements.bomb : this.numBombsAround(j, i);
      }
    }
  }



  this.getPlayGround = function(){
    return this.playGround;
  }

  this.setPlayGroundVisual = function(val, i, j){
    this.playGroundVisual[i][j] = val;
  }

  this.createTable = function(){
    var tableString = "";
    for(var i = 0; i < this.getY(); i++){
      tableString += this.HTMLelement.row;
       var actualContent = this.tableButtonPLay;
      for(var j = 0; j < this.getX(); j++){
        tableString += this.HTMLelement.col + actualContent.replace("{x_x_x}", this.elements.clear).replace("{y_y_y}",  i + "," + j ).replace("{z_z_z}", '') + this.HTMLelement.colEnd;
      }
      tableString += this.HTMLelement.rowEnd;
    }
    document.getElementById(this.tableId).innerHTML = tableString;
  };

  this.updateTable = function(){
    var tableString = "";
    for(var i = 0; i < this.getY(); i++){
      tableString += this.HTMLelement.row;
       var actualContent = this.tableButtonPLay;
      for(var j = 0; j < this.getX(); j++){
        var element = this.playGroundVisual[i][j];
        var elementToAdd = 'color:';

        //if(element == this.element.space)

        if(element == this.elements.bomb) elementToAdd = 'background: #ff0000';
        else if(element == this.elements.space) elementToAdd = 'background: black';
        else if(element != NaN){
          switch (element) {
            case 1:
              elementToAdd += '#3a73a9';
              break;
            case 2:
              elementToAdd += '#9966ff';
              break;
            case 3:
              elementToAdd += '#ff6699';
              break;
            default:
              elementToAdd += '#ff0000';
          }
        }
        else elementToAdd += '#ffffff';


        tableString += this.HTMLelement.col + actualContent.replace("{x_x_x}", element).replace("{y_y_y}",  i + "," + j ).replace("{z_z_z}", elementToAdd) + this.HTMLelement.colEnd;
      }
      tableString += this.HTMLelement.rowEnd;
    }
    document.getElementById(this.tableId).innerHTML = tableString;
  };

};


Game.prototype.numBombsAround = function (x, y) {
  var cont = 0;
  var numBombsNear = new Array();

  if((x > 0 && x < this.getX()) && (y > 0 && y < this.getY() - 1)){
    numBombsNear.push(this.playGround[y][x + 1], this.playGround[y][x - 1], this.playGround[y + 1][x + 1], this.playGround[y + 1][x - 1], this.playGround[y - 1][x + 1], this.playGround[y - 1][x - 1], this.playGround[y + 1][x], this.playGround[y - 1][x]);
  } else if (x == 0) {
    if(y == 0) numBombsNear.push(this.playGround[y][x + 1], this.playGround[y + 1][x + 1], this.playGround[y + 1][x]);
    else if (y == this.getY() - 1) numBombsNear.push(this.playGround[y][x + 1],  this.playGround[y - 1][x], this.playGround[y - 1][x + 1]);
    else numBombsNear.push(this.playGround[y][x + 1], this.playGround[y + 1][x + 1], this.playGround[y + 1][x], this.playGround[y - 1][x], this.playGround[y - 1][x + 1]);
  } else if(x == this.getX() - 1){
    if(y == 0) numBombsNear.push(this.playGround[y][x - 1], this.playGround[y + 1][x - 1], this.playGround[y + 1][x]);
    else if (y == this.getY() - 1) numBombsNear.push(this.playGround[y][x - 1],  this.playGround[y - 1][x], this.playGround[y - 1][x - 1]);
    else numBombsNear.push(this.playGround[y][x - 1], this.playGround[y + 1][x - 1], this.playGround[y + 1][x], this.playGround[y - 1][x], this.playGround[y - 1][x - 1]);
  } else if (y == 0) {
    numBombsNear.push(this.playGround[y][x + 1], this.playGround[y][x - 1], this.playGround[y + 1][x + 1], this.playGround[y + 1][x - 1], this.playGround[y + 1][x]);
  } else if (y == this.getY() - 1) {
    numBombsNear.push(this.playGround[y][x + 1], this.playGround[y][x - 1], this.playGround[y - 1][x + 1], this.playGround[y - 1][x - 1], this.playGround[y - 1][x]);
  }

  for (var i in numBombsNear) if(numBombsNear[i] == this.elements.bomb) cont++;
  return ((cont == 0) ? this.elements.clear : cont) ;
};

Game.prototype.blankArea = function (i, j) {
  //console.log("i: " + i + " j: " + j);
  if(i < 0 || i > this.getY() - 1 || j < 0 || j > this.getX() - 1) return;
  else if(this.playGround[i][j] == this.elements.bomb) return;
  else if(this.playGround[i][j] != this.elements.clear) {
    this.playGroundVisual[i][j] = this.playGround[i][j];
    return;
    return;
  }
  else {
    this.playGround[i][j] = this.elements.space;
    this.playGroundVisual[i][j] = this.elements.space;

    this.blankArea(i + 1, j);
    this.blankArea(i - 1, j);
    this.blankArea(i, j + 1);
    this.blankArea(i, j - 1);

    this.blankArea(i + 1, j + 1);
    this.blankArea(i + 1 , j - 1);
    this.blankArea(i - 1, j + 1);
    this.blankArea(i - 1, j - 1);
  }
  this.updateTable();
};

function clickButton(i, j){
  var value = prato.getPlayGround()[i][j];
  if(value == prato.elements.bomb){
    clearInterval(secondsGame);
    prato.setEndGame();
    prato.updateTable();
  }
  if(value == prato.elements.clear) prato.blankArea(i, j);
  else {
    prato.setPlayGroundVisual(value, i, j);
    prato.updateTable();
  }

}

function createGame(x, y){
  prato = new Game(x, y);
  prato.ini();
  prato.createTable();
}


function selectDifficulty(x){
  document.getElementById("secondi").innerHTML = 0;
  if (x == 0) createGame(9, 9);
  else if( x == 1) createGame(13, 13);
  else if(x == 2) createGame(21, 13);
  else createGame(30, 15);

  now = Date.now();

  secondsGame = setInterval(timer, 1000);

}

function timer(){
  var x = document.getElementById("secondi");
  x.innerHTML = parseInt((Date.now() - now) / 1000);
}


function main(){
}

window.onload = main();
