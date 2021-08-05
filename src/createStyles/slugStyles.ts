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
    imageHidden: {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      borderWidth: '0',
    },
    paper: {
      height:'100vh',
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
  