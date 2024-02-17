import { CircularProgress, Stack } from "@mui/material"

const Loader = () => {
  return (
    <Stack alignItems={'center'} height={'100vh'} justifyContent={'center'}>
      <CircularProgress />
    </Stack>
   
  )
}

export default Loader