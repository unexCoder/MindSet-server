let SEL_F_NAME,SEL_L_NAME,SEL_ID,SEL_U_NAME,SEL_PASS;

window.onload =  () => {
    console.log('>> load users js >>')

    let usersDisplay = document.getElementById('users-display');
    // fetch
    const URL = 'http://localhost:8008/api/users'
            
    fetch(URL)
    .then((res) => res.json())
    .then((server_info) => {
        console.log(server_info)
        // DOM display
        const container = document.createElement('div');
        container.classList.add('scrollview-container');
        for(let i = 0; i < server_info.length; i++) {
            console.log(server_info[i].first_name);
            const user = document.createElement('article');
            user.classList.add('user-card');
            const id = document.createElement('h5');
            id.appendChild(document.createTextNode('ID:'+server_info[i]._id));
            id.classList.add('id-number-display');
            
            const username = document.createElement('h3');
            username.appendChild(document.createTextNode('@'+server_info[i].user_name));
            username.classList.add('name-display');
            const email = document.createElement('h3');
            email.appendChild(document.createTextNode(server_info[i].email));
            email.classList.add('email-display') 
            
            user.appendChild(id);
            user.appendChild(username);
            user.appendChild(email);
            user.addEventListener('click',userCardOnClick);
            container.appendChild(user);
        }
        usersDisplay.appendChild(container);
    }) 
}

const userCardOnClick = (e) => {
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
    fetch('http://localhost:8008/api/users'+'/'+id.substring(3))
    .then((res) => res.json())
    .then((server_info) => {
        form(server_info.ApplicantById)
        select(server_info.ApplicantById)
    })
}

