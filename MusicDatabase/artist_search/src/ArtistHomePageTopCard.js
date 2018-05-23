import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
 
  cover : {
    width: 150,
    height: 150,
  },
  img : {
    maxWidth : "100%",
    maxHeight : "100%"
  }
};

function ArtistHomePageTopCard(props) {
  const { classes } = props;
  return (
    <div>
    
      <Card className={classes.cover}>
        <img className = {classes.img} alt="" src= {props.imgURL}  />
      </Card>
    </div>
  );
}

ArtistHomePageTopCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArtistHomePageTopCard);