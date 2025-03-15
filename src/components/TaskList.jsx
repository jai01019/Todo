// src/components/TaskList.jsx


import TaskItem from "./TaskItem";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


function TaskList({ tasks, toggleComplete, deleteTask, editTask, setTasks }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks" >
        {(provided) => (
          <ul className="list-group" {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                {(provided) => (
                  <TaskItem
                    task={task}
                    toggleComplete={toggleComplete}
                    deleteTask={deleteTask}
                    editTask={editTask}
                    provided={provided}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TaskList;

