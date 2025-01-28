const inputBox=document.getElementById("inputBox");
const addBtn=document.getElementById("addBtn");
const todoList=document.getElementById("todoList");
const alldone=document.querySelector(".alldone");
const alldelete=document.querySelector(".alldelete");


let editTodo=null;

// adding tasks
const addTodo=()=>{
    const inputText=inputBox.value.trim();
    if(inputText.length==0){
        alert("Please enter a task");
    }else{

    if(addBtn.value==="Edit"){
        const originalText=editTodo.target.previousElementSibling.innerHTML
        editTodo.target.previousElementSibling.innerHTML=inputText;
        editLocalTodos(originalText,inputText); //previouselementsibling matlab p tag
        addBtn.value="Add";
        inputBox.value="";
    }else{    
    // creating p tags
    const li=document.createElement("li");
    
    const p=document.createElement("p");

    p.innerHTML=inputText;
    li.appendChild(p);
    
    // edit button
    const EditBtn=document.createElement("button");
    EditBtn.innerText="Edit";
    EditBtn.classList.add("btn","edit");
    li.appendChild(EditBtn);

    // task completed
    const doneBtn=document.createElement("button");
    doneBtn.innerText="Done";
    doneBtn.classList.add("btn","add");
    li.appendChild(doneBtn);
    
    // deleting tasks
    const deleteBtn=document.createElement("button");
    deleteBtn.innerText="Delete";
    deleteBtn.classList.add("btn","delete");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value="";

    saveLocalTodos(inputText);
    }
    }
}
// updating todo (edit)(delete)
const updateTodo=(e)=>{
    console.log(e.target.innerHTML);
    if(e.target.innerHTML==="Delete"){
        e.target.parentElement.remove();
        deleteLocalTodos(e.target.parentElement);
    }
    if(e.target.innerHTML==="Edit"){
        inputBox.value=e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value="Edit";
        editTodo=e;  
    }
    if(e.target.innerHTML==="Done"){
        const firstChild=e.target.parentElement.firstElementChild;
        firstChild.style.textDecoration="Line-through";
        firstChild.style.color="black";
        e.target.parentElement.style.backgroundColor="#0bdb0b";
        e.target.style.display="none";
        e.target.previousElementSibling.style.display="none";
        firstChild.style.fontWeight="700";
        firstChild.style.fontSize="1.2rem";
    }  
}

const alldeletetodo=(e)=>{
    const inputText=inputBox.value.trim();
   const allTodos=todoList.children;
   Array.from(allTodos).forEach((todo)=>{
    todo.style.display="none";
    deleteLocalTodos(todo);
   })
   
}
const alldonetodo=(e)=>{
    const inputText=inputBox.value.trim();
    const allTodos=todoList.children;
    Array.from(allTodos).forEach((todo)=>{
     todo.style.backgroundColor="#0bdb0b";
     todo.firstChild.style.fontWeight="700";
     todo.firstChild.style.fontSize="1.2rem";
     todo.firstChild.style.textDecoration="Line-through";
     Array.from(todo.children).forEach((child,index)=>{
        if(index!=0){
            child.style.display="none";
        }
     })
    })
 }

// local storage
const saveLocalTodos=(todo)=>{
    let todos;
    
    if(localStorage.getItem("todos")===null){
        todos=[]
    }else{
    todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));

   

    

}

const getLocalTodo=()=>{
    let todos;
    
    if(localStorage.getItem("todos")===null){
        todos=[]
    }else{
    todos=JSON.parse(localStorage.getItem("todos"));
    todos.forEach(i=>{
    // creating p tags
    const li=document.createElement("li");
    
    const p=document.createElement("p");

    p.innerHTML=i;
    li.appendChild(p);
    
    // edit button
    const EditBtn=document.createElement("button");
    EditBtn.innerText="Edit";
    EditBtn.classList.add("btn","edit");
    li.appendChild(EditBtn);

    // task completed
    const doneBtn=document.createElement("button");
    doneBtn.innerText="Done";
    doneBtn.classList.add("btn","add");
    li.appendChild(doneBtn);
    
    // deleting tasks
    const deleteBtn=document.createElement("button");
    deleteBtn.innerText="Delete";
    deleteBtn.classList.add("btn","delete");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    

        
    })
    }
}

const deleteLocalTodos=(todo)=>{
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    let todoText=todo.children[0].innerHTML;
    let todoIndex=todos.indexOf(todoText);
    todos.splice(todoIndex,1);
    localStorage.setItem("todos",JSON.stringify(todos));

}

const editLocalTodos=(todo,update)=>{
    let todos=JSON.parse(localStorage.getItem("todos"));
    let todoIndex=todos.indexOf(todo);
    todos[todoIndex]=update;
    localStorage.setItem("todos",JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded',getLocalTodo);


addBtn.addEventListener("click",addTodo);
todoList.addEventListener("click",updateTodo);
alldone.addEventListener("click",alldonetodo);
alldelete.addEventListener("click",alldeletetodo);

