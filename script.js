// Obtener elementos del DOM
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Obtener la lista de tareas almacenada en el almacenamiento local
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Función para renderizar la lista de tareas
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((taskText) => {
    const newTask = document.createElement('li');
    newTask.innerText = taskText;

    // Marcar tarea como completada al hacer clic en ella
    newTask.addEventListener('click', function () {
      this.classList.toggle('completed');
      updateLocalStorage();
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<img src="/papelera.png" alt="Eliminar" class="icon-delete">';
    //deleteButton.innerText = 'Eliminar';
    deleteButton.classList.add('btn', '##', '##');
    deleteButton.addEventListener('click', function () {
      const taskIndex = tasks.indexOf(taskText);
      tasks.splice(taskIndex, 1);
      renderTasks();
      updateLocalStorage();
    });

    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);
  });
}

// Función para agregar una nueva tarea
function addTask() {
  const taskText = taskInput.value;

  if (taskText.trim() !== '') {
    tasks.push(taskText);
    renderTasks();
    updateLocalStorage();
    taskInput.value = '';
  }
}

// Función para actualizar los datos en el almacenamiento local
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Escuchar evento de clic en el botón "Agregar"
addTaskBtn.addEventListener('click', addTask);

// Escuchar evento de presionar la tecla Enter en el campo de entrada
taskInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Renderizar las tareas al cargar la página
renderTasks();
