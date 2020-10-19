
console.log(firebase)

var list = document.getElementById("list");


firebase.database().ref('todos').on('child_added', function(data){
    console.log(data.val())

    // create li tag with text node 
    var li = document.createElement('li')
    var liCheckBox = document.createElement('input')
    liCheckBox.setAttribute("type","checkbox")
    liCheckBox.setAttribute("class","checkbox-round")
    var liText = document.createTextNode(data.val().value)
    li.appendChild(liCheckBox)
    li.appendChild(liText)

    // create delete button 
    var delBtn = document.createElement('button')
    var delText = document.createTextNode('Delete')
    delBtn.setAttribute("class","btn")
    delBtn.setAttribute("id",data.val().key)
    delBtn.setAttribute("onclick","deleteItem(this)")
    delBtn.appendChild(delText)

    // create edit button
    var editBtn = document.createElement('button')
    var editText = document.createTextNode('Edit')
    editBtn.setAttribute("class","btn")
    editBtn.setAttribute("id",data.val().key)
    editBtn.setAttribute("onclick","editItem(this)")
    editBtn.appendChild(editText)

    li.appendChild(delBtn)
    li.appendChild(editBtn)
    li.setAttribute("class","list-group-item")

    list.appendChild(li)


})    

function addTodo() {
    var todo_item = document.getElementById("todo-item")
    var database = firebase.database().ref('todos')
    var key = database.push().key;
    var todo = {
        value : todo_item.value,
        key : key
    }
    database.child(key).set(todo)

    
}

function deleteItem(e){
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
}

function editItem(e) {
    console.log(e.parentNode.childNodes[1].nodeValue)
    var val = prompt("Enter updated value",e.parentNode.childNodes[1].nodeValue)
    var editTodo = {
        value : val,
        key : e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo)
    e.parentNode.childNodes[1].nodeValue = val
}

function deleteAll() {
    list.innerHTML = ""
}