import React, { useContext, useRef, useState } from 'react'
import { uploadImg } from '../api/imgupload';
import styled from 'styled-components';
import { FaFileUpload } from "react-icons/fa";
import Keyword from '../api/Keyword';

const Uploader = () => {

    const [file, setFile] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [success,setSuccess] = useState(null);
    const [error,setError]= useState(null);
    const fileref = useRef();
    const [keyword, setKeyword] = useState(null);
    const [keywordText, setKeywordText] = useState(null);

    const handleFetchKeyword = ({ keyword, keywordText }) => {
        setKeyword(keyword);
        setKeywordText(keywordText);
    };

    // const uploadSubmit = async (e) => {
    //     e.preventDefault();
    //     await fetchKeywordData();
    //     setDataFetched(true);
    //     try {

    //         setSuccess('업로드 완료!');
    //         setTimeout(()=>{
    //             setSuccess(null)
    //         },2000);
    //         setFile(null);
    //         if (fileref.current){
    //             fileref.current.value='';
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         setError('업로드 실패 :(');
    //     }finally{setIsLoading(false)}
    // }

    const onChangeImage = (e)=> {
        const {files} = e.target;
        const uploadFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(uploadFile);
        reader.onloadend = ()=> {
        setFile(reader.result)
        }
        
        
     }

    return (
        <TotalWrapper>
            
            

            <img src = {file} img = "img"/>
            <label for="file">
                <div class="btn-upload"><div className='uploadicon'><FaFileUpload /></div>
            <div>사진 업로드</div></div>
            </label>
            <input type = "file" accept = "image/*" id="file" onChange = {onChangeImage}/>
            <Container>
                <Background />
                <Progress percent={70} />
            </Container>
            <Keyword onFetchKeyword={handleFetchKeyword} />
            {keyword && (
                <div>
                    <p>Keyword: {JSON.stringify(keyword)}</p>
                    <p>Keyword Text: {keywordText}</p>
                </div>
            )}

            <div>{success}</div>
        </TotalWrapper>
    );
};

const TotalWrapper=styled.div`
    img{
        margin: 0 auto;
        padding-bottom:10px;
        width:400px;
        height:400px;
        border:solid black 1px;
    }
    #file{
        display:none;
    }
    .btn-upload{
        width:448px;
        height:100%;
        z-index:2;
        background-color:transparent;
        border:solid 1px black;
        border-radius:34px;
        margin-top:20px;
        margin-left:20px;
        &:hover{
            background-color:#c3c3c3;
        }   
    }
    .uploadicon{
        display:inline-block;
        font-size:60px;
    }
`

const Container = styled.div`
  margin: 10px 0;
  height: 10px;
  width: 100%;
  position: relative;
`

const BaseBox = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 3px;
  transition: width 10s ease-in-out;
`

const Background = styled(BaseBox)`
  background: grey;
  width: 100%;
`

const Progress = styled(BaseBox)`
  background: blue;
  width: ${({ percent }) => percent}%;
`

export default Uploader;