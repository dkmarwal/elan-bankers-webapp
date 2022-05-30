import React, {Component, Fragment} from 'react';
import { Box, Paper, Grid, Container } from '@material-ui/core';

class Thankyou extends Component{
    render(){
        return(
            <Fragment> 
                
                <Grid container justify="center">
					<Grid item md={5}>

                    <Box bgcolor={'#fff'} boxShadow={2} fontSize={22} color={'#1c4b6b'} p={2} textAlign={'center'} justifyContent="center">  
                            <img src={require('~/assets/images/success-alert.png')} width="70" height="70" />
                        <h2> Thank you!</h2>
                        <p> You have successfully logged out</p> 
                    </Box> 
                 </Grid>
                 </Grid>
            </Fragment>            
        )
    }
}

export default Thankyou;