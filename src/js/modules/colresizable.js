const initColResizable = (table) => {
  table.colResizable({
    liveDrag: true,
    gripInnerHtml: '<div class="colresizable-grip"></div>',
    draggingClass: 'colresizable-dragging',
    hoverCursor: 'col-resize',
    dragCursor: 'col-resize',
    mode: 'fit',
  });
};

const removeColResizable = (table) => {
  table.colResizable({
    disable: true,
  });
};

export { initColResizable, removeColResizable };
