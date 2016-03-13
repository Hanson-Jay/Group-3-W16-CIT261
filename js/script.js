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
//function resetForm(){
//    document.getElementById("mg").reset();
//    document.getElementById("med").reset();
//
//}
function returnDrugNames(){

    var xmlObj = new XMLHttpRequest();

    var searchTerm = ;
    var url = "https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?drug_name=" + searchTerm + "&name_type=both";

    xmlObj.open("GET", url, true);


    xmlObj.onreadystatechange = function(){

        if(xmlObj.readyState == 4 && xmlObj.status == 200){

            document.getElementById("response").innerHTML = xmlObj.responseText;
        }
    }

    xmlObj.send();




}