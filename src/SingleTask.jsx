import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

function SingleTask({task,removeItem,editItem}) {
  return (
    <div className="flex flex-row justify-between items-center my-4">
      <p>{task.task}</p>
      <div className="space-x-2">
        <button className="text-green-800" onClick={()=>editItem(task.id)}><RiEditFill /></button>
        <button className="text-red-800" onClick={()=>removeItem(task.id)}><MdDelete /></button>
      </div>
    </div>
  )
}

export default SingleTask
