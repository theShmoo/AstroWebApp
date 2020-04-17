import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import withRoot from './withRoot';
import Aztro from './Astro';

import {Zodiac, Days} from './AstroData';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  main: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class App extends Component {
  state = {
    anchorEl: null,
    currentZodiac: "aries",
    currentDay: "today"
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (page) => (event) => {
    this.setState({ anchorEl: null });
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, currentZodiac, currentDay } = this.state;
    const zodiacItems = Object.keys(Zodiac).map(z => <MenuItem value={z}>{Zodiac[z].name}</MenuItem>);
    const dayItems = Days.map(d => <MenuItem value={d}>{d}</MenuItem>);

    return <div className={classes.root}>
      <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem component={Typography} to="#" onClick={this.handleClose("#")}>Home</MenuItem>
        </Menu>
        <Typography variant="h6" color="inherit" className={classes.flex}>
          AstroBot
        </Typography>
      </Toolbar>
    </AppBar>
    <Paper square elevation={4} className={classes.main}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
         <form className={classes.form} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="zodiac-simple">Zodiac</InputLabel>
            <Select
              value={currentZodiac}
              onChange={this.handleChange}
              inputProps={{
                name: 'currentZodiac',
                id: 'zodiac-simple',
              }}
            >
              {zodiacItems}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="days-simple">Day</InputLabel>
            <Select
              value={currentDay}
              onChange={this.handleChange}
              inputProps={{
                name: 'currentDay',
                id: 'day-simple',
              }}
            >
              {dayItems}
            </Select>
          </FormControl>
        </form>
        </Grid>
        <Grid item xs={12}>
          <Aztro zodiac={currentZodiac} day={currentDay}/>
        </Grid>
      </Grid>
    </Paper>
  </div>
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
