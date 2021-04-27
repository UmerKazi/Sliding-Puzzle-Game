import React from 'react';
import PropTypes from 'prop-types';

export default function Box({boxNumber,onClick}){
    const EMPTY_CLASS="empty"
    return <span onClick={onClick} className={!boxNumber?EMPTY_CLASS:null}>{boxNumber || ""}</span>;
}

Box.propTypes = {
    onClick: PropTypes.func.isRequired,
    boxNumber: PropTypes.number.isRequired
};