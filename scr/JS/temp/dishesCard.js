function renderDishCard(buyFood, foodName, price, totalPrice) {
    return `
        <section class="basket-card">
        <header class="basket-card-header">
            <h4><span id="${foodName}">${buyFood}</span><span> x </span>${foodName}</h4>
        </header>
        <p id="${foodName}_price" class="none">${price} €</p>        
        <div class="basket-control-section">
            <div class="basket-control">
                <button id="button_delete_dish${foodName}" class="button-delete-dish" onclick="removeDish('${foodName}')">delete</button>
                <button id="button_sub_dish${foodName}" class="button-sub-dish" onclick="subFromBasket('${foodName}')">sub</button>
                <p id="${foodName}_controll">${buyFood}</p>
                <button id="button_add_dish${foodName}" class="button-add-dish" onclick="addedToBasket('${foodName}')">Added</button>                
            </div>
            
            <p id="total_${foodName}_price">${totalPrice}</p>
        </div>


    </section>    
    `
}


