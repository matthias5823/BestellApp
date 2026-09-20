// Erklärung: Liefert das HTML-Grundgerüst für Warenkorb, Summen und Bestellbutton. Die Gerichteliste wird separat gefüllt; diese Funktion fügt selbst nichts in die Seite ein.
function renderBasket() {
    return `
                <article class="basket-overview-card" aria-label="Deine Bestellung">
                <button type="button" class="basket-close-button" onclick="closeBasket()" aria-label="Warenkorb schließen">
                    ×
                </button>
                <h3>Deine Bestellung</h3>
                <section id="order_basket_overview" class="order-basket-overview" aria-label="Gerichte im Warenkorb" aria-live="polite">


                </section>

                <div class="section-sum-of-dishes-card">
                    <p>Summe der Gerichte</p>
                    <p id="cost_of_dishes">0.00<span> €</span></p>
                </div>
                <div class="section-sum-of-dishes-card">
                    <p id="discount_content">Liefergebühr</p>
                    <p id="discount_money">4.95<span> €</span></p>
                </div>
                <hr class="line">
                <div class="section-sum-of-dishes-card">
                    <p id="total_content">Gesamt Preis</p>
                    <p id="total_order" aria-labelledby="total-label total_order">4.95<span> €</span></p>
                </div>

                <button id="butten_to_order" class="butten-to-order" onclick="openDialog()" aria-label="Bestellung jetzt abschicken"></button>
            </article> 
    
    `
    
}