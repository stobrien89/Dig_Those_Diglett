//🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐Global Variables and general purpose functions 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐//////

let prevHole;

let p1Score = 0;
let p2Score = 0;

let p1Turn = true;

let countDown = true;

let twoPlayers = false;

let text = 0;

let win = false;

let tie = false;

let difficultyLevel;

const displayModal = (modal, property) => modal.css(`display`, property);

const hideModal = (modal) => modal.css(`display`, `none`);

const playSong = (song) => {
    song.currentTime = 0;
    song.play();
}

const timeRandomizer = (start, end) => Math.round(Math.random() * (end - start) + start);


//𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞
//            Audio Files
//𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞
const openingSound = new Audio("./media/opening.m4a");
const selectSound = new Audio("./media/select.m4a");
const diglettSound = new Audio('./media/diglett_hit.m4a');
const waitingSound = new Audio('./media/selectgamemode.m4a');
const gameSound = new Audio('./media/game.m4a');
const creditsSound = new Audio('./media/end.mp3');
const lossSound = new Audio('./media/loss.m4a');
const winSound = new Audio('./media/win.mp3');

///////////////////////             /////////////////////////////////////
///////////////////////🅣🅔🅧🅣 stuff///////////////////////////////////////
const gameDialogue = {
    intro1: `Pallet town is having a Diglett crisis. Professor Oak needs your help! `,
    intro: `His garden has been overrun by Digletts. Hit at least eight before they run away!`,
    instructions: `Use your shovel to hit the digletts as they pop out of their holes.`,
    player2: `It's player 2's turn!`,
    loss: `Oh no! The rest have gotten away! You'll have to try again some other time.`,
}


