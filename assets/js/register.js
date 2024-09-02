$(document).ready(function() {

    $('#startGame').click(function(e) {
        e.preventDefault();

        var playerX = $('#playerX').val().trim();
        var playerO = $('#playerO').val().trim();

        if (!validateUsername(playerX) || !validateUsername(playerO)) {

            alert('Both usernames must be at least 3 characters long and contain only letters and numbers.');

        } else {
            var users = JSON.parse(localStorage.getItem('users')) || [];
            var score = JSON.parse(localStorage.getItem('score')) || [];
            
            var nextId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;


            users.push({
                id: nextId,
                username: playerX,
                symbol: 'X'
            });
            users.push({
                id: nextId + 1,
                username: playerO,
                symbol: 'O'
            });
            score.push({
                XPlayer: nextId,
                OPlayer: nextId + 1,
                Xscore: 0,
                Oscore: 0
            });
          


            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('score', JSON.stringify(score));


            window.location.href = './board.html';

        }
    });


    function validateUsername(username) {
        
        var usernamePattern = /^[a-zA-Z0-9]{3,}$/;
        return usernamePattern.test(username);
    }
});
