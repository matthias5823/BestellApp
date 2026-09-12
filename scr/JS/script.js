function creatingButtonStructureMenu() {

    for (let indexFoodMenus = 0; indexFoodMenus < foodMenus.length; indexFoodMenus++) {
        console.log(foodMenus[indexFoodMenus]);


    }

}


for (let indexFoodMenus = 0; indexFoodMenus < foodMenus.length; indexFoodMenus++) {
    let menu = foodMenus[indexFoodMenus]['category'];
    const navButtonRef = document.getElementById('structure_menu');
    navButtonRef.innerHTML += `
    <a href="">${menu}</a>
    `;

}