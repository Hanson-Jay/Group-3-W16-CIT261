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