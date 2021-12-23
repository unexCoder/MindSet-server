# MindSet-server
![MindSet](mindset-server.jpg)

## v.0.0.1

MongoDB & Mongoose implementation

### Admins routes

GET<br/>
/api/admins<br/>
/api/admins/:id<br/>
/api/admins/byEmail/:email

POST<br/>
/api/admins/create {JSON body}

PUT<br/>
/api/admins/update/:id {JSON body}

DELETE<br/>
/api/admins/delete/:id

### Applicants routes

GET<br/>
/api/applicants<br/>
/api/applicants/:id<br/>
/api/applicants/byEmail/:email

POST<br/>
/api/applicants/create {JSON body}

PUT<br/>
/api/applicants/update/:id {JSON body}

DELETE<br/>
/api/applicants/delete/:id

### Psycologists routes

GET<br/>
/api/psycologists<br/>
/api/psycologists/:id<br/>
/api/psycologists/byEmail/:email

POST<br/>
/api/psycologists/create {JSON body}

PUT<br/>
/api/psycologists/update/:id {JSON body}

DELETE<br/>
/api/psycologists/delete/:id

### Clients routes

GET<br/>
/api/clients<br/>
/api/clients/:id<br/>

POST<br/>
/api/clients/create {JSON body}

PUT<br/>
/api/clients/update/:id {JSON body}

DELETE<br/>
/api/clients/delete/:id

## v.0.0.0

### Clients routes

GET<br/>
/api/clients<br/>
/api/clients/id<br/>
/api/clients/byName/companyName<br/>
/api/clients/byBranch/companyBranch<br/>
/api/clients/byPhone/phone<br/>
/api/clients/byEmail/email

POST<br/>
/api/clients {JSON body}

PUT<br/>
/api/clients/id {JSON body}

DELETE<br/>
/api/clients/id

### Applicants routes

GET<br/>
/api/applicants<br/>
/api/applicants/id<br/>
/api/applicants/byFirstName/firstName<br/>
/api/applicants/byLastName/lastName<br/>
/api/applicants/byUserName/userName<br/>
/api/applicants/byEmail/email<br/>
/api/applicants/byCity/city<br/>
/api/applicants/byState/state<br/>
/api/applicants/byCountry/country<br/>
/api/applicants/byPhone/phone<br/>
/api/applicants/byPostalCode/postalCode

POST<br/>
/api/applicants {JSON body}

PUT<br/>
/api/applicants/id {JSON body}

DELETE<br/>
/api/applicants/id

### Psycologists routes

GET<br/>
/api/psycologists<br/>
/api/psycologists/id<br/>
/api/psycologists/byFirstName/firstName<br/>
/api/psycologists/byLastName/lastName<br/>
/api/psycologists/byEmail/email

POST<br/>
/api/psycologists {JSON body}

PUT<br/>
/api/psycologists/id {JSON body}

DELETE<br/>
/api/psycologists/id

### Admins routes

GET<br/>
/api/admins<br/>
/api/admins/id<br/>
/api/admins/byFirstName/firstName<br/>
/api/admins/byLastName/lastName<br/>
/api/admins/byUserName/userName<br/>
/api/admins/byEmail/email

POST<br/>
/api/admins {JSON body}

PUT<br/>
/api/admins/id {JSON body}

DELETE<br/>
/api/admins/id
