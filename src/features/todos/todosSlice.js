const initialState = [
  { id: 0, text: 'Learn React', completed: true },
  { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
  { id: 2, text: 'Bild something fun!', completed: false, color: 'blue' },
]

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    // Can return just the new todos array - no extra object around it
    case 'todos/todoAdded': {
      return [
        ...state,
        {
          id: nextTodoId(state.todos),
          text: action.payload,
          completed: false,
        },
      ]
    }
    case 'todos/todoToggled': {
      return [
        state.map((todo) => {
          if (todo.id !== action.payload) {
            return todo
          }

          return {
            ...todo,
            completed: !todo.completed,
          }
        }),
      ]
    }
    case 'todos/colorSelected': {
      return [
        state.map(todo => {
          if (todo.id !== action.payload.todoId) {
            return todo
          }

          return {
            ...todo,
            color: action.payload.color
          }
        })
      ]
    }
    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== action.payload.todoId)
    }
    case 'todos/allCompleted': {
      return state.map((todo) => {
        return {
          ...todo,
          completed: true
        }
      })
    }
    case 'todos/completedCleared': {
      return state.filter((todo) => !todo.completed)
    }
    default:
      return state
  }
}
