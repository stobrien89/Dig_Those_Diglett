
let prevHole;

let p1Score = 0;
let p2Score = 0;

let p1Turn = true;


$(() => {

    // Cached dom elements:
    const $holes = $('.hole');
    const $digletts = $('.diglett');

    const timeRandomizer = (start, end) => Math.round(Math.random() * (end - start) + start);

    const randomHole = (arr) => {
        const index = Math.floor(Math.random() * arr.length);
        let currentHole = arr[index];
        if (currentHole === prevHole) {
            return randomHole(arr);
        }
        
        return prevHole = currentHole;
    }

    console.log($holes);

    console.log(randomHole($holes));

     const popUp = () => {
         const time = timeRandomizer(2000, 10000);
         const hole = randomHole($holes);
         console.log(time, hole);
         $(hole).addClass('popup');
         setTimeout(() => {
             $(hole).removeClass('popup')
         }, time);

     }

     const hitDiglett = () => {
         p1Turn = true ? p1Score++ : p2Score++;
         $(event.currentTarget).parent().removeClass('popup')
         console.log(p1Score);
     }

     $digletts.on('click', hitDiglett);

     popUp();
     debugger;
     popUp();
     popUp();
     popUp();
})