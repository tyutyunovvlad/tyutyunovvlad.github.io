import React from "react"

class Weather extends React.Component {

    render() {
        return (
            <div className="infoWeath">
                {this.props.city ? 
                    <div>
                        <p>Location: {this.props.city}, {this.props.country}</p>
                        <p>Temperature: {this.props.temp}</p>
                        <p>Pressure: {this.props.pressure}</p>
                        <p>SunSet: {this.props.sunset}</p>
                    </div>
                :
                    <p className="error">{this.props.error}</p>
                }
            </div>
        )
    }
}

export default Weather