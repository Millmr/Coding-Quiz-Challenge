//Create questions to ask the quiz taker!
var questions = [
    {
        question: "What is the first index of an array?",
        choices: ["[0]", "[1]", "[2]", "[3]"],
        answer: "[0]",
        userAnswer: "",
        outcome: false,
        time: 0
    },
    {
        question: "What are Javascripts boolean data type values?",
        choices: ["true and false", "yes and no", "positive and negative", "red or black"],
        answer: "true and false",
        userAnswer: "",
        outcome: false,
        time: 0
    },
    {
        question: "Which is not a primitive type?",
        choices: ["String", "Number", "Boolean", "Variable"],
        answer: "Variable",
        userAnswer: "",
        outcome: false,
        time: 0
    },
    {
        question: "What does DOM stand for?",
        choices: ["Digitat Obsolete Microtag", "Document Object Model", "Damage Operator Model", "Document Onset Manual"],
        answer: "Document Object Model",
        userAnswer: "",
        outcome: false,
        time: 0
    }
];
//Create the quiz function.
function quizGame() {
    var time = 0;
    var defaultTime = (15*questions.length);
    var penaltyTime = 15;
    var currentQuestion = 0;
    timeDisplay = document.getElementById("countDown");

//Create a function for when the start button is pressed the "mainContainer" element will be hidden and the questions will render. 
        function startBtn() {
            document.getElementById("startBtn").addEventListener("click", function(){
                document.getElementById("mainContainer").innerHTML = "";
                currentQuestion = 0;
                renderQuestion();
                countDownFunc();
            });
            document.getElementById("highScores").addEventListener("click", function(){
                handleHighscore();
            })
        }
        startBtn();

//Create a function to make the timer start when the start button is pressed. 
//Create if statement that will stop the game if the time runs out. 
        function countDownFunc() {
            time = defaultTime;
            mainInterval = setInterval(function() {
                time = time - 1;
                timeDisplay.innerHTML = time;

                if (time <= 0) {
                    clearInterval(mainInterval);
                    timeDisplay.innerhtml = "0"
                    endGame();
                }
            }, 1000);
        }

        var container = document.getElementById("mainContainer");

//Create a container for the questions to render in. 
        function makeRow(total, content) {
            for (var i = 0; i < total; i++) {
                var rowEl = document.createElement("div");
                rowEl.setAttribute("class", "row")
                var columnEl = document.createElement("div");
                columnEl.setAttribute("class", "center");
                columnEl.appendChild(content);
                rowEl.appendChild(columnEl);
                container.appendChild(rowEl);
            }
        }

//Create a function to make questions render.
//Create a for statement to give the answers a button.
//Create an addEventListener for when the quiz taker clicks their answer. 
        function renderQuestion() {
            container.innerHTML = "";
            var question = document.createElement("h3");
            question.innerHTML = questions[currentQuestion].question;
            
            console.log(questions[currentQuestion])

            makeRow(1, question);

            var answer = "";

            for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
                answer = document.createElement("button");
                answer.setAttribute("class", "startBtn");
                answer.innerHTML = questions[currentQuestion].choices[i];
                makeRow(1, answer)

                answer.addEventListener("click", function(){
                    questions[currentQuestion].userAnswer = questions[currentQuestion].choices[i];
                    console.log (questions[currentQuestion].userAnswer);
                    answerChecker();
                    nextQuestion();
                })
            }
        }

//Create a function that will check if the answer selected by the quiz taker is the correct answer.
//Create a if statement to let the quiz taker know if the were "Correct!", or "Wrong!".
        function answerChecker() {
            if (questions[currentQuestion].answer === questions[currentQuestion].userAnswer) {
                questions[currentQuestion].outcome = true;
                questions[currentQuestion].time = time;
                document.getElementById("outcome").innerHTML = "Correct!";
                setTimeout(function() {
                    document.getElementById("outcome").innerHTML = "";
                }, 1500);
            
            }   else {
                minusTime()
                questions[currentQuestion].outcome = false;
                document.getElementById("outcome").innerHTML = "Wrong!";
                setTimeout(function() {
                    document.getElementById("outcome").innerHTML = ("");
                }, 1500);
            }
        }

