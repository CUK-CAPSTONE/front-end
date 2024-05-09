import React, { useContext, useRef, useState } from 'react'
import { uploadImg } from '../api/imgupload';
import styled from 'styled-components';
import { FaFileUpload } from "react-icons/fa";

const Uploader = () => {

    const [file, setFile] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [success,setSuccess] = useState(null);
    const [error,setError]= useState(null);
    const fileref = useRef();

    const uploadSubmit = async (e) => {
        // e.preventDefault();
        try {
            const url = await uploadImg(file)
            console.log(file);
            setSuccess('업로드 완료!');
            setTimeout(()=>{
                setSuccess(null)
            },2000);
            setFile(null);
            if (fileref.current){
                fileref.current.value='';
            }
        } catch (error) {
            console.error(error);
            setError('업로드 실패 :(');
        }finally{setIsLoading(false)}
    }

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
            <button onClick={uploadSubmit}>upload</button>

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
export default Uploader;