import React from "react";

class NoTasksMessage extends React.Component {
    constructor(...props) {
        super();
    }

    render() {
        const className = 'noTasksMessage ' + (!this.props.hasTasks ? 'isShowing' : '')
        return (
            <div  className={className}>                
                <p>{`No tasks yet`}</p>
            </div>
        )
    }

}

export default NoTasksMessage;