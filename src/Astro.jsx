import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';

import {Zodiac} from './AstroData';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  table: {
    minWidth: 400,
  },
});

class Aztro extends React.Component {
  state = {
    zodiac_data: {}
  }

  componentDidMount(prevProps) {
    this.update()
  }

  componentDidUpdate(prevProps) {
    this.update()
  }

  update() {
    const {zodiac, day} = this.props;
    const URL = 'https://aztro.sameerkumar.website/?sign=' + zodiac + '&day=' + day;
    fetch(URL, {
        method: 'POST'
    }).then(response => response.json())
    .then( json => { this.setState({zodiac_data: json})});
  }


  render()
  {
    const {zodiac, classes} = this.props;
    const {zodiac_data} = this.state;
    const {sign, name} = Zodiac[zodiac];
    return <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="zodiac table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>{sign} - {name}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key="current_date">
            <TableCell component="th" scope="row">Current Date</TableCell>
            <TableCell>{zodiac_data.current_date}</TableCell>
          </TableRow>
          <TableRow key="compatibility">
          <TableCell component="th" scope="row">Compatibility</TableCell>
          <TableCell>{zodiac_data.compatibility}</TableCell>
          </TableRow>
          <TableRow key="lucky_number">
          <TableCell component="th" scope="row">Lucky Number</TableCell>
          <TableCell>{zodiac_data.lucky_number}</TableCell>
          </TableRow>
          <TableRow key="lucky_time">
          <TableCell component="th" scope="row">Lucky Time</TableCell>
          <TableCell>{zodiac_data.lucky_time}</TableCell>
          </TableRow>
          <TableRow key="color">
          <TableCell component="th" scope="row">Color</TableCell>
          <TableCell>{zodiac_data.color}</TableCell>
          </TableRow>
          <TableRow key="date_range">
          <TableCell component="th" scope="row">Date Range</TableCell>
          <TableCell>{zodiac_data.date_range}</TableCell>
          </TableRow>
          <TableRow key="mood">
          <TableCell component="th" scope="row">Mood</TableCell>
          <TableCell>{zodiac_data.mood}</TableCell>
          </TableRow>
          <TableRow key="description">
          <TableCell component="th" scope="row">Description</TableCell>
          <TableCell>{zodiac_data.description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  }
};

export default withStyles(styles)(Aztro);
