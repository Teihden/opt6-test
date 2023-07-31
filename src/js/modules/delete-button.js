/* eslint-disable no-undef */
import { handleEscapeKey } from './utils.js';

const DELETE_BUTTON = `<button class="table__delete-button" type="button">
<span class="table__delete-button-text">Удалить</span></button>`;

const closeDeleteButton = (deleteButton, target) => {
  console.log(target);
  deleteButton.fadeTo('fast', 0, () => deleteButton.remove());
  target.removeClass('table__multipoint-button--active');
  $(document).off();
};

const onDocumentKeydown = (cb, evt) => handleEscapeKey(cb, evt);

const deleteRow = (dataTable, evt) => {
  dataTable
    .row($(evt.target).parents('tr'))
    .remove()
    .draw();

  // вставить функцию для отправки данных на сервер
};

const createDeleteButton = (evt, dataTable) => {
  const target = $(evt.currentTarget);

  if (!target.next('.table__delete-button').length > 0) {
    target.addClass('table__multipoint-button--active');

    const deleteButton = $(DELETE_BUTTON);
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
