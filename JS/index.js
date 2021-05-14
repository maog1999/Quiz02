const descriTarea = document.getElementById("descriTarea");
const btnNuevaTarea = document.getElementById("btnNuevaTarea");
const toDoContainer = document.getElementById("toDoContainer");
const doingContainer = document.getElementById("doingContainer");
const doneContainer = document.getElementById("doneContainer");

addTask = () => {
    if(descriTarea.value === ""){
        alert("Aún no ha ingresado su tarea");
    }else{
        //Espacio para recolectar la info del input y su estado en el que va entrar
        let infoTareaInicial = descriTarea.value;
        let seccion = 'ToDo';

        //Variables para la fecha
        let date = new Date();
        let day = date.getUTCDate();
        let mounth = date.getUTCMonth() + 1;
        let year = date.getUTCFullYear();

        let dateCompleta = day + "-" + mounth + "-" + year;

        let reference = database.ref('task/ToDo').push();

        let newTask = {
            descripcionTarea : infoTareaInicial,
            date : dateCompleta,
            estadoSeccion : seccion,
            id : reference.key,
        }

        //Para vaciar el input despues de la accion
        descriTarea.value = "";
        reference.set(newTask);
    }
}

//To Do
database.ref('task/ToDo').on('value', function(data){
    toDoContainer.innerHTML = '';
    data.forEach(taskN => {
        let taskInfo = taskN.val();
        let taskToDo = new tasks(taskInfo);
        toDoContainer.appendChild(taskToDo.draw());
    });
});

//Doing
database.ref('task/Doing').on('value', function(data){
    doingContainer.innerHTML = '';
    data.forEach(taskN => {
        let taskInfo = taskN.val();
        let taskDoing = new tasks(taskInfo);
        doingContainer.appendChild(taskDoing.draw());
    });
});

//Done
database.ref('task/Done').on('value', function(data){
    doneContainer.innerHTML = '';
    data.forEach(taskN => {
        let taskInfo = taskN.val();
        let taskDone = new tasks(taskInfo);
        doneContainer.appendChild(taskDone.draw());
    });
});
btnNuevaTarea.addEventListener('click',addTask);