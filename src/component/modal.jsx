import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'

class Modal extends Component {
    render() { 
        const  {onSelect, onShow, handleToggelModal, selected, handleTaskContent, taskContent, onAddTask, lists} = this.props;
        return ( 
            <div className={`modal fade ${onShow}`}  >
                <div className={`modal_body ${onShow}`}>
                    <div className="modal-content" >
                        <div className="modal-header d-flex align-items-center">
                            <span className="modal-title">CREATE NEW TASK</span>
                            <FontAwesomeIcon icon="times" style={{cursor:"pointer"}}  onClick={handleToggelModal} />
                        </div>
                        <div className="modal-body">
                            <form>
                            <div className="form-group d-flex align-items-center justify-content-between">
                                {   
                                    
                                    lists.map(list =>     
                                        <div key={list.id} className="d-flex align-items-center justify-content-between">
                                            <input type="radio" checked={selected === list.id } onChange={ ()=> onSelect(list.id)}  value={list.title} id={list.id} name="select" /> 
                                            <span className="m-2" >{list.title}</span>
                                        </div>
                                    )
                                    
                                }
                                {/* <div><input type="radio" checked={onSelect = 'td'} id="todo" name="select" value="todo"/> TODO</div>
                                <div><input type="radio" checked={onSelect = 'ip'} id="in" name="select" value="in" /> IN</div>
                                <div><input type="radio" checked={onSelect = ''} id="done" name="select" value="done"/> DONE</div> */}
                           </div>
                           <div className="modal-input">
                                <div className="form-group"><input type="text" placeholder="Enter your task" value={taskContent} onChange={(e)=>handleTaskContent(e)} className="form-control"/></div>
                           </div>
                           <div className="modal-footer">
                                <button type="submit" className="btn btn-info" onClick={(e)=>onAddTask(e)} >Save</button>
                                <button type="button" className="btn btn-outline-dark" onClick={handleToggelModal} >Close</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
          </div>
        );
    }
}
 
export default Modal;