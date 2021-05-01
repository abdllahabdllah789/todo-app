import React from 'react'
import Task from './Task'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
const Tasks = ({ tasks, onDelete, onToggle }) => {
    return (
        <div>
            <TransitionGroup className="todo-list">
                {tasks.map((task) => (
                    <CSSTransition
                        key={task.id}
                        timeout={500}
                        classNames="item"
                    >
                        <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
}

export default Tasks
