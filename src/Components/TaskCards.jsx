import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import "../TaskCards.css";
import Card from "./Card";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Textarea } from "./ui/textarea";

const TaskCards = () => {
  const [tasks, setTasks] = useState([]);
  const [EditTasks, setEditTasks] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  useEffect(() => {
    getAllTasks();
  }, []);

  function editTaskHandler(bool, id) {
    setOpenEdit(bool);
    setEditId(id);
  }

  function saveEditTask(taskId) {
    axios
      .patch(
        `https://task-manager-auth-sable.vercel.app/tasks/${taskId}`,
        {
          taskTitle: EditTasks,
          taskDescription: editDescription,
        },
        { withCredentials: true }
      )
      .then((Response) => {
        console.log("Task updated:", Response.data);
        // ✅ Refresh task list
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId
              ? {
                  ...task,
                  taskTitle: EditTasks,
                  taskDescription: editDescription,
                }
              : task
          )
        );

        setEditTasks("");
        setEditDescription("");
        setOpenEdit(false);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  }

  function saveTask() {
    axios
      .post(
        "https://task-manager-auth-sable.vercel.app/tasks/add",
        {
          taskTitle: EditTasks,
          taskDescription: editDescription,
        },
        { withCredentials: true }
      )
      .then((Response) => {
        console.log(Response.data);
        setTasks((prevTasks) => [
          ...prevTasks,
          {
            _id: Response.data._id,
            taskTitle: EditTasks,
            taskDescription: editDescription,
          },
        ]);
        setEditTasks("");
        setEditDescription("");
        setOpenDialog(false);
      });
    if (!tasks || tasks.length === 0) return <p>Loading tasks...</p>;
  }

  function deleteTask(id) {
    axios
      .delete(`https://task-manager-auth-sable.vercel.app/tasks/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Task deleted successfully:", response.data);
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  }

  function getAllTasks() {
    axios
      .get("https://task-manager-auth-sable.vercel.app/tasks/all", {
        withCredentials: true,
      })
      .then((Response) => {
        setTasks(Response.data);
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div id="all-comp">
      <>
        <SideBar funcOpenDialog={setOpenDialog} />
      </>
      <div id="tasks">
        {tasks.map((item, index) => (
          <Card
            key={item._id}
            title={item.taskTitle}
            description={item.taskDescription}
            taskId={item._id}
            func={deleteTask}
            editTaskHandler={editTaskHandler}
          />
        ))}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="mt-10 h-[30%]">
                <h2 className="text-lg font-bold mt-7">Add task</h2>
                <Input
                  placeholder="enter title"
                  type="text"
                  value={EditTasks}
                  onChange={(e) => setEditTasks(e.target.value)}
                />
                <Textarea
                  placeholder="Type your description here"
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button id="addButton" onClick={saveTask}>
              Add
            </button>
            <button id="cancelButton" onClick={() => setOpenDialog(false)}>
              Cancel
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="mt-10 h-[30%]">
                <h2 className="text-lg font-bold mt-7">Edit task</h2>
                <Input
                  placeholder="enter title"
                  type="text"
                  value={EditTasks}
                  onChange={(e) => setEditTasks(e.target.value)}
                />
                <Textarea
                  placeholder="Type your description here"
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              id="addButton"
              onClick={() => {
                saveEditTask(editId);
              }}
            >
              Add
            </button>
            <button id="cancelButton" onClick={() => setOpenEdit(false)}>
              Cancel
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskCards;
