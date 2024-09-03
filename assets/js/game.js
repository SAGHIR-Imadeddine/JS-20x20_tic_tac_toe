$(document).ready(function() {
    var users = JSON.parse(localStorage.getItem('users'));
    var score = JSON.parse(localStorage.getItem('score')) || [];
    var playerX, playerO, history;
    var turn = 'x';
    var gameOver = false;
    const boardSize = 20;

    if (users && users.length >= 2) {
        playerX = users[users.length - 2];
        playerO = users[users.length - 1];
        history = score.find(s => s.XPlayer === playerX.username) || { Xscore: 0, Oscore: 0 };

        $('#score').html(`
            <p>${playerX.username}<span style="color: var(--dark-blue)"> ${history.Xscore} - ${history.Oscore} </span>${playerO.username}</p>
        `);


        var board = Array.from({ length: boardSize }, () => Array(boardSize).fill(''));

        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                $('<li class="cell"></li>')
                    .data('row', i)
                    .data('col', j)
                    .appendTo('#board');
            }
        }

        $('#board').on('click', '.cell', function() {
            if (gameOver) return;

            var $cell = $(this);
            var row = $cell.data('row');
            var col = $cell.data('col');

            if ($cell.hasClass('marked')) return;

            var icon = turn === 'x' ? '<ion-icon name="close-outline" style="color: var(--red)"></ion-icon>' : '<ion-icon name="ellipse-outline" style="color: var(--dark-blue)"></ion-icon>';
            $cell.html(icon).addClass('marked');

            board[row][col] = turn;

            if (checkForWinner(row, col)) {
                alert(`Player ${turn.toUpperCase()} wins!`);
                gameOver = true;
                updateScore(turn);
                localStorage.setItem('score', JSON.stringify(score));
            } else {
                turn = turn === 'x' ? 'o' : 'x';
                $('#score').html(`
                    <p>${playerX.username}<span style="color: var(--dark-blue)"> ${history.Xscore} - ${history.Oscore} </span>${playerO.username}</p>
                `);
            }
        });

        function checkForWinner(row, col) {
            const winLength = 5;
            const boardSize = 20;

            function countConsecutive(dr, dc) {
                let count = 0;
                let r = row;
                let c = col;

                while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === turn) {
                    count++;
                    r += dr;
                    c += dc;
                }

                return count;
            }

            return (
                countConsecutive(0, 1) + countConsecutive(0, -1) - 1 >= winLength ||
                countConsecutive(1, 0) + countConsecutive(-1, 0) - 1 >= winLength ||
                countConsecutive(1, 1) + countConsecutive(-1, -1) - 1 >= winLength ||
                countConsecutive(1, -1) + countConsecutive(-1, 1) - 1 >= winLength
            );
        }

        function updateScore(player) {
            if (player === 'x') {
                history.Xscore++;
            } else {
                history.Oscore++;
            }
        }
    } else {
        console.log('Not enough users found in local storage.');
    }
})