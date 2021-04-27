import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from "./Box";
import BoardLogic from "./BoardLogic";
class Board extends Component {
    static defaultProps = {
        size: 3,
        onMove: (i, j) => { console.log(`Clicked Tile ${i},${j}`) }
    }

    constructor(props) {
        super(props);
        this.state = this.initialGameState();
    }

    initialGameState = () => {
        this.boardLogic = new BoardLogic(this.props.data || this.props.size);
        console.log(this.props.data);
        console.log(this.props.data ? this.boardLogic.matrix : this.boardLogic.scramble());
        return {
            board: this.props.data ? this.boardLogic.matrix : this.boardLogic.scramble(),
            moves: 0,
            isWin: this.boardLogic.checkWin()
        }
    };

    move = (i, j) => {
        if (this.state.isWin)
            return;

        if (this.boardLogic.move(i, j)) {
            this.props.onMove(i, j);
            this.setState((prevState) => ({
                board: this.boardLogic.matrix,
                moves: prevState.moves + 1,
                isWin: this.boardLogic.checkWin(),
            }));
        }
    }

    getRow = (rowData, j) => {
        return (
            <div key={j} >
                {rowData.map((bNum, i) => <Box key={bNum} boxNumber={bNum} onClick={() => this.move(i, j)} />)}
            </div>
        );
    }

    newGame = () => {
        this.setState(this.initialGameState());
    }

    render() {
        let rows = this.state.board.map(this.getRow);
        let message = (this.state.isWin ? "Winner! " : "Total") + ` Moves: ${this.state.moves}`;
        return (
            <div className="slider-board">
                {rows}
                <span className="slider-msg">
                    {message}
                </span>
                <div className="btn-new-game">
                    <button onClick={this.newGame}>New Game</button>
                </div>
            </div>
        );
    }
}

Board.propTypes = {
    data: PropTypes.array,
    size: PropTypes.number,
    onMove: PropTypes.func
};

export default Board;