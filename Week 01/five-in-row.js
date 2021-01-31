(function(){
  let pattern = new Array(15*15).fill(0)
  function show(){
    const board = document.getElementById('board')
    board.innerHTML = ""
    for (let index = 0; index < pattern.length; index++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      board.append(cell)
      if(index % 15 == 14){
        board.append(document.createElement('br'))
      }
    }
  }
  show();
})();