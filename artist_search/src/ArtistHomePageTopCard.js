//Additional class to handle top card where artist follower count and image should be shown

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


//common styles

const styles = {
  container : {
    display : 'flex'
  },
  cover : {
    marginTop : 10,
    marginLeft : 10,
    height : 300,
    width : 300
  },
  img : {
    maxWidth : "100%",
    maxHeight : "100%"
  },
  coverRight : {
    marginTop : 10,
    marginLeft : 10,
    marginRight : 10,
    height : 300,
    flex : 1,
    
  }
};

// displays name,image and genre of artist

function ArtistHomePageTopCard(props) {
  const { classes } = props;
  return (
    <div className = {classes.container}>
    
      <Card className={classes.cover}>
        <img className = {classes.img} alt="" src= {props.imgURL}  />
      </Card>

      
      <Card className={classes.coverRight}>

            <div className={classes.details}>
            <CardContent className={classes.content}>
                <Typography variant="display2">{props.name}</Typography>

                <Typography variant="caption" color="textSecondary">
                   Genre - {props.genre}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    Followers - {9999}
                </Typography>

                
            </CardContent>
            </div>
                            
                            
        </Card>
     

      
    </div>
  );
}

ArtistHomePageTopCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArtistHomePageTopCard);