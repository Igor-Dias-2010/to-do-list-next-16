"use client"

import { useState } from "react"

export default function List() {
    const [tasks, setTasks] = useState([])
    const [input, setInput] = useState('')
    const [error, setError] = useState('')
    const maxCharacters = 30

    const handleInputChange = e => setInput(e.target.value)
    const handleEnterToAdd = e => { if (e.key === 'Enter') addTask() }

    const addTask = () => {
        if (input.trim() === '') {
            setError('Task cannot be empty')
            setTimeout(() => setError(''), 3000)
            return
        }
        setTasks([...tasks, input])
        setInput('')
        setError('')
    }
    const clearAll = () => {
        setError('')
        setTasks([])
        setInput('')
    }
    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index))
    }
    return (
        <div>
            <h1>To-do list</h1>
            {error && <p className="empty">{error}</p>}
            <div className="main">
                <p className="counter">{`${input.length}/${maxCharacters} characters`}</p>
                <p className="counter">You have <span className="task-number">{tasks.length}</span> task(s)</p>
                <input type="text" placeholder="Type a task" value={input} onChange={handleInputChange} onKeyDown={handleEnterToAdd} maxLength={maxCharacters} />
                <button onClick={addTask}>Add</button>
                <button onClick={clearAll}>Clear all</button>
            </div>

            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>{task} <button onClick={() => deleteTask(index)} className="li-button">Delete</button></li>
                ))}
            </ul>
        </div>
    )
}