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
   //Med save counter, used to display in table & as medicine key in LS
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
    loadFromLs();
}
function returnDrugNames(searchTerm){
    var xmlObj = new XMLHttpRequest();
    var url = "https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/0d9a521b-8314-437c-8c9f-f6188f1134fe.xml";
    //var url = "https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?drug_name=lexapro&name_type=both";
    xmlObj.open("GET", url, true);
    xmlObj.onreadystatechange = function(){
        if(xmlObj.readyState == 4 && xmlObj.status == 200){
            //document.getElementById("response").innerHTML = xmlObj.responseText;
            // var info = JSON.parse(xmlObj.responseText);
            var structuredBody = xmlObj.responseXML.getElementsByTagName('structuredBody');
            var components = structuredBody[0].children;
            //var components = structuredBody[0].getElementsByTagName('components');
            for(var i = 0; i < components.length; i++){
                //var code = components[i].getElementsByTagName("code");
                var section = components[i].children;
                var code = section[0].children[1];
                var displayName = code.attributes.getNamedItem("displayName");

                if(displayName.value.indexOf("INDICATIONS & USAGE SECTION") > -1){
                    console.log("INDICATIONS & USAGE")
                    var text = section[0].children[3];
                    var paragraph = text.children[0];
                    debugger;
                    var content = paragraph.children[0];
                    var contentText = content.textContent;
                    console.log(contentText)
                }
                if(displayName.value.indexOf("DOSAGE & ADMINISTRATION SECTION") > -1){
                    console.log("DOSAGE & ADMINISTRATION")
                    var text = section[0].children[3];
                    var paragraph = text.children[0];
                    debugger;
                    var content = paragraph.textContent;
                    console.log(content)
                }

                /*if(components[i].getElementsByTagName('structuredBody').length > 0){
                 console.log(components[i].getElementsByTagName('structuredBody'))
                 var structuredBody = components[i].getElementsByTagName('structuredBody');
                 //console.log(structuredBody.getElementsByTagName('component'))

                 console.log(components[i].nodeName + ": " + components[i].childNodes[0].nodeValue);
                 }*/
            }
            //var data = info.data;
        }
    }
    xmlObj.send();
}
function loadFromLs(){
    if (typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {

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

    } else {
        document.getElementById("saves").innerHTML = "Sorry, your browser does not support web storage...";
    }

}
/*Medication Log Page Sliders */
window.addEventListener('load', function(){

    var slider = document.getElementById('slider'),
        boxleft, // left position of moving box
        startx, // starting x coordinate of touch point
        dist = 0, // distance traveled by touch point
        touchobj = null // Touch object holder

     loadFromLs();
    slider.addEventListener('touchstart', function(e){
        touchobj = e.changedTouches[0] // reference first touch point
        boxleft = parseInt(slider.style.left) // get left position of box
        startx = parseInt(touchobj.clientX) // get x coord of touch point
        e.preventDefault() // prevent default click behavior
    }, false)

    slider.addEventListener('touchmove', function(e){
        touchobj = e.changedTouches[0] // reference first touch point for this event
        var dist = parseInt(touchobj.clientX) - startx // calculate dist traveled by touch point
        // move box according to starting pos plus dist
        // with lower limit 0 and upper limit 350 so it doesn't move outside box:
        slider.style.left = ( (boxleft + dist > 21)? 21 : (boxleft + dist < 0)? 0 : boxleft + dist ) + 'px'
        e.preventDefault()
        slider.classList.add('active')
    }, false)

    returnDrugNames();

}, false)
