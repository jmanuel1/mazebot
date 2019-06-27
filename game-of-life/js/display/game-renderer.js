class GridContext {
  constructor(gridElement) {
    this._gridRef = gridElement;
    this._liveCellRefs = [];
  }

  getCellOffset(rowIndex, columnIndex) {
    const gridOffset = this.getGridOffset();
    const cellSize = this.getCellSize();

    return {
      x: gridOffset.x + columnIndex*cellSize,
      y: gridOffset.y + rowIndex*cellSize
    };
  }

  getGridOffset() {
    const rect = this._gridRef.getBoundingClientRect();
    const doc = document.documentElement;
    return {x: (rect.left + window.pageXOffset) - doc.clientLeft,      y: (rect.top + window.pageYOffset) - doc.clientTop}
  }

  addToGrid(element) {
    this._gridRef.appendChild(element);
    this._liveCellRefs.push(element);
  }

  getCellSize() {
    // get this value from the CSS variable
    const rootStyles = getComputedStyle(document.documentElement);
    const size = rootStyles.getPropertyValue('--grid-cell-size');
    return parseInt(size, 10);
  }

  removeOldLiveCells() {
    this._liveCellRefs.forEach(cellElement => {
      this._gridRef.removeChild(cellElement);
    });
    this._liveCellRefs = [];
  }
}

// Top-level renderer
// Sets up the renderers for each layer
var Renderer = function (
  coordinates,
  gridElement,
  avatarPathCanvas,
  overlayCanvas
) {
  gridContext = new GridContext(gridElement);
  gridRenderer = GridRenderer(gridContext);

  return { setGrid: (grid) => gridRenderer.setGrid(grid), updateOverlay: () => null, displaySizeChanged: () => null }
}
