import React, { Component } from 'react'

class ScrollLoader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isNavigatingWithTabs: false
    }

    window.onscroll = () => {
      const {
        onHitBottom,
        isLoading
      } = this.props

      const { isNavigatingWithTabs } = this.state

      if (isLoading || isNavigatingWithTabs) return

      if (
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
      ) onHitBottom()
    }
  }

  setNavigationStyle = (e) => e.key === 'Tab' && this.setState({ isNavigatingWithTabs: true })

  render() {
    const { isNavigatingWithTabs } = this.state
    const tabHandler = isNavigatingWithTabs ? {} : { onKeyDownCapture: this.setNavigationStyle }
    const { onHitBottom } = this.props
    return (
      <div {...tabHandler} >
        {this.props.children}
        {isNavigatingWithTabs && (
          <button onClick={onHitBottom}>Load More</button>
        )}
      </div>
    )
  }
}

export default ScrollLoader
