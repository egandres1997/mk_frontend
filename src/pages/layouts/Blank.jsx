import React from 'react';

class Blank extends React.Component {

    render() {
        return (
            <this.props.component />
        )
    }

    componentDidMount(){
        $('body').addClass('gray-bg');
    }

    componentWillUnmount(){
        $('body').removeClass('gray-bg');
    }
}

export default Blank