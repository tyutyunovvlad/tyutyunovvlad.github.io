import React from "react";

class ErrorMessage extends React.Component {
    constructor(...props) {
        super();
    }

    render() {
        const className = 'message ' + (this.props.showingError ? 'isShowing' : 'kek');
        return (
            <div  className={className}>                
                <div><p>{'This task is already created'}</p></div>
                <div onClick={() => {this.props.closeMessage()}}><span>{'❌'}</span></div>
            </div>
        )
    }

}

export default ErrorMessage;