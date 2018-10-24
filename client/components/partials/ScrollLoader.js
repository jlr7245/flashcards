import React, { Component } from 'react'

class ScrollLoader extends Component {
  constructor(props) {
    super(props)
    window.onscroll = () => {
      const {
        onHitBottom,
        isLoading
      } = this.props

      if (isLoading) return

      if (
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
      ) onHitBottom()
    }
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default ScrollLoader
