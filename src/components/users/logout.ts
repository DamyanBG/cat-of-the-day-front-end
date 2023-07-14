import { UserContext } from "../context/UserContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { HOST_URL } from "../common/urls"


export const logOut = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const postLogOut = () => {
        fetch(`${HOST_URL}/logout`, {
            method: "POST",
            body: JSON.stringify({
                token: user.token
            })
        })
            .then((resp) => {
                if (resp.status === 201) {
                    setUser({})
                    window.localStorage.clear()
                    navigate("/")
                }
            })
    }

    postLogOut()
}
