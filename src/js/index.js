/* eslint-disable no-new */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const myTable = $('#table');

const initColResizable = () => {
  myTable.colResizable({
    liveDrag: true,
    gripInnerHtml: '<div class="colresizable-grip"></div>',
    draggingClass: 'colresizable-dragging',
    hoverCursor: 'col-resize',
    dragCursor: 'col-resize',
    mode: 'fit',
  });
};

const removeColResizable = () => {
  myTable.colResizable({
    disable: true,
  });
};

const dataTable = myTable.DataTable({
  resizable: true,
  paging: false,
  searching: false,
  ordering: true,
  info: false,
  autoWidth: false, // Не работает с ColResizable
  colReorder: true,
  rowReorder: {
    dataSrc: 0,
  },
  columnDefs: [
    { className: 'reorder', targets: 0 },
    { orderable: false, targets: '_all' },
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
        popoverTitle: `<span class="table__filter-text table__filter-text--main">Отображение столбцов</span>
                      <svg class="table__filter-breadcrumbs table__filter-breadcrumbs--main"><use href="img/icons/sprite.svg#breadcrumbs"/></svg>`,
        text: `<span class="table__filter-text">Отображение столбцов</span>
              <svg class="table__filter-breadcrumbs"><use href="img/icons/sprite.svg#breadcrumbs"/></svg>`,
        extend: 'colvis',
        background: false,
        align: 'button-right',
      },
    ],
  }],
  initComplete: () => initColResizable(),
});

dataTable.on('column-reorder', () => {
  initColResizable();
  setTimeout(() => removeColResizable);
});

dataTable.on('column-visibility', () => {
  initColResizable();
  setTimeout(() => removeColResizable);
});
