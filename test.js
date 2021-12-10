let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makeAJAXCall(methodType, url, callback, async = true, data = null){
    let xhr =new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log("State Changed Called. Ready State: "+ xhr.readyState +"status: "+xhr.status);
        if (xhr.readyState === 4 ) {
            if (xhr.status === 200 || xhr.status ===201){
                callback(xhr.responseText);
            }
            else if (xhr.status >= 400){
                console.log("Handle 400 Client Error or 500 Server Error");
            }
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
}
/**Declaring local host and function to get details of the file */
const getURL = "http://localhost:3000/employees/";
function getUserDetails(data){
    console.log("Get User Data: "+data);
}
/**AJAX call for getting details */
makeAJAXCall("GET", getURL, getUserDetails,true);

/**Declaring local host for deleting data */
const deleteURL = "http://localhost:3000/employees/2";
function userDeleted(data){
    console.log("User Deleted "+data);
}
/**Ajax Call for deleting specific data */
makeAJAXCall("DELETE",deleteURL,userDeleted,false);
/**Declaring local host for entering employee details */
const postURL = "http://localhost:3000/employees";
const empData = {"name ":"Harry","salary":"6000"};
function userAdded(data){
    console.log("User Added : " +data);
}
/**Ajax call for entering data to JSON file */
makeAJAXCall("POST",postURL,userAdded,true,empData);
