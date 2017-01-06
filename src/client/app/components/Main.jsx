import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import {Card, CardHeader} from 'material-ui/Card';

const muiTheme = getMuiTheme({
  palette: { accent1Color: deepOrange500 }
});

class Main extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Card>
          <CardHeader
            title="Guestbook" />
        </Card>
      </MuiThemeProvider>
    )
  }
}

export default Main;