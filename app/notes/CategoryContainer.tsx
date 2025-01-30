import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Button, Checkbox, Divider, Form, Input, Skeleton, useDisclosure} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import React, {useEffect, useState} from "react";
import {Categories, Category} from "@/utils/types/Category";
import EditCategoryModal from "@/app/notes/EditCategoryModal";
import EditTaskModal from "@/app/notes/EditTaskModal";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Task, TaskCollection} from "@/utils/types/Task";

type CategoryContainerProps = {
  category: Category;
  setCategories: React.Dispatch<React.SetStateAction<Categories | undefined>>
}

export default function CategoryContainer({category, setCategories}: Readonly<CategoryContainerProps>) {
  
  const router = useRouter();
  
  const [tasks, setTasks] = useState<TaskCollection | undefined>()
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const { isOpen: isEditCategoryModalOpen, onOpen: onEditCategoryModalOpen, onOpenChange: onEditCategoryModalOpenChange } = useDisclosure();
  const { isOpen: isEditTaskModalOpen, onOpen: onEditTaskModalOpen, onOpenChange: onEditTaskModalOpenChange } = useDisclosure();
  const [selectedTask, setSelectedTask] = useState<Task | null | undefined>()
  
  const getTasks = async () => {
    const token = sessionStorage.getItem("token");
    
    const response = await fetch(`http://localhost:8000/api/categories/${category.id}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/ld+json",
        "Authorization": `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      return await response.json() as Promise<TaskCollection>;
    } else if (response.status === 401) {
      toast.error("Unauthorized");
      window.sessionStorage.removeItem("token");
      router.push("auth/signin");
    } else {
      toast.error("An error occurred while fetching categories");
    }
  }
  
  const addTaskForm = () => {
    setShowAddTaskForm(!showAddTaskForm)
  }
  
  const handleAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const taskTitle = formData.get("taskTitle") as FormDataEntryValue
    if (!taskTitle) return
    
    const token = sessionStorage.getItem("token")
    const body = JSON.stringify({
      title: taskTitle,
      description: null,
      dueDate: null,
      done: false,
      priority: null,
      category: `/api/categories/${category.id}`
    });
    const response = await fetch(`http://localhost:8000/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/ld+json",
        "Authorization": `Bearer ${token}`
      },
      body: body
    })
    
    if (response.ok) {
      const task = await response.json() as Task
      if (!tasks) return
      setTasks({
        ...tasks,
        member: [...tasks.member, task]
      })
    }
    else if (response.status === 401) {
      toast.error("Unauthorized");
      window.sessionStorage.removeItem("token");
      router.push("auth/signin");
    }
    else {
      toast.error("An error occurred while adding task");
      }
    setShowAddTaskForm(false)
  }
  
  const handleTaskChange = (id: number) => {
    if (!tasks) return
    setTasks(prevTasks => {
      if (!prevTasks) return prevTasks;
      return {
        ...prevTasks,
        member: prevTasks.member.map(task => {
          if (task.id === id) {
            return {
              ...task,
              done: !task.done
            };
          }
          return task;
        })
      };
    });
  }
  
  const isTaskDone = (id: number) => {
    return tasks?.member.find(task => task.id === id)?.done
  }
  
  useEffect(() => {
    if (!category) return
    getTasks().then(tasks => {
      if (tasks) {
        setTasks(tasks)
      }
    })
  }, []);
  
  return (
    <Card className="w-72 min-w-72 h-fit">
      <EditCategoryModal isOpen={isEditCategoryModalOpen} onOpenChange={onEditCategoryModalOpenChange} category={category} setCategories={setCategories} />
      <EditTaskModal isOpen={isEditTaskModalOpen} onOpenChange={onEditTaskModalOpenChange} task={selectedTask} />
      <CardHeader className="flex gap-3 justify-between items-center">
        <p className="text-xl">{category.name}</p>
        <button onClick={() => onEditCategoryModalOpen()}>
          <Icon icon="material-symbols:edit-rounded" width="18" height="18"/>
        </button>
      </CardHeader>
      <Divider/>
      <CardBody>
        <Button size={"sm"} variant={"light"} color={'primary'} className={'w-fit mb-2'} onPress={() => addTaskForm()}>
          {showAddTaskForm ? (
            <>
              Hide
            </>
          ) : (
            <>
              <Icon icon="typcn:plus"/>
              Add task
            </>
          )}
        </Button>
        {showAddTaskForm && (
          <Form onSubmit={handleAddTask} className={"ml-1 flex flex-row justify-center items-center"}>
            <Checkbox/>
            <Input name={"taskTitle"} className={'-ml-2'} autoFocus size={"sm"} type="text" placeholder="Task name"/>
          </Form>
        )}
        <Skeleton className="w-5/5 rounded-lg" isLoaded={!!tasks}>
          <ul className={'min-h-3'}>
            {tasks?.member.map((task, index) => (
              <li key={index + "coucou"} className="flex gap-3 items-center p-1">
                <Checkbox
                  isSelected={isTaskDone(task.id)}
                  onValueChange={() => handleTaskChange(task.id)}
                  name={task.title}
                >
                </Checkbox>
                <p onClick={() => {onEditTaskModalOpen(), setSelectedTask(task)}}>
                  {task.title}
                </p>
              </li>
            ))}
          </ul>
        </Skeleton>
      </CardBody>
    </Card>
  )
}