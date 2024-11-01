
"use client";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createTheme, MantineProvider } from '@mantine/core';

// class MantineProvider extends Component {
//     constructor(props) {
//         super(props);

//     }

//     componentWillMount() {

//     }

//     componentDidMount() {

//     }

//     componentWillReceiveProps(nextProps) {

//     }

//     shouldComponentUpdate(nextProps, nextState) {

//     }

//     componentWillUpdate(nextProps, nextState) {

//     }

//     componentDidUpdate(prevProps, prevState) {

//     }

//     componentWillUnmount() {

//     }

//     render() {
//         return (
//             <div>

//             </div>
//         );
//     }
// }

// MantineProvider.propTypes = {

// };
const theme = createTheme({})
const MantProvider = ({children}) => {
    return(
        <MantineProvider theme={theme}>{ children }</MantineProvider>
    )
}

export default MantProvider;