import { Component } from '@angular/core';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  squares: any[] = [];
  xIsNext!: boolean;
  winner: string | null = null;

  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(index: number) {
    // If there is a winner or the square is already filled, do nothing
    if (this.winner || this.squares[index]) {
      return;
    }
    this.squares.splice(index, 1, this.player);
    this.xIsNext = !this.xIsNext;
    this.winner = this.calculateWinner();
  }

  calculateWinner() {
    // All possible winning combinations
    const lines = [
      // Horizontal
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      // Vertical
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      // Diagonal
      [0, 4, 8], [2, 4, 6]
    ];
    // Loop through the winning combinations
    for (let i = 0; i < lines.length; i++) {
      // Get the first index of the winning combination
      const [a, b, c] = lines[i];
      // If the first index is not null and the first index is equal to the second and third index, return the value at the first index
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        // Return the value at the first index
        return this.squares[a];
      }
    }
    // If there is no winner, return null
    return null;
  }


}
