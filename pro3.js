// Author: Cory Wall

//global variables
var user, board, turn = true;
var fr_row, fr_col, to_row, to_col;
var xCount = 0;
var oCount = 0;

function pieceToMove() {
  document.getElementById('feedback').innerHTML = "feedback";
  console.log('in pieceToMove');
  var input = document.getElementById("selectPiece").value;
  var inputLength = input.length;
  if(inputLength != 3)  {
    document.getElementById('feedback').innerHTML = "Invalid input, make sure your input is in the format #,#";
  } else if (isNaN(input.charAt(0))) {
    document.getElementById('feedback').innerHTML = "Invalid input, row value must be a number";
  } else if (isNaN(input.charAt(3))) {
    document.getElementById('feedback').innerHTML = "Invalid input, column value must be a number";
  } else if (input.charAt(0) < 0 || input.charAt(0) > 7) {
    document.getElementById('feedback').innerHTML = "Invalid input, row value out of index";
  } else if (input.charAt(2) < 0 || input.charAt(2) > 7) {
    document.getElementById('feedback').innerHTML = "Invalid input, column value out of index";
  }

   if (checkIfPlayerPiece(input.charAt(0), input.charAt(2))) {
     fr_row = Number(input.charAt(0));
     fr_col = Number(input.charAt(2));
     document.getElementById('selectPieceBtn').disabled = true;
     document.getElementById('moveBtn').disabled = false;
   }

}

function checkIfPlayerPiece(rw, col) {
  var tempRow = Number(rw);
  var tempCol = Number(col);
  if (turn) {
    if (board[tempRow][tempCol] == 'x'|| board[tempRow][tempCol] == 'X') {
      return true;
    } else {
      document.getElementById('feedback').innerHTML = "That is not your piece";
      return false;
    }
  } else {
    if (board[tempRow][tempCol] == 'o' || board[tempRow][tempCol] == 'O') {
      return true;
    } else {
      document.getElementById('feedback').innerHTML = "That is not your piece";
      return false;
    }
  }
}

