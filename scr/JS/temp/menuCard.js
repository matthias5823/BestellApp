function renderMenuCard(foodName, foodContent, price, menusCard, indexMenu, picSrc) {
    return `

            <article class="menu-card">
                <img class="picture" src="${picSrc}" alt="">
                <div class="product-content">
                    <h3>${foodName}</h3>
                    <p>${foodContent}</p>
                </div>
                <div class="order-section">
                    <p class="price">${price}</p>
    
                    <button id="${foodName}_Button" class="button-menu-card" onclick="addToBasket(${menusCard}, ${indexMenu})">Bestellen</button>
                </div>
            </article>
        `;
}