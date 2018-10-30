import React, { Component } from 'react'

import Slide from './Slide'
import Arrow from './Arrow'

class Carousel extends Component {
  constructor() {
    super()
    this.state = {
      atMinimumPosition: true,
      atMaximumPosition: false,
      scrollPosition: 0,
      mediumUp: true,
    }
  }

  setRef = (el, name) => {
    this[name] = el
  }

  setFocus = (name) => {
    this[name].focus()
  }

  onNext = () => {
    const { itemWidth, slides } = this.props;
    const toScroll = this.viewport;
    const currOffset = -this.state.scrollPosition;
    const width = toScroll.offsetWidth;
    const maxOffset = width - (itemWidth * 2);
    const newOffset = maxOffset > currOffset ? -currOffset - itemWidth : -currOffset;
    this.setState({
      atMaximumPosition: currOffset + itemWidth >= maxOffset,
      atMinimumPosition: false,
      scrollPosition: newOffset,
    });
  }

  onPrev = () => {
    const { itemWidth } = this.props;
    const currOffset = -this.state.scrollPosition;
    const newOffset = currOffset > 0 ? -currOffset + itemWidth : 0;
    this.setState({
      atMaximumPosition: false,
      atMinimumPosition: newOffset === 0,
      scrollPosition: newOffset,
    });
  }

  render() {
    const { slides } = this.props
    const { mediumUp, scrollPosition } = this.state
    const actions = {
      left: this.onPrev,
      right: this.onNext
    }

    const tocStyle = {
      transform: mediumUp ? `translateX(${scrollPosition}px)` : 'none',
    };

    return (
      <div className="carousel">
        <Arrow direction="left" actions={actions} />
        <div className="slides-container" ref={el => this.setRef(el, 'viewport')} style={tocStyle}>
          {slides.map((slide, idx) => (
            <Slide data={slide} key={slide.id} scrollPosition={scrollPosition} idx={idx} />
          ))}
        </div>
        <Arrow direction="right" actions={actions} />
      </div>
    )
  }
}

export default Carousel