function moveTo() {
  document.getElementById('feedback').innerHTML = "feedback";
  console.log('in moveTo()');
  var input = document.getElementById("move").value;
  var inputLength = input.length;
  if(inputLength != 3)  {
    document.getElementById('feedback').innerHTML = "Invalid input, make sure your input is in the format #,#";
  } else if (isNaN(input.charAt(0))) {
    document.getElementById('feedback').innerHTML = "Invalid input, row value must be a number";
  } else if (isNaN(input.charAt(3))) {
    document.getElementById('feedback').innerHTML = "Invalid input, column value must be a number";
  } else if (input.charAt(0) < 0 || input.charAt(0) > 7) {
    document.getElementById('feedback').innerHTML = "Invalid input, row value out of index";
  } else if (input.charAt(2) < 0 || input.charAt(2) > 7) {
    document.getElementById('feedback').innerHTML = "Invalid input, column value out of index";
  }

  var row = Number(input.charAt(0));
  var col = Number(input.charAt(2));

// if player1 turn
  if (turn) {
    //if a valid move
    if (checkIfValidMove(row, col)) {
      //if a jump
      if (board[row][col] == 'o' || board[row][col] == 'O') {
        // if not a king
        if (board[fr_row][fr_col] == 'x') {
          //if moving right
          if (col > fr_col) {
            // if jump spot is empty
            if (checkIfEmpty(row + 1, col +1)) {
              board[row+1][col+1] = board[fr_row][fr_col];
              board[fr_row][fr_col] = '';
              board[row][col] = '';
              updateBoard(fr_row,fr_col,'');
              updateBoard(row+1,col+1,'X');
              updateBoard(row,col, '');
              turn = !turn;
              diableMovebtn();
              updateTurnDisplay();
              checkIfKing();
              checkIfWin();
            }
          // if moving left
          } else if (col < fr_col) {
            // if spot empty
            if (checkIfEmpty(row + 1, col - 1)) {
              board[row+1][col-1] = board[fr_row][fr_col];
              board[fr_row][fr_col] = '';
              board[row][col] = '';
              updateBoard(fr_row,fr_col,'');
              updateBoard(row+1,col-1,'X');
              updateBoard(row,col, '');
              turn = !turn;
              diableMovebtn();
              updateTurnDisplay();
              checkIfKing();
              checkIfWin();
            }
          }
        // if is a king
        } else if(board[fr_row][fr_col] == 'X') {
          // if moving down and right
          if (row > fr_row && col > fr_col) {
            // if jump spot is empty
            if (checkIfEmpty(row + 1, col +1)) {
              board[row+1][col+1] = board[fr_row][fr_col];
              board[fr_row][fr_col] = '';
              board[row][col] = '';
              updateBoard(fr_row,fr_col,'');
              updateBoard(row+1,col+1,'X');
              updateBoard(row,col, '');
              turn = !turn;
              diableMovebtn();
              updateTurnDisplay();
              checkIfKing();
              checkIfWin();
            }
          // if moving down and left
          } else if (row > fr_row && col < fr_col) {
            // if jump spot is empty
            if (checkIfEmpty(row + 1, col - 1)) {
              board[row+1][col-1] = board[fr_row][fr_col];
              board[fr_row][fr_col] = '';
              board[row][col] = '';
              updateBoard(fr_row,fr_col,'');
              updateBoard(row+1,col-1,'X');
              updateBoard(row,col, '');
              turn = !turn;
              diableMovebtn();
              updateTurnDisplay();
              checkIfKing();
              checkIfWin();
            }
          // if moving up and right
          } else if (row < fr_row && col > fr_col) {
            // if spot empty
            if (checkIfEmpty(row - 1, col + 1)) {
              board[row-1][col+1] = board[fr_row][fr_col];
              board[fr_row][fr_col] = '';
              board[row][col] = '';
              updateBoard(fr_row,fr_col,'');
              updateBoard(row-1,col+1,'X');
              updateBoard(row,col, '');
              turn = !turn;
              diableMovebtn();
              updateTurnDisplay();
              checkIfKing();
              checkIfWin();
            }
        // if moving up and left
          } else if (row < fr_row && col < fr_col) {
            if (checkIfEmpty(row - 1, col - 1)) {
              board[row-1][col-1] = board[fr_row][fr_col];
              board[fr_row][fr_col] = '';
              board[row][col] = '';
              updateBoard(fr_row,fr_col,'');
              updateBoard(row-1,col-1,'X');
              updateBoard(row,col, '');
              turn = !turn;
              diableMovebtn();
              updateTurnDisplay();
              checkIfKing();
              checkIfWin();
            }
          }
        }
      // if not a jump just a move
    } else {
      if (checkIfEmpty(row,col)) {
        board[row][col] = board[fr_row][fr_col];
        board[fr_row][fr_col] = '';
        updateBoard(fr_row,fr_col,'');
        updateBoard(row,col,'X');
        turn = !turn;
        diableMovebtn();
        updateTurnDisplay();
        checkIfKing();
        checkIfWin();
      }
    }

  }
  } else {
    if (checkIfValidMove2(row, col)) {
      //if a jump
      if (board[row][col] == 'x' || board[row][col] == 'X') {
        // if not a king
        if (board[fr_row][fr_col] == 'o') {
          //if moving right
          if (col > fr_col) {
            // if jump spot is empty
            if (checkIfEmpty(row - 1, col +1)) {
              board[row-1][col+1] = board[fr_row][fr_col];
              board[fr_row][fr_col] = '';
              board[row][col] = '';
              updateBoard(fr_row,fr_col,'');
              updateBoard(row-1,col+1,'O');
              updateBoard(row,col, '');
              turn = !turn;
              diableMovebtn();
              updateTurnDisplay();
              checkIfKing();
              checkIfWin();
            }
          // if moving left
          } else if (col < fr_col) {
            // if spot empty
            if (checkIfEmpty(row - 1, col - 1)) {
              board[row-1][col-1] = board[fr_row][fr_col];
              board[fr_row][fr_col] = '';
              board[row][col] = '';
              updateBoard(fr_row,fr_col,'');
              updateBoard(row-1,col-1,'O');
              updateBoard(row,col, '');
              turn = !turn;
              diableMovebtn();
              updateTurnDisplay();
              checkIfKing();
              checkIfWin();
            }
          }
        // if is a king
      } else if(board[fr_row][fr_col] == 'O') {
          // if moving down and right
          if (row > fr_row && col > fr_col) {
            // if jump spot is empty
            if (checkIfEmpty(row + 1, col +1)) {
              board[row+1][col+1] = board[fr_row][fr_col];
              board[fr_row][fr_col] = '';
              board[row][col] = '';
              updateBoard(fr_row,fr_col,'');
              updateBoard(row+1,col+1,'O');
              updateBoard(row,col, '');
              turn = !turn;
              diableMovebtn();
              updateTurnDisplay();
              checkIfKing();
              checkIfWin();
            }
          // if moving down and left
          } else if (row > fr_row && col < fr_col) {
            // if jump spot is empty
            if (checkIfEmpty(row + 1, col - 1)) {
              board[row+1][col-1] = board[fr_row][fr_col];
              board[fr_row][fr_col] = '';
              board[row][col] = '';
              updateBoard(fr_row,fr_col,'');
              updateBoard(row+1,col-1,'O');
              updateBoard(row,col, '');
              turn = !turn;
              diableMovebtn();
              updateTurnDisplay();
              checkIfKing();
              checkIfWin();
            }
          // if moving up and right
          } else if (row < fr_row && col > fr_col) {
            // if spot empty
            if (checkIfEmpty(row - 1, col + 1)) {
              board[row-1][col+1] = board[fr_row][fr_col];
              board[fr_row][fr_col] = '';
              board[row][col] = '';
              updateBoard(fr_row,fr_col,'');
              updateBoard(row-1,col+1,'O');
              updateBoard(row,col, '');
              turn = !turn;
              diableMovebtn();
              updateTurnDisplay();
              checkIfKing();
              checkIfWin();
            }
        // if moving up and left
          } else if (row < fr_row && col < fr_col) {
            if (checkIfEmpty(row - 1, col - 1)) {
              board[row-1][col-1] = board[fr_row][fr_col];
              board[fr_row][fr_col] = '';
              board[row][col] = '';
              updateBoard(fr_row,fr_col,'');
              updateBoard(row-1,col-1,'O');
              turn = !turn;
              diableMovebtn();
              updateTurnDisplay();
              checkIfKing();
              checkIfWin();
            }
          }
        }
      // if not a jump just a move
    } else {
      if (checkIfEmpty(row,col)) {
        board[row][col] = board[fr_row][fr_col];
        board[fr_row][fr_col] = '';
        updateBoard(fr_row,fr_col,'');
        updateBoard(row,col,'O');
        turn = !turn;
        diableMovebtn();
        updateTurnDisplay();
        checkIfKing();
        checkIfWin();
      }
    }
    }
  }
}

