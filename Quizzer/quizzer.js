var quiz = {
      data: [
    {
        q : "What was the first state in the U.S.?",
        o : [
        "New York",
        "Delaware",
        "Pennsylvania",
        "Georgia"
        ],
        a : 1 // arrays start with 0, so answer is delaware
    },
    {
        q : "What is the hardest rock?",
        o : [
        "Granite",
        "Slate",
        "Diamond",
        "Emerald"
        ],
        a : 2
    },
    {
        q : "Name the world’s biggest island.",
        o : [
        "Greenland",
        "Australia",
        "Tahiti",
        "Galapagos"
        ],
        a : 0
    },
    {
        q : "What is the 7th planet from the sun?",
        o : [
        "Uranus",
        "Earth",
        "Pluto",
        "Mars"
        ],
        a : 0
    },
    {
        q : "How many hearts does an octopus have?",
        o : [
        "1",
        "4",
        "2",
        "3"
        ],
        a : 3
    },
    {
        q : "How many time zones are there in the world?",
        o : [
        "15",
        "24",
        "12",
        "18"
        ],
        a : 1
    },
    {
        q : "What is the symbol for potassium?",
        o : [
        "P",
        "T",
        "K",
        "M"
        ],
        a : 2
    },
    {
        q : "Which mammal doesn’t have vocal cords?",
        o : [
        "Dolphin",
        "Giraffe",
        "Antelope",
        "Wallaby"
        ],
        a : 1
    },
    {
        q : "A dog sweats through what part of its body?",
        o : [
        "Nose",
        "Tongue",
        "Panting",
        "Paws"
        ],
        a : 3
    },
    {
        q : "Which is the largest ocean on Earth?",
        o : [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean"
        ],
        a : 3
    }
    ],  

     
    // (A2) HTML ELEMENTS
    hWrap: null, // HTML quiz container
    hQn: null, // HTML question wrapper
    hAns: null, // HTML answers wrapper
   
  
    // (A3) GAME FLAGS
    now: 0, // current question
    score: 0, // current score
  
    // (B) INIT QUIZ 
    init: function(){
      // (B1) WRAPPER
      quiz.hWrap = document.getElementById("quizWrap"); 

      // (B2) QUESTIONS SECTION
      quiz.hQn = document.createElement("div");
      quiz.hQn.id = "quizQn";
      quiz.hWrap.appendChild(quiz.hQn);
  
      // (B3) ANSWERS SECTION
      quiz.hAns = document.createElement("div");
      quiz.hAns.id = "quizAns";
      quiz.hWrap.appendChild(quiz.hAns);

    
      // (B4) GO!
    quiz.draw();
    },

    // (C) DRAW QUESTION
    draw: function(){

    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;
  
      // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz";
        radio.id = "quizo" + i;
        quiz.hAns.appendChild(radio);
        let label = document.createElement("label");
        label.innerHTML = quiz.data[quiz.now].o[i];
        label.setAttribute("for", "quizo" + i);
        label.dataset.idx = i;
        label.addEventListener("click", quiz.select);
        quiz.hAns.appendChild(label);
    }
},   
    // (D) OPTION SELECTED
    select: function(){
        
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
        label.removeEventListener("click", quiz.select);
    }
  
      // (D2) CHECK IF CORRECT OR WRONG
    let correct = this.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
        quiz.score++;
        this.classList.add("correct");
    } else {
        this.classList.add("wrong");
    }
  
// (D3) NEXT QUESTION GAME OVER
    quiz.now++;    
        setTimeout(function(){
        if (quiz.now < quiz.data.length) { quiz.draw(); }
        else {
        quiz.hQn.innerHTML = "You have answered " + quiz.score + " of " + quiz.data.length + " correctly.";
        quiz.hAns.innerHTML = "<input type='button' value='Try Again?' onclick='quiz.reset()'></input>";
        }      
    }, 1000);    
   
},

    // (E) RESTART QUIZ
    reset : function () {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();   
    
    }
};

window.addEventListener('load', quiz.init);
