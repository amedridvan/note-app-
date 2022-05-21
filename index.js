const notlistdiv=document.querySelector(".note-list");
let notid=1
function note(id,title, content){
this.id=id
this.content=content
this.title=title
}
//addd event lister
function eventListeners(){
    document.getElementById("add-note-btn").addEventListener("click",addnewNote)
    document.addEventListener("DOMContentloaded",displatnotes);
    notlistdiv.addEventListener("click",deletenote);
    document.getElementById("delete-all-btn").addEventListener("click",deleteallnotes);
}
// get item from local 

function getDateFromStorage(){
return localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")):[]
}



eventListeners();

function addnewNote(){
    const noteTiltle =document.getElementById("note-title");
    const noteContent =document.getElementById("note-content");
    if(Validdateinput(noteTiltle,noteContent)){
        let notes=getDateFromStorage();
        let notitem=new note(notid,noteTiltle.value,noteContent.value);
        notid++;
         notes.push(notitem);
         createNote(notitem);
         localStorage.setItem("notes",JSON.stringify(notes))
         noteTiltle.value="";
         noteContent.value="";

    }
}
//add a new div 



function Validdateinput(title,content){
if(title.value!=="" && content.value!==""){
    return true;
}
else{
    if(title.value===""){title.classList.add("waring")}
    if(content.value===""){content.classList.add("waring")}
}
setTimeout(()=>{
    title.classList.remove("waring");
    content.classList.remove("waring");
},1600);
}
 function createNote(noteitem){
     const div=document.createElement("div");
     div.classList.add("note-item");
     div.setAttribute("data-id",noteitem.id);
     div.innerHTML=`
     <h3> ${noteitem.title}</h3>
     <p> ${noteitem.content}</p>
     <button id="add-note-btn" class="btn" type="button">
                <span><i class="fas fa-trash-alt"></i></span> 
                    Delete</button>`;
                    notlistdiv.append(div);
 }
 function displatnotes(){
     let notes=getDateFromStorage();
     if(notes.lenght>0){
         notid=notes[notes.lenght-1].id;
         notid++;
     }
     else{
         notid=1;
     }
     notes.forEach(item =>{
       createNote(item)
     });
    }
//delete note   ...
function deletenote(e){
 if(e.target.classList.contains("btn")){
     e.target.parentElement.remove();
     let divId=e.target.parentElement.dateset.id;
     console.log(divId)
     let newNotelist=note.filter(item=>{
     return item.id !==parseInt(divId)
     });
     localStorage.setItem("notes",JSON.stringify(newNotelist))
 }
}
//delete all note....  
function deleteallnotes(){
   localStorage.removeItem("notes");
    let notelist=document.querySelectorAll(".note-item");
    console.log(notelist)
    if(notelist.length > 0){
      notelist.forEach(item => {
          console.log(item)
        notlistdiv.removeChild(item);
      });
    }else{
        console.log('not passed')
    }
    notid=1;
}