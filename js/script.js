var logPage = document.getElementById("log"),
    inputPage = document.getElementById("input"),
    aboutPage = document.getElementById("about"),
    navButtons = document.querySelectorAll("nav button"),
    selectedNavBtn = document.querySelector('.selected');

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
/* Save Medicine to Local Storage and display in single column table */
function store() {
  var med = document.getElementById("med");
  var mg = document.getElementById("mg");
  <!--Med save counter, used to display in table & as medicine key in LS-->
  if (typeof(Storage) !== "undefined") {
    if (localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount) + 1;
    } else {
      localStorage.clickcount = 1;
    }
    document.getElementById("saves").innerHTML = localStorage.clickcount + " Medication(s) saved.";
  } else {
    document.getElementById("saves").innerHTML = "Sorry, your browser does not support web storage...";
  }
  localStorage.setItem(localStorage.clickcount, med.value + ' - ' + mg.value);
  var out = "<table id=medList> <th>Medicine - Dosage</th>";
  for (i = 0; i < localStorage.clickcount; i++) {
    out += "<tr>" +
      "<td>" + localStorage.getItem(i + 1) + "</td>" +
      "</tr>";
  }
  out += "</table>";
  document.getElementById("1").innerHTML = out;
  document.getElementById("2").innerHTML = out;
}