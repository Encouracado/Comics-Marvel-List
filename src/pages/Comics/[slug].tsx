import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import { ComicContext } from '../../contexts/ContextComics';
import { Footer } from '../../components/layout/Footer';

import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    display: 'flex',
    flex: '30%',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginBottom: '30px',
    backgroundColor: theme.palette.secondary.main,
  },
  description: {
    marginTop: '30px',
    fontSize: '16px',
  },
  series: {
    marginTop: '7px',
    fontWeight: 'bold',
    fontSize: '12px',
  },
  creators: {
    marginTop: '7px',
    fontWeight: 'bold',
    fontSize: '12px',
    color: theme.palette.secondary.main,
  },
  isbn: {
    marginTop: '12px',
    fontSize: '10px',
  },
  buttonBack: {
    marginTop: '12px',
    marginBottom: '0%',
  },
}));

export default function Comics() {
  const { selectedComic } = useContext(ComicContext);
  const classes = useStyles();
  const router = useRouter();
  function BackToHomePage() {
    router.push('/');
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <img
        className={classes.image}
        src={
          selectedComic.thumbnail.path + '.' + selectedComic.thumbnail.extension
        }
      />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <FlashOnIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {selectedComic.title}
          </Typography>
          <Typography component="h3" className={classes.description}>
            {'Description: ' + selectedComic.description === null
              ? 'Sorry :/ there is not a description'
              : selectedComic.description}
          </Typography>
          <Typography component="h3" className={classes.series}>
            {'Series: ' + selectedComic.series}
          </Typography>
          <Typography component="h3" className={classes.creators}>
            Creators:{' '}
            {selectedComic.creators.map((creator) => {
              return <strong>{creator.name}, </strong>;
            })}
          </Typography>
          <Typography className={classes.isbn}>
            ISBN: {selectedComic.isbn}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={classes.buttonBack}
            onClick={BackToHomePage}
          >
            {' '}
            <ExitToAppIcon /> Back
          </Button>
        </div>
        <Footer />
      </Grid>
    </Grid>
  );
}