const form = (json) => {
    // DOM display target info
    let profileView = document.getElementById('user-profile-display')
    if(profileView.childElementCount >= 0) profileView = profileView.removeChild(profileView.firstChild)
    profileView = document.getElementById('user-profile-display')
    const col_1 = document.createElement('div')
    const col_2 = document.createElement('div')
    col_1.classList.add('form-container-column')
    col_2.classList.add('form-container-column')
    // col_2.style.backgroundColor ='red'
    const container = document.createElement('div')
    container.classList.add('form-container-row')
    
    const formTitle =document.createElement('h3')
    formTitle.classList.add('form-title')
    formTitle.appendChild(document.createTextNode('User Profile'))
    col_1.appendChild(formTitle)
    
    const innerContainer = document.createElement('div')
    innerContainer.classList.add('form-container-row-inner')
    const col_11 = document.createElement('div')
    const col_22 = document.createElement('div')
    col_11.classList.add('form-container-column-inner')
    col_22.classList.add('form-container-column-inner')
        
    const form = document.createElement('form')
    form.classList.add('form')
    
    form.appendChild(document.createElement('label').appendChild(document.createTextNode('First Name')))
    const fName = document.createElement('input');
    fName.classList.add('user-input-form')
    fName.setAttribute('value',json.first_name)
    form.appendChild(fName)
    form.appendChild(document.createElement('label').appendChild(document.createTextNode('Last Name')))
    const lName = document.createElement('input');
    lName.classList.add('user-input-form')
    lName.setAttribute('value',json.last_name)
    form.appendChild(lName)        
    form.appendChild(document.createElement('label').appendChild(document.createTextNode('User Name')))
    const uName = document.createElement('input');
    uName.classList.add('user-input-form')
    uName.setAttribute('value',json.user_name)
    form.appendChild(uName)
    form.appendChild(document.createElement('label').appendChild(document.createTextNode('Email')))
    const email = document.createElement('input');
    email.classList.add('user-input-form')
    email.setAttribute('value',json.email)
    form.appendChild(email)
    
    
    const innerForm_1 = document.createElement('form')
    innerForm_1.classList.add('form')
    
    const label_1 = document.createElement('label')
    label_1.appendChild(document.createTextNode('Street'))
    innerForm_1.appendChild(label_1)
    const street = document.createElement('input');
    street.classList.add('user-input-form')
    street.setAttribute('value',json.street)
    innerForm_1.appendChild(street)

    const innerForm_2 = document.createElement('form')
    innerForm_2.classList.add('form')

    const label_2 = document.createElement('label')
    label_2.appendChild(document.createTextNode('Number'))
    innerForm_2.appendChild(label_2)
    const number = document.createElement('input');
    number.classList.add('user-input-form')
    number.setAttribute('value',json.street_number)
    innerForm_2.appendChild(number)
    
    
    col_11.appendChild(innerForm_1)
    col_22.appendChild(innerForm_2)
    innerContainer.appendChild(col_11)
    innerContainer.appendChild(col_22)


    const form_2 = document.createElement('form')
    form_2.classList.add('form')

    form_2.appendChild(document.createElement('label').appendChild(document.createTextNode('City')))
    const city = document.createElement('input');
    city.classList.add('user-input-form')
    city.setAttribute('value',json.city)
    form_2.appendChild(city)
    form_2.appendChild(document.createElement('label').appendChild(document.createTextNode('Postal Code')))
    const postal = document.createElement('input');
    postal.classList.add('user-input-form')
    postal.setAttribute('value',json.postal_code)
    form_2.appendChild(postal)
    form_2.appendChild(document.createElement('label').appendChild(document.createTextNode('State')))
    const state = document.createElement('input');
    state.classList.add('user-input-form')
    state.setAttribute('value',json.state)
    form_2.appendChild(state)
    form_2.appendChild(document.createElement('label').appendChild(document.createTextNode('Country')))
    const country = document.createElement('input');
    country.classList.add('user-input-form')
    country.setAttribute('value',json.country)
    form_2.appendChild(country)
    
    // col 2

    const form_3 = document.createElement('form')
    form_3.classList.add('form')

    const passLabel = document.createElement('label')
    passLabel.appendChild(document.createTextNode('Password'))
    passLabel.style.paddingTop='21px'
    form_3.appendChild(passLabel)
    const pass = document.createElement('input');
    pass.classList.add('user-input-form')
    pass.setAttribute('type','password')
    form_3.appendChild(pass)
    
    // BUTS
    const buttons = document.createElement('div')
    buttons.classList.add('buttons-container')
    // buttons.style.justifyContent='space-between'
    const add = document.createElement('button')
    add.innerHTML = 'Add User'
    add.classList.add('button')
    add.style.width='30%'
    add.style.fontSize='10px'
    add.addEventListener('click',addBut)
    const update = document.createElement('button')
    update.classList.add('button')
    update.innerHTML = 'Update User'
    update.style.width='30%'
    update.style.fontSize='10px'
    update.addEventListener('click',updateBut)
    const del = document.createElement('button')
    del.classList.add('button')
    del.innerHTML = 'Delete User'
    del.style.width='30%'
    del.style.fontSize='10px'
    del.addEventListener('click',deleteBut)
    buttons.appendChild(add)
    buttons.appendChild(update)
    buttons.appendChild(del)
    
    col_1.appendChild(form)    
    col_1.appendChild(innerContainer)
    col_1.appendChild(form_2)

    col_2.appendChild(form_3)
    col_2.appendChild(buttons)

    container.appendChild(col_1)
    container.appendChild(col_2)
    profileView.appendChild(container)
}

const addBut = () => {
    console.log('add')
    
    const form = document.getElementsByClassName('user-input-form')
    // for (const el of form) console.log(el.value);
    let data = {};
    data.first_name = form[0].value
    data.last_name = form[1].value
    data.user_name = form[2].value
    data.email = form[3].value
    data.street = form[4].value
    data.street_number = form[5].value
    data.city = form[6].value
    data.postal_code = form[7].value
    data.state = form[8].value
    data.country = form[9].value
    data.password = form[10].value
    // console.log(data)
    
    
    fetch('http://localhost:8008/api/users/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => console.log(json));
    window.location.reload()
}

const updateBut = () => {
    console.log('update')
    const form = document.getElementsByClassName('user-input-form')
    // for (const el of form) console.log(el.value);
    let data = {};
    data.first_name = form[0].value
    data.last_name = form[1].value
    data.user_name = form[2].value
    data.email = form[3].value
    data.street = form[4].value
    data.street_number = form[5].value
    data.city = form[6].value
    data.postal_code = form[7].value
    data.state = form[8].value
    data.country = form[9].value
    if(form[10].value === SEL_PASS) {
        fetch('http://localhost:8008/api/users/update/'+SEL_ID,{
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
    fetch('http://localhost:8008/api/users/delete/'+SEL_ID, {
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
    SEL_U_NAME = json.user_name;
    SEL_PASS = json.password;
}
