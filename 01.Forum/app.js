import {home} from './home.js';
import {comments} from './comments.js';

let topicBorderForm = document.querySelector('.new-topic-border');
let topicTitleComments = document.querySelector('.topic-title');
 let main = document.querySelector('main');
 let body = document.querySelector('body');

 main.addEventListener('click',choose);
 //body.addEventListener('click',choose);

 async function choose(ev) {
    ev.preventDefault()


    if (ev.target.parentNode.getAttribute('class') === 'normal'){
      //  ev.stopPropagation();
        let postId = ev.target.parentNode.getAttribute('href');
       let container = document.querySelector('.container').textContent = '';
       await comments(postId);

     }
     //else if (ev.target.textContent === 'Home'){
    //     document.querySelector('.container').textContent = '';
    //     console.log('asd')
    //     ev.stopPropagation();
    //    let main2 =  document.createElement('div');
    //   main2.appendChild(topicBorderForm);
    //   body.appendChild(main2)
    //   home(topicBorderForm,topicTitleComments,main2);
    // }
 }

document.querySelector('main').textContent = '';
main.appendChild(topicBorderForm);
home(topicBorderForm,topicTitleComments,main);