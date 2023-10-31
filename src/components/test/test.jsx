import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRemoteData } from "../../store/orders";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addToOrders, removeFromOrders,updateOrder } from "../../store/orders";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function ProductList(props) {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToOrders(item));
  };

  
  console.log("cart state", props.cartReducer);
  useEffect(() => {
    props.getRemoteData();
  }, []);

  return (
    <div>
      <Header />
      <Categories />
      <Simplecart/>
    
<div style={{ display: "flex", flexWrap: "wrap", marginTop:'20PX' }}>
      <h1>Product List</h1>
</div>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop:'20PX' }}>
        {props.orders.map((product, idx) => (
          <div key={idx} style={{ margin: "100px" }}>
            <Card sx={{
                maxWidth: 500,
                height:800,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 1)", 
                border:"solid 5px #FF3C5A",
                borderRadius: "8px",
                backgroundColor:"#0C7592"
              }}>
              <CardMedia
                sx={{ height: 500, width: 500 }}
                image={product.image}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
             
                <Typography variant="body2" color="text.secondary">
                  <h4>price:{product.price} </h4>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <h4>in stock :{product.inventory} items available</h4>
                </Typography>
              </CardContent>

              <CardActions>
                <Button onClick={() => handleAddToCart(product)} sx={{
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 1)", 
                border:"solid 1px #FF3C5A",
                borderRadius: "8px",
                backgroundColor:"white"
              }}>
                  Add to Cart
                </Button>

                <Button  sx={{
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 1)", 
                border:"solid 1px #FF3C5A",
                borderRadius: "8px",
                backgroundColor:"white"
              }}>
                  <Link to={`/ProductDetails/${product.id}`}>MORE DETAILS</Link>
                </Button>
              </CardActions>
         
            </Card>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  orders: state.orders,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProducts()),
  reset: () => dispatch({ type: "RESET" }),
  selectCategory: selectCategory,
  addToCart: () => dispatch(addToCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
