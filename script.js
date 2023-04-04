// Получаем ссылку на тело таблицы
const tableBody = document.querySelector('.table tbody');

// Получаем ссылки на элементы страницы
const searchInput = document.querySelector('.search-input');

// Получаем данные с сервера и заполняем таблицу
fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
        // Сохраняем данные в переменной
        let posts = data;

        // Определяем переменные для сортировки таблицы
        let sortColumn = '';
        let sortOrder = '';

        // Функция для отрисовки таблицы
        function renderTable() {
            // Очищаем тело таблицы
            tableBody.innerHTML = '';

            // Отрисовываем строки таблицы
            posts.forEach((post) => {
                // Фильтруем строки таблицы по значению поискового запроса
                if (
                    searchInput.value.length < 3 ||
                    post.title.includes(searchInput.value)
                ) {
                    const row = tableBody.insertRow();
                    row.insertCell().textContent = post.userId;
                    row.insertCell().textContent = post.id;
                    row.insertCell().textContent = post.title;
                    row.insertCell().textContent = post.body;
                }
            });
        }

        // Функция для сортировки таблицы
        function sortTable(column) {
            // Если сортируем ту же колонку, меняем порядок сортировки
            if (column === sortColumn) {
                sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = column;
                sortOrder = 'asc';
            }

            // Сортируем данные и перерисовываем таблицу
            posts.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a[column] > b[column] ? 1 : -1;
                } else {
                    return a[column] < b[column] ? 1 : -1;
                }
            });

            renderTable();
        }

        // Обрабатываем клик по заголовку колонки
        document.querySelectorAll('.table th').forEach((headerCell) => {
            headerCell.addEventListener('click', () => {
                const column = headerCell.cellIndex;
                sortTable(column);
            });
        });

        // Обрабатываем ввод в поисковую строку
        searchInput.addEventListener('input', () => {
            renderTable();
        });

        // Отрисовываем таблицу в начальном состоянии
        renderTable();
    })
    .catch((error) => console.error(error));
