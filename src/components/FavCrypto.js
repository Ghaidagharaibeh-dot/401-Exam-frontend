import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import{Card,Row,Col,Button,Modal}  from 'react-bootstrap'


class FavCrypto extends React.Component {
  constructor(props){
    super(props);
    this.state={
      crrArr:[],
      modelShow:false
  
    }
  }

  getDataFavfun=async()=>{
    const {user}=this.props.auth0

    await axios.get(`http://localhost:3010/getFavData?email=${user.email}`)
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
     this.getDataFavfun();
   }


deletefun=async(id)=>{
  const {user}=this.props.auth0;
  axios.delete(`http://localhost:3010/deleteData/${id}?email=${user.email}`)
  .then((result)=>{
    this.setState({
      crrArr:result.data
    })
  })
  .catch((err)=>{
    this.setState({
      err:err
    })
   })

}

showUpdateModel=(id,description,toUSD,image_url)=>{
this.setState({
  updateData:{
    id:id,
    description:description,
    toUSD:toUSD,
    image_url:image_url,
  },
  modelShow:true,
})
}

hideUpdateModel=()=>{
  this.setState({
    modelShow:false,

  })
}
updateCrrData=(e)=>{
  e.preventdefault ();
  const {user}=this.props.auth0;
  const updatedData={
    email:user.email,
    description:e.target.description.value,
    toUSD:e.target.toUSD.value,
    image_url:e.target.image_url.value,
}
axios.put(`http://localhost:3010/updateData/${this.state.updateData.id}`,updatedData)
.then((result)=>{
  this.setState({
    crrArr:result.data
  })
})

}


  render() {
    return(
      <>
        <h1>Fav Crypto List</h1>
        <Modal show={this.state.modelShow} onHide={this.hideUpdateModel} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Form</Modal.Title>
        </Modal.Header>
<form onSubmit={this.updateCrrData}>
<label>description</label>
<input type='text' defaultValue={this.state.updateData.description} name='description'></input>
<label>toUSD</label>
<input type='text' defaultValue={this.state.updateData.toUSD} name='toUSD'></input>
<label>description</label>
<input type='text' defaultValue={this.state.updateData.image_url} name='image_url'></input>
<input type='submit' value='Update' ></input>
</form>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.hideUpdateModel}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
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
<button onClick={()=>{this.deletefun(item._id,item.description,item.toUSD,item.image_url)}}>Delete</button>
<button onClick={()=>{this.showUpdateModel(item._id,item.description,item.toUSD,item.image_url)}}>Update</button>

            </Card>
          </Col>
          })

          }

        </Row>
      </>
    )
  }
}

export default withAuth0(FavCrypto);