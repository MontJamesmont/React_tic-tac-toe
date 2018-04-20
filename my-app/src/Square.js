import React from 'react';
import ReactDOM from 'react-dom';

export default function Square(props) {
    return (
        <button className={props.winnerClass + " square"} onClick={props.onClick}>
            {props.value}
        </button>
    );
}