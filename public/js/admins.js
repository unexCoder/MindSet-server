let SEL_F_NAME,SEL_L_NAME,SEL_ID,SEL_U_NAME,SEL_PASS;

window.onload =  () => {
    console.log('>> load admins js >>')

    let adminsDisplay = document.getElementById('admins-display');
    // fetch
    const URL = 'http://localhost:8008/api/admins'            
    fetch(URL)
    .then((res) => res.json())
    .then((server_info) => {
        console.log(server_info)
        // DOM display
        const container = document.createElement('div');
        container.classList.add('scrollview-container');
        for(let i = 0; i < server_info.length; i++) {
            const admin = document.createElement('article');
            admin.classList.add('admin-card');
            const id = document.createElement('h5');
            id.appendChild(document.createTextNode('ID:'+server_info[i]._id));
            id.classList.add('id-number-display');
            const username = document.createElement('h3');
            username.appendChild(document.createTextNode('@'+server_info[i].user_name));
            username.classList.add('name-display');
            const email = document.createElement('h3');
            email.appendChild(document.createTextNode(server_info[i].email));
            email.classList.add('email-display') 
            admin.appendChild(id);
            admin.appendChild(username);
            admin.appendChild(email);
            // clicked listener
            admin.addEventListener('click',adminCardOnClick);
            container.appendChild(admin);
        }
        adminsDisplay.appendChild(container);
    }) 
}

const adminCardOnClick = (e) => {
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
    
    // fetch getById
    fetch('http://localhost:8008/api/admins'+'/'+id.substring(3))
    .then((res) => res.json())
    .then((server_info) => {
        form (server_info);
        select(server_info);
    })
}

const form = (json) => {
        // DOM display target info
        let profileView = document.getElementById('profile-display')
        if(profileView.childElementCount > 0) profileView = profileView.removeChild(profileView.firstChild)
        profileView = document.getElementById('profile-display')
        const div = document.createElement('div')
        div.classList.add('form-container-row','form-container')
        const formTitle =document.createElement('h3')
        formTitle.classList.add('form-title')
        formTitle.appendChild(document.createTextNode('Admin Profile'))
        div.appendChild(formTitle)

        const form = document.createElement('form')
        form.classList.add('form')

        form.appendChild(document.createElement('label').appendChild(document.createTextNode('First Name')))
        const fName = document.createElement('input');
        fName.classList.add('admin-input-form')
        if (json.AdminById.first_name !== undefined) {
            fName.setAttribute('value',json.AdminById.first_name)
        }
        form.appendChild(fName)
        form.appendChild(document.createElement('label').appendChild(document.createTextNode('Last Name')))
        const lName = document.createElement('input');
        lName.classList.add('admin-input-form')
        if(json.AdminById.last_name !== undefined) {
            lName.setAttribute('value',json.AdminById.last_name)
        }
        form.appendChild(lName)        
        form.appendChild(document.createElement('label').appendChild(document.createTextNode('User Name')))
        const uName = document.createElement('input');
        uName.classList.add('admin-input-form')
        if(json.AdminById.user_name !== undefined) {
            uName.setAttribute('value',json.AdminById.user_name)
        }
        form.appendChild(uName)
        form.appendChild(document.createElement('label').appendChild(document.createTextNode('Email')))
        const email = document.createElement('input');
        email.classList.add('admin-input-form')
        email.setAttribute('value',json.AdminById.email)
        form.appendChild(email)
        form.appendChild(document.createElement('label').appendChild(document.createTextNode('Password')))
        const pass = document.createElement('input');
        pass.classList.add('admin-input-form')
        pass.setAttribute('type','password')
        // pass.setAttribute('value',json.AdminById.password)
        form.appendChild(pass)

        // BUTS
        const buttons = document.createElement('div')
        buttons.classList.add('buttons-container')
        const add = document.createElement('button')
        add.innerHTML = 'Add Admin'
        add.classList.add('button')
        add.addEventListener('click',addBut)
        const update = document.createElement('button')
        update.classList.add('button')
        update.innerHTML = 'Update Admin'
        update.addEventListener('click',updateBut)
        const del = document.createElement('button')
        del.classList.add('button')
        del.innerHTML = 'Delete Admin'
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
    
    const form = document.getElementsByClassName('admin-input-form')
    for (const el of form) console.log(el.value);
    let data = {};
    data.first_name = form[0].value
    data.last_name = form[1].value
    data.user_name = form[2].value
    data.email = form[3].value
    data.password = form[4].value
    console.log(data)
    
    
    fetch('http://localhost:8008/api/admins/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => console.log(json));
    window.location.reload()
}

const updateBut = () => {
    console.log('update')
    const form = document.getElementsByClassName('admin-input-form')
    for (const el of form) console.log(el.value);
    let data = {};
    data.first_name = form[0].value
    data.last_name = form[1].value
    data.user_name = form[2].value
    data.email = form[3].value
    if(form[4].value === SEL_PASS) {
        fetch('http://localhost:8008/api/admins/update/'+SEL_ID,{
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
    fetch('http://localhost:8008/api/admins/delete/'+SEL_ID, {
        method: 'DELETE'
    })
    .then((res) => res.json())
    console.log('delete')
    window.location.reload()
}

const select = (json) => {
    SEL_F_NAME = json.AdminById.first_name;
    SEL_L_NAME = json.AdminById.last_name;
    SEL_ID = json.AdminById._id;
    SEL_U_NAME = json.AdminById.user_name;
    SEL_PASS = json.AdminById.password;
    console.log(SEL_F_NAME)
    console.log(SEL_L_NAME)
    console.log(SEL_U_NAME)
    console.log(SEL_ID)
    console.log(SEL_PASS)
}