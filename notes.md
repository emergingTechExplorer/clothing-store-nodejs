express is a framework for developing web applications in node

ejs is a view templating language so that we can put server-side code inside front-end HTML views

lockfile will make sure at depolyment, the library versions stay the same as the local environment

dev dependency will only be installed in development environment (such as own PC). It wont be installed in production

npm install express --save
npm install dotenv --save-dev

we need to modify store.html so that we can use it within our view templating engine of ejs.
we also want to extract all the items that are in that store onto our server so that when we tell our server
which items somebody bought, we can actually reference it on the server, instead of having to reference it in the 
front-end which would allow for people to be able to fake what items they bought.
For example, if we got our request back from stripe, the token for their credit card number and everything,
and the user (front-end) sent us back the amount that we need to charge that credit card. The user could change that 
amount to 0 in their front end, click the purchase button and they will be able to purchase everything for 0 dollars.
We would not have any control over it. So instead we are going to send the different IDs of the items that 
they are purchasing to the server so that they can't actually fake what they are buying. For this we create items.json. This json is easier than setting up a full database.

The items in items.json can be referenced and used inside the front-end code in order to make all of the items 
show up. And now they have an ID associated with them.

