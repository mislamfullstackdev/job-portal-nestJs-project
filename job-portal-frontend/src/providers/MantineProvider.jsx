
"use client";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({})
const MantProvider = ({children}) => {
    return(
        <MantineProvider theme={theme}>{ children }</MantineProvider>
    )
}

export default MantProvider;