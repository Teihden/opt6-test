const { $ } = window;

const goods = [
  {
    order: 1,
    unit: 'Мраморный щебень фр. 2-5 мм, 25кг',
    price: 1231,
    quantity: 12,
    delivery: 1500,
    load: 100,
    product: 'Мраморный щебень',
    total: 1231,
  },
  {
    order: 2,
    unit: 'Мраморный щебень фр. 2-5 мм, 25кг',
    price: 1231,
    quantity: 12,
    delivery: 1500,
    load: 100,
    product: 'Мраморный щебень',
    total: 1231,
  },
  {
    order: 3,
    unit: 'Мраморный щебень фр. 2-5 мм, 25кг',
    price: 1231,
    quantity: 12,
    delivery: 1500,
    load: 100,
    product: 'Мраморный щебень',
    total: 1231,
  },
  {
    order: 4,
    unit: 'Мраморный щебень фр. 2-5 мм, 25кг',
    price: 1231,
    quantity: 12,
    delivery: 1500,
    load: 100,
    product: 'Мраморный щебень',
    total: 1231,
  },
];

const getNewEntry = () => {
  const currentOrder = parseInt($('.drag-button__order').last().text(), 10) || 0;
  const newOrder = currentOrder + 1;

  return {
    order: newOrder,
    unit: 'Мраморный щебень фр. 2-5 мм, 25кг',
    price: 1231,
    quantity: 12,
    delivery: 1500,
    load: 100,
    product: 'Мраморный щебень',
    total: '1231',
  };
};

export { goods, getNewEntry };
