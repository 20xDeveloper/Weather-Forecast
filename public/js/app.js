console.log('Client side javascript file is loaded!')

//get the data from the form this is basic javascript
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//when you click submit/button inside the form tag. there will only be one button
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevents the page from refreshing by default the button/submit refreshes
    //the page. e is referring to the element.

    const location = search.value //get the value of the input

    messageOne.textContent = 'Loading...' //have it set as loading before you display the content
    messageTwo.textContent = ''

    //when we use .then we are creating a promise it makes the code asynchronous
    //if you want to know which route listener we trigger in our node server look in line 44 in app.js inside the src. directory. That is the server javascript file we used that to start up the server by typing node src/app.js. That has all the routes and why we can display this page. With out the server running we cannot open the index.hbs file because we are connected to the server port which is 3000
    fetch('/weather?address=' + location).then((response) => { //fetch the data depending on what they enter. this is our server which is app.js in the src folder. we node started it and that is why we can display this page.
        response.json().then((data) => { //response.json parses the json data and then data in the then method is that value
            if (data.error) { //display the error we got from the our node server. look at the code in src directory app.js
                messageOne.textContent = data.error //change the content of the paragraph tag
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})