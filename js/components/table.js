function createTable(container, id, columnNameArr, columnStyleArr) {
  const table = container.appendChild(document.createElement('table'));
  table.setAttribute('id', id);
  table.setAttribute('class', 'table');
  const tr = table.appendChild(document.createElement('tr'));
  columnNameArr.forEach((element, index) => {
    const th = tr.appendChild(document.createElement('th'));
    th.setAttribute('style', columnStyleArr[index]);
    th.innerText = columnNameArr[index];
  });
}

function addTableElement(tableid, columnValueArr) {
  function isInTable() {
      const tableElements = document.getElementById(tableid).getElementsByTagName('tr');
      let inTable = false;
      for (var i = 1; i < tableElements.length; i++) {
          if (tableElements[i].children[1].innerText === columnValueArr[1]) { // TODO change 1 to id in array
              inTable = true;
              break;
          }
      }
      return inTable;
  }

  if (!isInTable()) {
      const tr = document.getElementById(tableid).appendChild(document.createElement('tr'));
      columnValueArr.forEach((element, index) => {
        const th = tr.appendChild(document.createElement('th'));
        th.innerText = columnValueArr[index];
      });
  }
}

function getTable(id) {
  let array = [];
  const elements = document.getElementById(`table-tableContainer-${id}`).getElementsByTagName('tr');
  for (var i = 1; i < elements.length; i++) {
      array.push(parseInt(elements[i].children[1].innerText));
  }
  if (array.length > 0) {
      return array;
  }
}