function checkIfWin() {
  var i, j, xCount = 0, oCount = 0;
  for(i = 0; i < 8; i++) {
    for(j = 0; j < 8; j++) {
      if(board[i][j] == 'x' || board[i][j] == 'X'){
        xCount++;
      } else if (board[i][j] == 'o' || board [i][j] == 'O') {
        oCount++;
      }
    }
  }
  if(xCount == 0 ) {
    setCookie('winner', user.playerTwo, 1);
    window.location.href='winner.html';
  } else if (oCount == 0) {
    setCookie('winner', user.playerOne, 1);
    window.location.href='winner.html';
  }
}
function returnHome() {
  window.location.href='index.html';
}


function checkIfKing() {
  var i, j;
  for(i = 0; i < 8; i++) {
    if(board[0][i] == 'o') {
      board[0][i] = 'O';
      var kngBtn = 'checker0' + i;
      document.getElementById(kngBtn).classList.add("king");
    }
  }

  for(j = 0; j < 8; j++) {
    if(board[7][j] == 'o') {
      board[7][j] == 'O';
      var kngBtn2 = 'checker7' + i;
      document.getElementById(kngBtn2).classList.add("king");
    }
  }
}

function winner() {
  var winner = getCookie('winner');
  document.getElementById('winner').innerHTML = winner + " WINS!!!"
}

function updateTurnDisplay() {
  if (turn) {
    document.getElementById('turn').innerHTML = user.playerOne + "s turn";
    document.getElementById('selectPiece').value = '';
    document.getElementById('move').value = '';
  } else {
    document.getElementById('turn').innerHTML = user.playerTwo + "s turn";
    document.getElementById('selectPiece').value = '';
    document.getElementById('move').value = '';
  }
}

function diableMovebtn() {
  document.getElementById('selectPieceBtn').disabled = false;
  document.getElementById('moveBtn').disabled = true;
}

function updateBoard(i, j, val) {
  var btn = 'checker' + i + j;
  document.getElementById(btn).innerHTML = val;
}

function checkIfEmpty(rw, col) {
  var tempRW = Number(rw);
  var tempCOL = Number(col);
  if (tempRW > 7 || tempRW < 0 || tempCOL > 7 || tempCOL < 0) {
    document.getElementById('feedback').innerHTML = "Invalid input, spot out of bounds";
    return false;
  }
  if (board[tempRW][tempCOL] != '') {
    document.getElementById('feedback').innerHTML = "Invalid input, spot not empty";
    return false;
  } else {
    return true;
  }
}

