import { ArrowBack, VolumeUp } from "@mui/icons-material"
import { Button, Container, Stack, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import Loader from "../components/Loader"
import { getWordFail, getWordRequest, getWordSuccess } from "../features/Quiz/quizSlice"
import { fetchAudio, translateWords } from "../utils/features"
const Learning = () => {
  const [count,setCount]=useState<number>(0)
  const [audioSrc,setAudioSrc]=useState<string>('')
  const language=useSearchParams()[0].get('language') as LangType
  const naviagte=useNavigate()
  const dispatch=useDispatch()
  const audioRef=useRef(null)
  const {loading,word} = useSelector((state:{
    rootSlice:StateType
})=>{
    return state.rootSlice
  })
  const nextHandler=():void=>{
    setCount(prev=>prev+1)
    setAudioSrc('')
  }
  const audioHandler= async():Promise<void>=>{
    const player:HTMLAudioElement=audioRef.current!
    if(player){
      player.play()
    }else{
      try {
        const data= await fetchAudio(word[count]?.word,language)
        setAudioSrc(data)
      } catch (error) {
        console.log(error);
        
      }
    }

  }
  useEffect(()=>{
    dispatch(getWordRequest())
    translateWords(language).then((arr)=>{
      console.log(arr);
      dispatch(getWordSuccess(arr))
    }).catch(err=>{
      dispatch(getWordFail(err.message))
    })
  },[])


  if(loading) return <Loader/>
  return (
    <Container maxWidth="sm" sx={{
      padding:"1rem"
    }}>
      <Button onClick={()=>count==0? naviagte('/'):setCount(prev=>prev-1)}>
        <ArrowBack/>
      </Button>
      <Typography m={"2rem 0"}>
        Learning Made Easy
      </Typography>
      <Stack direction={"row"} spacing={"1rem"}>
        <Typography variant="h4">
         {count+1} : {word[count]?.word}
        </Typography>
        <Typography color={"blue"} variant="h4">
        {word[count]?.meaning}
        </Typography>
        {
          audioSrc && 
          <audio src={audioSrc} autoPlay ref={audioRef}></audio>
        }
        <Button 
        sx={{
          borderRadius:"50%"
        }}
        onClick={audioHandler}
        >
          <VolumeUp/>
        </Button>
      </Stack>
      <Button variant="contained" 
      
      fullWidth sx={{
        margin:"3rem 0"
      }}
      onClick={()=>count==word.length-1?naviagte('/quiz'):nextHandler()}
      >
        {count==word.length-1?"Next":"text"}
      </Button>
    </Container>
  )
}

export default Learning