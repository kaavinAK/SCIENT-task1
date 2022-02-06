import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
//'linear-gradient(135deg, #F93239 , #DD2476)'
//linear-gradient(315deg, #42378f 0%, #f53844 74%)
export const theme = createTheme({
  palette: {
    
    navbar: {
     mainGradient: 'linear-gradient(315deg, #42378f 0%, #f53844 74%)',
   

    
     contrastText: 'red',
    }
  },
});