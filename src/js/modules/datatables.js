/* eslint-disable no-use-before-define */
import { initColResizable, removeColResizable } from './colresizable.js';
import { createDeleteButton } from './delete-row.js';
import { onNewRowButtonClick } from './add-row.js';
import { debounce } from './utils.js';
import { goods } from './goods.js';
import { initCustomSelect } from './custom-select.js';
import { html } from './html-elements.js';

const { $ } = window;

const initDatatable = (table) => {
  const dataTable = table.DataTable({
    data: goods,
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
        render: (data) => html.order(data),
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
        render: () => html.multipointButton,
      },
      {
        targets: 2,
        data: 'unit',
        orderable: false,
        title: 'Наименование единицы',
        name: 'unit',
        createdCell: (td) => {
          const cell = $(td);

          cell.attr('data-label', 'Наименование единицы');
          cell.addClass('data-table__body-cell data-table__body-cell--select');
        },
        render: (data) => {
          const select = $(html.select);
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
        render: (data) => html.input(data, 'number', 'price', 'Цена'),
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
        render: (data) => html.input(data, 'number', 'quantity', 'Кол-во'),
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
        render: (data) => html.input(data, 'number', 'delivery', 'Цена доставки, руб'),
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
        render: (data) => html.input(data, 'number', 'load', 'Max грузоподъемность, кг'),
      },
      {
        targets: 7,
        data: 'product',
        orderable: false,
        title: 'Название товара',
        name: 'product',
        createdCell: (td) => {
          const cell = $(td);

          cell.attr('data-label', 'Название товара');
          cell.addClass('data-table__body-cell');
        },
        render: (data) => html.input(data, 'text', 'product', 'Название товара'),
      },
      {
        targets: 8,
        data: 'total',
        orderable: false,
        title: 'Итого',
        name: 'total',
        createdCell: (td) => {
          const cell = $(td);

          cell.attr('data-label', 'Итого');
          cell.addClass('data-table__body-cell');
        },
        render: (data) => html.input(data, 'number', 'total', 'Итого'),
      },
    ],
    createdRow: (row) => $(row).addClass('data-table__body-row'),
    dom: 'Bfrtip',
    buttons: [{
      extend: 'collection',
      text: html.filterGear,
      background: false,
      align: 'button-right',
      className: 'data-table__filter-button filter-button',
      buttons: [
        {
          popoverTitle: html.popoverTitle,
          text: html.popoverText,
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

  // Сброс ширины таблицы и ColResizable
  const resizeTable = debounce(() => {
    table.css('width', '100%');
    dataTable.columns.adjust().draw();

    removeColResizable(table);
    initColResizable(table);
  }, 150);

  dataTable.on('column-reorder', () => {
    setTimeout(() => {
      removeColResizable(table);
      initColResizable(table);
      initCustomSelect();
    });
  });

  dataTable.on('column-visibility', () => {
    table.css('width', '100%');
    dataTable.columns.adjust().draw();

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

  $(window).on('resize', resizeTable);

  // Отслеживание изменений ячеек таблицы
  table.on('change', 'select, input', (evt) => {
    const { target } = evt;
    const { name, value } = target;
    const tr = target.closest('tr');
    const index = dataTable.row(tr).index();

    // Функция для отправки данных на сервер
    $.post('example.php', { [name]: value, index })
      .done(() => { })
      .fail(() => { });
  });
};

export { initDatatable };
