let checked = document.querySelectorAll('.todo');

let deleteBtn = document.getElementById('delete');


let toDoText = document.querySelectorAll('.todo-text');
let todoslist = document.querySelector('.todolist');
let searchInput = document.getElementById('search');

let sort = document.getElementById('sortbar');

let inputText = document.getElementById('add-newtask');

let formToDo = document.getElementById('add-task')

let addCounter = 0;

deleteDone(todoslist)



formToDo.addEventListener('submit', e => {
    e.preventDefault();

    let inputValue = inputText.value;
    let liToDo = document.querySelectorAll('.todoitem')
    addTodoTask(inputValue);

    inputText.value = '';
});


function lineThrough(event) {

    if (event.target.type === 'checkbox') {

        if (!event.target.checked) {
            event.target.nextElementSibling.style.textDecoration = '';
        } else {

            event.target.nextElementSibling.style.textDecoration = 'line-through';
            event.target.nextElementSibling.style.textDecorationThickness = '5px';
            event.target.nextElementSibling.style.textDecorationColor = '#363839'
        }
    }
}


function addTodoTask(text) {
    if (text && text != ' ') {
        let toDo = `<li class="todoitem" data-sort="${addCounter}">
        <input type="checkbox"  class="todo" name="todo" value="todo">
        <span class="todo-text">${text} </span>
        <button class="delete">Delete</button>
        </li>`

        addCounter++;

        todoslist.innerHTML += toDo;

        todoslist.addEventListener('click', lineThrough);

        deleteDone(todoslist)

    }
}


function deleteDone(parentElement) {
    parentElement.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
        }
    })
}


const filterList = (searchValue) => {
    let lists = todoslist.querySelectorAll('li');
    lists.forEach(list => {
        let listText = list.innerText.toLowerCase();
        if (listText.indexOf(searchValue) != -1) {
            list.classList.remove('filtered');
        } else {
            list.classList.add('filtered');
        }
    })
}
searchInput.addEventListener('keyup', e => {
    let searchText = e.target.value.trim().toLowerCase();
    filterList(searchText);
})

sort.addEventListener('change', sortToDo);

function sortToDo() {
    if (sort.value == 'newest') {

        let toDoTasks = [...todoslist.querySelectorAll('.todoitem')];
        toDoTasks.sort((a, b) => {
            let aSort = parseInt(a.getAttribute('data-sort'));
            let bSort = parseInt(b.getAttribute('data-sort'));
            return bSort - aSort;
        });
        todoslist.innerHTML = '';
        toDoTasks.forEach(task => {
            todoslist.appendChild(task);
        });


        console.log('1')
    } else {
        let toDoTasks = [...todoslist.querySelectorAll('.todoitem')];
        toDoTasks.sort((a, b) => {
            let aSort = parseInt(a.getAttribute('data-sort'));
            let bSort = parseInt(b.getAttribute('data-sort'));
            return aSort - bSort;
        });
        todoslist.innerHTML = '';
        toDoTasks.forEach(task => {
            todoslist.appendChild(task);
        });
        console.log('2')

    }

}