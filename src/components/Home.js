import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import{Card,Row,Col,Button}  from 'react-bootstrap'

class Home extends React.Component {
constructor(props){
  super(props);
  this.state={
    crrArr:[],

  }
}

getDatafun=async()=>{

 await axios.get(`http://localhost:3010/getDat`)
  .then((result)=>{
    this.setState({
      crrArr:result.data
    })
    console.log(this.state.crrArr)
  })
  .catch((err)=>{
   this.setState({
     err:err
   })
  })
  

}

componentDidMount=()=>{
  this.getDatafun();
}


addDatafun=async(description,toUSD,image_url)=>{
const {user}=this.props.auth0
const crrData={
  email:user.email,
  description:description,
  toUSD:toUSD,
  image_url:image_url
}
await axios.part(`http://localhost:3010/addDat`,crrData)
.then((result)=>{
 console.log(result.status);
})


}

  render() {
    return (
      <>
        <h1>Crypto List</h1>
        <Row xs={1} md={4} className="g-4">
          {this.state.crrArr && this.state.crrArr.map((item)=>{
            <Col>
            <Card>
              <Card.Img variant="top" src={item.image_url} />
              <Card.Body>
                <Card.Title>{item.toUSD}</Card.Title>
                <Card.Text>
                {item.description}
                </Card.Text>

              </Card.Body>
<button onClick={()=>{this.getDatafun(item.description,item.toUSD,item.image_url)}}></button>
            </Card>
          </Col>
          })

          }

        </Row>
      </>
    )
  }
}

export default withAuth0(Home);