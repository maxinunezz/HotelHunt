import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

export default function Carrusel() {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        }
    };

    return (
        <div className="flex justify-center items-center ">
           <Carousel
        containerClass="w-full max-w-5xl"
        responsive={responsive}
        autoPlay
        autoPlaySpeed={3000}
        infinite
      >
                <div className="flex justify-center items-center"><img src="https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_600,q_auto,w_600//itemimages/37/36/37363_v4.jpeg" /></div>
                <div className="flex justify-center items-center"><img src="https://graziamagazine.com/mx/wp-content/uploads/sites/13/2022/11/On-The-Slope-Exterior-Shot-Ultima-Courchevel-Belvedere.jpg"/></div>
                <div className="flex justify-center items-center"><img src="https://cf.bstatic.com/images/hotel/max600/511/51168179.jpg"/></div>
                <div className="flex justify-center items-center"><img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/91/f4/6d/facciata-hotel-montana.jpg?w=600&h=400&s=1"/></div>
                <div className="flex justify-center items-center"> <img src="https://cordoba.datta.capital/wp-content/uploads/2022/06/hotel-ciudad-cordoba-600x400.jpg"/></div>
            </Carousel>
        </div>
    )
}