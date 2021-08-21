# shopify-app
Shopify app integrated with Dev store along with Kao router and resource Inventory management integrated in the product along with GraphQL.

## About
This app will function to blurbs/coupons to the user. This is a basic skeleton of the app and this can be enhanced to a entreprise level product

## App store connection
Create your own API key and access key from https://partners.shopify.com

## Create an .env file
```bash
SHOPIFY_API_KEY='add your key'
SHOPIFY_API_SECRET_KEY='add your key'
HOST='your ngrok tunneling'
API_VERSION='2020-04'
```

## Enable localhost tunneling using ngrok
```bash
ngrok http 3000
```

## Embed the app in Shopify
1. app setup in shopify partner website
2. Add the ngrok url as app url 
3. Add redirection url using `${baseUrl}/auth/callback`


## To start server
```bash
npm run dev
```

