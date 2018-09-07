/*  Project 01_11_04

    Author: Dominic Torricelli
    Date:   9.5.18

    Filename: script.js
*/

"use strict";


//global variables
var httpRequest = false;

//React based on user input in postal code box
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (requestError) {
        document.getElementById("csset").style.visibility = "visible";
        var zip = document.getElementById("zip").value;
        if (zip.addEventListener) {
            zip.removeEventListener("keyup", checkInput, false);
        }
        else if (zip.attachEvent) {
            zip.detachEvent("onkeyup", checkInput);
        }
        return false;
    }
    console.log(httpRequest);
    return httpRequest;
}

//A function to Check the postal code input
function checkInput() {
    var zip = document.getElementById("zip").value;
    if (zip.length === 5) {
        getLocation()
    }
    else{
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
    }
}

//function to gather location info
function getLocation() {
    var zip = document.getElementById("zip").value;
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    httpRequest.abort();
    httpRequest.open("get", "http://api.zippopotam.us/us/" + zip, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
}

//Function to gather and display location info
function displayData() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var resultData = JSON.parse(httpRequest.responseText);
        var city = document.getElementById("city");
        var state = document.getElementById("state");
        city.value = resultData.places[0]["place name"];
        state.value = resultData.places[0]["State abbreviation"];
        document.getElementById("zip").blur();
        document.getElementById("csset").style.visibility = "visible";
    }
}

//Checks for inputs in the postal code text box
var zip = document.getElementById("zip");
if (zip.addEventListener){
    zip.addEventListener("keyup", checkInput, false);
}
else if (zip.attachEvent) {
    zip.attachEvent("onkeyup", checkInput);
}