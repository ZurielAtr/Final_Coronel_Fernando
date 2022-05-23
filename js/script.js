"use strict";
//getting all required elements 
const startBtn = document.querySelector('.start-btn button');
const infoBox = document.querySelector('.info-box');
const exitBtn = infoBox.querySelector('.quit');
const continueBtn = infoBox.querySelector('.restart');
const quizBox = document.querySelector('.quiz-box')
const timeCount = document.querySelector('.timer-sec');
const timeLine = document.querySelector('.time-line');
const optionList = document.querySelector('.option-list');

// if Start quiz Button Clicked
startBtn.onclick = () => {
    infoBox.classList.add("activeinfo");
};

// If Exit Button Clicked
exitBtn.onclick = () => {
    infoBox.classList.remove("activeinfo");
};

// If Continue Button Clicked
continueBtn.onclick = () => {
    infoBox.classList.remove("activeinfo");
    quizBox.classList.add('activequiz');
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
};

let queCount = 0;
let queNumb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');
const resultBox = document.querySelector('.result-box');
const restartQuiz = resultBox.querySelector('.restart');
const exitQuiz = resultBox.querySelector('.quit');

restartQuiz.onclick = () => {
    quizBox.classList.add('activequiz');
    resultBox.classList.remove('activeResult');
    timeValue = 15;
    queCount = 0;
    queNumb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(queCount);
    queCounter(queNumb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = 'none';
};

exitQuiz.onclick = () => {
    window.location.reload();
};

//If Next Button Clicked
nextBtn.onclick = () => {
    if (queCount < questions.length - 1) {
        queCount++;
        queNumb++;
        showQuestions(queCount);
        queCounter(queNumb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.style.display = 'none';
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResultBox();
    }
};

//getting questions and options from array
function showQuestions(index) {
    const queText = document.querySelector('.que-text');
    let queTag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let optionTag = '<div class="options"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="options"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="options"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="options"><span>' + questions[index].options[3] + '</span></div>';
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    const option = optionList.querySelectorAll(".options");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    };
};

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>'
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>'

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    let allOptions = optionList.children.length;
    if (userAns == correctAns) {
        userScore += 1;
        answer.classList.add('correct');
        answer.insertAdjacentHTML('beforeend', tickIcon);
    } else {
        answer.classList.add('incorrect')
        answer.insertAdjacentHTML('beforeend', crossIcon);

        //if answer is incorrect the automatically select the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAns) {
                optionList.children[i].setAttribute('class', 'options correct');
                optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);
            }
        }
    }

    //once user selected disable all options
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disable');
    }
    nextBtn.style.display = 'block';
};

function showResultBox() {
    resultBox.classList.add('activeResult');
    infoBox.classList.remove("activeinfo");
    quizBox.classList.remove('activequiz');
    const scoreText = resultBox.querySelector('.score-text');
    if (userScore > 3) {
        let scoreTag = '<span>Felicidades!, has conseguido <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 1) {
        let scoreTag = '<span>Algo es algo :D <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<span>Lo siento, conseguiste <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        };
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = '00';
            let correctAns = questions[queCount].answer;
            let allOptions = optionList.children.length;
            for (let i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent == correctAns) {
                    optionList.children[i].setAttribute('class', 'options correct');
                    optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);
                }
            }
            for (let i = 0; i < allOptions; i++) {
                optionList.children[i].classList.add('disable');
            }
            nextBtn.style.display = 'block';
        }
    }
};

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeLine.style.width = time + 'px';
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
};

function queCounter(index) {
    const bottonQuesCounter = document.querySelector('.total-que');
    let totalQueCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Preguntas</span>';
    bottonQuesCounter.innerHTML = totalQueCountTag;
};