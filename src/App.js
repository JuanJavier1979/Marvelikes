import React, { Component } from 'react';
import { Segment, Menu, Grid, Container, Header, Dimmer, Loader, Card, Image } from 'semantic-ui-react'

const public_key = 'YOUR_PUBLIC_KEY';
const private_key = 'YOUR_PRIVATE_KEY';

const crypto = require('crypto');
const ts = new Date().getTime();
const data = ts + private_key + public_key;
const hash = crypto.createHash('md5').update(data).digest("hex");

class CardExample extends Component {
  render() {
    return (
      <Card className="item-card">
        <Image src={this.props.thumb.path+'/portrait_xlarge.'+this.props.thumb.extension} alt="" />
        <Card.Content>
          <Card.Header>
            {this.props.title}
          </Card.Header>
        </Card.Content>
      </Card>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {comics: {}}
  }

  componentDidMount() {
    var that = this;
    const marvelAPI = 'https://gateway.marvel.com/v1/public/comics?orderBy=-onsaleDate&apikey='+public_key+'&ts='+ts+'&hash='+hash;

    fetch(marvelAPI)
    .then((resp) => resp.json())
    .then(function(data){
      that.setState({
        comics: data
      })
    })
  }
    
  render() {
    return (
      <div className="App" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
        <Segment inverted color='red' size='big' style={{marginBottom: 20, borderRadius: 0, textAlign: 'center'}}>Marvelikes</Segment>
        {this.state.comics.data ?
        <Grid container className="main">
        {this.state.comics.data && this.state.comics.data.results.map(comic => 
          <Grid.Column key={comic.id} mobile={16} tablet={8} computer={4}>
            <CardExample key={comic.id} title={comic.title} thumb={comic.thumbnail} />
          </Grid.Column>
        )}
        </Grid> : 

        <Dimmer active inverted style={{flex: 1, position: 'relative'}}>
          <Loader inverted content='Loading' />
        </Dimmer>
        }

        <Segment inverted vertical style={{ padding: '5em 0em', marginTop: 20 }}>
          <Container text>
            <Header
              as='h3'
              inverted
              content={this.state.comics.attributionText}
              style={{textAlign: 'center'}}
            />
          </Container>
          <Container style={{textAlign: 'center'}}>
            <Menu inverted compact size='large' style={{marginTop: 20}}>
              <Menu.Item as='a'>Terms & Conditions</Menu.Item>
              <Menu.Item as='a'>Privacy</Menu.Item>
              <Menu.Item as='a'>FAQ</Menu.Item>
            </Menu>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default App;
