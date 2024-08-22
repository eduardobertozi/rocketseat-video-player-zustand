import { Provider as ReduxProvider } from 'react-redux'
import { AddTodo } from './components/add-todo'
import { TodoList } from './components/todo-list'
import { store } from './store'

export function App() {
  return (
    <ReduxProvider store={store}>
      <TodoList />
      <AddTodo />
    </ReduxProvider>
  )
}
