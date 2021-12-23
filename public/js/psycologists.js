let SEL_F_NAME,SEL_L_NAME,SEL_ID,SEL_EMAIL,SEL_PASS;

window.onload =  () => {
    console.log('>> load psycologists js >>')

    let psycologistsDisplay = document.getElementById('psycologists-display');
    // fetch
    const URL = 'http://localhost:8008/api/psycologists'
    fetch(URL)
    .then((res) => res.json())
    .then((server_info) => {
        console.log(server_info);
        const container = document.createElement('div');
        container.classList.add('scrollview-container');
        for(let i = 0; i < server_info.length; i++) {
            console.log(server_info[i])
            const psyco = document.createElement('article');
            psyco.classList.add('psycologist-card');
            const id = document.createElement('h5');
            id.appendChild(document.createTextNode('ID:'+server_info[i]._id));
            id.classList.add('id-number-display');
            
            const username = document.createElement('h3');
            username.appendChild(document.createTextNode(server_info[i].first_name +' '+ server_info[i].last_name));
            username.classList.add('name-display');
            const email = document.createElement('h3');
            email.appendChild(document.createTextNode(server_info[i].email));
            email.classList.add('email-display') 
            psyco.appendChild(id);
            psyco.appendChild(username);
            psyco.appendChild(email);
            psyco.addEventListener('click',psycoCardOnClick);
            container.appendChild(psyco);
        }
        psycologistsDisplay.appendChild(container);
    }) 
}

const psycoCardOnClick = (e) => {
    let card = document.elementFromPoint(e.pageX, e.pageY);
    const tag = card.tagName;
    if (tag !== 'ARTICLE') {
        card = card.parentElement;
    }
    let id = '';
    card.parentElement.childNodes.forEach((e) => {
        e.style.backgroundColor = '#fff';
        e.childNodes[2].style.color = '#707070';  
    })
    card.style.backgroundColor = '#A3A3A4';
    card.childNodes[2].style.color = '#fff';
    id = card.childNodes[0].textContent;      

    // fetch
    fetch('http://localhost:8008/api/psycologists'+'/'+id.substring(3))
    .then((res) => res.json())
    .then((server_info) => {
        form(server_info.PsycologistById)
        select(server_info.PsycologistById)
    })
}

const form = (json) => {
    // DOM display target info
    let profileView = document.getElementById('psycologist-profile-display')
    if(profileView.childElementCount >= 0) profileView = profileView.removeChild(profileView.firstChild)
    profileView = document.getElementById('psycologist-profile-display')
    const div = document.createElement('div')
    div.classList.add('form-container-row','form-container')
    const formTitle =document.createElement('h3')
    formTitle.classList.add('form-title')
    formTitle.appendChild(document.createTextNode('Psycologist Profile'))
    div.appendChild(formTitle)

    const form = document.createElement('form')
    form.classList.add('form')

    form.appendChild(document.createElement('label').appendChild(document.createTextNode('First Name')))
    const fName = document.createElement('input');
    fName.classList.add('psyco-input-form')
    fName.setAttribute('value',json.first_name)
    form.appendChild(fName)
    form.appendChild(document.createElement('label').appendChild(document.createTextNode('Last Name')))
    const lName = document.createElement('input');
    lName.classList.add('psyco-input-form')
    lName.setAttribute('value',json.last_name)
    form.appendChild(lName)
    form.appendChild(document.createElement('label').appendChild(document.createTextNode('Email')))
    const email = document.createElement('input');
    email.classList.add('psyco-input-form')
    email.setAttribute('value',json.email)
    form.appendChild(email)
    form.appendChild(document.createElement('label').appendChild(document.createTextNode('Password')))
    const pass = document.createElement('input');
    pass.classList.add('psyco-input-form')
    pass.setAttribute('type','password')
    form.appendChild(pass)
    

    // BUTS
    const buttons = document.createElement('div')
    buttons.classList.add('buttons-container')
    const add = document.createElement('button')
    add.innerHTML = 'Add Profile'
    add.classList.add('button')
    add.addEventListener('click',addBut)
    const update = document.createElement('button')
    update.classList.add('button')
    update.innerHTML = 'Update Profile'
    update.addEventListener('click',updateBut)
    const del = document.createElement('button')
    del.classList.add('button')
    del.innerHTML = 'Delete Profile'
    del.addEventListener('click',deleteBut)
    buttons.appendChild(add)
    buttons.appendChild(update)
    buttons.appendChild(del)
    
    div.appendChild(form)
    div.appendChild(buttons)
    profileView.appendChild(div)
}

const addBut = () => {
    console.log('add')
    
    const form = document.getElementsByClassName('psyco-input-form')
    // for (const el of form) console.log(el.value);
    let data = {};
    data.first_name = form[0].value
    data.last_name = form[1].value
    data.email = form[2].value
    data.password = form[3].value
    // console.log(data)
    
    
    fetch('http://localhost:8008/api/psycologists/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => console.log(json));
    window.location.reload()
}

const updateBut = () => {
    console.log('update')
    const form = document.getElementsByClassName('psyco-input-form')
    // for (const el of form) console.log(el.value);
    let data = {};
    data.first_name = form[0].value
    data.last_name = form[1].value  
    data.email = form[2].value
    if(form[3].value === SEL_PASS) {
        fetch('http://localhost:8008/api/psycologists/update/'+SEL_ID,{
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }            
        })
        .then((res) => {
            res.json()
        })
    } 
    window.location.reload()
}

const deleteBut = () => {
    fetch('http://localhost:8008/api/psycologists/delete/'+SEL_ID, {
        method: 'DELETE'
    })
    .then((res) => res.json())
    console.log('delete')
    window.location.reload()
}

const select = (json) => {
    SEL_F_NAME = json.first_name;
    SEL_L_NAME = json.last_name;
    SEL_ID = json._id;
    SEL_EMAIL = json.email;
    SEL_PASS = json.password;
}