function init() {
    creatingStructureMenu();
    creatingMenuCard();
    updateBasketCount();
    updateEvaluation();
}

// Zeigt die aktuelle Anzahl an Bewertungen in Klammern an.
function updateEvaluation() {
    const evaluationRef = document.getElementById("evaluation_count");

    evaluationRef.textContent = `(${evaluation})`;
    evaluationRef.setAttribute(
        "aria-label",
        `${evaluation} Bewertungen`
    );
}

// Erhöht die Anzahl und markiert den Stern nach einem Klick.
function addEvaluation() {
    const starRef = document.getElementById("button_star");
    const buttonRef = document.querySelector(".rating-button");

    // Fügt die Klasse hinzu oder entfernt sie.
    // Rückgabewert: true = hinzugefügt, false = entfernt.
    const isRated = starRef.classList.toggle("is-rated");

    if (isRated) {
        evaluation += 1;
    } else {
        evaluation -= 1;
    }

    updateEvaluation();

    buttonRef.setAttribute("aria-pressed", String(isRated));
    buttonRef.setAttribute(
        "aria-label",
        isRated ? "Bewertung zurücknehmen" : "Eine Bewertung hinzufügen"
    );
}

// Erstellt den Container für die Kategorie der Gerichte
// Durchläuft die Kategorien aus foodMenus und fügt für jede einen Bereich in menu_categories ein.
function creatingStructureMenu() {
    for (let indexFoodMenus = 0; indexFoodMenus < foodMenus.length; indexFoodMenus++) {
        const menuCardRef = document.getElementById('menu_categories');
        let menuName = foodMenus[indexFoodMenus]['category'];
        menuCardRef.innerHTML += renderCategoryCard(menuName);
    };
}

// Ruft für jede Kategorie setMenuCard mit ihrer Position im foodMenus-Array auf.
function creatingMenuCard() {
    for (let indexFoodMenusMenus = 0; indexFoodMenusMenus < foodMenus.length; indexFoodMenusMenus++) {
        let menusCard = foodMenus[indexFoodMenusMenus]['menus'];
        setMenuCard(indexFoodMenusMenus);
    }
}

// Macht aus einer Zahl einen Anzeigetext, zum Beispiel aus 9.5 den Text 9,50 €. Das Ergebnis ist keine Zahl mehr.
function formatPrice(price) {
    return price.toFixed(2).replace(".", ",") + " €";
}

// Erstellt die Menukarten der jeweiligen Gerichte
// Erstellt alle Gerichtkarten einer Kategorie. menusCard ist hier der Kategorieindex, indexMenu der Gerichtindex.
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
// Fügt ein Gericht hinzu oder erhöht seine Menge. Anschließend werden Karten, Summen und Mengenanzeigen aktualisiert.
function addToBasket(menusCard, indexMenu) {
    const dish = foodMenus[menusCard].menus[indexMenu];
    const foodName = dish.menu;
    const price = dish.price;

    // findIndex liefert die Position des passenden Eintrags oder -1, wenn das Gericht noch nicht im Warenkorb liegt.
    let indexBusket = basket.findIndex(basket => basket.menu === foodName);

    setBasket();

    if (indexBusket === -1) {
        basket.push({
            menge: 1,
            menu: foodName,
            price: price
        });
        // push hat den Eintrag am Ende ergänzt. Arraypositionen beginnen bei 0, deshalb ist der neue Index Länge minus 1.
        indexBusket = basket.length - 1;
    } else {
        basket[indexBusket].menge += 1;
    };

    updateBasketCard();
    calculateTotalDishesSum();
    changePriceContent(foodName, indexBusket);
}

// Fügt das Grundgerüst des Warenkorbs einmalig ein. visibleBasket merkt sich, ob dieses HTML bereits existiert.
function setBasket() {
    const menuCardRef = document.getElementById('basket_container');
    // Das Ausrufezeichen bedeutet „nicht“: Nur solange noch kein Warenkorb-HTML erzeugt wurde, wird es eingefügt.
    if (!visibleBasket) {
        visibleBasket = true;
        menuCardRef.innerHTML += renderBasket();        
    }    
}

// Bereitet den Warenkorbinhalt vor und öffnet über CSS-Klassen das mobile Overlay, auch bei einem leeren Warenkorb.
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

    //  Diese Klasse aktiviert die in CSS definierte Scrollsperre für die Seite hinter dem mobilen Warenkorb.
    document.body.classList.add("basket-is-open");

    document.querySelector(".basket-open-button")
        //  aria-expanded teilt Hilfsmitteln wie Screenreadern mit, dass der Bereich geöffnet ist.
        .setAttribute("aria-expanded", "true");

    document.querySelector(".basket-close-button").focus();
}

// Entfernt die Öffnungsklassen des mobilen Warenkorbs und gibt bei mobiler Breite den Tastaturfokus an den Öffnen-Button zurück.
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

//Schließt nur bei einem direkten Klick auf den Hintergrund; Klicks auf Karten oder deren Buttons zählen nicht dazu.
function closeBasketOnBackground(event) {
    // target ist das angeklickte Element; currentTarget ist der Container mit dem Klickhandler. Gleichheit bedeutet einen direkten Hintergrundklick.
    if (event.target === event.currentTarget) {
        closeBasket();
    }
}

