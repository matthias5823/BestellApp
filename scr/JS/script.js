function creatingButtonStructureMenu() {

    for (let indexFoodMenus = 0; indexFoodMenus < foodMenus.length; indexFoodMenus++) {
        console.log(foodMenus[indexFoodMenus]);


    }

}


for (let indexFoodMenus = 0; indexFoodMenus < foodMenus.length; indexFoodMenus++) {
    const menuCardRef = document.getElementById('food_menus');
    let menu = foodMenus[indexFoodMenus]['category'];
    menuCardRef.innerHTML += `
    <section id="menus_${menu}" class="" alt="Übersicht an Gerichten von ${menu}">
        <header id="" class="menus-header">
            <h3>${menu}</h3>
        </header>
    

</section>
    `;

}

for (let indexMenu = 0; indexMenu < array.length; Menu++) {
    
    
}