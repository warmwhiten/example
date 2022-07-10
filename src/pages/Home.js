import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import { useEffect, useState } from 'react';
import {POST} from '../utils/axios'
import Card from '../components/Card'
import styled from '@emotion/styled'
import Button from '@mui/material/Button';

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



export default function Home() {
  const [data, setData] = useState({});
  const CardContainer = () => {
    return (<CardWrapper>
    {data?.params?.specs.map((item)=>{return(<Card id={item.spec_id} name={item.name} description={item.description}/>)})}
    </CardWrapper>)
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
          <Button variant="outlined" size="large">생성하기</Button>
        </div>
        <CardContainer/>
        
            

      </Container>
    </React.Fragment>
  );
}