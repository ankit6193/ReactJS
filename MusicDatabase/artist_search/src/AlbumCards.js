import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import axios from "axios";
import CardMedia from '@material-ui/core/CardMedia';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

const song_search_url = "http://www.theaudiodb.com/api/v1/json/1/track.php?m="

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

const styles = theme => ({

  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  container : {
      display : "flex"
  },
  cover: {
    flex : 1,
    width: 150,
    height: 150,
  },
  img : {
      maxWidth : "100%",
      maxHeight : "100%"
  },
  album : {
      flex : 1
  }
});


class AlbumCards extends Component{
    constructor(props, context){
        super(props, context);

        this.state ={ 
            data : this.props.data.sort((a, b) => (a.intYearReleased < b.intYearReleased ? 1 : -1)),
            page : 0,
            rowsPerPage : 5,
            songs_data : "",
            selected_album : "",
            selected_album_art : ""
        }
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    state = {
        open: false,
    };

    handleClickOpen = (id,album,img,date) => {
        var self = this;
        self.setState({selected_album : album })
        self.setState({songs_data : ""});
        self.setState({selected_album_art : img})
        self.setState({selected_album_date : date})
        axios.get(song_search_url + id)
        .then(function (response) {
            console.log(response);
            self.setState({songs_data : response.data.track});
        })
        .catch(function (error) {
            console.log(error);
        });


        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render(){
        const { fullScreen } = this.props;
        const { classes } = this.props;
        const { data, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return(
            <div>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <CustomTableCell>Album</CustomTableCell>
                        <CustomTableCell numeric>Release Year</CustomTableCell>
                        <CustomTableCell></CustomTableCell>
                    </TableRow>
                    </TableHead>
                        <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                            return (
                            <TableRow key={n.idAlbum}>
                                <TableCell component="th" scope="row">
                                {n.strAlbum}
                                </TableCell>
                                <TableCell numeric>{n.intYearReleased}</TableCell>
                                <TableCell numeric>
                                    <Button variant="outlined"  onClick={() => this.handleClickOpen(n.idAlbum,n.strAlbum,n.strAlbumThumb,n.intYearReleased)}>View Tracks</Button>
                                        <Dialog
                                        fullScreen={fullScreen}
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                        aria-labelledby="responsive-dialog-title"
                                        >
                                       

                                        <DialogContent>
                                            <DialogContentText>

                                                <div className = {classes.container}> 
                                                         <CardMedia
                                                            className={classes.cover}
                                                            title="Live from space album cover"
                                                        >

                                                        <img className = {classes.img} alt="" src= {this.state.selected_album_art} />

                                                        </CardMedia>

                                                        <div className = {classes.album}>
                                                        
                                                        <Typography gutterBottom variant="headline" component="h2">
                                                            {this.state.selected_album}
                                                        </Typography>

                                                        <Typography gutterBottom variant = "caption" component="h7">
                                                            Released : {this.state.selected_album_date}
                                                        </Typography>
                                            
                                                        </div>
                                                        
                                                </div>

                                               <Paper className={classes.root}>
                                                    <div className={classes.tableWrapper}>
                                                    <Table className={classes.table}>
                                                        <TableBody>
                                                        {   this.state.songs_data ? 

                                                            
                                                            this.state.songs_data.map(n => {
                                                            return (
                                                            <TableRow key={n.idTrack}>
                                                                <TableCell component="th" scope="row">
                                                                {n.strTrack}
                                                                </TableCell>
                                                                <TableCell numeric>{millisToMinutesAndSeconds(n.intDuration)}</TableCell>
                                                            </TableRow>
                                                            );
                                                        })
                                                        :
                                                        ""
                                                        }
                                                        {emptyRows > 0 && (
                                                            <TableRow style={{ height: 48 * emptyRows }}>
                                                            <TableCell colSpan={6} />
                                                            </TableRow>
                                                        )}
                                                        </TableBody>
                                                        
                                                    </Table>
                                                    </div>
                                                </Paper>
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            
                                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                                Close
                                            </Button>
                                        </DialogActions>
                                        </Dialog>
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
                </Paper>
                
            </div>
        )
    }
}
AlbumCards.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlbumCards);