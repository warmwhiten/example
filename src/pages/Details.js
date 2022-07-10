import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {GET, PATCH} from "../utils/axios";
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const DetailWrapper = styled.div`
  margin : 0 100px;
  border-left: 1px solid #dedede;
  border-right: 1px solid #dedede;
  height: 100vh;
  padding: 50px 100px;

  div {
    margin: 5px 0;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;  
  }
`

const TEST_DATA = {
  params: {
    spec_id: 1,
    name: 'example name',
    description: 'example description',
    document: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
}

export default function Details() {
    let { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [document, setDocument] = useState("");
    const [isEdited, setIsEdited] = useState(false);

    const handleClickSubmit = async (e) => {
      e.preventDefault();
      const data = {
        document: document
      }
      try{
        // TODO : API 연동 테스트

        await PATCH(`/specs/${id}/documents`, data);
        alert('수정이 완료되었습니다.')
        window.location.reload();

      }
      catch(error){
        alert('에러 발생')
      }
    }



    const handleChangeDocument = (e) => {
      setDocument(e.target.value);
      if(isEdited===false){
        setIsEdited(true);
      }

    }

    useEffect(()=>{
      // TODO : API 연동
      /*
      async function get() {
        if(id!==undefined){
          const result = await GET('/specs');
          setName(result.params.name);
          setDescrition(result.params.description);
          setDocument(result.params.document);
        }
      }
      get();
      */

      // TODO : 예시 데이터 셋 삭제
      setName(TEST_DATA.params.name);
      setDescription(TEST_DATA.params.description);
      setDocument(TEST_DATA.params.document);
    },[id])
    return (
    <DetailWrapper>
      <div className="title">
      <TextField id="name" variant="outlined" label="제목" value={name} disabled/>
      <Button variant="outlined" size="large" onClick={handleClickSubmit} disabled={!isEdited}>수정하기</Button>

      </div>
      <div className="desc">
      <TextField id="description" variant="outlined" label="설명" value={description} fullWidth disabled/>
      </div>
      <TextField id="document" variant="outlined" value={document} onChange={handleChangeDocument} rows={20} label="내용" multiline fullWidth />
    </DetailWrapper>);
  }