import React from 'react'

const Arrow = ({ direction, actions }) => {
  const onActivate = actions[direction]
  return (
    <div className={`arrow-${direction}`}>
      <button onClick={onActivate}>
        <i className={`fas fa-chevron-${direction}`} />
      </button>
    </div>
  )
}

export default Arrow
