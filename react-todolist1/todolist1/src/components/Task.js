/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';

class Task extends React.Component {
    constructor(...props) {
        super();
    }

    render() {
        const className = 'task ' + (this.props.task.done ? 'done' : '');
        
        return(
            <div className={className}>
                <p>{this.props.task.title}</p>
                    <div className="action-btn">
                        {!this.props.task.done ? (
                            
                            <p onClick={() => {
                                this.props.doneTask();
                                
                            }}>✔️</p>
                        ) : (
                            <p onClick={() => {
                                this.props.deleteTask();
                                
                            }}>❌</p>
                        )}
                    </div>
            </div>
        )
    }
    
}



// const Task = ({task, ...props}) => {

//     const ActionBtn = () => (
//         <div className="action-btn">
//             {!task.done ? (
                
//                 <p onClick={() => {
//                     props.doneTask();
                    
//                 }}>✔️</p>
//             ) : (
//                 <p onClick={() => {
//                     props.deleteTask();
                    
//                 }}>❌</p>
//             )}
//         </div>
//     ); 
//     //✔️

//     const className = 'task ' + (task.done ? 'done' : '');

//     return(
//         <div className={className}>
//             <p>{task.title}</p>
//             <ActionBtn></ActionBtn>
            
//         </div>
//     );
// };


export default Task;