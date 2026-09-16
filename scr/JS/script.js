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
        let foodContent = foodMenus[menusCard]['menus'][indexMenu].foodContent;
        let price = foodMenus[menusCard]['menus'][indexMenu].price;
        price = price.toFixed(2);
        let menuName = foodMenus[menusCard].category;
        const menuCardRef = document.getElementById(`menus_${menuName}`);
        menuCardRef.innerHTML += renderMenuCard(foodName, foodContent, price, menusCard, indexMenu);
    }
}

function addToBasket(menusCard, indexMenu) {
    const foodName = foodMenus[menusCard]['menus'][indexMenu].menu;
    const price = foodMenus[menusCard]['menus'][indexMenu].price.toFixed(2);
    let buyFood = foodMenus[menusCard]['menus'][indexMenu]['menge'];

if (foodMenus[menusCard]['menus'][indexMenu]['menge'] <= 0) {
    foodMenus[menusCard]['menus'][indexMenu]['menge'] = foodMenus[menusCard]['menus'][indexMenu]['menge'] + 1;
    console.log("noch nicht bestellt wird hinzugefügt");
    console.log(foodMenus[menusCard]['menus'][indexMenu]['menge'])

} else{
    console.log("Bereits vorhanden wird hinzugrfügt");
   foodMenus[menusCard]['menus'][indexMenu]['menge'] = foodMenus[menusCard]['menus'][indexMenu]['menge'] + 1;
    console.log(foodMenus[menusCard]['menus'][indexMenu]['menge']);
};

console.log("im Warenkorb" + buyFood);



}


function removeToBasket(menusCard, indexMenu) {
    const foodName = foodMenus[menusCard]['menus'][indexMenu].menu;
    const price = foodMenus[menusCard]['menus'][indexMenu].price.toFixed(2);
    let buyFood = foodMenus[menusCard]['menus'][indexMenu]['menge'];

if (foodMenus[menusCard]['menus'][indexMenu]['menge'] <= 0) {
    foodMenus[menusCard]['menus'][indexMenu]['menge'] = foodMenus[menusCard]['menus'][indexMenu]['menge'] - 1;
    console.log("noch nicht bestellt wird hinzugefügt");
    console.log(foodMenus[menusCard]['menus'][indexMenu]['menge'])

} else{
    console.log("Bereits vorhanden wird hinzugrfügt");
   foodMenus[menusCard]['menus'][indexMenu]['menge'] = foodMenus[menusCard]['menus'][indexMenu]['menge'] - 1;
    console.log(foodMenus[menusCard]['menus'][indexMenu]['menge']);
};

console.log("im Warenkorb" + buyFood);



}


