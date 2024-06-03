'use cliant'
import React, { useReducer, useState } from 'react'
import { INITIAL, reducer } from './reducer';

const FetchData = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL);
    const { loading, post, error } = state;

    const handleClick = () => {
        dispatch({ type: 'START' });
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(json => {
                dispatch({ type: 'SUCCESS', payload: json });

            }).catch((err) => {
                dispatch({ type: 'ERROR' });
            });
    }
    return (
        <div>
            <button onClick={handleClick}>{loading ? 'Loading...' : 'Click!'}</button>
            <p>{post?.title}</p>
            <p>{error && 'Error'}</p>
        </div>
    );
}

export default FetchData
