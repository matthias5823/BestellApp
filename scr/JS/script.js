function init() {
    creatingStructureMenu();
    creatingMenuCard();
}

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

function setMenuCard(menusCard) {
    for (let indexMenu = 0; indexMenu < foodMenus[menusCard]['menus'].length; indexMenu++) {
        let foodName = foodMenus[menusCard]['menus'][indexMenu].menu;
        let picSrc = foodMenus[menusCard]['menus'][indexMenu].pic_scr;
        let foodContent = foodMenus[menusCard]['menus'][indexMenu].foodContent;
        let price = foodMenus[menusCard]['menus'][indexMenu].price;
        price = price.toFixed(2);
        let menuName = foodMenus[menusCard].category;
        console.log(picSrc);
        
        const menuCardRef = document.getElementById(`menus_${menuName}`);
        menuCardRef.innerHTML += renderMenuCard(foodName, foodContent, price, menusCard, indexMenu, picSrc);
    }
}

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
        console.log("Bereits vorhanden wird hinzugrfügt");
        console.log(indexBusket);
        console.log(foodName);
        changePriceContent(foodName, indexBusket);

    };
    calculateTotalDishesSum()
}

function changePriceContent(foodName, indexBusket) {
    const priceCardRef = document.getElementById(`total_${foodName}_price`);
    const mengeBasketHeaderCradRef = document.getElementById(foodName);
    const mengeBasketControllRef = document.getElementById(`${foodName}_controll`);
    let totalPrice = basket[indexBusket].price * basket[indexBusket].menge;

    console.log(totalPrice.toFixed(2));
    mengeBasketControllRef.innerHTML = `${basket[indexBusket].menge}`;
    mengeBasketHeaderCradRef.innerHTML = `${basket[indexBusket].menge}`;
    priceCardRef.innerHTML = `${totalPrice.toFixed(2)} €`;
}

function setDishCard(buyFood, foodName, price) {
    const renderCardRef = document.getElementById('order_basket_overview');
    renderCardRef.innerHTML += renderDishCard(buyFood, foodName, price);
}

function removeToBasket(menusCard, indexMenu) {
    const foodName = foodMenus[menusCard]['menus'][indexMenu].menu;
    const price = foodMenus[menusCard]['menus'][indexMenu].price.toFixed(2);
    let buyFood = foodMenus[menusCard]['menus'][indexMenu]['menge'];

    if (foodMenus[menusCard]['menus'][indexMenu]['menge'] <= 0) {
        foodMenus[menusCard]['menus'][indexMenu]['menge'] = foodMenus[menusCard]['menus'][indexMenu]['menge'] - 1;
        console.log("noch nicht bestellt wird hinzugefügt");
        console.log(foodMenus[menusCard]['menus'][indexMenu]['menge'])

    } else {
        console.log("Bereits vorhanden wird hinzugrfügt");
        foodMenus[menusCard]['menus'][indexMenu]['menge'] = foodMenus[menusCard]['menus'][indexMenu]['menge'] - 1;
        console.log(foodMenus[menusCard]['menus'][indexMenu]['menge']);
    };

    console.log("im Warenkorb" + buyFood);



}


function removeDish() {

    const renderCardRef = document.getElementById('order_basket_overview');
    let indexBusket = basket.findIndex(basket => basket.menu == foodName);

    for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
        let buyFood = basket[indexBasket].menge;
        let foodName = basket[indexBasket].menu;
        let price = basket[indexBasket].price;
        renderCardRef.innerHTML += renderDishCard(buyFood, foodName, price);
    }
}

function calculateTotalDishesSum() {
    let totalSum = 0;
    for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
        totalSum = totalSum + (basket[indexBasket].price * basket[indexBasket].menge);
        console.log(totalSum);
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
        addTotalSumDeliver(totalSum)
    }else{


    }
}

function addTotalSumDeliver(totalSum){
    const endFieldRef = document.getElementById('total_order');
    endFieldRef.innerHTML = `${totalSum.toFixed(2)} €`;

}


