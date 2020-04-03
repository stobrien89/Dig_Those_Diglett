
let prevHole;

let p1Score = 0;
let p2Score = 0;

let p1Turn = true;

let countdown = true;

let twoPlayers = false;

let text = 0;

let win = false;

// let twoPlayerGame = false;

const selectSound = new Audio("./media/select.m4a");
const diglettSound = new Audio('./media/diglett_hit.m4a');
const waitingSound = new Audio('./media/selectgamemode.mp3');
const gameSound = new Audio('./media/game.m4a');

const gameDialogue = {
    intro1: `Digletts have been popping up everywhere in Pallet Town!`,
    intro: `Professor Oak needs your help! His garden has been overrun by Digletts.`,
    instructions: `Use your mallet to hit the digletts as they pop out of their burrows`,
    player2: `It's player 2's turn!`,
    player1win: `Player 1 wins!`,
    player2win: `Player 2 wins!`,
    loss: `Oh no! They've gotten away! You'll have to try again some other time.`,
    win: 'Nice job! Now the professor can finally get his garden back in order',



}


$(() => {

    // Cached dom elements:
    const $holes = $('.hole');
    const $digletts = $('.diglett');
    const $p1Score = $('.p1score');
    const $p2Score = $('.p2score');
    const $time = $('.time');
    const $startModal = $('#startmodal');
    const $gameModeBtn = $('.gamemodebtn');
    const $endModal = $('#endmodal');
    const $endModalBtn = $('.endmod-btn');
    const $endMsg = $('#end-message')
    const $textModal = $('#textmodal');
    const $textMsg = $('#text-message');
    const $textMsgBtn = $('.textmod-btn')
    const $gameMsg = $('#game-message');
    const $1Player = $('.oneplayer');
    const $2Player = $('.twoplayer');
    const $gameModal = $('#gamemodal');
    const $gameModalBtn = $('.gamemod-btn');
    const $board = $('#board');
    const $scoreBoard = $('#scoreboard');
    const $scoreBoard2 = $('#scoreboard2');

    //Initiates start of game
    const startGame = () => {
        displayModal($startModal, 'block')
    }

    //event handler for start buttons
    const gameMode = (event) => {
        let target = $(event.currentTarget);
        selectSound.play();
        target.hasClass('oneplayer') ? startText(1): startText(2);
        hideModal($startModal);
    }
    
    const playGame = (event) => {
        waitingSound.pause();
        if (twoPlayers) {
            twoPlayerGame();
        } else {
            game();
        }
    }

    const nextText = (event) => {
        selectSound.play();
        text++;
        console.log(text);
        text === 2 ? gameText() : startText();
    }

    const gameText = () => {
        hideModal($textModal);
        displayModal($gameModal, 'block');
        $gameMsg.text(gameDialogue.instructions);
    
    }

    const displayModal = (modal, property) => {
        modal.css(`display`, property);
    }

    const hideModal = (modal) => {
        modal.css(`display`, `none`);
    }
    
    const timeRandomizer = (start, end) => Math.round(Math.random() * (end - start) + start);

    const randomHole = (arr) => {
        const index = Math.floor(Math.random() * arr.length);
        let currentHole = arr[index];
        if (currentHole === prevHole) {
            return randomHole(arr);
        }
        
        return prevHole = currentHole;
    }


     const popUp = () => {
         const time = timeRandomizer(1000, 5000);
         const hole = randomHole($holes);
         console.log(time, hole);
         $(hole).addClass('popup');
         setTimeout(() => {
             $(hole).removeClass('popup')
             if(countdown) popUp();
         }, time);

     }

     //Event handler for hits to digletts
     const hitDiglett = (event) => {
        diglettSound.play(); 
        p1Turn === true ? p1Score++ : p2Score++;
         addPoints();
         $(event.currentTarget).parent().removeClass('popup');
         console.log(p1Score);

     }

     const addPoints = () => {
         if (p1Turn) {
            $p1Score.text(p1Score);
         }else {
             $p2Score.text(p2Score);
         }
     }

     const countDown = (sec) => {
        if (sec === 0) {
            countdown = false;
            $time.text(0);
            return;
        }
        $time.text(sec);

        return setTimeout(() => countDown(--sec), 1000)
     }

     //Displays game instructions
     const startText = (mode) => {
        waitingSound.play();
        displayModal($board, 'grid');
        displayModal($textModal, 'block');
        $textMsg.text(gameDialogue.intro1);
        if (mode === 2) {  
            twoPlayers = true;
        }
        if (text > 0) {
            $textMsg.text(gameDialogue.intro);
        }
     }



     const twoPlayerGame = () => {
        hideModal($gameModal);
            gameSound.currentTime = 0;
            gameSound.play();
            displayModal($scoreBoard2, 'block');
            countdown = true;
            console.log(p1Turn);
            popUp();
            countDown(10);
            if (p1Turn === true) {
                setTimeout(() => {
                    gameSound.pause();
                    p1Turn = false;
                    hideModal($scoreBoard2);
                    displayModal($gameModal, 'block');
                    $gameMsg.text(gameDialogue.player2);
                    return;
                }, 10000)
            }
    }



     const game = () => {
            gameSound.play();
            hideModal($gameModal);
            displayModal($scoreBoard, 'block');
            countdown = true;
            popUp();
            countDown(10);
            setTimeout(() => {
                gameSound.pause();
                hideModal($scoreBoard);
                displayModal($endModal, 'block');
                if (p1Score < 5) {
                    $endMsg.text(gameDialogue.loss);
                }else {
                    $endMsg.text(gameDialogue.win);
                }
                return;
            }, 10000)
     }

     
    

    startGame();

     $gameModeBtn.on('click', gameMode); 

     $textMsgBtn.on('click', nextText);

     $gameModalBtn.on('click', playGame);

     $digletts.on('click', hitDiglett);

     $endModalBtn.on('click', )

    
    // displayModal($scoreBoard2);
    // hideModal($scoreBoard);
    // twoPlayerGame();
     
})