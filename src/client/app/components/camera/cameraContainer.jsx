import React from 'react';
import QrReader from 'react-qr-reader'

const previewStyle = {
  height: '240px',
  width: '320px',
}

class CameraContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'No result',
    }
  }

  handleScan(data){
    this.setState({
      result: data,
    });
    // redirect to read url after 1 sec.
    setTimeout(function() {
      window.location.href = data;
    }, 1000);
  }

  handleError(err){
    console.error(err)
  }

  handleSubmit() {
    this.qrReader.openImageDialog();
  }

  render() {
    return (
      <div>
        <QrReader
          previewStyle={previewStyle}
          handleError={this.handleError}
          handleScan={this.handleScan.bind(this)}
          legacyMode={true}
          ref={(qrReader) => {this.qrReader = qrReader}}
          maxImageSize={750} />
        <button onClick={() => this.handleSubmit()}>Open Image Dialog</button>
        <p>{this.state.result}</p>
      </div>
    )
  }
}

export default CameraContainer;