function fetchData(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Bład pobierania danych: ${response.statusText}");
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error("Wystąpił błąd ${error.message}");
      reject(error);
    }
  });
}

const apiUrl = "products.json";
const prodCon = document.getElementById("product-details");

fetchData(apiUrl)
  .then((jsonData) => {
    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get("id");

    const obj = jsonData.products;

    if (productID in obj) {
      const foundObj = obj[productID];
      console.log(foundObj[0]);

      let leftSec = document.createElement("div");
      leftSec.classList.add("left-section");

      //   let leftSecImage = document.createElement("img");
      //   leftSecImage.src = "images/" + foundObj[0].image;
      //   leftSec.appendChild(leftSecImage);
      leftSec.style.backgroundImage = `url('images/${foundObj[0].image}')`;

      let rightSec = document.createElement("div");
      rightSec.classList.add("right-section");

      let detHeader = document.createElement("p");
      detHeader.classList.add("details-header");
      let detHeaderText = document.createTextNode(foundObj[0].name);
      detHeader.appendChild(detHeaderText);
      rightSec.appendChild(detHeader);

      let detHeaderDesc = document.createElement("p");
      detHeaderDesc.classList.add("details-header-desc");
      let detHeaderDescText = document.createTextNode(foundObj[0].desc);
      detHeaderDesc.appendChild(detHeaderDescText);
      rightSec.appendChild(detHeaderDesc);

      let sizeFormCon = document.createElement("div");
      sizeFormCon.classList.add("details-size-form");

      let itemsLeftBox = document.createElement("div");
      let lastItemsBox = document.createElement("p");
      lastItemsBox.classList.add("last-items");
      lastItemsBox.classList.add("hidden");

      itemsLeftBox.appendChild(lastItemsBox);
      let itemsLeftLabel = document.createElement("p");

      itemsLeftBox.appendChild(itemsLeftLabel);
      rightSec.appendChild(itemsLeftBox);

      for (const x in foundObj[0].size) {
        let buttonsCon = document.createElement("div");
        buttonsCon.classList.add("buttons-container");

        let buttonDesc = document.createElement("label");
        let buttonDescText = document.createTextNode(x);
        buttonDesc.appendChild(buttonDescText);

        let sizeInputButton = document.createElement("input");
        sizeInputButton.type = "radio";
        sizeInputButton.name = "size";
        sizeInputButton.value = x;

        itemsLeftLabel.textContent ="Na stanie: ";

        sizeInputButton.addEventListener("change", () => {
          switch (sizeInputButton.value) {
            case "S":
              if (foundObj[0].size.S.itemsLeft == 0) {
                lastItemsBox.classList.remove("hidden");
                lastItemsBox.textContent = "Towar wyczerpany";
              } else if (foundObj[0].size.S.itemsLeft <= 5) {
                lastItemsBox.classList.remove("hidden");
                lastItemsBox.textContent = "Ostatnie Sztuki !";
              } else {
                lastItemsBox.classList.add("hidden");
              }
              itemsLeftLabel.textContent =
                "Na stanie: " + foundObj[0].size.S.itemsLeft;
              break;

            case "M":
              if (foundObj[0].size.M.itemsLeft == 0) {
                lastItemsBox.classList.remove("hidden");
                lastItemsBox.textContent = "Towar wyczerpany";
              } else if (foundObj[0].size.M.itemsLeft <= 5) {
                lastItemsBox.textContent = "Ostatnie Sztuki !";
                lastItemsBox.classList.remove("hidden");
              } else {
                lastItemsBox.classList.add("hidden");
              }
              itemsLeftLabel.textContent =
                "Na stanie: " + foundObj[0].size.M.itemsLeft;
              break;

            case "L":
              if (foundObj[0].size.L.itemsLeft == 0) {
                lastItemsBox.classList.remove("hidden");
                lastItemsBox.textContent = "Towar wyczerpany";
              } else if (foundObj[0].size.L.itemsLeft <= 5) {
                lastItemsBox.classList.remove("hidden");
                lastItemsBox.textContent = "Ostatnie Sztuki !";
              } else {
                lastItemsBox.classList.add("hidden");
              }
              itemsLeftLabel.textContent =
                "Na stanie: " + foundObj[0].size.L.itemsLeft;
              break;

            case "XL":
              if (foundObj[0].size.XL.itemsLeft == 0) {
                lastItemsBox.classList.remove("hidden");
                lastItemsBox.textContent = "Towar wyczerpany";
              } else if (foundObj[0].size.XL.itemsLeft <= 5) {
                lastItemsBox.classList.remove("hidden");
                lastItemsBox.textContent = "Ostatnie Sztuki !";
              } else {
                lastItemsBox.classList.add("hidden");
              }
              itemsLeftLabel.textContent =
                "Na stanie: " + foundObj[0].size.XL.itemsLeft;
              break;
          }
        });

        buttonsCon.appendChild(buttonDesc);
        buttonsCon.appendChild(sizeInputButton);
        sizeFormCon.appendChild(buttonsCon);
      }
      rightSec.appendChild(sizeFormCon);

      let cardButtonContainer = document.createElement("div");
      cardButtonContainer.classList.add("details-card");

      let cardButton = document.createElement("button");
      cardButton.textContent = "Add to card";
      cardButtonContainer.appendChild(cardButton);

      let detPrice = document.createElement("p");
      detPrice.classList.add("details-price");
      let detPriceText = document.createTextNode("$ " + foundObj[0].price);
      detPrice.appendChild(detPriceText);
      cardButtonContainer.appendChild(detPrice);

      rightSec.appendChild(cardButtonContainer);

      prodCon.appendChild(leftSec);
      prodCon.appendChild(rightSec);
    }
  })
  .catch((error) => {
    console.error("Wystąpił bład podczas pobierania danych: ", error);
  });
