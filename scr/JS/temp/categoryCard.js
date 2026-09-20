// Erklärung: Liefert Überschrift und leeren Gerichtebereich einer Kategorie. Die erzeugte ID menus_Kategoriename wird später von setMenuCard gesucht.
function renderCategoryCard(menuName) {
    return `
    <section id="menus_card${menuName}" class="section-menu" alt="Übersicht an Gerichten von ${menuName}">
        <header id="" class="menus-header">
            <h3>${menuName}</h3>
        </header>
        <section id="menus_${menuName}" class="meal-card">
        </section>
    </section>
    `;
}