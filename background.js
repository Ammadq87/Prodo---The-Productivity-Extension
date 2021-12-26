let website = [];
let timerArray;
let tempTimeArray;

let y = ["www.youtube.com"];


let currentUrl = "";
let currentHostName = "";

// Get Current Link
getCurrentLink();

// Retrieve myLeads from content.js
retrieveMyLeads();

let x = setInterval(countTime,1000);

function countTime(){
    console.log("countTime running...");
    
    getCurrentLink();
    retrieveMyLeads();  
    console.log(website);
    console.log(timerArray);

    if (website.includes(currentHostName)){
        
        /*
        - find index of currentHostName
        - decrement index of currentHostName
        - if (index of currentHostName == 0) -> alert user (redirect them)
        */

        if (timerArray > 0){
            timerArray--;
            console.log(timerArray);

            if (timerArray == 0){
                console.log("Switching Tabs");
                let myNewUrl = "https://tenor.com/view/back-to-work-get-back-to-work-working-grumpy-get-back-to-it-gif-12677234";
                chrome.tabs.update({url: myNewUrl});
                console.log("Switched");
                timerArray = tempTimeArray;
            }
        }
        

        // let i = website.indexOf(website.includes(currentHostName));
        // console.log("index> "+i+"\ncurrentHostName: "+currentHostName+"\n"+(y === website));

        // if (timerArray[website.indexOf(currentHostName)] > 0){
        //     timerArray[website.indexOf(currentHostName)]--;
        //     console.log(timerArray);

        //     console.log("matched");

        //     if (timerArray[website.indexOf(currentHostName)] == 0){
        //         console.log("Switching Tabs");
        //         let myNewUrl = "https://makeameme.org/meme/I-should-go-op27ho";
        //         chrome.tabs.update({url: myNewUrl});
        //         console.log("Switched");
        //         timerArray[website.indexOf(currentHostName)] = tempTimeArray[website.indexOf(currentHostName)];
        //     }

        // }
        
       
    }

    else{
        console.log("fail");
    }
}

function find(site){
    for (let i=0; i<website.length; i++){
        // console.log(i+") "+t);
        console.log(site == website);

        // console.log((website[i] === site) + "> "+website[i]+" : "+site);
        // if (website[i] == site)
            // return i;
    }
    return -1;
}

function retrieveMyLeads(){
    chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        if (request.webArray != null){ // Temporary
            website = request.webArray;
            console.log("website -> "+website);
            sendResponse({farewell: "received"});
        }
    });

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
            if (request.array != null){ // Temporary
                timerArray = request.array;
                tempTimeArray = timerArray;
                console.log("timerArray -> "+timerArray);
                sendResponse({farewell: "received"});
            }
        });
}

function getCurrentLink(){
    console.log("called");
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        currentUrl = url;
        currentHostName = (new URL(currentUrl)).hostname;
        console.log("Current Url --> "+currentUrl+"\nCurrent HostName --> "+currentHostName);
        // use `url` here inside the callback because it's asynchronous!
    });
}