import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveResult } from "../features/Quiz/quizSlice"
const Quiz = () => {
  const[result,setResult]=useState<string[]>([])
  const[count,setCount]=useState<number>(0)
  const[answer,setAnswer]=useState<string>("")
  const {word} = useSelector((state:{
    rootSlice:StateType
})=>{
    return state.rootSlice
  })
  const dispatch=useDispatch()
  const naviagte=useNavigate()
  const nextHandler=()=>{
      setResult(prev=>[...prev,answer])
      setCount(prev=>prev+1)
      setAnswer('')
    }
    useEffect(()=>{
      if(word.length==0){
        return naviagte('/')
      }
      if(count+1>word.length)naviagte('/result')
      dispatch(saveResult(result))
  },[result])
  return (
    <Container maxWidth="sm"
    sx={{
      padding:"1rem"
    }}
    >
      <Typography m={'2rem 0'}>Quiz</Typography>
      <Typography variant="h3">
        {count+1} -{word[count]?.word}
      </Typography>
        <FormControl>
          <FormLabel
          sx={{
            mt:"2rem",
            mb:"1rem"
          }}
          >
            Meaning
          </FormLabel>
          <RadioGroup value={answer} 
          onChange={e=>setAnswer(e.target.value)}
          >
            {
              word[count]?.options.map((i,idx)=>(
                <FormControlLabel 
                value={i}
                control={<Radio/>}
                label={i}
                key={idx}
                />
                ))
              }
              </RadioGroup>
        </FormControl>
        <Button
        sx={{
          margin:"3rem 0"
        }}
        variant="contained"
        fullWidth
        disabled={answer===""}
        onClick={()=>nextHandler()}
        >
          {count==word.length-1?"Submit":"Next"}
        </Button>
    </Container>
  )
}

export default Quiz