const search = document.getElementById("underground-search")
const searchContainer = document.getElementById('search-container')

search.addEventListener("input", e => {
    e.target.preventDefault;

    const existingDropdown = document.querySelector('.dropdown-menu');
    if (existingDropdown) {
        existingDropdown.remove();
        search.classList.remove("mb-3")
    }

    const dropdown = document.createElement("div")
    dropdown.classList = "dropdown"


    const inputValue = e.target.value.trim().toLowerCase();
    if (inputValue === '') return; // Не показываем результаты, если поле пустое

    const metroArr = [
        { 'Охотный ряд': 'attractionsOXOTNIRAD.html' },
        { 'ЦСКА': 'attractionsCSK.html' },
        { 'Фрунзенская': 'attractionsFrunsenskaya.html' },
        { 'Текстильщики': 'texstilshiki.html' },
        { 'Пролетарская': 'proletarskai.html' }
    ];

    // Фильтруем станции по введенному тексту
    const filteredStations = metroArr.filter(stationObj => {
        const stationName = Object.keys(stationObj)[0];
        return stationName.toLowerCase().includes(inputValue);
    });

    // Создаем выпадающий список (ul)
    const metroList = document.createElement("ul");
    metroList.classList.add("dropdown-metro-menu", "dropdown-menu");

    search.classList.add("mb-3")
    // Добавляем отфильтрованные станции в список (li > a)
    filteredStations.forEach(stationObj => {
        const stationName = Object.keys(stationObj)[0];
        const stationLink = stationObj[stationName];

        const metroLi = document.createElement("li");

        const metroLink = document.createElement("a");
        metroLink.textContent = stationName;
        metroLink.href = stationLink;
        metroLink.classList.add("dropdown-item");

    
        metroLi.appendChild(metroLink);
        metroList.appendChild(metroLi);
    });

    if (filteredStations.length === 0) {
            metroList.insertAdjacentHTML("beforeend", `
            <li><a href="#" class="dropdown-item disabled">Станции метро не существует или она находится в разработке</a></li>
            `);
        } // Не показываем список, если нет совпадений


    // Добавляем список в контейнер
    searchContainer.appendChild(metroList);
});