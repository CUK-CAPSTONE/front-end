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
        e.preventDefault();
        try {
            const url = await uploadImg(file)
            console.log(url);
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
        setFile(reader.result);
        }
        uploadSubmit();
     }

    return (
        <TotalWrapper>
            <div className='uploadicon'><FaFileUpload /></div>
            <div>사진 업로드</div>

            <img src = {file} img = "img"/>
            <input type = "file" accept = "image/*" onChange = {onChangeImage}/>
        </TotalWrapper>
    );
};

const TotalWrapper=styled.div`
    .uploadicon{
        display:inline-block;
        font-size:60px;
    }
`
export default Uploader;