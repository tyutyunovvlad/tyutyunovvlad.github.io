import React from "react"

class Form extends React.Component {

    render() {
        return (
            <div className="Form">
                <form onSubmit={this.props.getWeather}>
                    <input type="text" name="city" placeholder="Город"></input>
                    <button>Получить погоду</button>
                </form>
            </div>
        )
    }
}

export default Form