import React, { useState } from 'react'
import { Transition, animated } from "react-spring";
const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);
    const [error, setError] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            setError(true);
            return
        }
        onAdd({ text, day, reminder });
        setText('');
        setDay('');
        setReminder(false);
    }
    return (
        <>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Task</label>
                    <input type='text' placeholder='Add task' value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label>Date</label>
                    <input type='text' placeholder='add Day and time' value={day} onChange={(e) => setDay(e.target.value)} />
                </div>
                <div className='form-control form-control-check'>
                    <label>Set Reminder</label>
                    <input type='checkbox' value={reminder} checked={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
                </div>
                <input type='submit' value='Save task' className='btn btn-block' />
                <Transition
                    native
                    items={error}
                    from={{ opacity: 0 }}
                    enter={{ opacity: 1 }}
                    leave={{ opacity: 0 }}
                >
                    {show =>
                        show &&
                        (props => (
                            <animated.div style={props}>
                                <div id="myModal" className="modal">
                                    <div className="modal-content">
                                        <span className="close" onClick={() => setError(false)}>&times;</span>
                                        <p>Please add some text</p>
                                    </div>

                                </div>
                            </animated.div>
                        ))
                    }
                </Transition>

            </form>
        </>
    )
}

export default AddTask
