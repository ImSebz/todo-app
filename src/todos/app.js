import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';


const ElementIds = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilter: '.filter',
    PendingCount: '#pending-count',
};

/**
 * 
 * @param {String} elementId 
 */

export const App = (elementId) => {


    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIds.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(ElementIds.PendingCount);
    }

    // Cuando la función se autoinvoca, se ejecuta el código que está dentro de ella
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).appendChild(app);
        displayTodos();
    })();

    //Referencias HTML

    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
    const todoListUL = document.querySelector(ElementIds.TodoList);
    const clearCompletedBtn = document.querySelector(ElementIds.ClearCompleted);
    const filtersLI = document.querySelectorAll(ElementIds.TodoFilter);
    //Listeners

    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode != 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        newDescriptionInput.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        const dataID = element.getAttribute('data-id');
        // console.log(dataID);
        todoStore.toggleTodo(dataID);
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {

        const isDestroy = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        const dataID = element.getAttribute('data-id');

        if (!element || !isDestroy) return;

        todoStore.deleteTodo(dataID);
        displayTodos();

    });

    clearCompletedBtn.addEventListener('click', () => {
        todoStore.deleteCompletedTodo();
        displayTodos();
    });

    filtersLI.forEach(element => {
        element.addEventListener('click', (e) => {
            filtersLI.forEach(el => el.classList.remove('selected'));
            e.target.classList.add('selected');

            switch (e.target.id) {
                case 'todos-filter':
                    todoStore.setFilter(Filters.All);
                    break;

                case 'pendientes-filter':
                    todoStore.setFilter(Filters.Pending);
                    break;

                case 'completados-filter':
                    todoStore.setFilter(Filters.Completed);
                    break;
            }

            displayTodos();
        });
    });


} 