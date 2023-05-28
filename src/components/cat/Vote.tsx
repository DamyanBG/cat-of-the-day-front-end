import React, { useEffect, useState, useContext } from "react";
import { HOST_URL } from "../common/urls";
import { UserContext } from "../context/UserContext";
import WithLoading from "../hoc/WithLoading";
import { loadingWrap } from "../../utils/wrappers";

interface CatInfo {
    photo_url: string;
}

type Loading = boolean

const Vote: React.FC = () => {
    const [catInfo, setCatInfo] = useState<CatInfo>()
    const [loading, setLoading] = useState<Loading>(true)

    const { user } = useContext(UserContext)

    const fetchVote = async () => {
        await fetch(`${HOST_URL}/vote`, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
            .then(resp => resp.json())
            .then(json => {
                console.log(json)
                setCatInfo(json)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (!user.token) return
        loadingWrap(setLoading, fetchVote, [])
    }, [user.token])

    const postVote = (vote: string) => {
        const voteBody = {
            ...catInfo,
            vote: vote
        }
        fetch(`${HOST_URL}/vote`, {
            method: "POST",
            body: JSON.stringify(voteBody),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error()
                }
            })
            .then(() => {
                fetchVote()
            })
            .catch(() => alert("Error during voting!"))
    }

    const handleOnLike = () => {
        postVote("like")
    }

    const handleOnPass = () => {
        postVote("pass")
    }

    const handleOnDislike = () => {
        postVote("dislike")
    }

    return (
        <div>
            <WithLoading
                isLoading={loading}
            >
                <h1>Vote</h1>
                <section className="voting-image-section">
                    <img src={catInfo?.photo_url} alt="Cat" />
                </section>
                <section className="voting-buttons-section">
                    <button className="btn btn-primary" onClick={handleOnLike} disabled={loading}>
                        Like
                    </button>
                    <button className="btn btn-secondary" onClick={handleOnPass} disabled={loading}>
                        Pass
                    </button>
                    <button className="btn btn-danger" onClick={handleOnDislike} disabled={loading}>
                        Dislike
                    </button>
                </section>
            </WithLoading>
        </div>
    )
}

export default Vote;