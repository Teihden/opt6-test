const popoverTitle = `<span class="filter-button__text filter-button__text--main">Отображение столбцов</span>
<svg class="filter-button__breadcrumbs filter-button__breadcrumbs--main"><use href="img/icons/sprite.svg#breadcrumbs"/></svg>`;

const popoverText = `<span class="filter-button__text">Отображение столбцов</span>
<svg class="filter-button__breadcrumbs"><use href="img/icons/sprite.svg#breadcrumbs"/></svg>`;

const filterGear = '<svg class="filter-button__gear"><use href="img/icons/sprite.svg#gear"/></svg>';

const multipointButton = `<button class="data-table__multipoint-button multipoint-button" type="button">
<svg class="multipoint-button__multipoint"><use href="img/icons/sprite.svg#multipoint"></use></svg>
<span class="visually-hidden">Удалить строку</span></button>`;

const order = (index) => `<button class="data-table__drag-button drag-button" type="button">
<svg class="drag-button__handler"><use href="img/icons/sprite.svg#hamburger"></use></svg>
<span class="drag-button__order">${index}</span></button>`;

const input = (value, type, name, placeholder) => `<input class="data-table__input" type="${type}"
name="${name}" value="${value}" placeholder="${placeholder}" aria-label="${placeholder}">`;

const select = `<div class="custom-select"><select class="custom-select__select" name="unit">
<option value="Мраморный щебень фр. 2-5 мм, 25кг">Мраморный щебень фр. 2-5 мм, 25кг</option>
<option value="Мраморный щебень фр. 2-5 мм, 25кг (белый)">Мраморный щебень фр. 2-5 мм, 25кг (белый)</option>
<option value="Мраморный щебень фр. 2-5 мм, 25кг (вайт)">Мраморный щебень фр. 2-5 мм, 25кг (вайт)</option>
<option value="Мраморный щебень фр. 2-5 мм, 25кг, возврат">Мраморный щебень фр. 2-5 мм, 25кг, возврат</option>
<option value="Мраморный щебень фр. 2-5 мм, 1т">Мраморный щебень фр. 2-5 мм, 1т</option>
</select></div>`;

const deleteButton = `<button class="data-table__delete-button delete-button" type="button">
<span class="delete-button__text">Удалить</span></button>`;

const html = {
  popoverTitle,
  popoverText,
  filterGear,
  multipointButton,
  order,
  input,
  select,
  deleteButton,
};

export { html };
