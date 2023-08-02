import { initCustomSelect } from './custom-select.js';

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

  initCustomSelect();

  const selectedOption = $('.custom-select__selected', newRow);

  // selectedOption[0].focus({ focusVisible: true });
  selectedOption[0].click();

  // вставить функцию для отправки данных на сервер
};

export { onNewRowButtonClick };
