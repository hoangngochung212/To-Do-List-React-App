import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import Task from './task';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const StyledList = styled.div `
    height: auto;
    border: 1px solid #c3cbf7;
    background-color: #f7f8fe;
    border-radius: 6px;
    padding: 8px 8px;

    .List__header{
       width: 100%;
       
       box-sizing:border-box;
       .List__title{
          
            .List__item-count{
                display:block;
                width: 38px;
                border-radius: 50%;
                text-align: center;
                margin-right: 8px;
            }
            .List__item-text{
                font-family: sans-serif;
                letter-spacing:1px;
                font-weight: bold;
            }
       }
       
    }
    .List__content{
        width: 100%;
        padding: 24px 14px
        
    }
`;

class List extends Component {
    
    render() { 
        const { list, handleToggelModal, onDelete, handleChooseEdit, isEdit, handleCancelEdit, handleTaskContent,handleEdit } = this.props;
        
        return ( 
            <StyledList className="col-sm m-2 no-gutter d-flex flex-column align-items-center">
                <Droppable droppableId={list.id}> 
                    {
                        provided =>(
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps} style={{width : '100%', height: 'auto'}}
                            >
                                
                                     <div className="List__header d-flex justify-content-between align-items-center" >
                                     <div className="List__title d-flex align-items-center" >
                                         <div className="List__item-count btn btn-success"><span>{list.tasks.length}</span></div>
                                         <div className="List__item-text">{list.title}</div>
                                     </div>
                                     <div className="List__add">
                                         <button className="List__btn btn btn-primary"  onClick={()=>handleToggelModal(list.id)}><FontAwesomeIcon icon="plus" /> New Task</button>
                                     </div>
                                 </div>
                                  <div className="List__content">
                                     {
                                         list.tasks.map((task, indexTask)=>
                                             <Task
                                                 key ={task.id}
                                                 task = {task}
                                                 onDelete = {onDelete}
                                                 list= {list}
                                                 handleChooseEdit= {handleChooseEdit}
                                                 indexTask= {indexTask}
                                                 handleToggelModal={handleToggelModal}
                                                 isEditing= {task.id === isEdit }
                                                 handleCancelEdit= {handleCancelEdit}
                                                 handleTaskContent={handleTaskContent}
                                                 handleEdit= {handleEdit}
                                             />    
                                             )
                                     }
                                  </div>
                                
                            </div>
                        )
                    }
                </Droppable>
            </StyledList>
         );
    }
}
 



export default List;