import { enableElement } from "../main.js";
export const events = {
    click: handleClick,
    resize: handleResize,
    scroll: handleScroll,
    change: handleChange,
}
let counter = 0;
function handleClick(e){
    const target = e.target || window;
    // test with counter
    // counter += 1;
    // // method
    // console.log(counter)

    // handle blur on question element
    let last_question = document.querySelectorAll('.input-question')[document.querySelectorAll('.input-question').length - 1];
    let last_button = document.querySelectorAll('.add-input')[document.querySelectorAll('.add-input').length - 1];
    let split_button = last_button.src.split`/`
    let source_name = split_button[split_button.length - 1].slice(0,-4);
    if(target !== last_button && source_name == 'add') {
        console.log('not equal to button')
        last_question ? enableElement(last_question) : null;;
    }


}
function handleResize(e){
    // method
return null;
}
let pos = {x:undefined,y:undefined};
function handleScroll(e){
    // method
    let scrollY = window.scrollY;
    pos.y = scrollY;

    console.log(pos.y);

    if(scrollY > document.body.scrollTop) {
        document.getElementById('header').classList.add('fixed')
        document.querySelector('#title-logo > h1').classList.add('blk-txt')
    } else {
        document.getElementById('header').classList.remove('fixed')
        document.querySelector('#title-logo > h1').classList.remove('blk-txt')

    }


}
function handleChange(e){
    // method
console.log('something changed')
}