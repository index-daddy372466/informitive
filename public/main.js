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
add_or_subtract.addEventListener('click',generateInputByType)








/*============================================================== */
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
    let target_question;
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

        break;

        case type == 'textarea':
            // textarea.classList.add('textarea-standard')
            decorateInput(textarea, {type:type,placeholder:`${type[0].toUpperCase()+type.slice(1,type.length)}`,classList:['textarea-standard']})

        break;

        case type == 'number':
            input.type = type;
        
        break;

        default: console.log(undefined);
        break;
    }
    target_question = input;
    decorateInput(target_question, {type:'text',placeholder:'Enter a Question',classList:['input-question']})

    target_element = target.getAttribute('data-element') == 'input' ? input : target.getAttribute('data-element') == 'textarea' ? textarea : console.log("check types");

    selects.map(x=>x.classList.add('absolute-type-select'))


    // append target_element to the li
    console.log(parent_element)
    parent_element.appendChild(target_question);
    parent_element.appendChild(target_element);

}

function decorateInput(element, options = {type:undefined,placeholder:undefined,classList:[]}){
    let {type,placeholder,classList} = options;

    if(element.getAttribute('data-element')=='input') question.type = type
    element.placeholder = placeholder;
    element.classList = classList;
    classList.map(cls => element.classList.add(cls));
}
/*============================================================== */


