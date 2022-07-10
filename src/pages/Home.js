import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import { useEffect, useState } from 'react';
import {POST} from '../utils/axios'
import Card from '../components/Card'
import styled from '@emotion/styled'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
  padding: 70px 50px;
`

const Container = styled.div`
  border-left: 1.5px solid #dedede;
  border-right: 1.5px solid #dedede;  
  margin: 0 100px;
  height: 100vh;
  overflow-y: auto;
  position: relative;

  .btnContainer {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`

const Content = styled.div`
margin: 5px 0;
`

const Confirm = styled.div`

  margin: 15px 0 0 325px;
`

const TEST_DATA = {
  params:{
    total_count: 3,
    specs: [
      {
        spec_id: 1,
        name: 'name1',
        description: 'description1sssssssssssssssssssssssssssssssssssss',
      },
      {
        spec_id: 2,
        name: 'name2',
        description: 'description2',
      },
      {
        spec_id: 3,
        name: 'name3',
        description: 'description3',
      },
      {
        spec_id: 4,
        name: 'name4',
        description: 'description4',
      },
      {
        spec_id: 5,
        name: 'name5',
        description: 'description5',
      }
    ]
  }
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const CardContainer = () => {
    return (<CardWrapper>
    {data?.params?.specs.map((item)=>{return(<Card id={item.spec_id} name={item.name} description={item.description}/>)})}
    </CardWrapper>)
  }

  const handleClickCreate = () => {
    if(isOpen==false) {
      setIsOpen(true);
    }
  }

  const handleClose = () => {
    setIsOpen(false);
    setName('');
    setDescription('');
  }

  const handleClickSubmit = async()=> {
    if(window.confirm('제출하시겠습니까?')){
      try{
        const data = {
          name: name,
          description: description
        }
        //TODO: API 연동 테스트
        await POST('/specs', data);
        alert('완료되었습니다.');
        setIsOpen(false);
        window.location.reload();
      }
      catch(error){
        alert('오류발생', error);
      }
    }
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
    
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  useEffect(()=>{
    // TODO : API 연동
    /*
    async function get() {
      const result = await GET('/specs');
      setData(result);
    }
    get();
    */

    // TODO : 예시 데이터 셋 삭제
    setData(TEST_DATA)
  },[])


  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container >
        <div className='btnContainer'>
          <Button variant="outlined" size="large" onClick={handleClickCreate}>생성하기</Button>
        </div>
        <CardContainer/>
      </Container>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Content>
          <TextField id="name" variant="outlined" label="제목" value={name} onChange={handleChangeName}/>
          </Content>
          <Content >
          <TextField id="description" variant="outlined" label="설명" rows={5} value={description} fullWidth multiline onChange={handleChangeDescription}/>
          </Content>
          <Confirm >
          <Button variant="outlined" size="large" onClick={handleClickSubmit}>제출하기</Button>
          </Confirm>

        </Box>
      </Modal>
    </React.Fragment>
  );
}