import Carousel from 'react-bootstrap/Carousel'
import img1 from '../../assets/img/banner/banner-1.png'
import img2 from '../../assets/img/banner/banner-2.png'
import img3 from '../../assets/img/banner/banner-3.png'
const Banner = () => {
    return ( 
        
        <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img1}
            style={{width:1000,height:500}}
            alt="First slide"
          />
          {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            style={{width:1000,height:500}}
            alt="Second slide"
          />
      
          {/* <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3}
            style={{width:1000,height:500}}
            alt="Third slide"
          />
      
          {/* <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
      </Carousel>

     );
}
 
export default Banner;