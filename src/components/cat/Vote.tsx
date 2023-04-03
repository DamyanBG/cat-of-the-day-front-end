import React, { useEffect, useState } from "react";
import { HOST_URL } from "../common/urls";

interface CatInfo {
    photo_url: string;
}

type Loading = boolean

const Vote: React.FC = () => {
    const [catInfo, setCatInfo] = useState<CatInfo>()
    const [loading, setLoading] = useState<Loading>(true)

    const fetchVote = () => {
        setLoading(true)
        fetch(`${HOST_URL}/vote`)
            .then(resp => resp.json())
            .then(json => {
                console.log(json)
                setCatInfo(json)
            })
            .finally(() => setLoading(false))
    }

    useEffect(fetchVote, [])

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
        </div>
    )
}

export default Vote;