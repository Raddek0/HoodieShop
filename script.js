function fetchData(url) {
    return new Promise(async (resolve, reject) =>{
        try {
            const response=await fetch(url);
            if(!response.ok){
                throw new Error("Bład pobierania danych: ${response.statusText}");
            }
            const data = await response.json();
            resolve(data);
        } catch (error) {
            console.error('Wystąpił błąd ${error.message}');
            reject(error);
        }
    });
}

const apiUrl='products.json';

fetchData(apiUrl)
    .then((jsonData)=>{
        console.log(jsonData);

        const shopContainer=document.getElementById('prodContainer'); 

        const obj=jsonData.products;

        for (const x in obj) {
            let prod=obj[x];

            console.log(prod[0].name);

            let itemBox=document.createElement('div');
            itemBox.classList.add("prod-box");
            itemBox.id="prod-"+x;

            let itemPic=document.createElement('img');
            itemPic.src="images/"+prod[0].image;

            let itemBoxSec=document.createElement('div');
            itemBoxSec.classList.add("prod-box-det");

            let itemPrice=document.createElement('p');
            let itemPriceText=document.createTextNode("$ "+prod[0].price);
            itemPrice.appendChild(itemPriceText);
            itemPrice.classList.add("prod-box-price");
            
            let itemBoxHeader=document.createElement('p');
            let headerText=document.createTextNode(prod[0].name);
            itemBoxHeader.appendChild(headerText);

            let itemBoxDesc=document.createElement('p');
            let descText=document.createTextNode(prod[0].desc);
            itemBoxDesc.appendChild(descText);

            itemBox.appendChild(itemPic);
            itemBox.appendChild(itemBoxSec);

            itemBoxSec.appendChild(itemPrice);
            itemBoxSec.appendChild(itemBoxHeader);
            itemBoxSec.appendChild(itemBoxDesc);

            shopContainer.appendChild(itemBox);

            itemBox.addEventListener("click", ()=>{
                window.location.href=`product.html?id=${x}`;
            });
        }
    })
    .catch((error)=>{
        console.error("Wystąpił bład podczas pobierania danych: ", error);
    })

// const prod1=document.getElementById("prod-hoodie1");