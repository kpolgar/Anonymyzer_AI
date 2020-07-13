import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Clarifai from 'clarifai';
import { Container, Row, Col, Button, Input, Label } from 'reactstrap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import BlurFaces from './components/BlurFaces/BlurFaces.js';
import Rank from './components/Rank/Rank.js';
import SignIn from './components/SignIn/SignIn';


const clarifai = new Clarifai.App({apiKey: 'c57564281661483a88b52cc200e8780e'});


export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      threshold: 9,
      image: {},
      data: [],
      smooth: true,
      uploadedFile: null,
      download_button: false,
      route: 'signin'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getDataUri = this.getDataUri.bind(this);
    this.faceDetection = this.faceDetection.bind(this);
   }



  handleChange(event) {
    if(! event.target.files || event.target.files.length < 1) return
    
    const uri = URL.createObjectURL(event.target.files[0]);
    //const file = event.target.files[0];
    console.log('uri', uri)
    this.setState({
      uploadedFile: uri
    })
    const img = new Image();
    
    img.src = uri;
    console.log('this is the uri');
    img.onload = () => {
      this.setState({
        image: {
          uri,
          width: img.width,
          height: img.height,
        }
      })
    }
  }

  handleClick = (event) => {
    console.log('uploadedFile: ', typeof(this.state.uploadedFile));
    this.getDataUri(this.state.uploadedFile, (dataUri) => {
      console.log('detecting face')
      this.faceDetection(dataUri);
    });
  }



  onBlurredImage = () => {
    console.log('updating state about blurring')
    this.setState({download_button: true})
  }

  getDataUri = (url, callback) => {
    //console.log('made it to datauri');
    const image = new Image();
    image.onload = function onload() {
      const canvas = document.createElement('canvas');

      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      console.log(canvas.width)
      console.log(canvas.height)


      canvas.getContext('2d').drawImage(this, 0, 0);
      
      callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
    };

    image.src = url;
  }

  faceDetection(image) {
    console.log('here is the file', this.state.uploadedFile)
    console.log('detecting face')
    clarifai.models.predict(
      Clarifai.FACE_DETECT_MODEL, {base64:image})
      .then(result => {
        
        this.setState({data: result.outputs[0].data.regions})
      })
      .catch(error => console.log(error))
     }   
  
  render() {
    const { image, threshold, data, smooth } = this.state
   
    return (
      <div className="App">
      <Navigation/>
      <Logo />
      { this.state.route === 'signin' 
        ? <SignIn />
        : <div>
            <Rank />
            <h1 className='main-title'>Anonymizer AI</h1>
            <h5 className='directions'><strong>Directions:</strong> Upload an image and press 'blur' to blur all the faces on the image</h5>
            <div className="stage-container">
            <Container className='stage'>
              <Row className="justify-content-md-center">
                <Col md="1">
                  <strong>Smooth</strong>
                </Col>
                <Col md="3">
                  <Label>
                    <Input
                      type="checkbox"
                      id="cb-4"
                      checked={smooth}
                      onChange={e => this.setState(
                        { smooth: e.target.checked }
                      )}
                    />
                    (Will be pixelated if unchecked)
                  </Label>
                </Col>
                <Col md="1">
                  <strong>Threshold</strong>
                </Col>
                <Col md="7">
                  <InputRange
                    step={0.25}
                    maxValue={10}
                    minValue={0}
                    value={threshold}
                    onChange={threshold => this.setState({ threshold })}
                    id="custom_range"
                  />
                </Col>
                <Col md="12" style={{paddingTop: 20}}>
                  <hr></hr>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <div className="uploaded-image">
                    <input
                      onChange={this.handleChange}
                      type="file"
                      backgroundColor="red"
                      accept="image/x-png,image/gif,image/jpeg"
                    />
                    {
                        image.hasOwnProperty("uri") &&
                          <img
                            src={image.uri}
                            alt="upload"
                            style={{maxWidth: "100%", margin: "10px 0px"}}
                          />
                    }
                  </div>
                  {
                    image.hasOwnProperty("uri") &&
                      <Button 
                        onClick={this.handleClick}
                        color="info" 
                        size="lg" 
                        id="blur_button"
                      >
                        Blur Faces
                      </Button>
                  }
                </Col>
                <Col md="6">
                  <BlurFaces
                  image={image}
                  threshold={threshold}
                  data={data}
                  smooth={smooth}
                  width={this.state.width}
                  height={this.state.height}
                  onBlurredImage={this.onBlurredImage}
                  download_button={this.download_button}
                />
                </Col>
              </Row>
            </Container>
            </div>
          </div>
        }
       </div>
     )
  }
}






