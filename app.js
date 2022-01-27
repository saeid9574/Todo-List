let btn = document.getElementById('addButton')
let todoList = document.getElementById('todoList')
let clear = document.getElementById('clearButton')
let inp = document.getElementById('itemInput')

let newTodoArrry = []

function add() {
	
	if (inp.value !== '') {
		let newTodo = inp.value

	    let newTodoObj = {
		    id : newTodoArrry.length + 1 ,
		    todo : newTodo ,
		    activity : false
	    }
	    inp.value = ''
	    newTodoArrry.push(newTodoObj)
	    console.log(newTodoArrry)

	    list(newTodoArrry)
	    Generator(newTodoArrry)
	} else {
		alert('nemitoone khali bashe')
	}

}

function list(newlist) {
	localStorage.setItem('todos' , JSON.stringify(newlist))
}

function Generator(newlist) {
	todoList.innerHTML = ''
	newlist.forEach(function(newL) {
		
		let li = document.createElement('li')
	    li.className = 'completed well' 

	    let lbl = document.createElement('label')
	    lbl.innerHTML = newL.todo 

	    let btn1 = document.createElement('button')
	    btn1.className = 'btn btn-success'
	    btn1.innerHTML = 'Complete'
	    btn1.setAttribute('onclick' , 'changeLocal('+newL.id+')')

	    let btn2 = document.createElement('button')
	    btn2.className = 'btn btn-danger'
	    btn2.innerHTML = 'Delete'
	    btn2.setAttribute('onclick' , 'removeLocal('+newL.id+')')

	    if (newL.activity) {
	    	btn1.innerHTML = 'UnComplete'
	    	li.className = 'uncompleted well'
	    }

	    li.append(lbl , btn1 , btn2)

	    todoList.append(li)
	})
}

function changeLocal(id) {
	
	let storage = JSON.parse(localStorage.getItem('todos'))
	newTodoArrry = storage

	newTodoArrry.forEach(function(todo){
		if (todo.id === id) {
			todo.activity = !todo.activity
		}
	})
	list(newTodoArrry)
	Generator(newTodoArrry)
}

function removeLocal(id) {
	let local = JSON.parse(localStorage.getItem('todos'))

	newTodoArrry = local

	let main = newTodoArrry.findIndex(function(dos) {
		return dos.id == id
	})

	newTodoArrry.splice(main , 1)
	list(newTodoArrry)
	Generator(newTodoArrry)
}

function storag() {
	let megdar = JSON.parse(localStorage.getItem('todos'))

	if (megdar) {
		newTodoArrry = megdar
	}else{
		newTodoArrry = []
	}

	Generator(megdar)
}

function remove() {
	newTodoArrry = []
	console.log(newTodoArrry)
	Generator(newTodoArrry)
	localStorage.clear()
}

window.addEventListener('load' , storag)

btn.addEventListener('click' , add)
clear.addEventListener('click' , remove)
inp.addEventListener('keyup' , function(event) {
	if (event.keyCode == 13) {
		add()
	}
})
