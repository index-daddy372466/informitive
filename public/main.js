// imports 
import { events } from "./event/window.js";
const { click } = events;

// variables
const types = await fetch('input-types').then(r => r.json()).then(d => d['types'])
console.log(types)
const form = document.getElementById('form')
let button_count = 0;




// 1 - client is required to add input
handleInputButton(document.querySelector('.add-input'))


/*========================Window Events======================= */
window.onclick = click;

/*========================Window Events======================= */


/*============================================================== */

// handle input button click
function handleInputButton(btn = document.querySelector('.add-input')){
    let alllines = document.querySelectorAll('.add-input');
    button_count = 0;
    btn.addEventListener('click',generateInputByType)
    let previous_sibling

    // if a form-col exists before parent
    let parent = btn.parentElement;
    if(parent.previousSibling && parent.previousSibling.children){
        previous_sibling = parent.previousSibling;
        let question = [...previous_sibling.children][previous_sibling.children.length - 2]
        question.focus();
        question.onblur = disableElement
        question.onclick = e => console.log("positive result on question")
        // if button is minus
        console.log(alllines)
        console.log(alllines[1])
        if(alllines[alllines.length - 1].src.split`/`.find(x=>x=='add.png')){
            enableElement(question)
        }
    }
}
// add input
function generateInputByType(e){
    let target = e.currentTarget;
    let getcount = +(updateButton(target)) // return count from function
    let div = target.parentElement // create new div element

    // iterate through object of types
    if(getcount > 0){
        if(div.children.length <= 1){
            for(let property in types) {
                
                /*---------------------------*/
                // handle option to release [submit] button/option
                // if(document.querySelectorAll('.input-question') && document.querySelectorAll('.input-question').length >= 1){
                //     if(property === 'submit'){
                //         types[property]['disabled'] = false;
                //     }
                // }
                /*---------------------------*/

                if(!types[property]['disabled']){
                    let src_image = `./media/${types[property]['t']}.png` // format source image
                    let img = new Image(); // create new image instance

                    // set classes
                    div.classList.add('add-input-select')
                    img.classList.add('type-select')
                    img.setAttribute('data-element',property=='textarea' ? 'textarea' : 'input')

                    // set src
                    img.src = src_image;
                    div.appendChild(img);

                    // append div to form
                    form.appendChild(div)
                }
        }
        } else {

            [...div.children].filter((_,index)=>index > 0).map(child => {
                if(child.localName == 'input' || child.localName == 'textarea'){
                    child.remove();
                }
                child.classList.remove('absolute-type-select')
            })
        }

    } else {
        // map types and remove
        return [...div.children].filter((_,index)=>index > 0).map(child => child.classList.add('absolute-type-select'))
    }

    if([...document.querySelectorAll('.type-select')]){
        let gettypes = [...document.querySelectorAll('.type-select')];
        for(let x = 0; x < gettypes.length; x++) {
            gettypes[x].onclick = inputTypeSelection;
        }
    }
}
// update button
function updateButton(target){
    button_count += 1;
    button_count %= 2;
    console.log(button_count)

    let minus = './media/minus.png', add = './media/add.png'
    let array = [add,minus]

    // update src by button count
    target.src = array[button_count]

    let previous_children = target.parentElement.previousSibling.children;

    if(previous_children){
        // check if previous question is disabled
    if(button_count % 2 === 0) { // if plus
            let question = [...target.parentElement.previousSibling.children]
            .find(child => child.classList.contains('input-question'))||undefined
            if(question){
                enableElement(question);
            }
    } else { // if minus
            let question = [...target.parentElement.previousSibling.children]
            .find(child => child.classList.contains('input-question'))||undefined
            
            if(question) {
                disableElement(question)
        }

    }
    }
    
    return button_count
}
// input type selection
function inputTypeSelection(e){
    // set row_lock to false
    row_lock = false;
    let target_element;
    let target_question = document.createElement('input');
    let input = document.createElement('input')
    let textarea = document.createElement('textarea')

    let selects = [...document.querySelectorAll('.type-select')]

    const target = e.currentTarget; // target
    let parent_element = target.parentElement; // parent of target
    let split = target.src.split`/`;
    let type = split[split.length - 1].slice(0,-4);

    // switch between types selected

    switch(true){
        case type == 'text':
            input.type = type;
            decorateInput(input, {type:type,placeholder:'Text',classList:['input-standard']})
        break;

        case type == 'textarea':
            // textarea.classList.add('textarea-standard')
            decorateInput(textarea, {type:type,placeholder:`${type[0].toUpperCase()+type.slice(1,type.length)}`,classList:['textarea-standard']})

        break;

        case type == 'number':
            input.type = type;
            decorateInput(input, {type:type,placeholder:'Number',classList:['input-standard']})

        break;

        case type == 'submit':
            input.type = type;
            decorateInput(input, {type:type,placeholder:undefined,classList:['submit-standard']})

        break;

        default: console.log(undefined);
        break;
    }
    // target question
    decorateInput(target_question, {type:'text',placeholder:'Enter a Question',classList:['input-question']})

    target_element = target.getAttribute('data-element') == 'input' ? input : target.getAttribute('data-element') == 'textarea' ? textarea : console.log("check types");
    selects.map(x=>x.classList.add('absolute-type-select'))
    disableElement(target_element)


    // append target_element to the li
    parent_element.appendChild(target_question);
    parent_element.appendChild(target_element);


    // if target_question value
    target_question.focus();
    target_question.oninput = e => handleQuestion(e);
}

// disable element
function disableElement(event){
    const element = event.currentTarget || event;
    console.log(element)
    element.setAttribute('disabled',true)
}
// enable element
export function enableElement(element){
    element.removeAttribute('disabled')
}
// decorate input
function decorateInput(element, options = {type:undefined,placeholder:undefined,classList:[]}){
    let {type,placeholder,classList} = options;

    if(element.getAttribute('data-element')=='input') question.type = type
    element.placeholder = placeholder;
    element.classList = classList;
    classList.map(cls => element.classList.add(cls));
}

let row_lock = false;
// handle question
function handleQuestion(e = document.querySelector('.input-question')){
    let target = e.currentTarget;
    let parent = target.parentElement;
    let button = [...parent.children].find(x=>x.classList.contains('add-input'))

    if(row_lock !== true && target.value && (target.value.length > 0) && !parent.nextSibling){
        let d = appendFormItem(form) // append form item
        let newbutton = d.children[0];
        button.classList.add('hide-button');
        handleInputButton(newbutton)
    }
    if(target.value.length  < 1) {
        button.classList.remove('hide-button');
        removeFormItem();
        row_lock = false;
    }
}


/*================================ */
// append form item
function appendFormItem(form){
    row_lock = true;
    const divcolumn = `<div class="form-col div-col">
                    <img src="./media/add.png" class="add-input" alt="add or plus">
                </div>`

    const parser = new DOMParser();
    const doc = parser.parseFromString(divcolumn,'text/html');
    const divelement = doc.body.firstChild;

    form.appendChild(divelement)
    return divelement
}
// remove form item
function removeFormItem(){
    let array = [...document.querySelectorAll('.form-col')];
    return array.map((x,i) => {
        let divs = [array.length - 1, array.length - 2]
        if(i === divs[0]){
            x.remove();
        };
        if(i === divs[1]){
            console.log(x)
            // button reappears
            let [btn,question] = [[...x.children].find(y => y.classList.contains('add-input')),[...x.children].find(y => y.classList.contains('input-question'))]
            btn.classList.remove('hide-button')
            enableElement(question)
        }
    });
}
/*================================ */




/*============================================================== */



