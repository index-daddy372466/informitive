import { enableElement } from "../main.js";
export const events = {
    click: handleClick,
    resize: handleResize,
    scroll: handleScroll
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
function handleScroll(e){
    // method
return null;
}