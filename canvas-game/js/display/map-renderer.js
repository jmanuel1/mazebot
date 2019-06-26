//
class Grid extends Array {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    // create rows
    for (let i = 0; i < height; i++) {
      this[i] = new Array(width);
    }
  }
}

var GridRenderer = function (
  gridContext,
  coordinates
) {
  let grid;
  let liveCellElements = [];

  return {
    setGrid: setGrid,
    render: render
  };

  function setGrid(m) {
    grid = m;
    // console.debug(grid);
    render();
  }

  function render() {
    // rendering is inspired by https://www.freecodecamp.org/news/create-gameoflife-with-react-in-one-hour-8e686a410174/

    // remove old cells
    liveCellElements.forEach(cellElement => {
      cellElement.parentNode.removeChild(cellElement);
    });
    // make sure to clear the array
    liveCellElements = [];

    grid.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellOffest = gridContext.getCellOffset(rowIndex, columnIndex);
        if (cell.trim() === '') {
          return;
        }
        const cellElement = document.createElement('div');
        cellElement.style.left = cellOffest.x + 'px';
        cellElement.style.top = cellOffest.y + 'px';
        cellElement.classList.add('cell');
        gridContext.addToGrid(cellElement);
        liveCellElements.push(cellElement);
      })
    });
  }
}
