import React from 'react';

const styles = {
	position: "absolute",
	top: "15px",
	right: "15px",
	zIndex: 1001
}

class Toast extends React.PureComponent {
  render() {
		if (this.props.action.shouldItBeSeen && this.props.action.actionStatus === 500) {
	    return (
	      <div className="alert alert-danger" style={styles}>
	      	{this.props.action.actionMessage}
	      </div>
	    )
		}
		return null
  }
}

export default Toast