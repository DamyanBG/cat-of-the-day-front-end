import React, { useEffect, useState } from "react";
import { HOST_URL } from "../common/urls";

interface CatInfo {
    photo_url: string;
}

const Vote: React.FC = () => {
    const [catInfo, setCatInfo] = useState<CatInfo>()

    const fetchVote = () => {
        fetch(`${HOST_URL}/vote`)
            .then(resp => resp.json())
            .then(json => {
                console.log(json)
                setCatInfo(json)
            })
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
                <button className="btn btn-primary" onClick={handleOnLike}>
                    Like
                </button>
                <button className="btn btn-secondary" onClick={handleOnPass}>
                    Pass
                </button>
                <button className="btn btn-danger" onClick={handleOnDislike}>
                    Dislike
                </button>
            </section>
        </div>
    )
}

export default Vote;