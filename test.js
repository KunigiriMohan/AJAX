function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs: "+ date.getMinutes() +"Mins: "+date.getSeconds()+" Secs";
}
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makePromiseCall(methodType, url, async = true, data = null){
    return new Promise(function(resolve,reject){
        let xhr =new XMLHttpRequest();
        xhr.onreadystatechange = function() {
        console.log("State Changed Called. Ready State: "+ xhr.readyState +"status: "+xhr.status);
            if (xhr.status.toString().match('^[2][0-9]{2}$')){
                resolve(xhr.responseText);
            }
            else if (xhr.status.toString().match('^[4,5][0-9]{2}$')){
                reject ({
                    status:xhr.status,
                    statusText:xhr.statusText
                });
                console.log("XHR Failed");
            }
        }
        xhr.open(methodType, url, async);
        if(data){
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }
        else xhr.send();
        console.log(methodType+" request sent to the server");
    });
}

/**Declaring local host and function to get details of the file */
const getURL = "http://localhost:3000/employees/4";
/**making promise call to get details */
makePromiseCall("GET",getURL,true)
    .then(responseText => {
        console.log("Get User Data at : "+ showTime()+" data "+ responseText);
    })
    .catch(error => console.log("GET Error Status : "+JSON.stringify(error)));

/*calling makePromise call to delete elemnt */
const deleteURL = "http://localhost:3000/employees/4";
makePromiseCall("DELETE",deleteURL,true)
    .then(responseText => {
        console.log("Delete User Data at : "+ showTime()+" data "+ responseText);
    })
    .catch(error => console.log("GET Error Status : "+JSON.stringify(error)));

/*sending POST promise call */
const postURL = "http://localhost:3000/employees";
const empData = {"name" : "Rohi" ,"salary":"6000"};
makePromiseCall("POST",postURL,true,empData)
    .then(responseText => {
        console.log("Post User Data at : "+ showTime()+" data "+ responseText);
    })
    .catch(error => console.log("GET Error Status : "+JSON.stringify(error)));
