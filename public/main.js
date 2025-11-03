// variables
const types = {
    text:'text',
    textarea:'textarea',
    number:'number',
    submit:'submit',
    checkbox:'checkbox',
    radio:'radio',
    email:'email',
    date:'date'
}
const form = document.getElementById('form')
let add_or_subtract = document.querySelector('.add-input');



// 1 - client is required to add input
handleInputButton(add_or_subtract)




/*============================================================== */
// handle input button click
function handleInputButton(btn){
    btn.addEventListener('click',generateInputByType)
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
            let src_image = `./media/${types[property]}.png` // format source image
            let img = new Image(); // create new image instance

            // set classes
            div.classList.add('add-input-select')
            img.classList.add('type-select')
            img.setAttribute('data-element',property=='textarea' ? 'textarea' : 'input')

            // set src
            img.src = src_image; 
            console.log(src_image) 
            div.appendChild(img);

            // append div to form
            form.appendChild(div)
        }
        } else {
            
            [...div.children].filter((_,index)=>index > 0).map(child => {
                console.log(child)
                console.log(child.localName)
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
let button_count = 0;
function updateButton(target){
    button_count += 1;
    button_count %= 2;
    console.log(button_count)

    let minus = './media/minus.png', add = './media/add.png'
    let array = [add,minus]

    // update src by button count
    target.src = array[button_count]
    return button_count
}
// input type selection
function inputTypeSelection(e){
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

        default: console.log(undefined);
        break;
    }
    // target question
    decorateInput(target_question, {type:'text',placeholder:'Enter a Question',classList:['input-question']})

    target_element = target.getAttribute('data-element') == 'input' ? input : target.getAttribute('data-element') == 'textarea' ? textarea : console.log("check types");
    target_element.setAttribute('disabled',true) // disable target inputs
    selects.map(x=>x.classList.add('absolute-type-select'))


    // append target_element to the li
    console.log(parent_element)
    parent_element.appendChild(target_question);
    parent_element.appendChild(target_element);


    // if target_question value 
    target_question.oninput = handleQuestion
}
function decorateInput(element, options = {type:undefined,placeholder:undefined,classList:[]}){
    let {type,placeholder,classList} = options;

    if(element.getAttribute('data-element')=='input') question.type = type
    element.placeholder = placeholder;
    element.classList = classList;
    classList.map(cls => element.classList.add(cls));
}
let add_form_column = false;
function handleQuestion(e){
    let target = e.currentTarget;
    let parent = target.parentElement;
    let button = parent.children[0];
    if(add_form_column !== true && target.value && (target.value.length > 0 && target.value.length < 2)){
        add_form_column = true;
        console.log("activate new button!")
        parent.removeChild(button);
        appendFormItem(form) // append form item
    } 
    
    if(target.value.length  < 1) {
        add_form_column = false;
        removeFormItem()
    }

    let newbutton = document.querySelector('.add-input');
    handleInputButton(newbutton) // pass newbutton into function
}
function appendFormItem(form){
    const divstring = `<div class="form-col div-col">
                    <img src="./media/add.png" class="add-input" alt="add or plus">
                </div>`

    const parser = new DOMParser();
    const doc = parser.parseFromString(divstring,'text/html');
    const divelement = doc.body.firstChild;

    console.log(divelement)
    form.appendChild(divelement)
}
function removeFormItem(){
    let array = [...document.querySelectorAll('.form-col')];
    return array.map((x,i) => i === array.length - 1 ? x.remove() : null);
}
/*============================================================== */



