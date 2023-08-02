import { handleEscapeKey } from './utils.js';

const { $ } = window;

const onDocumentKeydown = (cb, evt) => handleEscapeKey(cb, evt);

const closeSelect = (optionItemsContainer) => {
  optionItemsContainer
    .addClass('custom-select__hide');

  $(document).off();
};

const openSelect = (optionItemsContainer) => {
  $('.custom-select__items')
    .not(optionItemsContainer[0])
    .addClass('custom-select__hide')
    .end()
    .filter(optionItemsContainer[0])
    .removeClass('custom-select__hide');

  const closeSelectCallback = () => closeSelect(optionItemsContainer);

  $(document).on('click', closeSelectCallback);
  $(document).on('keydown', (evt) => onDocumentKeydown(closeSelectCallback, evt));
};

const onSelectedOptionClick = (evt) => {
  evt.preventDefault();
  evt.stopPropagation();

  const target = $(evt.target);
  const optionItemsContainer = target.next();

  if (optionItemsContainer.hasClass('custom-select__hide')) {
    openSelect(optionItemsContainer);
  } else {
    closeSelect(optionItemsContainer);
  }
};

const onSelectOption = (evt) => {
  /* При нажатии на элемент обновляется исходное поле выбора,
    и выбранный элемент: */
  const targetOption = $(evt.currentTarget);
  const parentSelect = targetOption.parents('.custom-select').find('.custom-select__select')[0];
  const selectedOptionContainer = targetOption.parent().prev();

  [...parentSelect.options].forEach((parentSelectOption, index) => {
    if ($(parentSelectOption).text() === targetOption.text().split(/\s+/).join(' ')) {
      parentSelect.selectedIndex = index;
      selectedOptionContainer.text(targetOption.text());
    }
  });
};

const addAccentClass = (_, htmlString) => {
  const accentText = htmlString.split(/\s+/).slice(0, 2).join(' ');
  const text = htmlString.split(/\s+/).slice(2).join(' ');

  return `<span class="custom-select__option--accent">${accentText}</span>
  <span>${text}</span>`;
};

const initCustomSelect = () => {
  /* Ищем элементы с классом "custom-select": */
  const customSelectContainers = $('.custom-select');

  customSelectContainers.each((_, customSelectContainer) => {
    const select = $('.custom-select__select', customSelectContainer)[0];

    /* Для каждого элемента создаем новый DIV (selectedOption),
    который будет выступать в качестве выбранной опции: */
    $('<div></div>')
      .addClass('custom-select__selected')
      .text(select.options[select.selectedIndex].innerHTML)
      .on('click', onSelectedOptionClick)
      .appendTo(customSelectContainer);

    /* Для каждого элемента создаем новый DIV, который будет содержать список опций */
    const optionList = $('<div></div>').addClass('custom-select__items custom-select__hide');

    [...select.options].forEach((option) => {
      /* Для каждого варианта в исходном элементе select,
      создаем новый DIV (selectOption), который будет выступать в качестве элемента выбора: */
      $('<div></div>')
        .addClass('custom-select__option')
        .text($(option).text())
        .html(addAccentClass)
        .on('click', onSelectOption)
        .appendTo((optionList));
    });

    $(customSelectContainer).append(optionList);
  });
};

export { initCustomSelect };
