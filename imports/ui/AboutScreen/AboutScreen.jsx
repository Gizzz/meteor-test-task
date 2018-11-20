import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
  },
  aboutTextLeft: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing.unit * 2,
    },
  },
  aboutTextRight: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 2,
    },
  }
});

class AboutScreen extends React.Component {
  state = {
    email: '',
    message: '',
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <h3>About Screen</h3>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <h4>About Us</h4>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <p className={classes.aboutTextLeft}>
                  We’ll assume that you have some familiarity with HTML and JavaScript, but you should be able to follow along even if you’re coming from a different programming language. We’ll also assume that you’re familiar with programming concepts like functions, objects, arrays, and to a lesser extent, classes.
                </p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <p className={classes.aboutTextRight}>
                  We recommend that you check out the tic-tac-toe game before continuing with the tutorial. One of the features that you’ll notice is that there is a numbered list to the right of the game’s board. This list gives you a history of all of the moves that have occurred in the game, and is updated as the game progresses.
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <h4>Our Adress</h4>
            <p>80 S.W. 8th Street Suite 2000, Miami Florida, 33130</p>
          </Grid>
          <Grid item xs={12}>
            <h4>Contact form</h4>
            <Paper className={classes.paper}>
              <TextField
                label="Email"
                margin="normal"
                value={this.state.email}
                onChange={this.handleChange('email')}
              />
              <br />
              <br />
              <TextField
                label="Message"
                margin="normal"
                multiline
                rowsMax="4"
                value={this.state.message}
                onChange={this.handleChange('message')}
              />
              <br/>
              <br/>
              <Button variant="outlined">Send</Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

AboutScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutScreen);
