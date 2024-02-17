import { Button, Container, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Languages=[
    {
        name:"Japanese",
        code:"ja"
    },
    {
        name:"Hindi",
        code:"hi"
    },
    {
        name:"Spanish",
        code:"es"
    },
    {
        name:"French",
        code:"fr"
    },
]
const Home = () => {
    const navigate=useNavigate()
    const handleClick=(language:LangType)=>{
        navigate(`/learn?language=${language}`)
    }
  return (
    <Container maxWidth="sm">
        <Typography variant="h3" p='2rem' textAlign={"center"} >  
            Welcome , Begin of your journey Learning
            </Typography>
    <Stack direction={"row"} spacing={"2rem"}
    p='2rem'
    alignItems={"center"}
    justifyContent={"center"}
    >
        {
            Languages.map(language=>{
              return   <Button key={language.code} 
              onClick={()=>handleClick(language.code)}
              variant="contained"
              >{language.name}</Button>
            })
        }
    </Stack>
        <Typography variant="h6" p='2rem' textAlign={"center"} >  
            Choose One Language from above
            </Typography>
    </Container>
  )
}

export default Home