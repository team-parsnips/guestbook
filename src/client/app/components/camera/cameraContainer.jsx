import React from 'react';
import QrReader from 'react-qr-reader'
import RaisedButton from 'material-ui/RaisedButton';

const buttonStyle = {
  margin: 12,
  width: '100px',
  height: '44px',
  marginTop: '20%',
};

const labelStyle = {
  fontSize: '24px',
  textAlign: 'center',
  color: 'white',
  fontFamily: 'Pacifico',
  textTransform: 'lowercase'
};

const cameraDiv = {
  width: '100px',
  display: 'inline-block'
}

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
      <div style={cameraDiv}>
        <RaisedButton 
          backgroundColor='#B0BEC5'
          label="guest"
          style={buttonStyle}
          labelStyle={labelStyle}
          onTouchTap={() => this.handleSubmit()} />
        <QrReader
          handleError={this.props.handleError}
          handleImageNotRecognized={this.props.handleError}
          handleScan={this.props.handleScan}
          legacyMode={true}
          ref={(qrReader) => {this.qrReader = qrReader}}
          maxImageSize={750} />
      </div>
    )
  }
}


export default CameraContainer;