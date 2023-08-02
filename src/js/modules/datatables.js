/* eslint-disable no-unused-vars */
import { initColResizable, removeColResizable } from './colresizable.js';
import { createDeleteButton } from './delete-row.js';
import { onNewRowButtonClick } from './add-row.js';
import { debounce } from './utils.js';
import { dataArray } from './dataArray.js';
import { initCustomSelect } from './custom-select.js';

const { $ } = window;

const POPOVER_TITLE = `<span class="filter-button__text filter-button__text--main">Отображение столбцов</span>
<svg class="filter-button__breadcrumbs filter-button__breadcrumbs--main"><use href="img/icons/sprite.svg#breadcrumbs"/></svg>`;

const POPOVER_TEXT = `<span class="filter-button__text">Отображение столбцов</span>
<svg class="filter-button__breadcrumbs"><use href="img/icons/sprite.svg#breadcrumbs"/></svg>`;

const FILTER_GEAR = '<svg class="filter-button__gear"><use href="img/icons/sprite.svg#gear"/></svg>';

const MULTIPOINT_BUTTON = `<button class="data-table__multipoint-button multipoint-button" type="button">
<svg class="multipoint-button__multipoint"><use href="img/icons/sprite.svg#multipoint"></use></svg>
<span class="visually-hidden">Удалить строку</span></button>`;

const ORDER = (index) => `<button class="data-table__drag-button drag-button" type="button">
<svg class="drag-button__handler"><use href="img/icons/sprite.svg#hamburger"></use></svg>
<span class="drag-button__order">${index}</span></button>`;

const INPUT = (value, type, name, placeholder) => `<input class="data-table__input" type="${type}"
name="${name}" value="${value}" placeholder="${placeholder}">`;

const SELECT = `<div class="custom-select"><select class="custom-select__select" name="unit-name">
<option value="Мраморный щебень фр. 2-5 мм, 25кг">Мраморный щебень фр. 2-5 мм, 25кг</option>
<option value="Мраморный щебень фр. 2-5 мм, 25кг (белый)">Мраморный щебень фр. 2-5 мм, 25кг (белый)</option>
<option value="Мраморный щебень фр. 2-5 мм, 25кг (вайт)">Мраморный щебень фр. 2-5 мм, 25кг (вайт)</option>
<option value="Мраморный щебень фр. 2-5 мм, 25кг, возврат">Мраморный щебень фр. 2-5 мм, 25кг, возврат</option>
<option value="Мраморный щебень фр. 2-5 мм, 1т">Мраморный щебень фр. 2-5 мм, 1т</option>
</select></div>`;

const initDatatable = (table) => {
  const dataTable = table.DataTable({
    data: dataArray,
    paging: false,
    searching: false,
    ordering: true,
    info: false,
    autoWidth: true,
    colReorder: true,
    rowReorder: {
      selector: '.data-table__drag-button',
      dataSrc: 'order',
    },
    columnDefs: [
      {
        targets: 0,
        data: 'order',
        title: 'Номер',
        name: 'order',
        orderable: false,
        width: '3%',
        createdCell: (td) => $(td).addClass('data-table__body-cell data-table__body-cell--order'),
        render: (data) => ORDER(data),
      },
      {
        targets: 1,
        data: null,
        orderable: false,
        title: 'Действие',
        name: 'action',
        width: '4.5%',
        createdCell: (td) => {
          $(td).attr('data-label', 'Действие');
          $(td).addClass('data-table__body-cell data-table__body-cell--action');
        },
        render: () => MULTIPOINT_BUTTON,
      },
      {
        targets: 2,
        data: 'unitName',
        orderable: false,
        title: 'Наименование единицы',
        name: 'unitName',
        createdCell: (td, cellData, rowData, row, col) => {
          const cell = $(td);

          cell.attr('data-label', 'Наименование единицы');
          cell.addClass('data-table__body-cell data-table__body-cell--select');
        },
        render: (data, type, row, meta) => {
          const select = $(SELECT);
          select.find(`option[value="${data}"]`).attr('selected', 'selected');

          return select[0].outerHTML;
        },
      },
      {
        targets: 3,
        data: 'price',
        orderable: false,
        title: 'Цена',
        name: 'price',
        createdCell: (td) => {
          const cell = $(td);

          cell.attr('data-label', 'Цена');
          cell.addClass('data-table__body-cell');
        },
        render: (data) => INPUT(data, 'number', 'price', 'Цена'),
      },
      {
        targets: 4,
        data: 'quantity',
        orderable: false,
        title: 'Кол-во',
        name: 'quantity',
        createdCell: (td) => {
          const cell = $(td);

          cell.attr('data-label', 'Кол-во');
          cell.addClass('data-table__body-cell');
        },
        render: (data) => INPUT(data, 'number', 'quantity', 'Кол-во'),
      },
      {
        targets: 5,
        data: 'delivery',
        orderable: false,
        title: 'Цена доставки, руб',
        name: 'delivery',
        createdCell: (td) => {
          const cell = $(td);

          cell.attr('data-label', 'Цена доставки, руб');
          cell.addClass('data-table__body-cell');
        },
        render: (data) => INPUT(data, 'number', 'delivery', 'Цена доставки, руб'),
      },
      {
        targets: 6,
        data: 'load',
        orderable: false,
        title: 'Max грузоподъемность, кг',
        name: 'load',
        createdCell: (td) => {
          const cell = $(td);

          cell.attr('data-label', 'Max грузоподъемность, кг');
          cell.addClass('data-table__body-cell');
        },
        render: (data) => INPUT(data, 'number', 'load', 'Max грузоподъемность, кг'),
      },
      {
        targets: 7,
        data: 'load',
        orderable: false,
        title: 'Название товара',
        name: 'load',
        createdCell: (td) => {
          const cell = $(td);

          cell.attr('data-label', 'Название товара');
          cell.addClass('data-table__body-cell');
        },
        render: (data) => INPUT(data, 'number', 'load', 'Название товара'),
      },
      {
        targets: 8,
        data: 'total',
        orderable: false,
        title: 'Итого',
        name: 'load',
        createdCell: (td) => {
          const cell = $(td);

          cell.attr('data-label', 'Итого');
          cell.addClass('data-table__body-cell');
        },
        render: (data) => INPUT(data, 'number', 'load', 'Итого'),
      },
    ],
    createdRow: (row, data, dataIndex) => $(row).addClass('data-table__body-row'),
    dom: 'Bfrtip',
    buttons: [{
      extend: 'collection',
      text: FILTER_GEAR,
      background: false,
      align: 'button-right',
      className: 'data-table__filter-button filter-button',
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
    initComplete: () => {
      $('th', table).addClass('data-table__head-cell');
      initColResizable(table);
      initCustomSelect();
    },
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

  // Отображение кнопки удалить
  dataTable.on('click', '.data-table__multipoint-button', (evt) => {
    evt.preventDefault();
    createDeleteButton(evt, dataTable);
  });

  // Создание новой строки в таблице
  $('.new-row-button').on('click', () => onNewRowButtonClick(dataTable));

  // Изменение ширины таблицы в соответствии с viewport
  const onWindowResize = debounce(() => {
    table.css('width', '100%');
    dataTable.columns.adjust().draw();

    removeColResizable(table);
    initColResizable(table);
  }, 150);

  window.addEventListener('resize', onWindowResize);
};

export { initDatatable };