//Create a function that will minus the 15 seconds when incorrect answer is given.
        function minusTime() {
            time = time - penaltyTime;
        }
//Create a function that will switch to the next question in the array. 
        function nextQuestion() {
            if(currentQuestion <= (questions.length-2)) {
                currentQuestion = currentQuestion + 1;
                renderQuestion();
            } else {
                time=0;
            }
        }
//Create a function that will tally the users final score. 
        function finalScore() {
            var finalScore = 0;
            for(var i = 0; i < questions.length; i++){
                if(questions[i].outcome){
                    finalScore = finalScore + questions[i].time;
                } else {
                }
            }
            return finalScore;
        }
//Create a function that will end the game with a message that will give the users score. 
//Create a function that will store the users score to the local storage to be able to store high scores. 
        function endGame() {
            container.innerHTML = "";
            var endMessage = document.createElement("div");
            endMessage.setAttribute("class", "display-3");
            endMessage.innerText = "Game Over!";

            var scoreMessage = document.createElement("h4");
            scoreMessage.innerHTML = "Your score was: "+ finalScore();
            endMessage.appendChild(scoreMessage);

            var initials = document.createElement("div");
            initials.setAttribute("class", "userInput");
            initials.innerHTML = "Please enter your initials: <input type='text' id='intial-Input'></input>"
            endMessage.appendChild(initials);

            var highScore = document.createElement("button");
            highScore.setAttribute("class", "btnSuccess");
            highScore.setAttribute("id", "submitBtn");
            highScore.innerText = "Submit Highscore!";
            endMessage.appendChild(highScore);
            console.log(endGame)
            makeRow(1, endMessage);

            highScore.addEventListener("click", function() {
                var highscores = [];
                if(localStorage.getItem('highscore')){
                highscores = localStorage.getItem('highscore');
                highscores = highscores;
                }   else{
                var highscores = [];
                }
                
                var userInitial = document.getElementById('outcome').value;
                var userScore = finalScore();
                highscores[(highscores.length)] = {
                initial: userInitial,
                score: userScore
                }
                
                window.localStorage.setItem("highscore", JSON.stringify(highscores));

                handleHighscore(highscores);
                    });
                }

                function handleHighscore(highscores) {
                    
                    if(localStorage.getItem('highscore')) {
                        highscores = localStorage.getItem('highscore');
                        highscores = JSON.parse(highscores);
                    } else {
                        highscores = [];
                    }
                
                document.body.innerHTML = "";

                var highScoreContainer = document.createElement("div");
                highScoreContainer.setAttribute("class", "container");

                var highscoreTitle = document.createElement("div");
                highscoreTitle.setAttribute("class", "displayScore")
                highscoreTitle.innerHTML = "Highscores";
                highScoreContainer.appendChild(highscoreTitle);

                for (var i = 0; i < highscores.length; i++) {
                    var scoreDisplay = document.createElement("div");
                    scoreDisplay.setAttribute("class", "secondary")
                    scoreDisplay.innerText = (i+1)+". "+highscores[i].initial+" - "+highscores[i].score;
                    highScoreContainer.appendChild(scoreDisplay);
                }

                var restartBtn = document.createElement("button");
                restartBtn.setAttribute("class", "startBtn");
                restartBtn.innerText = "Restart Quiz";
                highScoreContainer.appendChild(restartBtn);
                restartBtn.addEventListener("click", function() {
                    document.location.reload()
                });

                var clearScore = document.createElement("button");
                clearScore.setAttribute("class", "startBtn");
                clearScore.innerText = "Clear Highscores";
                highScoreContainer.append(clearScore);
                clearScore.addEventListener("click", function(){
                    window.localStorage.removeItem('Highscore');
                    handleHighscore();
                });

                document.body.appendChild(highScoreContainer);
                }
            
}
quizGame();