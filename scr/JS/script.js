function init() {
    creatingStructureMenu();
    creatingMenuCard();
    updateBasketCount();
}

// Erstellt den Container für die Kategorie der Gerichte
function creatingStructureMenu() {
    for (let indexFoodMenus = 0; indexFoodMenus < foodMenus.length; indexFoodMenus++) {
        const menuCardRef = document.getElementById('menu_categories');
        let menuName = foodMenus[indexFoodMenus]['category'];
        menuCardRef.innerHTML += renderCategoryCard(menuName);
    };
}

function creatingMenuCard() {
    for (let indexFoodMenusMenus = 0; indexFoodMenusMenus < foodMenus.length; indexFoodMenusMenus++) {
        let menusCard = foodMenus[indexFoodMenusMenus]['menus'];
        setMenuCard(indexFoodMenusMenus);
    }
}

function formatPrice(price) {
    return price.toFixed(2).replace(".", ",") + " €";
}

// Erstellt die Menukarten der jeweiligen Gerichte
function setMenuCard(menusCard) {
    for (let indexMenu = 0; indexMenu < foodMenus[menusCard]['menus'].length; indexMenu++) {
        let foodName = foodMenus[menusCard]['menus'][indexMenu].menu;
        let picSrc = foodMenus[menusCard]['menus'][indexMenu].pic_scr;
        let foodContent = foodMenus[menusCard]['menus'][indexMenu].foodContent;
        let price = foodMenus[menusCard]['menus'][indexMenu].price;
        price = formatPrice(price);
        let menuName = foodMenus[menusCard].category;
        const menuCardRef = document.getElementById(`menus_${menuName}`);
        menuCardRef.innerHTML += renderMenuCard(foodName, foodContent, price, menusCard, indexMenu, picSrc);
    }
}


// Fügt das ausgewählte Gericht in die Variable Basket
function addToBasket(menusCard, indexMenu) {
    const dish = foodMenus[menusCard].menus[indexMenu];
    const foodName = dish.menu;
    const price = dish.price;

    let indexBusket = basket.findIndex(
        item => item.menu === foodName
    );

    setBasket();

    if (indexBusket === -1) {
        basket.push({
            menge: 1,
            menu: foodName,
            price: price
        });

        indexBusket = basket.length - 1;
    } else {
        basket[indexBusket].menge += 1;
    };

    updateBasketCard();
    calculateTotalDishesSum();
    changePriceContent(foodName, indexBusket);
    // const foodName = foodMenus[menusCard]['menus'][indexMenu].menu;
    // const price = foodMenus[menusCard]['menus'][indexMenu].price.toFixed(2);
    // let indexBusket = basket.findIndex(basket => basket.menu == foodName);

    // setBasket();    
    // if (indexBusket < 0) {
        
    //     basket.push({ "menge": 1, "menu": foodName, "price": price });
    //     setDishCard(1, foodName, price);
    // } else {
    //     basket[indexBusket].menge = basket[indexBusket].menge + 1;
    //     let menge = basket[indexBusket].menge;
    //     basket[indexBusket].totalPrice = basket[indexBusket].price * menge;

    // };
    // calculateTotalDishesSum();
    // changePriceContent(foodName, indexBusket);
}

function setBasket() {
    const menuCardRef = document.getElementById('basket_container');
    if (!visibleBasket) {
        visibleBasket = true;
        menuCardRef.innerHTML += renderBasket();        
    }    
}

function openBasket() {
    setBasket();
    calculateTotalDishesSum();

    if (basket.length === 0) {
        document.getElementById("order_basket_overview").innerHTML =
            "<p>Dein Warenkorb ist noch leer.</p>";
    } else {
        updateBasketCard();
    }

    document.getElementById("basket_container")
        .classList.add("is-open");

    document.body.classList.add("basket-is-open");

    document.querySelector(".basket-open-button")
        .setAttribute("aria-expanded", "true");

    document.querySelector(".basket-close-button").focus();
}

function closeBasket() {
    document.getElementById("basket_container")
        .classList.remove("is-open");

    document.body.classList.remove("basket-is-open");

    const openButton = document.querySelector(".basket-open-button");
    openButton.setAttribute("aria-expanded", "false");

    if (window.matchMedia("(max-width: 900px)").matches) {
        openButton.focus();
    }
}

function closeBasketOnBackground(event) {
    if (event.target === event.currentTarget) {
        closeBasket();
    }
}

// Erstellt die Menukarte im Basket
function setDishCard(buyFood, foodName, price) {
    const renderCardRef = document.getElementById('order_basket_overview');
    let totalPrice = buyFood * price;
    renderCardRef.innerHTML += renderDishCard(buyFood, foodName, price, `${totalPrice.toFixed(2)} €`);
}

