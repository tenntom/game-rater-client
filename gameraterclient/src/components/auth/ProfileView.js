import React, { useEffect, useContext } from "react"
import { ProfileContext } from "./ProfileProvider.js"
import "./Auth.css"


export const Profile = () => {
    const { profile, getProfile } = useContext(ProfileContext)

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <article className="profile">
            <header>
                <h1>Your Profile</h1>
            </header>
            <section className="profile__info">
                <header className="profile__header">
                    <h3>Your Info</h3>
                </header>
                <div className="profile__name">
                    Welcome: {profile.player && profile.player.user.first_name} {profile.player && profile.player.user.last_name}
                </div>
                <div className="profile__username">Username: {profile.player && profile.player.user.username}</div>
                <div className="profile__bio">About you: {profile.player && profile.player.bio}</div>
            </section>
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h3>Your Reviews</h3>
                </header>
                <div className="registrations">
                    {
                        profile.reviews.map(review => {
                            return <div key={review} className="registration">
                                <div className="registration__game">{review.review_text}</div>
                            </div>
                        })
                    }
                </div>
                <header className="registrations__header">
                    <h3>Your Ratings</h3>
                </header>
                <div className="registrations">
                    {
                        profile.ratings.map(event => {
                            return <div key={event.id} className="registration">
                                <div className="registration__game">{event.game.name}</div>
                                <div>{event.description}</div>
                                <div>
                                    {event.date} @ {event.time}
                                </div>
                            </div>
                        })
                    }
                </div>
            </section>
        </article>
    )
}