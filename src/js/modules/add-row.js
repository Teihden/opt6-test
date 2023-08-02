import { initCustomSelect } from './custom-select.js';
import { getNewEntry } from './goods.js';

const { $ } = window;

const onNewRowButtonClick = (dataTable) => {
  const newData = getNewEntry();

  const newRow = dataTable
    .row.add(newData)
    .draw()
    .node();

  initCustomSelect();

  const selectedOption = $('.custom-select__selected', newRow);
  selectedOption[0].focus({ focusVisible: true });

  // Функция для отправки данных на сервер
  $.post('example.php', newData)
    .done(() => {})
    .fail(() => {});
};

export { onNewRowButtonClick };
