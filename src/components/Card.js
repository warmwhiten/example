import styled from '@emotion/styled'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { DELETE, PATCH } from '../utils/axios';
import { useState } from 'react';
import Button from '@mui/material/Button';


const Container = styled.div`
  padding: 30px 60px;
  background-color: #cfe8fc;
  border-radius: 4px;
  color: black;
  font-size: 16px;
  margin: 10px;
  width: 500px; 
  height: 300px;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  position: relative;
  &:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    cursor: pointer;

  }
  z-index: 1;
  
  .buttons {
    display: flex;
    position: absolute;
    top: 5px;
    right: 5px;
    div {
        z-index: 10;
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content:center;
        &:hover{
            background-color: #50505025;

        }
    }
  }

  .content {
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    margin: 5px 0;
    word-break:break-all;

    &:hover{
        cursor:pointer;
    }
    textarea{
        width: 100%;
        font-size: 16px;
        border: none;
        background-color: ${props => props.isEditMode ? 'white':'inherit'};
        border-radius: 2px;
        padding: 3px;
        resize: none;
        font: inherit;
    }
    div{
        padding: 3px;
    }
  }

  .contentWrapper{
    position:relative;
        button{
            position: relative;
            
            right: 0;
        }
  }
  


`

export default function Card({id, name, description}){
    const [isEditMode, setIsEditMode] = useState(false);
    const [_name, setName] = useState(name);
    const [_description, setDescription] = useState(description);
    const [isEdited, setIsEdited] = useState(false);

    const navigate = useNavigate();
    const handleClickContainer = () => {
        navigate(`/details/${id}`);
    }
    const handleClickDelete = async (e) => {
        e.stopPropagation();
        if(window.confirm(`${name} 항목을 삭제하시겠습니까?`)){
            try{
                // TODO : API 연동 테스트
                await DELETE(`specs/${id}`);
                alert('삭제가 완료되었습니다.');
                window.location.reload();
            }
            catch(error) {
                // TODO : 실제 연결이 되지 않았는데 오류 발생안할 수 있으니 개발자 도구 열어서 확인
                window.alert('삭제 오류 발생', error);
            }
        }

        
    }
    const handleClickEdit = (e) => {
        e.stopPropagation();
        setIsEditMode((prev)=>!prev);

    }

    const handleClickSubmit = async(e) => {
        e.stopPropagation();
        const data = {
            name: _name,
            description: _description
        }
        if(window.confirm(`${name} 항목을 수정하시겠습니까?`)){         
            try{
                //TODO : API 연동 확인
                await PATCH(`/specs/${id}`, data);
                setIsEditMode(false);
                alert('수정이 완료되었습니다.');
                window.location.reload();
            }
            catch(error){
                alert('오류 발생', error);
            }
        }
    }

    const handleChangeName = (e) => {
        setName(e.target.value);
        if(isEdited===false){
            setIsEdited(true);
        }
    }
    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
        if(isEdited===false){
            setIsEdited(true);
        }
    }

    return(  
    <Container onClick={handleClickContainer} isEditMode={isEditMode}>
        <div className='buttons'>
            <div onClick={handleClickDelete}>
            <DeleteIcon/>
            </div>
            <div onClick={handleClickEdit}>
            <EditIcon/>
            </div>
        </div>
        {isEditMode?
        (
            <div className='contentWrapper'>
                <div className='content'>
                    <textarea type="text" value={_name} onClick={(e)=>{e.stopPropagation()}} onChange={handleChangeName}/>
                </div>
                <div className='content'>
                    <textarea type="text" rows={5} value={_description} onClick={(e)=>{e.stopPropagation()}} onChange={handleChangeDescription}/>
                </div>
                <Button onClick={handleClickSubmit} variant="outlined" disabled={!isEdited}>수정하기</Button>
            </div>
        ):
        (
            <div className='contentWrapper'>
                <div className='content'>
                {_name}
                </div>
                <div className='content'>
                {_description}
                </div>
            </div>
        )}

      </Container>)
}