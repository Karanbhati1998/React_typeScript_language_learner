import { AppBar, Toolbar, Typography } from "@mui/material"
import { NavLink, Outlet } from "react-router-dom"

const styles={
    color:"white",
    margin:"0.5rem",
    textDecoration:"none"
}
const RootLayout = () => {
  return (
    <>
    <AppBar position="static">
        <Toolbar >
            <Typography variant="h4" mr={"auto"} textTransform={"uppercase"} >Learn Do.</Typography>
            <NavLink style={styles} to='/' >Home</NavLink>
            <NavLink style={styles} to='/login'>Login</NavLink>
        </Toolbar>
    </AppBar>
    <main>
        <Outlet/>
    </main>
    </>
  )
}

export default RootLayout