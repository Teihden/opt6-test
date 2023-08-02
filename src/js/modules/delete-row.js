import { handleEscapeKey } from './utils.js';
import { html } from './html-elements.js';

const { $ } = window;

const closeDeleteButton = (deleteButton, target) => {
  deleteButton.fadeTo('fast', 0, () => deleteButton.remove());
  target.removeClass('multipoint-button--active');
  $(document).off();
};

const onDocumentKeydown = (cb, evt) => handleEscapeKey(cb, evt);

const deleteRow = (dataTable, evt) => {
  const row = dataTable.row($(evt.target).parents('tr'));
  const index = row.index();

  row.remove().draw(false);

  $('.drag-button__order').each((indexElement, orderElement) => {
    const cell = dataTable.cell(orderElement.closest('td'));

    cell.data(indexElement + 1).draw();
  });

  // Функция для отправки данных на сервер
  $.post('example.php', { index })
    .done(() => {})
    .fail(() => {});
};

const createDeleteButton = (evt, dataTable) => {
  const target = $(evt.currentTarget);

  if (!target.next('.delete-button').length > 0) {
    target.addClass('multipoint-button--active');

    const deleteButton = $(html.deleteButton);
    const closeDeleteButtonCallback = () => closeDeleteButton(deleteButton, target);

    deleteButton
      .insertAfter(evt.currentTarget)
      .hide()
      .fadeTo('fast', 1, () => {
        $(document).on('click', closeDeleteButtonCallback);
        $(document).on('keydown', (evtKeydown) => onDocumentKeydown(closeDeleteButtonCallback, evtKeydown));
        deleteButton.on('click', (evtClick) => deleteRow(dataTable, evtClick));
        deleteButton.removeAttr('style');
      });
  }
};

export { createDeleteButton };
