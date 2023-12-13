# React App Front End Example

## Installation
Execute 
`````shell
cd src/main/frontend
npx create-react-app camunda8-react
`````

Install Zeebe
https://github.com/camunda-community-hub/zeebe-client-node-js

`````shell
npm i zeebe-node
`````

## Create multiple tenants

Create tenant "blue", and "red"

## Create application
Open Identity at http://localhost:8084/. Login with demo/demo.

Go to Applications > Add Application.

Select M2M. Call it "NodeApp".

Click on the newly created "NodeApp".

Go to "Tenants". Click "Assign Tenant". Select the Default Tenant.

Go to "Access to APIs". Click "Assign Permissions". Select "Zeebe API", then enable "write:*".

Go to "Application details", and copy the Client ID and Client secret.

in the start-process-instance.js, copy the secret

# Execute

`````shell
node start-process-instance
``````
# Reference

https://github.com/jwulf/zeebe-node-sm-mt-example
