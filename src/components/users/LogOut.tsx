import { UserContext } from "../context/UserContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { HOST_URL } from "../common/urls"
import { Nav } from "react-bootstrap"

export const LogOut = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const postLogOut = () => {
        fetch(`${HOST_URL}/logout`, {
            method: "POST",
            body: JSON.stringify({
                token: user.token
            }),
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            }
        })
            .then((resp) => {
                if (resp.status === 400) {
                    return resp.json()
                }

                if (resp.status === 201) {
                    setUser({})
                    window.localStorage.clear()
                    navigate("/")
                }
                return resp.json()
            })
            .then((json) => {
                console.log(json)
            })
    }

    const handleOnLogOutClick = () => {
        postLogOut()
    }

    return (
        <Nav.Link onClick={handleOnLogOutClick}>
            Logout
        </Nav.Link>
    )
}
