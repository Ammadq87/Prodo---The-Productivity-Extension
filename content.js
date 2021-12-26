let myLeads = [];
// let timeArray = 0;

let time = 0;

// Buttons:
const addBtn = document.getElementById("addWebsite");
const delBtn = document.getElementById("delWebsite");
const incrementTime = document.getElementById("increaseTime");
const decrementTime = document.getElementById("decreaseTime");

let currentURL = "";
let currentHostname = "";
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
let timeFromLocalStorage = JSON.parse(localStorage.getItem("timeArray"));

// Get Current Link
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    currentURL = url;
    currentHostname = (new URL(currentURL)).hostname;
    console.log("Current URL --> "+currentURL+"\nCurrent Hostname --> "+currentHostname);    
    // use `url` here inside the callback because it's asynchronous!
});

// Retrieve current website array
if (leadsFromLocalStorage != null && timeFromLocalStorage != null){
    myLeads = leadsFromLocalStorage;
    time = timeFromLocalStorage/60;
}

printLeads();

// Add Button: add the website to myLeads and add whatever time into timeArray
addBtn.addEventListener("click", function(){
    // currentHostName was replaced by input
    let input = document.getElementById("websiteName").value;
    input = (new URL (input)).hostname;

    if ((input != "" || input != null) && !myLeads.includes(input) && input != "https://tenor.com/view/back-to-work-get-back-to-work-working-grumpy-get-back-to-it-gif-12677234"){
        // Convert tab link to hostname and add to myLeads
        myLeads.push(input);
        printLeads();
        // add time to timeArray
        // timeArray.push(time);

        // Set myLeads in local storage to current myLeads
        localStorage.setItem("myLeads", JSON.stringify(myLeads));

        // Set timeArray in local storage to current timeArray
        localStorage.setItem("timeArray", JSON.stringify(time * 60));

        // Print myLeads from local storage
        console.log("myLeads -> "+localStorage.getItem("myLeads"));
        console.log("timeArray -> "+localStorage.getItem("timeArray"));

        chrome.runtime.sendMessage({webArray: localStorage.getItem("myLeads")}, function(response) {
            console.log(response.farewell);
        });

        chrome.runtime.sendMessage({array: localStorage.getItem("timeArray")}, function(response) {
            console.log("pls bruh")
            console.log(response.farewell);
        });
    }

    else{
        alert("Website Entered Incorrectly or Website Already Exists.\nCopy and Paste Website Directly into Input");
    }

});

// Delete Button:
delBtn.addEventListener("click", function(){
    let input = document.getElementById("websiteName").value;
    input = (new URL (input)).hostname;

    console.log("input: "+input)

    if (myLeads.includes(input)){
        myLeads[myLeads.indexOf(input)] = null;
        document.getElementById("listArea").innerHTML = "";
        printLeads();
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
    }

    else{
        alert("Website Does Not Exists Here.");
    }
});

// Add time
incrementTime.addEventListener("click", function(){
    if (time >= 0){
        time++;
        document.getElementById("timeLimit").innerHTML = ""+time;
    }

    else{
        alert("Invalid Time Entered");
    }
});

// Add time
decrementTime.addEventListener("click", function(){
    if (time > 0){
        time--;
        document.getElementById("timeLimit").innerHTML = ""+time;
    }

    else{
        alert("Invalid Time Entered");
    }
});

function printLeads(){
    for (let i=0; i<myLeads.length; i++){
        if (myLeads[i] != null){
            let x = document.createElement("p");
            x.innerHTML = ""+myLeads[i];
            document.getElementById("listArea").append(x);
        }
    }
}

/*

Purpose:
    - let user add websites
    - retrieve current link and current hostname and add to myLeads
    - send myLeads to background.js so background.js can store into storage
        - once it receives myLeads, background.js will check if user has reached time limit and will alert them (somehow)


*/
