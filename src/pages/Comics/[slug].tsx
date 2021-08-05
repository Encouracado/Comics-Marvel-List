import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Footer } from '../../components/layout/Footer';
import { useStyles } from '../../createStyles/slugStyles';
import { ComicList } from '../../contexts/ContextComics';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { GetStaticPaths, GetStaticProps } from 'next';
import api from '../../services/api';
import md5 from 'md5';
import { CardMedia } from '@material-ui/core';

export default function Comics({ selectedComic }: ComicList) {
  const classes = useStyles();
  const router = useRouter();
  function BackToHomePage() {
    router.push('/');
  }

  return (
    <Grid
      key={selectedComic.id}
      container
      component="main"
      className={classes.root}
    >
      <CssBaseline />

      <CardMedia
        // prettier-ignore
        className={classes.image}
        image={
          // prettier-ignore
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const publicKey = '4da92f9ba2c7b05eaf1e088dbffe0ce7';

  const privateKey = '4d89f732f2070f767cd167c90974c9722f2c6e19';

  let ts = Number(new Date());

  let hashKeys = md5(ts + privateKey + publicKey);

  const { slug } = ctx.params;

  const { data } = await api.get(`comics/${slug}`, {
    params: {
      apikey: publicKey,
      ts,
      hash: hashKeys,
    },
  });

  const selectedComic = {
    id: data.data.results[0].id,
    title: data.data.results[0].title,
    variantDescription: data.data.results[0].variantDescription,
    description: data.data.results[0].description,
    modified: data.data.results[0].modified,
    isbn: data.data.results[0].isbn,
    series: data.data.results[0].series.name,
    thumbnail: {
      path: data.data.results[0].thumbnail.path,
      extension: data.data.results[0].thumbnail.extension,
    },
    creators: data.data.results[0].creators.items,
  };

  return {
    props: {
      selectedComic,
    },
    revalidate: 60 * 60 * 8, // one day
  };
};
