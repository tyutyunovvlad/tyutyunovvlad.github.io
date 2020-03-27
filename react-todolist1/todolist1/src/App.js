import React from "react"; 
import Task from './components/Task';
import TaskInput from './components/TaskInput';
import ErrorMessage from './components/ErrorMessage';
import NoTasksMessage from './components/NoTasksMessage';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: [
        {id: 0, title: "1", done: false},
        {id: 1, title: "test2", done: false},
        {id: 2, title: "test3", done: false}
      ],
      showingError: false
    };
  }

  doneTask = id => {
    const index = this.state.tasks.map(task => task.id).indexOf(id);
    this.setState(state => {
      let { tasks } = state;
      tasks[index].done = true;
      return tasks;
    });
  };



  deleteTask = id => this.setState(({ tasks }) => {
    const newTasks = tasks.filter(el => el.id !== id);
    return {tasks: newTasks};
  });
 
  addTask = task => {
    this.setState(state => {
      let { tasks } = state;

      let breakFunction = false;
      tasks.map(someTask => {
        if (someTask.title === task.trim()) {
          breakFunction = true;
        }
        return breakFunction;
      });
      if(breakFunction) {
          state.showingError = true;
          return tasks;
      }

      
      tasks.push({
        id: tasks.length,
        title: task,
        done:false
      });
      
      return tasks;
    });
  };

  closeMessage = () => {
    this.setState(state => state.showingError = false);
  }


  render() {
    const { tasks, showingError } = this.state;
    const activeTasks = tasks.filter(task => !task.done);
    const doneTasks = tasks.filter(task => task.done);
    const hasTasks = tasks[0] !== undefined ? true : false;
    return(
      <div className="App">
        <h1 className="top">Active tasks: {activeTasks.length}</h1>
        <div className="tasks__wrapper">
        <NoTasksMessage hasTasks={hasTasks}></NoTasksMessage>
          {activeTasks.map(task => (
            <Task
              doneTask = {() => this.doneTask(task.id)} 
              task={task}
              key={task.id}
            ></Task>
            )
          )}
          

          {doneTasks.map(task => (
            <Task 
              deleteTask = {() => this.deleteTask(task.id)}       
              task={task} 
              key={task.id}
            ></Task>
            )
          )}
        </div>

          <TaskInput 
            addTask = {this.addTask}
            showingError={showingError}
          ></TaskInput>
          <ErrorMessage 
            showingError={showingError}
            closeMessage = {this.closeMessage}
          ></ErrorMessage>
      </div>
    )
  }
}
export default App;
