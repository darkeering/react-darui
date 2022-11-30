import React, { Component } from 'react';
import { Carousel, CarouselItem } from 'react-darui';

export default class index extends Component {
  render() {
    return (
      <div style={{width: '500px'}}>
        <Carousel>
          <CarouselItem>111</CarouselItem>
          <CarouselItem>222</CarouselItem>
          <CarouselItem>333</CarouselItem>
          <CarouselItem>444</CarouselItem>
          555
        </Carousel>
      </div>
    );
  }
}
