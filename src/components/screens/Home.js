import React, {Component} from 'react';
import {Container, Grid, Paper} from 'material-ui/core';

import LoginForm from '../forms/LoginForm';
import RegistrationForm from '../forms/RegistrationForm';

class Home extends Component {
    render() {
        return (
            <Container>
                <Grid item spacing={2} xs={6}>
                    <Paper>
                        <LoginForm />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        
                    </Paper>
                </Grid>
            </Container>
        )
    }
}

export default Home;
