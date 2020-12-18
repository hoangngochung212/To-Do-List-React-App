import React, { Component } from 'react'
import './App.css';
import List from './component/todoList';
import Modal from './component/modal';
import './component/font';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import {v1 as uuidv1} from 'uuid';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


class App extends Component {
  state = { 
    lists : [
      {
        id: 'td', title: "TODO", tasks: []
      },
      {
        id: 'ip', title: "IN", tasks: []
      },
      {
        id: 'de', title: "DONE", tasks: []
      }
      
    ],
    taskContent: '',
    isShow :'',
    selected: '',
    editId: null
   }
  componentDidMount() {
    const lists = localStorage.getItem('lists');
    if(lists){
      this.setState({
        lists: JSON.parse(lists)
      })
    }
  }

  handleToggelModal = (listId )=> {
      const isShow = this.state.isShow === '' ? 'show' : '';
      this.setState({
        isShow : isShow,
        selected : listId
      });
      
  }
  handleSelected = selected =>{
    this.setState({ selected: selected })
  }

  handleTaskContent = (e) =>{
    const taskContent = this.state.taskContent;
    this.setState({ taskContent : e.target.value});
   
  }

  handleAddTask = (e) =>{
    e.preventDefault();
    const { taskContent, selected } = this.state ;
   
    if(taskContent.trim() ===''){
       toastr.warning('Please enter your task', 'Notice', { timeOut: 2000 });
    }else{
      const newTask = 
      {
        id: uuidv1(),
        content: taskContent,
        time: new Date().toLocaleString()
      }
      
    const indexList = this.state.lists.findIndex(list => list.id ===selected);
    let lists = [...this.state.lists]; 
    let tasks = lists[indexList].tasks;
    tasks.push(newTask);
    this.setState({
      lists: lists,
      taskContent: '',
      isShow: '',
      selected: '',
    }, ()=>{
      localStorage.setItem('lists',JSON.stringify(lists));
    });
    
    } 
  }

  handleDeleteTask=(taskId, indexList)=>{
    const getlists = JSON.parse(localStorage.getItem('lists'));
    const index = getlists.findIndex(list => list.id === indexList );
    let lists = [...getlists];
    let newTasks = lists[index].tasks.filter(task=> task.id !== taskId);
    lists[index].tasks =newTasks;
    
    localStorage.setItem('lists',JSON.stringify(lists));
    this.setState({
      lists: lists,
      taskContent: '',
      isShow :'',
      selected: ''
    })
    
  }
  
  handleChooseEdit = (taskId)=>{
      this.setState({
        editId: taskId,
        
      })
     
  }
  handleEdit = (taskId, indexTask, listId)=>{
    const { taskContent } = this.state;
    if(taskContent.trim() ===''){
      toastr.warning('Please enter your task', 'Notice', { timeOut: 2000 });
   }else{
      
      const indexList = this.state.lists.findIndex(list => list.id ===listId);
      let lists = [...this.state.lists];
      let tasks = lists[indexList].tasks;
      tasks[indexTask].content = taskContent;
      
      localStorage.setItem('lists', JSON.stringify(lists));
      this.setState({
        lists: lists,
        editId: null
      })

   }
   
  }
  handleCancelEdit = ()=>{
    this.setState({
      editId: null,
      taskContent: ''
    })
  }

  handleDragSave =(result)=>{
    const { source, destination, reason } = result;
      if(reason === 'DROP' && destination){
        const { lists } = this.state;
        const sourceListIndex = lists.findIndex(list=> list.id === source.droppableId);
        const taskChooses = lists[sourceListIndex];
        const taskIndex = taskChooses.tasks.findIndex((task, indexTask)=> indexTask === source.index);
        const task = taskChooses.tasks[taskIndex];
        taskChooses.tasks.splice([taskIndex],1);
        
        const destinationListIndex = lists.findIndex(list => list.id === destination.droppableId);
      
        const taskTo = lists[destinationListIndex];
        taskTo.tasks.splice(destination.index,0,task);
        localStorage.setItem('lists',JSON.stringify(lists));
        this.setState({
          lists: lists
        })
      }
  }
  render() { 
    const { lists } = this.state;
    console.log(lists);
    return ( 
          <div className="container">
            <h1 className="container__title text-primary font-weight-bold" style={{textAlign: "center"}}>TODO LIST</h1>
            <DragDropContext onDragEnd={this.handleDragSave}>
            <div className="container__content row"> 
                  {       
                   
                     lists.map(list => (
                      <List
                      key={list.id}
                      handleToggelModal = {this.handleToggelModal} 
                      list= {list}
                      onShow ={this.state.isShow} 
                      isEdit ={this.state.editId}
                      onDelete={this.handleDeleteTask}
                      handleChooseEdit= {this.handleChooseEdit}
                      handleCancelEdit= {this.handleCancelEdit}
                      handleTaskContent= {this.handleTaskContent}
                      handleEdit= {this.handleEdit}
                      >
  
                      </List>
                    ))
                    
                }
            </div>
            </DragDropContext>
            {<Modal 
                handleToggelModal = {this.handleToggelModal}  
                onShow ={this.state.isShow} 
                onSelect={this.handleSelected} 
                lists={this.state.lists} 
                selected={this.state.selected}
                taskContent={this.state.taskContent}
                handleTaskContent={this.handleTaskContent}
                onAddTask={this.handleAddTask} />}
          </div>
     );
  }
}
 
export default App;