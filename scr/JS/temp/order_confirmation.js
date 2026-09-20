// Erklärung: Liefert nur den Inhalt des bereits vorhandenen Dialogs. method="dialog" lässt den Formularbutton den Dialog ohne Seitenwechsel schließen.
function renderConfirmation() {
    return `
        

            <form method="dialog">
                <button type="submit"
                        class="confirmation-close"
                        aria-label="Bestätigung schließen"
                        autofocus>
                    ×
                </button>
            </form>

            <img class="confirmation-logo"
                 src="./scr/assets/imgs/BayernBisw.webp"
                 alt="">

            <h2 id="confirmation_title">
                Bestellung bestätigt!
            </h2>

            <p id="confirmation_description">
                Dein Essen macht sich auf den Weg.
            </p>
        
    `;
}