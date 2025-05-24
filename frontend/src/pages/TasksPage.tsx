import { useEffect, useState } from 'react';
import { Plus, CheckCircle, Trash2 } from 'lucide-react';
import Card from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="p-4">
      <Card>
        <h1 className="text-xl font-bold mb-4">Tasks</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 border p-2 rounded-l"
          />
          <Button onClick={addTask} className="rounded-l-none">
            <Plus size={18} />
          </Button>
        </div>
        <ul>
          {tasks.map(task => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 border-b hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span
                onClick={() => toggleComplete(task.id)}
                className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}
              >
                {task.title}
              </span>
              <div className="flex gap-2">
                <button onClick={() => toggleComplete(task.id)} title="Toggle complete">
                  <CheckCircle size={18} className={task.completed ? 'text-green-500' : 'text-gray-400'} />
                </button>
                <button onClick={() => deleteTask(task.id)} title="Delete task">
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
