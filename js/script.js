var logPage = document.getElementById("log"),
    inputPage = document.getElementById("input"),
    aboutPage = document.getElementById("about"),
    currentPage = logPage;

function viewInputPage() {
  currentPage.style.left = "100%";
  inputPage.style.left = 0;
  currentPage = inputPage;
}

function viewLogPage() {
  currentPage.style.left = "100%";
  logPage.style.left = 0;
  currentPage = logPage;
}

function viewAboutPage() {
  currentPage.style.left = "100%";
  aboutPage.style.left = 0;
  currentPage = aboutPage;
}
function returnDrugNames(){

    var xmlhttp = new XMLHttpRequest();
    var url = "https://dailymed.nlm.nih.gov/dailymed/services/drugnames.json";

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            myFunction(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function myFunction(arr) {
        var out = "";
        var i;
        for(i = 0; i < arr.length; i++) {
            out += 'page';
        }
        document.getElementById("log").innerHTML = out;
    }


}