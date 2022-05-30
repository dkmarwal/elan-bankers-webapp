import React,{Component} from 'react';
 import {Grid, Container, Box} from '@material-ui/core';
 import FooterNav from './FooterNav'
 
 class Footer extends Component{
     render(){
         const {isLoggedIn } = this.props;
         return(
             <Container> 
                 <Box display="flex" justifyContent="center" my={1}>
                     <Grid item md>
                         <FooterNav isLoggedIn={isLoggedIn} />
                     </Grid>
                 </Box>
             </Container>
           
         )
     }
 }
 
export default Footer;