// Ändert den Preis wenn ein gericht bereits im Basket ist
function changePriceContent(foodName, indexBusket) {
    const priceCardRef = document.getElementById(`total_${foodName}_price`);
    const mengeBasketHeaderCradRef = document.getElementById(foodName);
    const mengeButtonMenuCradRef = document.getElementById(`${foodName}_Button`);
    const mengeBasketControllRef = document.getElementById(`${foodName}_controll`);
    let totalPrice = basket[indexBusket].price * basket[indexBusket].menge;
    mengeButtonMenuCradRef.innerHTML = `Bestellt ${basket[indexBusket].menge}`;
    mengeBasketControllRef.innerHTML = `${basket[indexBusket].menge}`;
    mengeBasketHeaderCradRef.innerHTML = `${basket[indexBusket].menge}`;
    priceCardRef.innerHTML = `${totalPrice.toFixed(2)} €`;
}


function removeDish(foodName) {
    let indexBusket = basket.findIndex(basket => basket.menu == foodName);
    if (indexBusket !== -1) {
        basket.splice(indexBusket, 1);
    };
    updateBasketCard();
    calculateTotalDishesSum();
}

function updateBasketCard() {
    const renderCardRef = document.getElementById('order_basket_overview');
    renderCardRef.innerHTML = "";
    for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
        let buyFood = basket[indexBasket].menge;
        let foodName = basket[indexBasket].menu;
        let price = basket[indexBasket].price;
        let totalPrice = buyFood * price;
        totalPrice = formatPrice(totalPrice);
        price = formatPrice(price);
        renderCardRef.innerHTML += renderDishCard(buyFood, foodName, price, totalPrice);
    }
}

function calculateTotalDishesSum() {
    let subtotal = 0;

    for (let i = 0; i < basket.length; i++) {
        subtotal += basket[i].price * basket[i].menge;
    }

    let delivery = 0;

    if (basket.length > 0 && subtotal <= 55) {
        delivery = 4.95;
    }

    const total = subtotal + delivery;

    document.getElementById("cost_of_dishes").textContent =
        formatPrice(subtotal);

    document.getElementById("discount_money").textContent =
        formatPrice(delivery);

    document.getElementById("total_order").textContent =
        formatPrice(total);

    const orderButton = document.getElementById("butten_to_order");

    orderButton.textContent =
        `Jetzt bestellen (${formatPrice(total)})`;

    orderButton.disabled = basket.length === 0;
    updateBasketCount();
    // let totalSum = 0;
    // for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
    //     totalSum = totalSum + (basket[indexBasket].price * basket[indexBasket].menge);
    // };
    // addTotalDishesSum(totalSum);
    // calculateTotalSum(totalSum);
}


function addTotalDishesSum(totalSum) {
    const totalFieldRef = document.getElementById('cost_of_dishes');
    totalFieldRef.innerHTML = `${totalSum.toFixed(2)} €`;
}

function calculateTotalSum(totalDishSum) {
    let totalSum = totalDishSum;
    if (totalSum <= 55.00) {
        totalSum = totalSum + 4.95;
        addTotalSumDeliver(totalSum);
    } else {
        setDeliverPrice();
        addTotalSumDeliver(totalSum);
    }
}

function addTotalSumDeliver(totalSum) {
    const endFieldRef = document.getElementById('total_order');
    endFieldRef.innerHTML = `${totalSum.toFixed(2)} €`;
}

function setDeliverPrice() {
    const deliverPriceRef = document.getElementById('discount_money');
    deliverPriceRef.innerHTML = "0.00 €"
}

function subFromBasket(foodName) {
    let indexBusket = basket.findIndex(basket => basket.menu == foodName);
    basket[indexBusket]['menge'] = basket[indexBusket]['menge'] - 1;

    if (basket[indexBusket]['menge'] < 1) {
        removeDish(foodName)
    } else {
        updateBasketCard();
        calculateTotalDishesSum();
    }
}

function addedToBasket(foodName) {
    let indexBusket = basket.findIndex(basket => basket.menu == foodName);
    basket[indexBusket]['menge'] = basket[indexBusket]['menge'] + 1;
    changePriceContent(foodName, indexBusket);
    calculateTotalDishesSum();
}

function updateBasketCount() {
    let articleCount = 0;

    for (let i = 0; i < basket.length; i++) {
        articleCount += basket[i].menge;
    }

    const countRef = document.getElementById("basket_count");

    countRef.textContent = articleCount;
    countRef.hidden = articleCount === 0;

    document.querySelector(".basket-open-button")
        .setAttribute(
            "aria-label",
            `Warenkorb öffnen, ${articleCount} Artikel`
        );
}



document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" &&
        document.body.classList.contains("basket-is-open")) {
        closeBasket();
    }
});

window.matchMedia("(max-width: 900px)")
    .addEventListener("change", function () {
        closeBasket();
    });