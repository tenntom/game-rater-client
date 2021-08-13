import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'


export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)
    const history = useHistory()


    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__edit">
                        <button className="btn btn-3" onClick={e => history.push(`/games/${game.id}/edit`)}>
                            Edit                        
                        </button>
                        </div>
                        <div className="game__name">{game.title} by {game.designer}</div>
                        <div className="categories">
                            Categories:
                        {
                            game.categories.map(c => {
                                return <div key={`category--${c.id}`} className="category">
                                    {c.label}
                                </div>
                            })
                        }
                        </div>
                        {/* <div className="game__category">{game.category.label}</div> */}
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__description">Game Description: {game.description}</div>
                        <div className="game__age_rec">Recommended Age: {game.age_rec}</div>
                    </section>
                })
            }
        </article>
    )
}