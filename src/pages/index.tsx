import React, { useContext } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import api from '../services/api';
import md5 from 'md5';
import { Comic } from '../contexts/ContextComics';
import { ComicContext } from '../contexts/ContextComics';
import { Footer } from '../components/layout/Footer';

import { makeStyles } from '@material-ui/core/styles';

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

interface ComicsProps {
  comics: Comic[];
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#04d361',
  },
  bottonLearnMore: {
    color: '#04d361',
  },
}));

export default function Home({ comics }: ComicsProps) {
  const { openDescriptionComic } = useContext(ComicContext);
  const router = useRouter();
  const classes = useStyles();

  function showDescriptionComic(comic: Comic) {
    openDescriptionComic(comic);
    router.push(`/Comics/${comic.id}`);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar>
          <WhatshotIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Marvel Comics Bro!
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              <MonetizationOnIcon className={classes.icon} /> Welcome to Marvel
              Comic List!!
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              In this project Next was used with Material-ui.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {comics.map((comic) => (
              <Grid item key={comic.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={
                      comic.thumbnail?.path + '.' + comic.thumbnail?.extension
                    }
                    title={comic.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {comic.title}
                    </Typography>
                    <Typography>{comic.series}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      className={classes.bottonLearnMore}
                      onClick={() => showDescriptionComic(comic)}
                    >
                      Read More About
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const publicKey = '4da92f9ba2c7b05eaf1e088dbffe0ce7';

  const privateKey = '4d89f732f2070f767cd167c90974c9722f2c6e19';

  let ts = Number(new Date());

  let hashKeys = md5(ts + privateKey + publicKey);

  const response = await api.get('comics', {
    params: {
      limit: 40,
      apikey: publicKey,
      ts,
      hash: hashKeys,
    },
  });

  const data = response.data.data.results;

  const comics = data.map((comic) => {
    return {
      id: comic.id,
      title: comic.title,
      variantDescription: comic.variantDescription,
      description: comic.description,
      modified: comic.modified,
      isbn: comic.isbn,
      series: comic.series.name,
      thumbnail: {
        path: comic.thumbnail.path,
        extension: comic.thumbnail.extension,
      },
      creators: comic.creators.items,
    };
  });

  return {
    props: {
      comics,
    },
    revalidate: 60 * 60 * 8,
  };
};
