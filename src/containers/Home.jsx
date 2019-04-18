import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadHomeInfo } from '../reducers/home.reducer'

export class Home extends React.Component {

  constructor (props) {
    super (props)
  }

  componentDidMount() {
    this.props.loadHomeInfo()
  }

  render() {
    return (
      <React.Fragment>
        
      </React.Fragment>
    )
  }
}

const mapDispatch = (dispatch) => ({
  loadHomeInfo: () => dispatch(loadHomeInfo())
})

const mapStateToProps = (state) => {
  return {

  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(Home))