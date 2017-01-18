import React from 'react';
import QrReader from 'react-qr-reader'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const buttonStyle = {
  margin: 12,
  width: '100px',
  height: '44px',
  marginTop: '20%',
  // backgroundColor: '#90A4AE'
};

const labelStyle = {
  fontSize: '24px',
  textAlign: 'center',
  color: 'white',
  fontFamily: 'Pacifico',
  textTransform: 'lowercase'
};

class CameraContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'No result',
    }
  }

  handleError(err){
    console.error(err)
  }

  handleSubmit() {
    this.qrReader.openImageDialog();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <QrReader
            handleError={this.props.handleError}
            handleImageNotRecognized={this.props.handleError}
            handleScan={this.props.handleScan}
            legacyMode={true}
            ref={(qrReader) => {this.qrReader = qrReader}}
            maxImageSize={750} />
          <RaisedButton 
            backgroundColor='#90A4AE'
            label="guest"
            style={buttonStyle}
            labelStyle={labelStyle}
            onTouchTap={() => this.handleSubmit()}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default CameraContainer;