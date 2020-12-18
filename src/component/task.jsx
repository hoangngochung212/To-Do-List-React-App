import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const TaskList = styled.div`
    font-size: 14px;
    font-family: sans-serif;
    margin-top: 12px;
    padding: 8px 8px;
    border: 1px solid #e5d5d5;
    background-color: #ffff;
    border-radius: 4px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16);
    

    @keyframes fadein {
    from {
        opacity:0;
    }
    to {
        opacity:1;
    }
}
    cursor: pointer;
    .list__task-time{
        display: flex;
        align-items: center;
        opacity: .6;
        font-family: 'Ubuntu', sans-serif;
        animation: fadein 2s;
        .list__task-item-icon {
            margin-right: 12px;
        }
    }
    .list__task-content{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 0;
        transition: all .3s ease; 
        animation: fadein 2s;
        .list__task-content-text{
            width: 80%;
            font-weight: bold;
            font-size: 18px;
            word-wrap: break-word;      /* IE 5.5-7 */
            white-space: -moz-pre-wrap; /* Firefox 1.0-2.0 */
            white-space: pre-wrap; 
        }
        .list__task-content-options{
            display: flex;
            align-items: center;
            flex : 1;
            justify-content: space-around;
            .options-edit{
                color: #4ab7f7;
                
            }
            .options-delete{
                color: #bdbdc4;
                
                &:hover{
                color: #f13636;
            }
            }
            
        }
    }
    .list__task-edit{
        display: flex;
        flex-grow: 2; 
        align-items: center;
        justify-content: space-between;
        animation: fadein 2s;
        .list__task-editor{
            width: 80%;
            z-index: 999;
           .list__task-editing{
               width: 100%;
               padding: 0 8px;
               outline: none;
               border: #4ab7f7 solid 1px;
               border-radius: 2px;
               z-index: 999;
               transition: z-index all .5s; 
               &:focus{
                     border: #ee1f1f solid 1px;
           }
           }
          
        }
        .list__task-edit-options{
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: space-around;
            font-size: 14px;
            z-index: 999;
        }
    }
    .list__editing-bgr{
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: rgba(247, 248, 254, 0.8);
        width: 100vw;
        height: 100vh;
        animation: fadein .3s;
       
    }

`;

class Task extends Component {
    render() { 
        const {task, onDelete, list, handleChooseEdit, indexTask, isEditing, handleCancelEdit, handleTaskContent, handleEdit} = this.props;
        
        return ( 
            <Draggable
            index= {indexTask}
            draggableId= {task.id}
            isDragDisabled= {isEditing}
        >
            {
                provided => (
                    <TaskList className="list__task"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                        >
                    {
                        isEditing
                        ? <Fragment>
                             <div className="list__task-edit">
                            <div className="list__task-editor">
                                <input type="text" className="list__task-editing" defaultValue={task.content} onChange={(e)=>handleTaskContent(e)}/>
                            </div>
                             <div className="list__task-edit-options">
                            <div className="edit-options-close">
                                 <FontAwesomeIcon icon="check" className="icon text-primary" onClick={()=>handleEdit(task.id, indexTask, list.id)}/>
                             </div>
                             <div className="edit-options-close" onClick={handleCancelEdit}>
                                 <FontAwesomeIcon icon="window-close" className="icon text-danger"/>
                             </div>
                         </div>
                         <div className="list__editing-bgr" onClick={handleCancelEdit}></div>
                     </div>
                        </Fragment>
                     : <Fragment>
                          <div className="list__task-time">
                       <div className="list__task-item-icon">
                            <FontAwesomeIcon icon="calendar-alt"/>
                       </div>
                        <div className="list__task-time-text">
                            {task.time}
                        </div>
                    </div>
                    <div className="list__task-content">
                        <div className="list__task-content-text">
                            {task.content}
                        </div>
                        <div className="list__task-content-options">
                           <div className="options-edit"  onClick= {()=>handleChooseEdit(task.id )}>
                                <FontAwesomeIcon icon="edit" />
                           </div>
                            <div className="options-delete" onClick= {()=>onDelete(task.id, list.id)} >
                                <FontAwesomeIcon icon="trash-alt" />
                            </div>
                        </div>
                    </div>
                     </Fragment>
                    }
                   
                </TaskList>
                )
            }
        </Draggable>
         );
    }
}
 
export default Task;