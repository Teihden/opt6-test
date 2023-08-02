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

const onSelectedOptionContainerClick = (evt) => {
  evt.preventDefault();
  evt.stopPropagation();

  const target = $(evt.currentTarget);
  const optionItemsContainer = target.next();

  if (optionItemsContainer.hasClass('custom-select__hide')) {
    openSelect(optionItemsContainer);
  } else {
    closeSelect(optionItemsContainer);
  }
};

const onSelectOptionClick = (evt) => {
  /* При нажатии на элемент обновляется исходное поле выбора,
    и выбранный элемент: */
  const targetOption = $(evt.currentTarget);
  const parentSelect = targetOption.parents('.custom-select').find('.custom-select__select');
  const selectedOption = targetOption.parents('.custom-select').find('.custom-select__selected-option');

  [...parentSelect[0].options].forEach((parentSelectOption, index) => {
    if ($(parentSelectOption).text() === targetOption.text().split(/\s+/).join(' ')) {
      selectedOption.text(targetOption.text());
      parentSelect[0].selectedIndex = index;
      parentSelect.trigger('change');
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
  /* Ищем элементы с классом "custom-select",
     Отфильтровываем те, которые уже инициализированы */
  const customSelectContainers = $('.custom-select')
    .not((_, container) => $.contains(container, $('.custom-select__selected', container)[0]));

  customSelectContainers.each((_, customSelectContainer) => {
    const select = $('.custom-select__select', customSelectContainer)[0];

    /* Для каждого элемента создаем новый DIV (selectedOptionContainer),
    который будет выступать в качестве выбранной опции: */
    $('<div/>')
      .addClass('custom-select__selected')
      .attr('tabindex', '0')
      .html($('<span/>')
        .text(select.options[select.selectedIndex].textContent)
        .addClass('custom-select__selected-option'))
      .on('click', onSelectedOptionContainerClick)
      .appendTo(customSelectContainer);

    /* Для каждого элемента создаем новый DIV, который будет содержать список опций */
    const optionList = $('<div/>').addClass('custom-select__items custom-select__hide');

    [...select.options].forEach((option) => {
      /* Для каждого варианта в исходном элементе select,
      создаем новый DIV (selectOption), который будет выступать в качестве элемента выбора: */
      $('<div/>')
        .addClass('custom-select__option')
        .text($(option).text())
        .html(addAccentClass)
        .on('click', onSelectOptionClick)
        .appendTo((optionList));
    });

    $(customSelectContainer).append(optionList);
  });
};

export { initCustomSelect };
