import { initColResizable, removeColResizable } from './colresizable.js';
import { createDeleteButton } from './delete-button.js';

const POPOVER_TITLE = `<span class="table__filter-text table__filter-text--main">Отображение столбцов</span>
<svg class="table__filter-breadcrumbs table__filter-breadcrumbs--main"><use href="img/icons/sprite.svg#breadcrumbs"/></svg>`;

const POPOVER_TEXT = `<span class="table__filter-text">Отображение столбцов</span>
<svg class="table__filter-breadcrumbs"><use href="img/icons/sprite.svg#breadcrumbs"/></svg>`;

const MULTIPOINT_BUTTON = `<div class="table__container-cell table__container-cell--multipoint">
<button class="table__multipoint-button" type="button">
<svg class="table__multipoint"><use href="img/icons/sprite.svg#multipoint"></use></svg>
<span class="visually-hidden">Удалить строку</span></button></div>`;

// const ORDER = (index) => `<div class="table__container-cell">
// <button class="table__drag" type="button">
// <svg class="table__hamburger">
// <use href="img/icons/sprite.svg#hamburger"></use></svg>
// <span class="table__body-order">${index}</span></button></div>`;

const initDatatable = (table) => {
  const dataTable = table.DataTable({
    // resizable: true,
    paging: false,
    searching: false,
    ordering: true,
    info: false,
    autoWidth: true, // Не работает с ColResizable
    colReorder: {
      fixedColumnsLeft: 1,
    },
    rowReorder: {
      selector: '.table__drag-button',
      dataSrc: 0,
    },
    columnDefs: [
      {
        targets: 0,
        orderable: false
      },
      {
        targets: 1,
        render: () => MULTIPOINT_BUTTON,
        orderable: false,
      },
      { targets: '_all', orderable: false },
    ],
    dom: 'Bfrtip',
    buttons: [{
      extend: 'collection',
      text: '<svg class="table__gear"><use href="img/icons/sprite.svg#gear"/></svg>',
      background: false,
      align: 'button-right',
      className: 'table__filter',
      buttons: [
        {
          popoverTitle: POPOVER_TITLE,
          text: POPOVER_TEXT,
          extend: 'colvis',
          background: false,
          align: 'button-right',
        },
      ],
    }],
    initComplete: () => initColResizable(table),
  });

  dataTable.on('column-reorder', () => {
    setTimeout(() => {
      removeColResizable(table);
      initColResizable(table);
    });
  });

  dataTable.on('column-visibility', () => {
    removeColResizable(table);
    setTimeout(() => initColResizable(table));
  });

  dataTable.on('click', '.table__multipoint-button', (evt) => {
    evt.preventDefault();
    createDeleteButton(evt, dataTable);
  });
};

export { initDatatable };
