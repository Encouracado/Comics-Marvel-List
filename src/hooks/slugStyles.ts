import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
  