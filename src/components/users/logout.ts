import { UserContext } from "../context/UserContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"


export const logout = () => {
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()
    setUser({})
    window.localStorage.clear()
    navigate("/")
}
