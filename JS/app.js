
let prevHole;

let p1Score = 0;
let p2Score = 0;

let p1Turn = true;

let countdown = true;

let twoPlayers = false;

let text = 0;

let win = false;

// let twoPlayerGame = false;

const openingSound = new Audio("./media/opening.m4a");
const selectSound = new Audio("./media/select.m4a");
const diglettSound = new Audio('./media/diglett_hit.m4a');
const waitingSound = new Audio('./media/selectgamemode.m4a');
const gameSound = new Audio('./media/game.m4a');
const creditsSound = new Audio('./media/end.mp3');

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
    const $playAgainModal = $('#playagain');
    const $playAgainBtn = $('.playagain-btn');
    const $quitBtn = $('.quit-btn');
    const $credits = $('#credits');
    const $startOverBtn = $('.startover-btn');
    const $difficultyModal = $('#difficultymodal')

    //Initiates start of game
    const startGame = () => {
        playSong(openingSound);
        displayModal($startModal, 'block')
    }

    //event handler for start buttons
    const gameMode = (event) => {
        selectSound.play();
        playSong(waitingSound);
        $(event.currentTarget).hasClass('oneplayer') ? startText(1): startText(2);
        hideModal($startModal);
    }
    
    const playGame = (event) => {
        selectSound.play();
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
        playSong(gameSound);
            displayModal($scoreBoard2, 'block');
            countdown = true;
            popUp();
            countDown(10);
            if (p1Turn === true) {
                setTimeout(() => {
                    gameSound.pause();
                    p1Turn = false;
                    hideModal($scoreBoard2);
                    displayModal($gameModal, 'block');
                    $gameMsg.text(gameDialogue.player2);
                    setTimeout(() => {
                        gameSound.pause();
                        hideModal($scoreBoard2);
                        displayModal($endModal, 'block');
                        if (p1Score < p2Score) {
                            $endMsg.text(gameDialogue.player2win);
                        }else {
                            $endMsg.text(gameDialogue.player1win);
                        }
                        return;
                    }, 11000)
                }, 10000)
            }
    }



     const game = () => {
            playSong(gameSound);
            hideModal($gameModal);
            displayModal($scoreBoard, 'block');
            countdown = true;
            popUp();
            countDown(10);
            checkWin();
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


    
    
    
     const checkWin = () => {
        if (p1Score >= 5) {
            win = true;
        }
    }

    const playSong = (song) => {
        song.currentTime = 0;
        song.play();
    }

    const endOrReset = (event) => {
        selectSound.play();
        if (!win) {
            hideModal($endModal);
            displayModal($playAgainModal, 'block');
        }
    }

    const resetValues = () => {
        p1Turn = true;
        p1Score = 0;
        p2Score = 0;
        $p1Score.text('0')
        $p2Score.text('0')
        win = false;
    }

    const restartGame = (event) => {
        selectSound.play();
        hideModal($playAgainModal);
        playSong(waitingSound);
        resetValues();
        gameText();
    }

    const endGame = (event) => {
        hideModal($playAgainModal);
        hideModal($board);
        playSong(creditsSound);
        displayModal($credits, 'block');
    }

    const startOver = (event) => {
        creditsSound.pause();
        resetValues();
        twoPlayers = false;
        text = 0;
        hideModal($credits);0
        startGame();
    }

    startGame();

     $gameModeBtn.on('click', gameMode); 

     $textMsgBtn.on('click', nextText);

     $gameModalBtn.on('click', playGame);

     $digletts.on('click', hitDiglett);

     $endModalBtn.on('click', endOrReset);

     $playAgainBtn.on('click', restartGame);

     $quitBtn.on('click', endGame);

     $startOverBtn.on('click', startOver);

    
    // displayModal($scoreBoard2);
    // hideModal($scoreBoard);
    // twoPlayerGame();
     
})