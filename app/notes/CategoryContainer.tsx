import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Button, Checkbox, Divider, Form, Input} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import {useState} from "react";


export default function CategoryContainer({categoryName}: Readonly<{categoryName: string;}>) {
  
  const [tasks, setTasks] = useState([
      {
        name: 'Learn Next.js',
        done: false
      },
      {
        name: 'Learn TailwindCSS',
        done: true
      },
      {
        name: 'Learn TypeScript',
        done: false
      }
    ])
  const [showAddTaskForm, setShowAddTaskForm] = useState(false)
  
  const addTaskForm = () => {
    setShowAddTaskForm(!showAddTaskForm)
  }
  
  const handleTaskChange = (name: string) => {
    setTasks(tasks.map(task => {
      if (task.name === name) {
        return {
          ...task,
          done: !task.done
        }
      }
      return task
    }))
  }
  
  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const taskName = formData.get("taskName") as FormDataEntryValue
    setTasks([{name: taskName as string, done: false}, ...tasks])
    setShowAddTaskForm(false)
  }
  
  const isTaskDone = (taskName: string) => {
    return tasks.find(task => task.name === taskName)?.done
  }
  
  return (
    <Card className="w-72 min-w-72">
      <CardHeader className="flex gap-3">
          <p className="text-md">{categoryName}</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <Button size={"sm"} variant={"light"} color={'primary'} className={'w-fit'} onPress={()=>addTaskForm()}>
          <Icon icon="typcn:plus" />
          Add task
        </Button>
        {showAddTaskForm && (
          <Form onSubmit={handleAddTask} className={"ml-1 flex flex-row justify-center items-center"}>
            <Checkbox/>
            <Input name={"taskName"} className={'-ml-2'} autoFocus size={"sm"} type="text" placeholder="Task name" />
          </Form>
        )}
        <ul>
          {tasks.map((task, index) => (
            <li key={index+"coucou"} className="flex gap-3 items-center p-1">
              <Checkbox isSelected={isTaskDone(task.name)} onValueChange={()=>handleTaskChange(task.name)}>{task.name}</Checkbox>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  )
}