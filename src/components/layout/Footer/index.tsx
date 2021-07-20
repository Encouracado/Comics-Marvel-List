import { makeStyles, Typography } from '@material-ui/core';
import { Copyright } from '../CopyRight';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        All rights reserved
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Thank you for accessing our website
      </Typography>
      <Copyright />
    </footer>
  );
}
