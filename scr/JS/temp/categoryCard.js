function renderCategoryCard(menuName) {
    return `
    <section id="menus_card${menuName}" class="" alt="Übersicht an Gerichten von ${menuName}">
        <header id="" class="menus-header">
            <h3>${menuName}</h3>
        </header>
        <section id="menus_${menuName}" class="meal-card">
        </section>
    </section>
    `;
}