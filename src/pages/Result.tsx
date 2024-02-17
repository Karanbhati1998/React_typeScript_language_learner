import { Button, Container, List, ListItem, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearState } from "../features/Quiz/quizSlice"
import { countMatchingFunc } from "../utils/features"

const Result = () => {
 const dispatch= useDispatch()
 const navigate=useNavigate()
  const {word,result}=useSelector((state:{
    rootSlice:StateType
})=>{
    return  state.rootSlice
  })
  const correctans= countMatchingFunc(result,word.map(i=>i.meaning))
const precentage=(correctans/result.length)*100
console.log(precentage);

  function resetHandler(){
    navigate('/')
    dispatch(clearState())
  }
  return (
    <Container maxWidth={"sm"}>
    <Typography variant="h3" color={"primary"} m={"2rem 0"}>
      Result
    </Typography>
    <Typography m={"1rem"} variant="h6">
      You got {correctans} right out of {word?.length}
    </Typography>

    <Stack direction={"row"} justifyContent={"space-evenly"}>
      <Stack>
        <Typography m={"1rem 0"} variant="h5">
          Your Ans
        </Typography>
        <List>
          {result.map((i, idx) => (
            <ListItem key={idx}>
              {idx + 1} - {i}
            </ListItem>
          ))}
        </List>
      </Stack>
      <Stack>
        <Typography m={"1rem 0"} variant="h5">
          Correct Ans
        </Typography>
        <List>
          {word?.map((i, idx) => (
            <ListItem key={idx}>
              {idx + 1} - {i.meaning}
            </ListItem>
          ))}
        </List>
      </Stack>
    </Stack>

    <Typography
      m={"1rem"}
      variant="h5"
      color={precentage> 50 ? "green" : "red"}
    >
      {precentage> 50 ? "Pass" : "Fail"}
    </Typography>

    <Button
      onClick={resetHandler}
      sx={{ margin: "1rem" }}
      variant="contained"
    >
      Reset
    </Button>
  </Container>
  )
}

export default Result