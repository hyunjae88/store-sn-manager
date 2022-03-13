const fileUpload = document.querySelector(".file-upload");
const fileSave = document.querySelector(".file-save");
let fileName = document.querySelector(".file-name");
const itemList = document.querySelectorAll(".item_list > li");
const snList = document.querySelectorAll(".sn_list > li > input");
let snData = {};
let snLoadData = {};

function logFile(event) {
  snLoadData = JSON.parse(event.target.result);
  // console.log("string", str);
  console.log("json", snLoadData);

  // console.log(snLoadData);

  let i = 0;
  const snLoadDataKeys = Object.keys(snLoadData);

  // console.log(snLoadData[snLoadDataKeys[i]]);
  snList.forEach((element) => {
    element.value = snLoadData[snLoadDataKeys[i++]];
  });
}

function makeSnData() {
  let i = 0;

  snList.forEach((element) => {
    snData[itemList[i++].textContent] = element.value;
  });
}

function setSnData() {}

fileUpload.addEventListener("change", function (evt) {
  const test = evt.target.files[0];
  // console.log(test);
  let reader = new FileReader();

  reader.onload = logFile;

  reader.readAsText(evt.target.files[0]);

  fileName.setAttribute("value", evt.target.files[0].name);

  setSnData();
});

fileSave.addEventListener("click", function () {
  // console.log("save");

  makeSnData();

  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(snData));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "name.json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
});
