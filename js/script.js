var logPage = document.getElementById("log"),
    inputPage = document.getElementById("input"),
    aboutPage = document.getElementById("about"),
    navButtons = document.querySelectorAll("nav button"),
    selectedNavBtn = document.querySelector('.selected'),
    meds = [];

// Checks local storage to see if anything has been saved and if it has parses it and stores it in meds. Also calls printTable.
function init() {
  if (typeof localStorage["meds"] != "undefined") {
    meds = JSON.parse(localStorage["meds"]);
    printTable();
  }
}

// Creates a table for the input medication page as well as the log page
function printTable() {
  var table1,
      table2,
      toggle = '<div class="container"><div class="slider" class="active" onclick="Animate(this)"></div></div>',
      button = '<button type="button">Delete</button>',
      i;
  // Build table1 for the log page with toggles
  table1 = '<table><th class="medList">Medication</th><th class="medList">Dose</th>';
  for (i = 0; i < meds.length; i++) {
    table1 += "<tr><td>" + meds[i]["med"] + "</td>";
    table1 += "<td>" + meds[i]["dose"] + "mg</td><td>";
    table1 += "<td>" + toggle + "</td></tr>";
  }
  table1 += "</table>";
  document.getElementById("1").innerHTML = table1;

  // Build table2 for the Input medication page with delete button
  table2 = "<table><th>Medication</th><th>Dose</th>";
  for (i = 0; i < meds.length; i++) {
      table2 += "<tr><td value='meds[i]['med']'>" + meds[i]["med"] + "</td>";
      table2 += "<td>" + meds[i]["dose"] + "mg</td><td>";
      table2 += "<td onClick='deleteMed(this)'>" + button + "</td>";
      if(meds[i]["id"] !== undefined){
          var id = meds[i]["id"]+"";
          table2 += '<td class="pointer" onClick="viewInfo(\'' + id + '\')"> view info</td></tr>';
      } else {
          table2 += "</tr>";
      }
    }
//, ' + med + '
    table2 += "</table>";
    document.getElementById("2").innerHTML = table2;

    // Displays how many medications have been saved
    document.getElementById("saves").innerHTML = meds.length + " Medication(s) saved.";
}

function deleteMed(obj){
	var i = obj.parentNode.rowIndex-1;
    meds.splice(i, 1);
    localStorage["meds"] = JSON.stringify(meds);
    printTable();
}

function viewInputPage() {
    selectedNavBtn.className = "";
    inputPage.style.left = "0px";
    logPage.style.left = "100%";
    aboutPage.style.left = "100%";
    navButtons[0].className = "selected";
    selectedNavBtn = navButtons[0];
}

function viewLogPage() {
    selectedNavBtn.className = "";
    inputPage.style.left = "-100%";
    logPage.style.left = "0px";
    aboutPage.style.left = "100%";
    navButtons[1].className = "selected";
    selectedNavBtn = navButtons[1];
}

function viewAboutPage() {
    selectedNavBtn.className = "";
    inputPage.style.left = "-100%";
    logPage.style.left = "-100%";
    aboutPage.style.left = "0px";
    navButtons[2].className = "selected";
    selectedNavBtn = navButtons[2];
}

/* Clear Local Storage reset counter */

function clearLS() {
    localStorage.clear();
    document.getElementById("1").innerHTML = "You have no Medication Listed";
    document.getElementById("2").innerHTML = "You have no Medication Listed";
    document.getElementById("saves").innerHTML = "0 Medication(s) saved.";
}
/* Creates a medicine object and stores it in the array and updates localStorage */

function store() {
    var loadIt = "";
    var med = document.getElementById("med");
    var mg = document.getElementById("mg");

    if (typeof(Storage) == "undefined") {
        document.getElementById("saves").innerHTML = "Sorry, your browser does not support web storage...";
    }
    document.getElementById("inputPage").innerHTML = "";
    var loading = document.getElementById("loading-animation");
    loading.style.display = "none";
  searchForDrug(med.value, mg.value);
    document.getElementById("inputPage").innerHTML = loadIt;
    var loading = document.getElementById("loading-animation");
    loading.style.display = "block";
  document.getElementById('medInput').reset();
}

function searchForDrug(drugName, dosage){
    var xmlObj = new XMLHttpRequest();
    var url = "https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?drug_name="+drugName+"&name_type=both";
    xmlObj.open("GET", url, true);
    xmlObj.onreadystatechange = function(){
        if(xmlObj.readyState == 4 && xmlObj.status == 200){
            var response = JSON.parse(xmlObj.response);
            if(response.data.length > 0){
                saveToLS(drugName, dosage, response.data[0].setid);
            } else {
                saveToLS(drugName, dosage, undefined);
            }
        }
    }
    xmlObj.send();
}

function saveToLS(med, mg, id){
    var medObj = {};
    medObj["med"] = med;
    medObj["dose"] = mg;
    medObj["id"] = id;
    meds.push(medObj);
    localStorage["meds"] = JSON.stringify(meds);
    printTable();
}

function viewInfo(searchTerm){
    returnDrugNames(searchTerm);
    document.getElementById("response").innerHTML = "";
    var loading = document.getElementById("loading-animation");
    loading.style.display = "block";
    viewAboutPage();
}

function returnDrugNames(searchTerm){
    var xmlObj = new XMLHttpRequest();
    var url = "https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/"+searchTerm+".xml";
    xmlObj.open("GET", url, true);
    xmlObj.onreadystatechange = function(){
        if(xmlObj.readyState == 4 && xmlObj.status == 200){
            var structuredBody = xmlObj.responseXML.getElementsByTagName('structuredBody');
            var components = structuredBody[0].children;
            var output = "";
            for(var i = 0; i < components.length; i++){
                var section = components[i].children;
                var code = section[0].children[1];
                var displayName = code.attributes.getNamedItem("displayName");



                if(displayName.value.indexOf("INDICATIONS & USAGE SECTION") > -1){
                    var text = section[0].getElementsByTagName("text")[0];
                    output += "<h2>Usage</h2>";
                    output += new XMLSerializer().serializeToString(text);
                }
                if(displayName.value.indexOf("DOSAGE & ADMINISTRATION SECTION") > -1){
                    var text = section[0].getElementsByTagName("text")[0];
                    output += "<h2>Dosage & Administration</h2>";
                    output += new XMLSerializer().serializeToString(text);
                }
            }
            document.getElementById("response").innerHTML = output;
            var loading = document.getElementById("loading-animation");
            loading.style.display = "none";
        }
    }
    xmlObj.send();
}

function loadFromLs(){
    if (typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {

            var out = "<table id=medList> <th>Medicine - Dosage</th>" + "<th></th>";
            for (i = 0; i < localStorage.clickcount; i++) {
                out += "<tr>" +
                    "<td>" + localStorage.getItem(i + 1) + "</td>" +
                    "<td>" + SLIDER + "</td>" +
                    "</tr>";
            }
            out += "</table>";
            document.getElementById("1").innerHTML = out;
            document.getElementById("2").innerHTML = out;

        }
    } else {
        document.getElementById("saves").innerHTML = "Sorry, your browser does not support web storage...";
    }

}
/*Medication Log Page Sliders */

function Animate(slider) {
    if(slider.classList.contains('active')){
        slider.classList.remove('active');
        slider.classList.add('deactive');
    } else {
        slider.classList.remove('deactive');
        slider.classList.add('active');
    }
    /*
      if(slider.style.left === '0px')
      {
        slider.classList.add('active');
      } else {
        slider.classList.remove('active');
      }
      */
}


/* Run initialization code */
init();