function checkIfValidMove(row, colmn) {
  var rw = Number(row);
  var col = Number(colmn);
  if (board[fr_row][fr_col] == 'x') {
    if (rw == (fr_row+1) && col == (fr_col+1)) {
      console.log(395)
      return true;
    } else if (rw == (fr_row+1) && col == (fr_col-1)) {
      console.log(398)
      return true;
    } else {
      document.getElementById('feedback').innerHTML = "Invalid move";
      console.log(402);
      return false;
    }
  } else if (board[fr_row][fr_col] == 'X') {
    if ((rw == fr_row + 1 || rw == fr_row - 1) && (col == fr_col + 1 || col == fr_col - 1)) {
      return true;
    } else {
      document.getElementById('feedback').innerHTML = "Invalid move";
      console.log(406);
      return false;
    }
  }
}

function checkIfValidMove2(row, colmn) {
  var rw = Number(row);
  var col = Number(colmn);
  if (board[fr_row][fr_col] == 'o') {
    if (rw == fr_row - 1 && (col == fr_col + 1 || col == fr_col - 1)) {
      return true;
    } else {
      document.getElementById('feedback').innerHTML = "Invalid move";
      console.log(418);
      return false;
    }
  } else if (board[fr_row][fr_col] == 'O') {
    if ((rw == fr_row + 1 || rw == fr_row - 1) && (col == fr_col + 1 || col == fr_col - 1)) {
      return true;
    } else {
      document.getElementById('feedback').innerHTML = "Invalid move";
      console.log(426);
      return false;
    }
  }
}


function main() {
  createBoard();
  var play1 = getCookie("playerOne");
  var play2 = getCookie("playerTwo");
  user = new userInfo(play1, play2);
  document.getElementById('turn').innerHTML= user.playerOne + "s turn";
  document.getElementById('instructions').innerHTML = user.playerOne + " is the X'x<br>" + user.playerTwo + " is O's"

}

// Set up a multi dimensional array as the "board"
function createBoard() {
  board = new Array();

  for (i = 0; i < 8; i++) {
    board[i] = new Array();
  }

  board[0][0] = '';
  board[0][1] = 'x';
  board[0][2] = '';
  board[0][3] = 'x';
  board[0][4] = '';
  board[0][5] = 'x';
  board[0][6] = '';
  board[0][7] = 'x';

  board[1][0] = 'x';
  board[1][1] = '';
  board[1][2] = 'x';
  board[1][3] = '';
  board[1][4] = 'x';
  board[1][5] = '';
  board[1][6] = 'x';
  board[1][7] = '';

  board[2][0] = '';
  board[2][1] = 'x';
  board[2][2] = '';
  board[2][3] = 'x';
  board[2][4] = '';
  board[2][5] = 'x';
  board[2][6] = '';
  board[2][7] = 'x';

  board[3][0] = '';
  board[3][1] = '';
  board[3][2] = '';
  board[3][3] = '';
  board[3][4] = '';
  board[3][5] = '';
  board[3][6] = '';
  board[3][7] = '';

  board[4][0] = '';
  board[4][1] = '';
  board[4][2] = '';
  board[4][3] = '';
  board[4][4] = '';
  board[4][5] = '';
  board[4][6] = '';
  board[4][7] = '';

  board[5][0] = 'o';
  board[5][1] = '';
  board[5][2] = 'o';
  board[5][3] = '';
  board[5][4] = 'o';
  board[5][5] = '';
  board[5][6] = 'o';
  board[5][7] = '';

  board[6][0] = '';
  board[6][1] = 'o';
  board[6][2] = '';
  board[6][3] = 'o';
  board[6][4] = '';
  board[6][5] = 'o';
  board[6][6] = '';
  board[6][7] = 'o';

  board[7][0] = 'o';
  board[7][1] = '';
  board[7][2] = 'o';
  board[7][3] = '';
  board[7][4] = 'o';
  board[7][5] = '';
  board[7][6] = 'o';
  board[7][7] = '';
}

function userInfo(fNam, lNam) {
  this.playerOne = fNam;
  this.playerTwo = lNam;
}

function checkFirst() {
  var tmp = document.getElementById("player_one").value;
  if (tmp == "" || tmp == undefined) {
    return false;
  } else {
    return true;
  }
}

function checkLast() {
  var tmp = document.getElementById('player_two').value;
  if (tmp == "" || tmp == undefined) {
    return false;
  } else {
    return true;
  }
}

function addUser() {
  var checkF = checkFirst();
  var checkL = checkLast();
  if (checkF && checkL) {
    var first = document.getElementById("player_one").value;
    var last = document.getElementById('player_two').value;
    user = new userInfo(first, last);
    setCookie("playerOne", user.playerOne, 1);
    setCookie("playerTwo", user.playerTwo, 1);
    window.location.href='checkers.html';
  } else {
    document.getElementById('user_error').innerHTML = "Two players are required.";
  }
}


// Courtesy of W3schools
// https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Courtesy of w3schools
// https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
