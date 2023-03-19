import { useContext, useState } from "react";
import { HOST_URL } from "../../common/urls";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

interface RegisterInfo {
    first_name: string,
    last_name: string,
    email: string,
    password: string
}

const initialRegisterState: RegisterInfo = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
}

const RegisterVoter = () => {
    const [registerInfo, setRegisterInfo] = useState<RegisterInfo>(initialRegisterState)

    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const postUser = () => {
        fetch(`${HOST_URL}/voter/register`, {
            method: "POST",
            body: JSON.stringify(registerInfo),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => {
                if (resp.status !== 201) {
                    alert("error!")
                }
                return resp.json()
            })
            .then(json => {
                console.log(json)
                if (json.token) {
                    localStorage.setItem('user', JSON.stringify(json));
                    setUser(json);
                    navigate('/');
                }
            })
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterInfo({
            ...registerInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        postUser()
    }

    return (
        <div className="text-center">
            <form onSubmit={handleOnSubmit}>
                <label>First name</label>
                <article>
                    <input
                        type="text"
                        name="first_name"
                        value={registerInfo.first_name || ""}
                        onChange={handleOnChange}
                    />
                </article>
                <label>Last name</label>
                <article>
                    <input
                        type="text"
                        name="last_name"
                        value={registerInfo.last_name || ""}
                        onChange={handleOnChange}
                    />
                </article>
                <label>Email</label>
                <article>
                    <input
                        type="email"
                        name="email"
                        value={registerInfo.email || ""}
                        onChange={handleOnChange}
                    />
                </article>
                <label>Password</label>
                <article>
                    <input
                        type="password"
                        name="password"
                        value={registerInfo.password || ""}
                        onChange={handleOnChange}
                    />
                </article>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default RegisterVoter