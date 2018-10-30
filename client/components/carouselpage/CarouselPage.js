import React, { Component } from 'react'

import Carousel from '../partials/Carousel'

class CarouselPage extends Carousel {
  constructor() {
    super()
    this.state = {
      loading: true,
      flashcards: null,
    }
  }

  componentDidMount() {
    fetch('/api/flashcards?start=0&count=5')
      .then(res => res.json())
      .then(jsonRes => {
        !this.isCancelled && this.setState({
          loading: false,
          flashcards: jsonRes.data.flashcards
        })
      })
      .catch(err => console.warn(err))
  }

  componentWillUnmount() {
    this.isCancelled = true
  }

  render() {
    const { loading, flashcards } = this.state
    return (
      <div>
        {!loading && <Carousel slides={flashcards} itemWidth={400} />}
      </div>
    )
  }
}

export default CarouselPage