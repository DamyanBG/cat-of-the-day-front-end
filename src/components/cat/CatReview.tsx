import React, { useContext, useEffect, useState } from "react"
import { HOST_URL } from "../common/urls"
import { UserContext } from "../context/UserContext"

interface CatInfo {
    photo_url: string;
    name: string;
    breed: string;
    microchip_id: string;
    passport_id: string;
    create_on: string
}

const catInfoInitialState = {
    photo_url: "",
    name: "",
    breed: "",
    microchip_id: "",
    passport_id: "",
    create_on: ""
}

const CatReview: React.FC = () => {
    const [catInfo, setCatInfo] = useState<CatInfo>(catInfoInitialState)

    const { user } = useContext(UserContext)

    console.log(user.token)

    const fetchCatInfo = () => {
        if (!user.token) return
        fetch(`${HOST_URL}/cat`, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
            .then(resp => resp.json())
            .then(json => {
                console.log(json)
                setCatInfo(json)
            })
    }

    useEffect(fetchCatInfo, [user.token])

    return (
        <div>
            <h2>Review</h2>
            <section className="voting-image-section">
                <img src={catInfo.photo_url} alt="" />
            </section>
            <section>
                <article className="flex">
                    <p>Name:</p>
                    <p>{catInfo.name}</p>
                </article>
                <article className="flex">
                    <p>Breed:</p>
                    <p>{catInfo.breed}</p>
                </article>
                <article className="flex">
                    <p>Microchip ID:</p>
                    <p>{catInfo.microchip_id}</p>
                </article>
                <article className="flex">
                    <p>Passport ID:</p>
                    <p>{catInfo.passport_id}</p>
                </article>
                <article className="flex">
                    <p>Added on:</p>
                    <p>{catInfo.create_on}</p>
                </article>
            </section>
        </div>
    )
}

export default CatReview;