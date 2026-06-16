# sasaservice
'S' as a service


# Local Test  
sam local start-api
## Get:  
curlv http://127.0.0.1:3000/v1/
## Post: 
curlv -H "Content-Type: application/json" -d '{"letter": "S"}' http://127.0.0.1:3000/v1/