import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import TaskItem from './components/features/TaskItem/TaskItem'
import Button from './components/features/Button/Button'
import Input from './components/features/Input/Input'
import { ITask } from './model/model'
import Title from './components/features/Title/Title/Title'
import Loader from './components/shared/Loader/Loader'

function App() {
  const LOCAL_TASKS = localStorage.getItem('localTasks') ?? ''

  const [tasks, setTasks] = useState<ITask[]>(
    !!LOCAL_TASKS.length ? JSON.parse(LOCAL_TASKS) : []
  )
  console.log({ tasks })

  const [inputText, setInputText] = useState('')
  const [inputNumber, setInputNumber] = useState(1) // для запроса из jsonPlaceholder
  const [isSearch, setIsSearch] = useState(
    !!LOCAL_TASKS ? JSON.parse(LOCAL_TASKS) : []
  ) // для поиска задач
  const [tasksSearch, setTasksSearch] = useState<ITask[]>(
    !!LOCAL_TASKS ? JSON.parse(LOCAL_TASKS) : []
  )
  const [searchText, setSearchText] = useState('')
  const [isTaskLoading, setIsTaskLoading] = useState(false)

  const API_URL = `https://jsonplaceholder.typicode.com/todos/?_limit=${inputNumber}`

  // ==============fetch=============
  const fetchPost = async () => {
    setIsTaskLoading(true)
    setTimeout(async () => {
      if (inputNumber >= 1 && inputNumber <= 200) setInputNumber(inputNumber)

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/?_limit=${inputNumber}`
      )
      const data = await response.json()

      let difference = data.filter(
        (item: ITask) => !tasks.find((task) => task.id === item.id)
      )

      if (data) {
        if (!!difference) {
          setTasks([...tasks, ...difference])
          localStorage.setItem(
            'localTasks',
            JSON.stringify([...tasks, ...difference])
          )
        } else {
          return
        }
      }
      setIsTaskLoading(false)
    }, 1000)
  }

  useEffect(() => {
    if (localStorage.getItem('localTasks')) {
      const storedList = JSON.parse(localStorage.getItem('localTasks') ?? '')
      setTasks(storedList)
    }
  }, [])

  //  ===================Tasks========
  const addNewTask = () => {
    if (inputText === '') alert('Вы должны ввеcти задачу')

    if (!inputText.trim()) return

    const newTask: ITask = {
      id: Date.now(),
      title: inputText,
      completed: false,
    }

    setTasks([...tasks, newTask])
    setInputText('') //обнуление инпута после ввода
    localStorage.setItem('localTasks', JSON.stringify([...tasks, newTask]))
  }
  // ============задачи=================
  const saveData = (tasks: ITask[]) => {
    setTasks(tasks)
    localStorage.setItem('localTasks', JSON.stringify(tasks))
  }

  const deleteTask = (id: number) => {
    if (!id) return

    const deleted = tasks.filter((t) => t.id !== id)
    saveData(deleted)
  }

  const checkedText = (id: number) => {
    const checked = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    )
    saveData(checked)
  }

  // ===========поиск========
  const filterTasks = useCallback(
    (searchText: string) => {
      if (!searchText) {
        setIsSearch(false)
        return
      } else {
        setIsSearch(true)
        return tasks.filter((t) =>
          t.title.toLowerCase().includes(searchText.toLowerCase())
        )
      }
    },
    [tasks]
  )
  useEffect(() => {
    const Debounce = setTimeout(() => {
      const filterText = filterTasks(searchText)
      setTasksSearch(filterText ?? [])
    }, 300)
    return () => clearTimeout(Debounce)
  }, [filterTasks, searchText])
  // ===========request=============

  const request = (inputNumber: number) => {
    if (inputNumber >= 1 && inputNumber <= 200) setInputNumber(inputNumber)
    return fetchPost
  }

  const taskList = isSearch
    ? tasksSearch.map((task, index) => (
        <TaskItem
          deleteItem={deleteTask}
          checked={checkedText}
          number={index + 1}
          task={task}
          key={task.id}
        />
      ))
    : tasks.map((task, index) => (
        <TaskItem
          deleteItem={deleteTask}
          checked={checkedText}
          number={index + 1}
          task={task}
          key={task.id}
        />
      ))

  return (
    <div key="app" className="App">
      <div className="box">
        <Title />
        <div className="wrapper">
          {/* =========задачи========= */}
          <Input
            value={inputText}
            keyPress={addNewTask}
            setInputText={setInputText}
            placeholder={'Введите задачу'}
            type={'text'}
          />
          <Button addItem={addNewTask}>Добавить задачу</Button>
          {/* =========поиск========= */}
          <Input
            value={searchText}
            keyPress={filterTasks}
            setInputText={setSearchText}
            placeholder={'Поиск'}
            type={'text'}
          />
          <Button addItem={filterTasks}>найти</Button>
          {/* =========запрос========= */}
          <Input
            value={inputNumber}
            keyPress={fetchPost}
            setInputText={setInputNumber}
            placeholder={'Введите номер'}
            type={'number'}
          />
          <Button addItem={fetchPost}>Запросить</Button>
        </div>
        <div className="task__wrapper">
          {isTaskLoading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '30px',
              }}
            >
              <Loader />
            </div>
          ) : (
            taskList
          )}
        </div>
      </div>
    </div>
  )
}
export default App
