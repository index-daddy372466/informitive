// imports 
import { events } from "./event/window.js";
const { click, change, scroll } = events;

// variables
const types = await fetch('input-types').then(r => r.json()).then(d => d['types'])
console.log(types)
const form = document.getElementById('form')
const submitbtn = document.getElementById('submit-btn')
let button_count = 0;




// START - client is required to add input
handleInputButton(document.querySelector('.add-input'))


/*========================Window Events======================= */
window.onclick = click;
window.onchange = change;
window.onscroll = scroll;

/*========================Window Events======================= */


/*============================================================== */

// handle input button click
function handleInputButton(btn = document.querySelector('.add-input')){

    // Scroll the window
    window.scrollTo(0, document.body.scrollHeight);

    let alllines = document.querySelectorAll('.add-input');
    button_count = 0;
    btn.addEventListener('click',generateInputByType)
    let parent = btn.parentElement;
    let previous_sibling

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
    console.log('1. generate input by type')
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
                    img.classList.add('type-select','no-highlight')
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
                if(child.classList.contains('type-select') && child.classList.contains('no-pointer')){
                    child.remove();
                }
                child.classList.remove('absolute-type-select');
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
        row_lock = true;
            form.appendChild(submitbtn)
            let question = [...target.parentElement.previousSibling.children]
            .find(child => child.classList.contains('input-question'))||undefined
            console.log(question)
            editQuestion(question) // edit the question

            if(question){
                enableElement(question);
            }
    } else { // if minus
            console.log("minus!")
            if(document.getElementById('submit-btn')){
                form.removeChild(document.getElementById('submit-btn'))
            }
            let question = [...target.parentElement.previousSibling.children]
            .find(child => child.classList.contains('input-question'))||undefined
            editQuestion(question,false) // disable edit on question
            
            if(question) {
                console.log(question)
                question.value.length > 0 ? disableElement(question) : null;
        }
    }
    }
    
    return button_count
}
// input type selection
function inputTypeSelection(e){
    // appaer submit button
    submitbtn.classList.remove('hide-button')

    console.log('2. Input type selection')

    const target = e.currentTarget; // target

    // set row_lock to false
    row_lock = false;
    let target_element = target.cloneNode(true) || undefined;

    let target_question = document.createElement('input');

    // target question - require value
    requireValue(target_question)

    // process image classes
    target_element.classList.add('type-select','no-highlight','input-standard')

    let selects = [...document.querySelectorAll('.type-select')]


    let parent_element = target.parentElement; // parent of target
    let split = target.src.split`/`;
    let type = split[split.length - 1].slice(0,-4);

    target_element.setAttribute('data-input-id',type);
    target_element.classList.add('no-pointer')
    target_element.classList.remove('absolute-target-element')
    console.log(target_element)

    // switch between types selected
    // switch(true){
    //     case type == 'text':

    //     break;

    //     case type == 'textarea':

    //     break;

    //     case type == 'number':

    //     break;

    //     case type == 'submit':

    //     break;

    //     default: console.log(undefined);
    //     break;
    // }

    
    // target question
    decorateInput(target_question, {type:'text',placeholder:'Enter a Question',classList:['input-question']})

    target_question.name = "field_"
    console.log('hide type-selects')
    selects.filter((_,u) => !_.classList.contains('no-pointer')).map(x=>x.classList.add('absolute-type-select'))

    // append target_element to the li
    parent_element.appendChild(target_question);
    parent_element.appendChild(target_element);


    // if target_question value
    target_question.focus();
    target_question.oninput = handleQuestion;
}

// disable element
export function disableElement(event){
    const element = event.currentTarget || event;
    console.log(element)
    element.setAttribute('disabled',true)
}
// add dotted border to signal Edit
export function editQuestion(e,bool){
    const target =  e || e.currentTarget || undefined;
    console.log(target)
    if(bool === false) {
        target.classList.remove('silent-border');
        return;
    }
    
    console.log('edit the question !')
    target.classList.add('silent-border')

}
// require value
function requireValue(event){
    const element = event.currentTarget || event;
    element.setAttribute('required',true)
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
    // console.log("ROW LOCK")
    // console.log(row_lock)
    let target = e.currentTarget;
    let parent = target.parentElement;
    let button = [...parent.children].find(x=>x.classList.contains('add-input'))
    if(row_lock !== true && target.value && (target.value.length > 0) && !parent.nextSibling){
        let d = appendFormItem(form) // append form item
        let newbutton = d.children[0];
        button.classList.add('hide-button');
        handleInputButton(newbutton)
        row_lock = true;
    }
    if(target.value.length  < 1) {
        console.log("value less than 1")
        if(document.getElementById('submit-btn'))form.removeChild(submitbtn)
        button.classList.remove('hide-button');
        removeFormItem();
        row_lock = false
    }
    
}

/*================================ */
// append form item
function appendFormItem(form){
    // Calculate the scroll position needed to bring the bottom of the container into view
    const scrollPosition = form.offsetTop + form.offsetHeight - window.innerHeight;

    // Scroll the window
    window.scrollTo(0, document.body.scrollHeight);

  row_lock = false;
  const divcolumn = `<div class="form-col div-col">
                    <img src="./media/add.png" class="add-input no-highlight" alt="add or plus">
                </div>`;

  const parser = new DOMParser();
  const doc = parser.parseFromString(divcolumn, "text/html");
  const divelement = doc.body.firstChild;

  // append form items
    form.appendChild(divelement);
    console.log('appending submit')
    form.appendChild(submitbtn)

  return divelement;
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
            // button reappears
            let [btn,question] = [[...x.children].find(y => y.classList.contains('add-input')),[...x.children].find(y => y.classList.contains('input-question'))]
            btn.classList.remove('hide-button')
            enableElement(question)
        }
    });
}
/*================================ */

form.onsubmit = handleSubmit;

// submit the form
async function handleSubmit(e){
    e.preventDefault() // prevent default action
    const aq = document.querySelectorAll('.input-question'); // aq = all_questions
    const iT = document.querySelectorAll('.input-standard'); // aq = input_type
    let payload = {};
    for(let i = 0; i < aq.length; i ++){
        let [prop,val] = [aq[i].name + (i+1) ,iT[i].getAttribute('data-input-id')] // temporary capture (will fork later);
        
        // setup payload / object
        payload[prop] = {
            query:aq[i].value,
            input_type:val
        };
    }

    const response = await fetch('/form/create',{method:'POST',headers: {
        'Content-Type': 'application/json'
      }, body:JSON.stringify(payload)})

}


/*============================================================== */



