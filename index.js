let timer, num1, num2;
let score = 0, i = 0;

window.onload = function() {
    let results_card = document.getElementById("results");
    results_card.style.display = "none";

    $("#instructionModal").modal("show");

    $("#instructionModal").on("hidden.bs.modal", function() {
        play();
    })
};

const showInfo = function() {
    $("#infoModal").modal("show");
}

const genNums = function() {
    num1 = genRandomInt(0, 9);
    num2 = genRandomInt(0, 9);

    $("#num1").html(`${num1}`);
    $("#num2").html(`${num2}`);
};

let endGame = function() {
    let results_card = document.getElementById("results");
    let highscore = localStorage.getItem("highscore");
    
    if (highscore === null) {
        localStorage.setItem("highscore", score);
        highscore = score;
    }
    else {
        if (score > highscore) localStorage.setItem("highscore", score);
    }

    results_card.style.display = "block";
    
    document.getElementById("answer").disabled = true;
    document.getElementById("answer").value = "";
    document.getElementById("restart").hidden = false;
    
    document.getElementById("score").innerHTML = `Score: ${score}</br>
                                    High Score: ${highscore}`;
}

const play = function() {
    document.getElementById("results").style.display = "none";
    document.getElementById("restart").hidden = true;
    
    if (document.getElementById("answer").disabled === true) {
        document.getElementById("answer").disabled = false;
        score = 0;
    }
    
    document.getElementById("answer").focus();
    genNums();

    let countDown = setInterval(function() {
        i += 10;
        let secondsLeft = (100 - i) / 10;
        if (secondsLeft <= 3) {
            $("#progressBar").attr("class", "progress-bar bg-danger");
        }
        if (i <= 100) {
            $(".progress-bar").css("width", i + '%');
            document.getElementById("progressBar").innerHTML = `${secondsLeft}`;
        }
        else {
            endGame();
            clearInterval(countDown);
        }
    }, 1000);
};

$("#answer").on('input', function() {
    let input = document.getElementById("answer").value;
    let num = parseInt(input);

    if (input.length >= 3) {
        score--;
        document.getElementById("answer").value = "";
        genNums();
    }

    if (num === num1 * num2) {
        score++;
        document.getElementById("answer").value = "";
        genNums();
    }

});

function genRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)+min);
}
