const deleteProdBtnEs = document.querySelectorAll(".product-item button");

async function deleteProduct (event) {
    const buttonE = event.target;
    const prodId = buttonE.dataset.productid;
    
    const response = await fetch("/admin/products/" + prodId, {
        method: "delete"
    });

    if(!response.ok){
        alert("something went wrong");
        return;
    }

    buttonE.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteProdBtnE of deleteProdBtnEs) {
    deleteProdBtnE.addEventListener("click", deleteProduct);
}