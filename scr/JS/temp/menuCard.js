function renderMenuCard(foodName, foodContent, price, menusCard, indexMenu) {
    return `

            <article class="menu-card">
                <img class="picture" src="./scr/assets/imgs/BayernBisw.webp" alt="">
                <div class="product-content">
                    <h3>${foodName}</h3>
                    <p>${foodContent}</p>
                </div>
                <div class="order-section">
                    <p class="price">${price} €</p>
                    <button id="${foodName}" onclick="addToBasket(${menusCard}, ${indexMenu})">add to basket</button>
                </div>
            </article>
        `;
}