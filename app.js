// create HTML elemets
var adsBox = document.createElement("a");
adsBox.target = "_blank";
adsBox.style.textDecoration = "none";
adsBox.style.zIndex = "9999";
adsBox.style.width = "400px";
adsBox.style.height = "70px";
adsBox.style.border = "2px solid red";
adsBox.style.backgroundColor = "#000";
adsBox.style.boxSizing = "border-box";
adsBox.style.position = "fixed";
adsBox.style.bottom = "20px";
adsBox.style.right = "20px";
adsBox.style.display = "none";
adsBox.style.alignItems = "center";
adsBox.style.justifyContent = "flex-start";
adsBox.style.padding = "5px";
document.body.appendChild(adsBox);

var adsImgBox = document.createElement("div");
adsImgBox.style.width = "75px";
adsImgBox.style.height = "75px";
adsImgBox.style.marginRight = "0px";
adsBox.appendChild(adsImgBox);

var adsImg = document.createElement("img");
adsImg.style.width = "80%";
adsImg.style.height = "100%";
adsImg.style.objectFit = "contain";
adsImg.style.objectPosition = "center";
adsImgBox.appendChild(adsImg);

var closeBtn = document.createElement("div");
closeBtn.style.width = "25px";
closeBtn.style.height = "25px";
closeBtn.style.backgroundColor = "#dedede";
closeBtn.style.borderRadius = "50%";
closeBtn.style.cursor = "pointer";
closeBtn.style.lineHeight = "22px";
closeBtn.style.textAlign = "center";
closeBtn.style.position = "fixed";
closeBtn.style.bottom = "85px";
closeBtn.style.right = "10px";
closeBtn.style.zIndex = "9999";
closeBtn.style.display = "none";
closeBtn.innerHTML = "x";
document.body.appendChild(closeBtn);

var title = document.createElement("div");
adsBox.appendChild(title);

var adsTitle = document.createElement("h4");
adsTitle.style.marginBottom = "8px";
adsTitle.style.color = "#ffffff";
title.appendChild(adsTitle);

var adsDesc = document.createElement("h4");
adsDesc.style.fontSize = "14px";
adsDesc.style.color = "#ffffff";
title.appendChild(adsDesc);

// create HTML elemets

var defaultText = document.querySelector(".default-text"); // Debug element
var defaultText2 = document.querySelector(".default-text2"); // Debug element

closeBtn.addEventListener("click", () => {
  adsBox.style.display = "none";
  closeBtn.style.display = "none";
});

function getApi() {
  ("use strict");
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const URL = "API_ADRES";
  var randomAdsId;

  fetch(URL)
    .then((response) => response.json())
    .then((responseJson) => {
      var adsArray = Object.keys(responseJson).map(function (key) {
        return responseJson[key];
      });

      adsBox.style.display = "flex";
      closeBtn.style.display = "block";

      var newCategoryArray = [];

      for (let i = 0; i < adsArray.length; i++) {
        newCategoryArray.push(adsArray[i].category);
      }

      var maxValue = Math.max(...newCategoryArray);

      var categoryy = [];

      for (let i = 1; i <= maxValue; i++) {
        categoryy[i] = adsArray.filter((ads) => ads.category == i);
      }

      if (getCookie("ads_category") == "") {
        randomAdsId = Math.floor(Math.random() * (adsArray.length - 0 + 1)) + 0;

        if (randomAdsId == adsArray.length) {
          randomAdsId--;
        }

        adsDesc.innerHTML = adsArray[randomAdsId].offer_description;

        adsImg.src = adsArray[randomAdsId].offer_imgurl;
        adsBox.href = adsArray[randomAdsId].offer_url;

        adsBox.addEventListener("click", () => {
          setCookie("ads_category", adsArray[randomAdsId].category);
        });
      } else {
        var categoryRandomId = [];

        for (let i = 1; i < categoryy.length; i++) {
          if (getCookie("ads_category") == i) {
            categoryRandomId[i] =
              Math.floor(Math.random() * (categoryy[i].length - 0 + 1)) + 0;

            if (categoryRandomId[i] == categoryy[i].length) {
              categoryRandomId[i]--;
            }

            adsDesc.innerHTML =
              categoryy[i][categoryRandomId[i]].offer_description;
            adsImg.src = categoryy[i][categoryRandomId[i]].offer_imgurl;
            adsBox.href = categoryy[i][categoryRandomId[i]].offer_url;
          }
        }
      }
    });
}

getApi();
var intervalId = window.setInterval(function () {
  getApi();
}, 10000);

function responsive(x) {
  if (x.matches) {
    adsBox.style.width = "calc(100% - 40px)";
  }
}

var x = window.matchMedia("(max-width: 700px)");
responsive(x);
x.addListener(responsive);
