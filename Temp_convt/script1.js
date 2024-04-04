const degree=document.querySelector("#degree");
const btn=document.querySelector(".btn");
const displaybox=document.querySelector(".displaybox");
const select=document.querySelector("select");

let result;
const dispalyFahrenheit = () =>{
    result=(degree.value -32) * 5 / 9;
    displaybox.textContent= `${result.toFixed(2)}C`;
};

const dispalyCelsius = () =>{
    result= degree.value * (9/5) +32;
    displaybox.textContent= `${result.toFixed(2)}F`;
};

btn.addEventListener("click" , ()=>{
    if(select.value == "Fahrenheit"){
        dispalyFahrenheit();
    } else{
        dispalyCelsius();
    }
});


