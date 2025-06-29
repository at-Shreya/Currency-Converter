const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@25-06-29/v1/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for (let select of dropdowns) { 
    for (currCode in countryList) { //will add an option for each counrty
        let newOption = document.createElement("option"); //create an option type element
        newOption.innerText = currCode; //newoption er innertext currency code show korbe
        newOption.value = currCode; //newoption er value curency code hobe
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"; //select the selected currcode
        } else if (select.name === "to" && currCode === "BDT") {
            newOption.selected = "selected";
        }
        select.append(newOption);//countrylist ke indivisual option er moddhe convert kore select er moddeh add kora hoise
    }

    select.addEventListener ("change", (evt) => { //jokhon ii select change hobe, evt ekta obj
        updateFlag(evt.target); //call the updateflag func, target means jekhane change hoise sheta pass kore dibe
    });
}


const updateFlag = (element) => {
    let currCode = element.value; //currCode hobe element er value
    let countryCode = countryList[currCode]; //countryCode er moddhe currCode niye ashbe 
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; //img source or image link from html
    let img = element.parentElement.querySelector("img"); //img access kora hoise, element er moddhe select ache, select er parent er moddhe img ache html e 
    img.src = newSrc; //img er source change kore newsrc kora hoise

};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault(); //to prevent the default functions happen
    let amount = document.querySelector(".amount input"); //access the input value
    let amtVal = amount.value; //amtVal te amount er value access korbe
    if (amtVal === "" || amtVal < 1) { // amount er value er upor conditions dawa
        amtVal = 1;
        amount.value = "1";
    }


    //console.log(fromCurr.value, toCurr.value);

   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
   let response = await fetch(URL);
   let data = await response.json();
   let rate = data[toCurr.value.toLowerCase()];
   

   let finalAmount = amtVal * rate;
   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

});