// Erstellt die Menukarte im Basket
// Hängt eine einzelne Warenkorbkarte an und berechnet dafür Menge mal Einzelpreis. addToBasket nutzt derzeit stattdessen updateBasketCard.
function setDishCard(buyFood, foodName, price) {
    const renderCardRef = document.getElementById('order_basket_overview');
    let totalPrice = buyFood * price;
    renderCardRef.innerHTML += renderDishCard(buyFood, foodName, price, `${totalPrice.toFixed(2)} €`);
}

// Ändert den Preis wenn ein gericht bereits im Basket ist
// Aktualisiert vorhandene HTML-Elemente für Menge, Positionspreis und Speisekartenbutton. Erwartet einen gültigen Warenkorbindex und passende IDs.
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


// Entfernt die gesamte Position mit diesem Gerichtnamen, unabhängig von ihrer Menge, und aktualisiert den Warenkorb.
function removeDish(foodName) {
    let indexBusket = basket.findIndex(basket => basket.menu == foodName);
    if (indexBusket !== -1) {
        // Erklärung: splice entfernt ab der gefundenen Arrayposition genau einen Eintrag und verändert damit basket.
        basket.splice(indexBusket, 1);
    };
    updateBasketCard();
    calculateTotalDishesSum();
}

// Leert die angezeigte Gerichteliste und baut sie aus basket neu auf. Das Datenarray selbst wird dabei nicht geleert.
function updateBasketCard() {
    const renderCardRef = document.getElementById('order_basket_overview');
    //Nur die bisherigen HTML-Karten entfernen, damit beim erneuten Rendern keine doppelten Karten entstehen.
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

// Berechnet Zwischensumme, Liefergebühr und Gesamtpreis neu; aktualisiert außerdem Bestellbutton und Artikelzähler.
function calculateTotalDishesSum() {
    let subtotal = 0;

    for (let i = 0; i < basket.length; i++) {
        subtotal += basket[i].price * basket[i].menge;
    }

    let delivery = 0;

// Liefergebühr nur bei gefülltem Warenkorb bis einschließlich 55 €; über 55 € und bei leerem Warenkorb bleibt sie null.
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

//  Der Vergleich ergibt true oder false: Bei leerem Warenkorb ist der Bestellbutton deaktiviert.
    orderButton.disabled = basket.length === 0;
    updateBasketCount();
}


//  Schreibt eine übergebene Zwischensumme in die Anzeige. Die aktuelle calculateTotalDishesSum erledigt dies bereits selbst.
function addTotalDishesSum(totalSum) {
    const totalFieldRef = document.getElementById('cost_of_dishes');
    totalFieldRef.innerHTML = `${totalSum.toFixed(2)} €`;
}

// Schreibt einen bereits berechneten Gesamtpreis in total_order; wird von der älteren calculateTotalSum verwendet.
function addTotalSumDeliver(totalSum) {
    const endFieldRef = document.getElementById('total_order');
    endFieldRef.innerHTML = `${totalSum.toFixed(2)} €`;
}

// Setzt ausschließlich den angezeigten Lieferpreis auf 0,00 €. Wird von der älteren calculateTotalSum verwendet.
function setDeliverPrice() {
    const deliverPriceRef = document.getElementById('discount_money');
    deliverPriceRef.innerHTML = "0.00 €"
}

// Verringert die Menge um eins. Erreicht sie null, wird die gesamte Position entfernt; sonst werden Karten und Summen erneuert.
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

// Erhöht über den Plusbutton die Menge einer bereits vorhandenen Position und aktualisiert anschließend die Anzeige.
function addedToBasket(foodName) {
    let indexBusket = basket.findIndex(basket => basket.menu == foodName);
    basket[indexBusket]['menge'] = basket[indexBusket]['menge'] + 1;
    changePriceContent(foodName, indexBusket);
    calculateTotalDishesSum();
    updateBasketCard();
}

// Addiert alle Stückzahlen, nicht nur die verschiedenen Gerichte: Zwei Suppen und ein Salat ergeben drei Artikel.
function updateBasketCount() {
    let articleCount = 0;

    for (let i = 0; i < basket.length; i++) {
        articleCount += basket[i].menge;
    }

    const countRef = document.getElementById("basket_count");

    countRef.textContent = articleCount;
    // Erklärung: Den Zähler bei null Artikeln ausblenden; bei einer höheren Anzahl wieder anzeigen.
    countRef.hidden = articleCount === 0;

    document.querySelector(".basket-open-button")
        .setAttribute(
            "aria-label",
            `Warenkorb öffnen, ${articleCount} Artikel`
        );
}

//Öffnet das vorhandene dialog-Element modal und setzt danach den Bestätigungstext ein. Es wird keine Bestellung an einen Server gesendet und basket bleibt erhalten.
function openDialog() {
    const dialog = document.getElementById('order_confirmation');
    dialog.showModal();
    dialog.innerHTML = renderConfirmation();
}

//Schließt den vorhandenen Dialog mit close(); sein HTML-Inhalt bleibt dabei im Dokument.
function closeDialog() {
    const dialog = document.getElementById('order_confirmation');
    dialog.close();
}

//Registriert einmalig eine Reaktion auf Tastendrücke. Escape schließt den mobilen Warenkorb nur, wenn seine Öffnungsklasse gesetzt ist.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" &&
        document.body.classList.contains('basket-is-open')) {
        closeBasket();
    }
});

// Erklärung: Der change-Listener reagiert beim Überqueren der 900-Pixel-Grenze, nicht bei jeder einzelnen Änderung der Fenstergröße.
window.matchMedia("(max-width: 900px)")
    .addEventListener("change", function () {
        closeBasket();
    });