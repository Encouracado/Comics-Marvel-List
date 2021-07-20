import { Link, Typography } from '@material-ui/core';

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Hey Look this Comic
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
