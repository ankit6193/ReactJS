// ArtistCard component is the one that pops up when someone hits a query in home page


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import {TablePaginationActionsWrapped} from './ConstantFunctions/TablePaginationActions';
import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';



//common styles

const styles = theme => ({

  container : {
    display : 'flex',
    flexDirection : 'column',
    justifyContent: 'center', 
    alignItems: 'center',     
    paddingTop : '40px'
  },
  card: {
    marginTop : '10px',
    display : 'flex',
    width : '500px',
    
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 150,
    height: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  img : {
      maxWidth : "100%",
      maxHeight : "100%"
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class ArtistCard extends Component{

    
    constructor(props,context){
        super(props,context);

        this.state = {
            data : props.data,
            page: 0,
            rowsPerPage: 3,
        };
    }

    
    onClick = (e) =>{
        // e is artist name 
        // onClick implements React Router functionality this will redirect to artist home page
        this.props.history.push("/home/" + e);
    }

    //pagination helper methods 

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };


    // Renders cards as table row based on search result 

    render() {
    const { classes } = this.props;
    const { data, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
        <div className = {classes.container}>
            <div className={classes.tableWrapper}>
            <Table className={classes.table}>
                <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                    return (
                    <TableRow key={n.id}>
                        <TableCell component="th" scope="row">
                            <Card className={classes.card}>

                                <CardMedia
                                    className={classes.cover}
                                    title="Live from space album cover"
                                >

                                <img className = {classes.img} alt="" src= {n.strArtistThumb}  />

                                </CardMedia>
                                <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography variant="headline">{n.strArtist}</Typography>
                                    <Typography variant="subheading" color="textSecondary">
                                    Started - {n.intFormedYear}
                                    </Typography>

                                    <Typography variant="subheading" color="textSecondary">
                                    
                                    <Button variant="raised" color="primary" className={classes.button} onClick={() => this.onClick(n.strArtist)} >
                                            View Albums
                                    </Button>
                                    </Typography>
                                </CardContent>
                                </div>
                            
                            
                            </Card>
                        </TableCell>
                    </TableRow>
                    );
                })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TablePagination
                    colSpan={3}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActionsWrapped}
                    />
                </TableRow>
                </TableFooter>
            </Table>
            </div>
        </div>
        );
    }
}

ArtistCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


//withRouter detects change in URl and appropiately select path in index.js

export default withRouter(withStyles(styles)(ArtistCard));