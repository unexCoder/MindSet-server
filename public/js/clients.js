let SEL_CO_NAME,SEL_BRANCH,SEL_ID,SEL_EMAIL,SEL_PHONE,SEL_PASS;

window.onload =  () => {
    console.log('>> load clients js >>')
    let clientsDisplay = document.getElementById('clients-display');
    // fetch
    const URL = window.location.origin+'/api/clients';       
    fetch(URL)
    .then((res) => res.json())
    .then((server_info) => {
        // console.log(server_info);
        const container = document.createElement('div');
        container.classList.add('scrollview-container');
        for(let i = 0; i < server_info.length; i++) {
            // console.log(server_info[i]);
            const client = document.createElement('article');
            client.classList.add('client-card');
            const id = document.createElement('h5');
            id.appendChild(document.createTextNode('ID:'+server_info[i]._id));
            id.classList.add('id-number-display');
            
            const company = document.createElement('h3');
            company.appendChild(document.createTextNode(server_info[i].company_name));
            company.classList.add('name-display');
            const email = document.createElement('h3');
            email.appendChild(document.createTextNode(server_info[i].email));
            email.classList.add('email-display') 
            
            client.appendChild(id);
            client.appendChild(company);
            client.appendChild(email);
            client.addEventListener('click',clientCardOnClick);
            container.appendChild(client);
        }
        clientsDisplay.appendChild(container);
    }) 
}

const clientCardOnClick = (e) => {
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
    fetch(window.location.origin+'/api/clients'+'/'+id.substring(3))
    .then((res) => res.json())
    .then((server_info) => {
        form(server_info.ClientById)
        select(server_info.ClientById);
    })
}

const form = (json) => {
    // console.log(json)
    // DOM display target info
    let profileView = document.getElementById('clients-profile-display')
    if(profileView.childElementCount > 0) profileView = profileView.removeChild(profileView.firstChild)
    profileView = document.getElementById('clients-profile-display')
    const div = document.createElement('div')
    div.classList.add('form-container-row','form-container')
    const formTitle =document.createElement('h3')
    formTitle.classList.add('form-title')
    formTitle.appendChild(document.createTextNode('Client Profile'))
    div.appendChild(formTitle)

    const form = document.createElement('form')
    form.classList.add('form')

    form.appendChild(document.createElement('label').appendChild(document.createTextNode('Company')))
    const company = document.createElement('input');
    company.classList.add('client-input-form')
    company.setAttribute('value',json.company_name)
    form.appendChild(company)
    form.appendChild(document.createElement('label').appendChild(document.createTextNode('Branch')))
    const branch = document.createElement('input');
    branch.classList.add('client-input-form')
    branch.setAttribute('value',json.branch)
    form.appendChild(branch)        
    form.appendChild(document.createElement('label').appendChild(document.createTextNode('Phone')))
    const phone = document.createElement('input');
    phone.classList.add('client-input-form')
    phone.setAttribute('value',json.phone)
    form.appendChild(phone)
    form.appendChild(document.createElement('label').appendChild(document.createTextNode('Email')))
    const email = document.createElement('input');
    email.classList.add('client-input-form')
    email.setAttribute('value',json.email)
    form.appendChild(email)
    form.appendChild(document.createElement('label').appendChild(document.createTextNode('Password')))
    const pass = document.createElement('input');
    pass.classList.add('client-input-form')
    pass.setAttribute('type','password')
    form.appendChild(pass)


    // buts
    const buttons = document.createElement('div')
    buttons.classList.add('buttons-container')
    const add = document.createElement('button')
    add.innerHTML = 'Add Client'
    add.classList.add('button')
    add.addEventListener('click',addBut)
    const update = document.createElement('button')
    update.classList.add('button')
    update.innerHTML = 'Update Client'
    update.addEventListener('click',updateBut)
    const del = document.createElement('button')
    del.classList.add('button')
    del.innerHTML = 'Delete Client'
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
    
    const form = document.getElementsByClassName('client-input-form')
    for (const el of form) console.log(el.value);
    let data = {};
    data.company_name = form[0].value
    data.branch = form[1].value
    data.phone = form[2].value
    data.email = form[3].value
    data.password = form[4].value
    // console.log(data)    
    fetch(window.location.origin+'/api/clients/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => console.log(json));
    window.location.reload()
}

const updateBut = () => {
    console.log('update')
    const form = document.getElementsByClassName('client-input-form')
    // for (const el of form) console.log(el.value);
    let data = {};
    data.company_name = form[0].value
    data.branch = form[1].value
    data.phone = form[2].value
    data.email = form[3].value
    if(form[4].value === SEL_PASS) {
        fetch(window.location.origin+'/api/clients/update/'+SEL_ID,{
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
    fetch(window.location.origin+'/api/clients/delete/'+SEL_ID, {
        method: 'DELETE'
    })
    .then((res) => res.json())
    console.log('delete')
    window.location.reload()
}

const select = (json) => {
    SEL_CO_NAME = json.company_name;
    SEL_BRANCH = json.branch;
    SEL_ID = json._id;
    SEL_EMAIL = json.email;
    SEL_PHONE = json.phone;
    SEL_PASS = json.password;
}