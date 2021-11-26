# MindSet-server
![MindSet](mindset-server.jpg)

## v.1.0.0

### Clients routes

GET
/api/clients
/api/clients/id
/api/clients/byName/companyName
/api/clients/byBranch/companyBranch
/api/clients/byPhone/phone
/api/clients/byEmail/email

POST
/api/clients {JSON body}

PUT
/api/clients/id {JSON body}

DELETE
/api/clients/id

### Applicants routes

GET
/api/applicants
/api/applicants/id
/api/applicants/byFirstName/firstName
/api/applicants/byLastName/lastName
/api/applicants/byUserName/userName
/api/applicants/byEmail/email
/api/applicants/byCity/city
/api/applicants/byState/state
/api/applicants/byCountry/country
/api/applicants/byPhone/phone
/api/applicants/byPostalCode/postalCode

POST
/api/applicants {JSON body}

PUT
/api/applicants/id {JSON body}

DELETE
/api/applicants/id

### Psycologists routes

GET
/api/psycologists
/api/psycologists/id
/api/psycologists/byFirstName/firstName
/api/psycologists/byLastName/lastName
/api/psycologists/byEmail/email

POST
/api/psycologists {JSON body}

PUT
/api/psycologists/id {JSON body}

DELETE
/api/psycologists/id

### Admins routes

GET
/api/admins
/api/admins/id
/api/admins/byFirstName/firstName
/api/admins/byLastName/lastName
/api/admins/byUserName/userName
/api/admins/byEmail/email

POST
/api/admins {JSON body}

PUT
/api/admins/id {JSON body}

DELETE
/api/admins/id
