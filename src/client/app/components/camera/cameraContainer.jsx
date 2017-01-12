import React from 'react';
import QrCode from 'qrcode-reader';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const previewContainer = {
  width: '50px',
  height: '50px'
}

class CameraContainer extends React.Component {
  constructor(props) {
    super(props);
    this.file = undefined;
  }

  componentDidMount() {
    var upload = document.getElementById('upload');
    var preview = document.getElementById('preview');
    var qr = new QrCode();
    var context = this;

    qr.callback = function(result, err) {
      var span = document.querySelector('span') || document.createElement('span');
      if (result) {
        span.textContent = result;
      } else {
        span.textContent = 'Sorry, the image could not be deciphered. Try again.';
      }
      preview.appendChild(span);
    }
    upload.addEventListener('change', context.handleFileSelect.bind(context), false);
/*    upload.addEventListener('change', function() {
      for (var i = 0; i < this.files.length; i++) {
        var file = this.files[i];

        var imageType = /^image\//;
            
        if (!imageType.test(file.type)) {
          throw new Error('File type not valid');
        }

        var reader = new FileReader();
        reader.addEventListener('load', function() {
          var img = document.querySelector('img') || document.createElement('img');
          img.src = this.result;
          preview.appendChild(img);

          qr.decode(this.result);
        }.bind(reader), false);
        reader.readAsDataURL(file);
      }
    })*/
  }

  handleFileSelect(e) {
    var file = e.target.files;
    console.log('file', file);
    var span = document.createElement('span');
    span.textContent = file[0].name;
    document.getElementById('preview').appendChild(span);
    this.handleSubmit(file);
  }

  handleSubmit(file) {

    var upload = document.getElementById('upload');
    var preview = document.getElementById('preview');
    var qr = new QrCode();

    qr.callback = function(result, err) {
      var span = document.querySelector('span') || document.createElement('span');
      if (result) {
        span.textContent = result;
      } else {
        span.textContent = 'Sorry, the image could not be deciphered. Try again.';
      }
      preview.appendChild(span);
    }

/*    for (var i = 0; i < upload.files.length; i++) {*/
      //var file = upload.files[i];

      file = file[0];
      
      var imageType = /^image\//;
          
      if (!imageType.test(file.type)) {
        throw new Error('File type not valid');
      }

      var reader = new FileReader();
      reader.addEventListener('load', function() {
  /*          var img = document.querySelector('img') || document.createElement('img');
        img.src = this.result;
        preview.appendChild(img);*/

        qr.decode(this.result);
      }.bind(reader), false);
      reader.readAsDataURL(file);
/*    }*/
  }

  render() {
    return (
      <Card>
        <input id='upload' type='file' accept='image/*;capture=camera' />
        <input type='button' value='submit' onClick={() => this.handleSubmit()}/>
        <div id='preview' style={ previewContainer }></div>
      </Card>
    )
  }
}

export default CameraContainer;