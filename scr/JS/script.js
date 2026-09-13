function init() {
    creatingStructureMenu();
    creatingMenuCard();
}

function creatingStructureMenu() {
    for (let indexFoodMenus = 0; indexFoodMenus < foodMenus.length; indexFoodMenus++) {
        const menuCardRef = document.getElementById('food_menus');
        let menuName = foodMenus[indexFoodMenus]['category'];
        menuCardRef.innerHTML += `
    <section id="menus_card${menuName}" class="" alt="Übersicht an Gerichten von ${menuName}">
        <header id="" class="menus-header">
            <h3>${menuName}</h3>
        </header>
        <section id="menus_${menuName}">
        </section>
    </section>
    `;
    };
}

function creatingMenuCard() {
    for (let indexFoodMenusMenus = 0; indexFoodMenusMenus < foodMenus.length; indexFoodMenusMenus++) {
        let menusCard = foodMenus[indexFoodMenusMenus]['menus'];
        setMenuCard(indexFoodMenusMenus);
        // console.log(menusCard);

    }
}

function setMenuCard(menusCard) {
    for (let indexMenu = 0; indexMenu < foodMenus[menusCard]['menus'].length; indexMenu++) {
        let foodName = foodMenus[menusCard]['menus'][indexMenu].menu;
        let foodContent = foodMenus[menusCard]['menus'][indexMenu].foodContent;
        let price = foodMenus[menusCard]['menus'][indexMenu].price;
        let menuName = foodMenus[menusCard].category;
        const menuCardRef = document.getElementById(`menus_${menuName}`);

        menuCardRef.innerHTML += `

            <article class="menu-card">
                <img class="picture" src="./scr/assets/imgs/BayernBisw.webp" alt="">
                <div class="product-content">
                    <h3>${foodName}</h3>
                    <p>${foodContent}</p>
                </div>
                <div class="order-section">
                    <p class="price">${price} €</p>
                    <button id="">add to basket</button>
                </div>
            </article>
        `

    }
}