$(() => {
    //////////////////////        $$$$$        ///////////////////////
    //$$$$$$$$$$$$$$$$$$$$ Cached Dom Elements $$$$$$$$$$$$$$$$$$$$//
   ///////////////////////        $$$$$           ////////////////////
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
    const $easyBtn = $('.easy');
    const $intBtn = $('.intermediate');
    const $hardBtn = $('.hard');
///////////////////////////////////////////////////////////////////////////////////

 ///////Initiates start of game////////////////////////
    const startGame = () => {
        playSong(openingSound);
        displayModal($startModal, 'block')
    }


    const startText = () => {
        displayModal($board, 'grid');
        displayModal($textModal, 'block');
        $textMsg.text(gameDialogue.intro1);
        if (text > 0) {
            $textMsg.text(gameDialogue.intro);
        }
     }

    const gameText = () => {
        hideModal($textModal);
        displayModal($gameModal, 'block');
        $gameMsg.text(gameDialogue.instructions);
    }

    //////////////////////////                                          //////////////////////////////////
    /////////////////////////Functions that control board movement and hits////////////////////////////////
    /////////////////////////                                          /////////////////////////////////

    const randomHole = (arr) => {
        const index = Math.floor(Math.random() * arr.length);
        let currentHole = arr[index];
        if (currentHole === prevHole) {
            return randomHole(arr);
        }
        
        return prevHole = currentHole;
    }

    const popUp = () => {
         let time;
         if (difficultyLevel === 'easy') {
             time = timeRandomizer(1000, 2000)
         }else if (difficultyLevel === 'intermediate'){
             time = timeRandomizer(500, 1000);
         }else {
             time = timeRandomizer(300, 700);
         }
         const hole = randomHole($holes);
         $(hole).addClass('popup');
         setTimeout(() => {
             $(hole).removeClass('popup')
             if(countDown) popUp();
         }, time);

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
     
     /////////////////////////////////////////////////////////                                                                      /////////////////////////////
     ////////////////////////////////////////////////////////Functions that control player turns and exits out of game mode/////////////////////////////
     ////////////////////////////////////////////////////////           Sorry for the Wet code                                 /////////////////////////////
     
     
     const twoPlayerGame = () => {
        debugger;
        hideModal($gameModal);
        playSong(gameSound);
        displayModal($scoreBoard2, 'block');
        countDown = true;
        popUp();
        debugger;
        countDown(15);
        
        setTimeout(() => {
            gameSound.pause();
            hideModal($scoreBoard2);
            if (p1Turn) {
                displayModal($gameModal, 'block');
                debugger;
                $gameMsg.text(gameDialogue.player2);
                p1Turn = false;
            }else {
                checkWin();
                p1Turn = false;
                console.log(p1Turn);
                console.log(win);
                if(win === true) {
                displayModal($endModal, 'block');
                if (p1Score < p2Score) {
                    playSong(winSound);
                    $endMsg.text('Player 2 wins with ' + p2Score + ' hits!');
                }else {
                    playSong(winSound);
                    $endMsg.text(`Player 1 wins with ${p1Score} hits!`);
                        }
                return;
                }
            }
        }, 16,500)
    }

    const game = () => {
        debugger;    
        playSong(gameSound);
            hideModal($gameModal);
            displayModal($scoreBoard, 'block');
            countDown = true;
            popUp();
            countDown(15);
            checkWin();
            setTimeout(() => {
                gameSound.pause();
                hideModal($scoreBoard);
                displayModal($endModal, 'block');
                if (p1Score < 5) {
                    lossSound.play();
                    $endMsg.text(gameDialogue.loss);
                }else {
                    playSong(winSound);
                    $endMsg.text(`Nice job! You ran off ${p1Score} of 'em. Now the professor can finally get his garden back in order`);
                }
                return;
            }, 16500)
     }

    const checkWin = () => {
        if (twoPlayerGame) {
            if (!p1Turn) {
                if (p1Score > p2Score || p2Score > p1Score) {
                    win = true;
                }
                else tie = true;
            }
        }
        if (p1Score >= 5) {
            win = true;
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

/////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////Event Handlers//////////////////////////////////////////
    //////////////////////////////////////            ///////////////////////////////////
    const gameMode = (event) => {
        openingSound.pause();
        selectSound.play();
        playSong(waitingSound);
        $(event.currentTarget).hasClass('twoplayer') ? twoPlayers = true : twoPlayers = false;
        hideModal($startModal);
        displayModal($difficultyModal, 'block');
    }
    
    const playGame = (event) => {
        selectSound.play();
        waitingSound.pause();
        if (twoPlayers === true) {
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

     const hitDiglett = (event) => {
        diglettSound.play(); 
        p1Turn === true ? p1Score++ : p2Score++;
         addPoints();
         $(event.currentTarget).parent().removeClass('popup');
    }

    const endOrReset = (event) => {
        selectSound.play();
        hideModal($endModal);
        displayModal($playAgainModal, 'block');
    }
    
    const difficulty = (event) => {
        let $target = $(event.currentTarget);
        if ($target.hasClass('easy')) {
           difficultyLevel = 'easy';
           hideModal($difficultyModal);
        }else if ($target.hasClass('intermediate')) {
            difficultyLevel = 'intermediate';
            hideModal($difficultyModal);
        }else {
            difficultyLevel = 'hard';
            hideModal($difficultyModal);
        }
        startText();
    }

    const restartGame = (event) => {
        winSound.pause();
        selectSound.play();
        hideModal($playAgainModal);
        playSong(waitingSound);
        resetValues();
        gameText();
    }

    const endGame = (event) => {
        winSound.pause();
        hideModal($playAgainModal);
        hideModal($board);
        playSong(creditsSound);
        displayModal($credits, 'block');
    }

    const startOver = (event) => {
        creditsSound.pause();
        resetValues();
        text = 0;
        hideModal($credits);0
        startGame();
    }


    //////////////////////////////////////
   //        Event li$tener$
    ///////////////////////////////////////
     $gameModeBtn.on('click', gameMode); 

     $easyBtn.on('click', difficulty);

     $intBtn.on('click', difficulty);

     $hardBtn.on('click', difficulty);

     $textMsgBtn.on('click', nextText);

     $gameModalBtn.on('click', playGame);

     $digletts.on('click', hitDiglett);

     $endModalBtn.on('click', endOrReset);

     $playAgainBtn.on('click', restartGame);

     $quitBtn.on('click', endGame);

     $startOverBtn.on('click', startOver);

     
     startGame();
})