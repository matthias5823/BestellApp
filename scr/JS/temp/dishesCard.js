function renderDishCard(buyFood, foodName, price) {
    return `
        <section class="basket-card">
        <header class="basket-card-header">
            <h4><span id="${foodName}">${buyFood}</span><span> x </span>${foodName}</h4>
        </header>
        <p id="${foodName}_price" class="none">${price} €</p>        
        <div class="basket-control-section">
            <div class="basket-control">
                <button onclick="removeDish(menusCard, indexMenu, ${foodName})">delete</button>
                <button onclick="removeToBasket(menusCard, indexMenu, ${foodName})">delete</button>
                <p id="${foodName}_controll">1</p>
                <button onclick="addToBasket(menusCard, indexMenu, ${foodName})">Added</button>                
            </div>
            
            <p id="total_${foodName}_price">19.50 €</p>
        </div>


    </section>
    
    `
}


