document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('.table');
  const cells = Array.from(document.querySelectorAll('.table td'));
  const detail = document.getElementsByTagName("button")[0];
  const show = document.getElementById('detail')
  let currentPlayer = 'X';
  let isGameOver = false;
  let isUserTurn = true;

  
  const handleCellClick = (e) => {
    const cell = e.target;

   
    if (cell.textContent === '' && !isGameOver) {
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer);

     
      if (checkWinner()) {
       isGameOver = true; 
       winner();
        return;
      }

      
      if (checkTie()) {
        alert("It's a tie!");
        isGameOver = true;
        return;
      }

      isUserTurn = false;
      currentPlayer = "O";
      setTimeout(()=> {makeComputerMove();},1000);
      playerChance();
     
     
    }
  };


  function makeComputerMove() {
    const emptyCells = Array.from(cells).filter(cell => cell.textContent === '');
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      emptyCells[randomIndex].textContent = 'O';
    }

     
     if (checkWinner()) {
      isGameOver = true;
      winner();
      return;
    }

   
    if (checkTie()) {
      alert("It's a tie!");
      isGameOver = true;
      return currentPlayer;
    }
    isUserTurn = true;
    currentPlayer = "X";
    playerChance();

  }

  
  

  
  const checkWinner = () => {
    const com = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i of com) {
      const [a, b, c] = i;
      if (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      ) {
        cells[b].style.border = "7px solid green"
        cells[c].style.border = "7px solid green"
        cells[a].style.border = "7px solid green"
        isGameOver = true;
        return true;
        
      }
    }

    return false;
  };

  // Function to check for a tie
  const checkTie = () => {
    return cells.every((cell) => cell.textContent !== '');
  };

  // Add event listeners to each cell
  cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
  });


  const playerChance = () => {
    if (currentPlayer === 'O') {
      show.innerText = 'Computer Turn';
    } else {
      show.innerText = 'Player Turn';
    }
  };

  const winner = () => {
    if (isGameOver) {
      show.innerText = `${currentPlayer} won. Restart`;
  }
}
  
  
  const restartGame = () => {
    currentPlayer = 'X';
    isGameOver = false;
    isUserTurn = true;
    // playerChance();
    cells.forEach((cell) => {
      cell.textContent = '';
      cell.classList.remove('X', 'O', 'winner');
      cell.style.border = '';
    });
    
  };

playerChance();

detail.addEventListener('click', restartGame);
});




