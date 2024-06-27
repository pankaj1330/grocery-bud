import { useEffect, useState } from 'react'
import SingleTask from './SingleTask';
import './App.css'

function getLocalstorage(){
  const listitems = localStorage.getItem('list');
  if(listitems){
    return JSON.parse(listitems);
  }
  return [];
}

function App() {
  const [list,setList] = useState(getLocalstorage());
  const [task,setTask] = useState();
  const [edit,setEdit] = useState(false);
  const [editId,setEditId] = useState();
  const [alert,setAlert] = useState({
    "show" : false,
    "msg" : "Item Added",
    "success" : true
  })

  useEffect(()=>{
    const alertInterval = setInterval(()=>{
      setAlert({
        "show" : false,
        "msg" : "Item Added",
        "success" : true
      })
    },3000)
    return () => clearInterval(alertInterval)
  },[alert])

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list));
  },[list])

  function addTask(e){
    e.preventDefault();
    if(task.trim() === ""){
      setAlert({
        show : true,
        msg : "Enter The Item First",
        success : false,
      })
      setTask('');
      return;
    }
    if(edit){
      setList(items => {
        return items.map(item => {
          if(item.id === editId){
            item.task = task;
          }
          return item;
        })
      })
      setAlert({
        "show" : true,
        "msg" : "Item Edited",
        "success" : true
      })
      setEdit(false);
    }
    else{
      setList(prev => {
        const newItem = {id:new Date().getTime().toString(),task : task};
        return [...prev,newItem]
      })
      setAlert({
        show : true,
        msg : "New Item Added",
        success : true,
      })
    }
    setTask('')
    return;
  }


  function removeItem(id){
    setList(items => {
      const newlist = items.filter(item => item.id !== id);
      return newlist;
    })
    setAlert({
      "show" : true,
      "msg" : "Item Deleted",
      "success" : false
    })
    return;
  }

  function editItem(id){
    const item = list.find(item => item.id === id);
    setTask(item.task);
    setEdit(true);
    setEditId(id);
    return;
  }

  function clearList(){
    setList([]);
    setAlert({
      show : true,
      msg : "All Items Deleted",
      success : false,
    })
    return;
  }

  return (
    <div className='p-4'>
      <div className='max-w-[400px] p-2 rounded-lg shadow-lg mx-auto mt-24 text-center capitalize bg-white'>
        <h3 className='my-4 text-2xl font-bold text-green-600'>Grocery Bud 🛒</h3>
        <div className='h-10'>
        {
          alert.show && <p className={`${alert.success ? 'bg-green-500' : 'bg-red-500'} text-center text-sm text-white rounded-md p-1 tracking-wide`}>{alert.msg}</p>
        }
        </div>
        
        <form onSubmit={addTask}>
          <input type="text" name="task" id="task" value={task} placeholder='e.g. milk' onChange={(e)=>{setTask(e.target.value)}} className='outline-none bg-blue-50 rounded-md p-1'/>
          <input type="submit" value={edit ? "Edit" : "Add"} className='py-1 px-2 tracking-wide rounded-sm cursor-pointer bg-green-600 text-white'/>
        </form>
        <div className='mt-8'>
          
          {
            list.map((task,index) => {
              return(
                <SingleTask key={index} task={task} removeItem={removeItem} editItem={editItem}/>  
              )
            })
          }
        </div>
        {
          list.length === 0 ? "" : <button className='bg-green-500 p-1 w-full text-white font-semibold rounded-md' onClick={clearList}>
          Clear Items
        </button>
        }

      </div>    
    </div>
  )
}

export default App
