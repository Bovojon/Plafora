import React, {Component} from 'react';
import {Container, Grid, Paper} from '@material-ui/core';

import LoginForm from '../forms/LoginForm';
import RegistrationForm from '../forms/RegistrationForm';

class Home extends Component {
    render() {
        return (
            <Container>
                <Grid container>
                    <Grid item xs={5}>
                        <Paper style={{padding:10, minHeight:300}}>
                            <LoginForm />
                        </Paper>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper style={{marginLeft:10, padding:10, minHeight:300}}>
                            <RegistrationForm />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default Home;
