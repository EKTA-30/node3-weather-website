console.log('Client side javascript file loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne =  document.querySelector('#message-1')
const messageTwo =  document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e) => {
   e.preventDefault()   

   const location = search.value
   messageOne.textContent = "Loading ....."
   messageTwo.textContent=""
   fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data,error) => {
        if(error){
        messageOne.textContent = error
        }
        else {
            //console.log(data)
            messageOne.textContent = data.location
            messageTwo.textContent = data.weather.description+ ' It is '+data.weather.actualTemperature+ ' degrees Celcius, with a ' +data.weather.precip+' percent chance of rain.';
        }
    })
})

})