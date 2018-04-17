import React from 'react';
import ReactDOM from 'react-dom';
import Square from './Square';

export default class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                style={this.props.winners[i]}
            />
        );
    }

    createBoard(a) {
        let board;
        let lines = Array(a);
        for (let i = 0; i < a; i++) {
            let squares = Array(a);
            for (let j = 0; j < a; j++) {
                squares.push(this.renderSquare(i * a + j));
            }
            let line = <div key={i} className="board-row">{squares}</div>
            lines.push(line);
        }

        board = <div>{lines}</div>
        return board;
    }

    render() {
        return this.createBoard(3);
    }
}