import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import CardsPage from '../CardsPage';
import { FiUpload } from "react-icons/fi";
import backgroundImage from '../../public/backgroundImage.png';



export default function BasicCard() {
  return (
    <Card sx={{ width: "100%", 
                height: "65%", 
                margin: "10px 30px 10px 10px", 
                paddingRight: "20px", 
                backgroundColor: "#6c757d",
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
              }}>
      <CardContent sx={{
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        alignSelf: "center"
                        }}>
         <Paper elevation={3} sx={{height: "30vh", 
                                   width: "70%", 
                                   marginTop: "50px", 
                                   backgroundColor: "#b9d6ff", 
                                   padding: "5px", 
                                   marginBottom: "20px",
                                   display: "flex", 
                                   flexDirection: "column", 
                                   justifyContent: "center", 
                                   alignItems: "center", 
                                   alignSelf: "center"
                                   }}>
         <Paper elevation={2} sx={{width: "200px"}}>                           
          <CardActions>
            <Button size="big" variant='contained' color='error'>Upload File</Button>
            <FiUpload style={{color: "red", fontSize: "35px", fontWeight: 800}}/>
          </CardActions>
          </Paper>  
         </Paper>
         <CardsPage/>
      </CardContent>
    </Card>
  );
}
