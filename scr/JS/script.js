function init() {
    creatingStructureMenu();
    creatingMenuCard();
}

// Erstellt den Container für die Kategorie der Gerichte
function creatingStructureMenu() {
    for (let indexFoodMenus = 0; indexFoodMenus < foodMenus.length; indexFoodMenus++) {
        const menuCardRef = document.getElementById('food_menus');
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

// Erstellt die Menukarten der jeweiligen Gerichte
function setMenuCard(menusCard) {
    for (let indexMenu = 0; indexMenu < foodMenus[menusCard]['menus'].length; indexMenu++) {
        let foodName = foodMenus[menusCard]['menus'][indexMenu].menu;
        let picSrc = foodMenus[menusCard]['menus'][indexMenu].pic_scr;
        let foodContent = foodMenus[menusCard]['menus'][indexMenu].foodContent;
        let price = foodMenus[menusCard]['menus'][indexMenu].price;
        price = price.toFixed(2);
        let menuName = foodMenus[menusCard].category;        
        const menuCardRef = document.getElementById(`menus_${menuName}`);
        menuCardRef.innerHTML += renderMenuCard(foodName, foodContent, price, menusCard, indexMenu, picSrc);
    }
}


// Fügt das ausgewählte Gericht in die Variable Basket
function addToBasket(menusCard, indexMenu) {
    const foodName = foodMenus[menusCard]['menus'][indexMenu].menu;
    const price = foodMenus[menusCard]['menus'][indexMenu].price.toFixed(2);
    let indexBusket = basket.findIndex(basket => basket.menu == foodName);



    if (indexBusket < 0) {
        basket.push({ "menge": 1, "menu": foodName, "price": price });
        setDishCard(1, foodName, price);
    } else {
        basket[indexBusket].menge = basket[indexBusket].menge + 1;
        let menge = basket[indexBusket].menge;
        basket[indexBusket].totalPrice = basket[indexBusket].Price * menge;
        changePriceContent(foodName, indexBusket);

    };
    calculateTotalDishesSum()
}

// Erstellt die Menukarte im Basket
function setDishCard(buyFood, foodName, price) {
    const renderCardRef = document.getElementById('order_basket_overview');
    let totalPrice = buyFood * price;
    renderCardRef.innerHTML += renderDishCard(buyFood, foodName, price, `${totalPrice.toFixed(2)} €`);
}

// Ändert den Preis wenn wein gericht bereits im Basket ist
function changePriceContent(foodName, indexBusket) {
    const priceCardRef = document.getElementById(`total_${foodName}_price`);
    const mengeBasketHeaderCradRef = document.getElementById(foodName);
    const mengeBasketControllRef = document.getElementById(`${foodName}_controll`);
    let totalPrice = basket[indexBusket].price * basket[indexBusket].menge;

    mengeBasketControllRef.innerHTML = `${basket[indexBusket].menge}`;
    mengeBasketHeaderCradRef.innerHTML = `${basket[indexBusket].menge}`;
    priceCardRef.innerHTML = `${totalPrice.toFixed(2)} €`;
}


function removeDish(foodName) {
let indexBusket = basket.findIndex(basket => basket.menu == foodName);
if (indexBusket !== -1) {
    basket.splice(indexBusket,1);

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
        renderCardRef.innerHTML += renderDishCard(buyFood, foodName, price, totalPrice);
    }
}

function calculateTotalDishesSum() {
    let totalSum = 0;
    for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
        totalSum = totalSum + (basket[indexBasket].price * basket[indexBasket].menge);
    };
    addTotalDishesSum(totalSum);
    calculateTotalSum(totalSum);
}

function addTotalDishesSum(totalSum) {
    const totalFieldRef = document.getElementById('cost_of_dishes');
    totalFieldRef.innerHTML = `${totalSum.toFixed(2)} €`;
}

function calculateTotalSum(totalDishSum) {
let totalSum = totalDishSum

    if (totalSum <= 55.00) {
        totalSum = totalSum + 4.95;
        addTotalSumDeliver(totalSum);
    }else{
        setDeliverPrice();
        addTotalSumDeliver(totalSum);
    }
}

function addTotalSumDeliver(totalSum){
    const endFieldRef = document.getElementById('total_order');
    endFieldRef.innerHTML = `${totalSum.toFixed(2)} €`;
}

function setDeliverPrice() {
    const deliverPriceRef = document.getElementById('discount_money');
    deliverPriceRef.innerHTML = "0.00 €"    
}

