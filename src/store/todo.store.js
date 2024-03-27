import { Todo } from "../todos/models/todos.model"


export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
};

const state = {
    todos: [
        // new Todo('Terminar JavaScript Moderno'),
        // new Todo('Terminar SQL de cero'),
        // new Todo('Terminar TypeScript'),
        // new Todo('Terminar React cero a experto'),
        // new Todo('Terminar NodeJS'),
    ],
    filter: Filters.All,
};

const initStore = () => {
    loadStore();
    console.log('InitStore');
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;

    // console.log(JSON.parse(localStorage.getItem('state'))); 

    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {

    localStorage.setItem('state', JSON.stringify(state));
};


const getTodos = (filter = Filters.All) => {

    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Opción ${filter} no es válida.`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description) throw new Error('La descripción es obligatoria');

    state.todos.push(new Todo(description));
    saveStateToLocalStorage();

}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {

    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

const deleteCompletedTodo = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}


export default {
    addTodo,
    deleteCompletedTodo,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}