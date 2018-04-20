import React from 'react';
import ReactDOM from 'react-dom';

import Board from './Board';

import './index.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                position: {
                    col: null,
                    row: null
                }
            }],
            stepNumber: 0,
            xIsNext: true,
            sortOrder: null
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        const col = (i % Math.sqrt(squares.length)) + 1;
        const row = Math.floor(i / Math.sqrt(squares.length)) + 1;
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                position: {
                    col: col,
                    row: row
                }
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleSortClick() {
        this.setState((prevState, props) => ({
            sortOrder: prevState.sortOrder ? null : "sortOrder"
        }));
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const emptySquares = current.squares.filter((square) => {
            return !square;
        });
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move + ' (' + step.position.col + ', ' + step.position.row + ')' :
                'Go to game start';
            const isCurrent = move == this.state.stepNumber ? "isCurrent" : {};
            return (
                <li key={move}>
                    <button className={isCurrent} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        let winnersSquares = Array(9).fill("");
        if (winner) {
            status = 'Winner: ' + current.squares[winner[0]];
            winner.forEach((i) => {
                winnersSquares[i] = "winnersSquares"
            });
        }
        else if (emptySquares.length == 0) {
            status = 'Draw'
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winners={winnersSquares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.handleSortClick()}>sort order</button>
                    <ol className={this.state.sortOrder}>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i];
        }
    }
    return null;
}
