class tasks {

    constructor (task){
        this.task = task;
    }
    
    anteriorEtapa = () => {
        //Almacenando variables del index
        let id = this.task.id;
        let seccion = this.task.estadoSeccion;
        //console.log(seccion);

        database.ref('task/' + seccion + '/' + id).set(null);

        if(seccion === "Doing"){
            let key = this.task.id;
            let date = this.task.date;
            let seccion = 'ToDo';
            let infoTareaInicial = this.task.descripcionTarea;

            let newTaskToDo = {
                descripcionTarea : infoTareaInicial,
                date : date,
                estadoSeccion : seccion,
                id : key,
            }

            database.ref('task/ToDo/' + key).set(newTaskToDo);
        }else{
            let key = this.task.id;
            let date = this.task.date;
            let seccion = 'Doing';
            let infoTareaInicial = this.task.descripcionTarea; 

            let newTaskDoing = {
                descripcionTarea : infoTareaInicial,
                date : date,
                estadoSeccion : seccion,
                id : key,
            }

            database.ref('task/Doing/' + key).set(newTaskDoing);
        }
    }


    siguienteEtapa = () => {
        //Almacenando variables del index
        let id = this.task.id;
        let seccion = this.task.estadoSeccion;
        //console.log(seccion);
        database.ref('task/' + seccion + '/' + id).set(null);

        if(seccion === "ToDo"){
            console.log("entro");

            let key = this.task.id;
            let date = this.task.date;
            let seccion = 'Doing';
            let infoTareaInicial = this.task.descripcionTarea;

            let newTaskToDo = {
                descripcionTarea : infoTareaInicial,
                date : date,
                estadoSeccion : seccion,
                id : key,
            }
            console.log(id);

            database.ref('task/Doing/' + key).set(newTaskToDo);
        }else{
            let key = this.task.id;
            let date = this.task.date;
            let seccion = 'Done';
            let infoTareaInicial = this.task.descripcionTarea; 

            let newTaskDoing = {
                descripcionTarea : infoTareaInicial,
                date : date,
                estadoSeccion : seccion,
                id : key,
            }

            database.ref('task/Done/' + id).set(newTaskDoing);
        }
    }

    eliminarTask = () => {
        let seccion = this.task.estadoSeccion;
        let id = this.task.id;

        database.ref('task/' + seccion + '/' + id).set(null);
    }

    draw = () => {
        //console.log("viva el emo");
        let taskContainer = document.createElement('div');
        taskContainer.className = "taskContainer";

        let dateElement = document.createElement('small');
        dateElement.className = "dateElement";
        dateElement.innerHTML = this.task.date;

        let descripcionElement = document.createElement('p');
        descripcionElement.className = "descripcionElement";
        descripcionElement.innerHTML = this.task.descripcionTarea;


        //Botones de las cards
        let btnAnterior = document.createElement('button');
        btnAnterior.className = "btnAnteriorr";

        let btnSiguiente = document.createElement('button');
        btnSiguiente.className = "btnSiguientee";

        let btnEliminar = document.createElement('button');
        btnEliminar.className = "btnEliminarr";

        console.log(this.task.estadoSeccion);

        switch(this.task.estadoSeccion){
            case 'ToDo':
                taskContainer.appendChild(dateElement);
                taskContainer.appendChild(descripcionElement);
                taskContainer.appendChild(btnEliminar);
                taskContainer.appendChild(btnSiguiente);
                break;

            case 'Doing':
                taskContainer.appendChild(dateElement);
                taskContainer.appendChild(descripcionElement);
                taskContainer.appendChild(btnEliminar);
                taskContainer.appendChild(btnSiguiente);
                taskContainer.appendChild(btnAnterior);
                break;

            case 'Done':
                taskContainer.appendChild(dateElement);
                taskContainer.appendChild(descripcionElement);
                taskContainer.appendChild(btnEliminar);
                taskContainer.appendChild(btnAnterior);
                break;
        }

        //Btn Listeners
        btnAnterior.addEventListener('click', this.anteriorEtapa);
        btnSiguiente.addEventListener('click',this.siguienteEtapa);
        btnEliminar.addEventListener('click',this.eliminarTask);


        return taskContainer;
    }
}