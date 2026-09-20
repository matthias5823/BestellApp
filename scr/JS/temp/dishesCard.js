// Erklärung: Die Ausdrücke mit buyFood >= 2 liefern bei Menge 1 das Attribut hidden; ab Menge 2 bleiben Minusbutton und Einzelpreis sichtbar.
// Erklärung: Ausdrücke innerhalb von ${...} werden beim Aufruf der Vorlage ausgewertet. Eine Mengenänderung erfordert deshalb erneutes Rendern.
// Erklärung: Liefert eine Warenkorbposition: buyFood ist die Menge, price der Einzelpreis und totalPrice der Positionspreis. Die Preise werden als Anzeigetexte übergeben.
function renderDishCard(buyFood, foodName, price, totalPrice) {
    return `
        <section class="basket-card">
            <header class="basket-card-header">
                <h4><span id="${foodName}">${buyFood}</span><span> x </span>${foodName}</h4>
            </header>
            <p id="${foodName}_price" class="basket-menu-price" ${buyFood >= 2 ? "" : "hidden"}>${price}</p>        
            <div class="basket-control-section">
                <div class="basket-control">
                    <button id="button_delete_dish${foodName}" class="button-delete-dish" onclick="removeDish('${foodName}')">
                        <svg class="button-to-delete" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14ZM10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14Z"/>
                        </svg>
                    </button>
                    <button id="button_sub_dish${foodName}" class="button-sub-dish" ${buyFood >= 2 ? "" : "hidden"} onclick="subFromBasket('${foodName}')">
                        <svg class="button-minus" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12L18 12" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <p id="${foodName}_controll" class="basket-menu-amount">${buyFood}</p>
                    <button id="button_add_dish${foodName}" class="button-add-dish" onclick="addedToBasket('${foodName}')">
                        <svg class="button-plus" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4478 7.27192H7.0798V12.7199L4.5358 12.6239V7.27192H0.191797L-0.000203103 5.20792H4.5358V-8.29697e-05L7.0798 0.0719175V5.20792H11.2078L11.4478 7.27192Z"/>
                        </svg>
                    </button>                
                </div>
                
                <p id="total_${foodName}_price" class="total-price">${totalPrice}</p>
            </div>
        </section>    
    `
}


