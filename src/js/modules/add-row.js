const { $ } = window;

const onNewRowButtonClick = (dataTable) => {
  const newOrder = parseInt($('.drag-button__order').last().text(), 10) + 1;

  const newRow = dataTable
    .row.add({
      order: newOrder,
      unitName: 'Мраморный щебень фр. 2-5 мм, 25кг',
      price: 1231,
      quantity: 12,
      delivery: 1500,
      load: 100,
      productName: 'Мраморный щебень',
      total: '1231',
    })
    .draw()
    .node();

  $('.data-table__select', newRow).get(0).focus({ focusVisible: true });

  // вставить функцию для отправки данных на сервер
};

export { onNewRowButtonClick };
