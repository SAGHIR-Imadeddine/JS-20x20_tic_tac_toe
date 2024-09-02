$(document).ready(function() {

    var users = JSON.parse(localStorage.getItem('users'));
    var score = JSON.parse(localStorage.getItem('score'));
    
    
    if (users && users.length >= 2) {
        
        var playerX = users[users.length - 2]; 
        var playerO = users[users.length - 1];
        var history = score.find(s => s.XPlayer === playerX.id);
        var turn = 'x';
        

        $('#score').html(`
            <p>${playerX.username}<span style="color: var(--dark-blue)"> ${history.Xscore} - ${history.Oscore} </span>${playerO.username}</p>
           
        `);
    } else {
        console.log('Not enough users found in local storage.');
    }

  
    var $gameBoard = $('#board');
    const board = [];



    for (let i = 0; i < 20; i++) {
        board[i] = [];
        for (let j = 0; j < 20; j++) {
            board[i][j];
            var $cell = $('<li class="cell"></li>');
            $cell.data('row', i);
            $cell.data('col', j);
            $gameBoard.append($cell);
        }
    }

    $gameBoard.on('click', '.cell', function() {
        var $this = $(this);
        

        if ($this.hasClass('marked')) {
            return;
        }

        if (turn === 'x') {
            $this.html('<ion-icon name="close-outline" style="color: var(--red)"></ion-icon>');
            $this.addClass('marked');
            turn = 'o';
        } else {
            $this.html('<ion-icon name="ellipse-outline" style="color: var(--dark-blue)"></ion-icon>');
            $this.addClass('marked');
            turn = 'x';
        }
    });
});
