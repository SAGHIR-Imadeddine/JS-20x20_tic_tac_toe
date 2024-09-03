$(document).ready(function() {

    var score = JSON.parse(localStorage.getItem('score'));
    
   
    
    if (score) {
       
        
        score.forEach(element => {
            
            $('#history').html(`
                <div>
                <span>${element.XPlayer} .................</span>
                <span>${element.Xscore} - ${element.Oscore}</span>
                <span>................. ${element.OPlayer}</span>
                </div>
            `);
        });

    } else {
        console.log('Not enough users found in local storage.');
    }

   
});
