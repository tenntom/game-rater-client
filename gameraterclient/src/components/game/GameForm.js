import React, { useContext, useState, useEffect } from "react"
import { CategoryContext } from "../categories/CategoryProvider.js"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, editGame, getGameById } = useContext(GameContext)
    const { getCategories, categories } = useContext(CategoryContext)
    
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        designer: "",
        numberOfPlayers: 0,
        duration: 0,
        age_rec: 0,
        category: 0
    })

    const {gameId} = useParams()

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        getGameById(gameId)
            .then((game) => {
                setCurrentGame({
                    id: parseInt(gameId),
                    title: game.title,
                    description: game.description,
                    designer: game.designer,
                    numberOfPlayers: game.number_of_players,
                    duration: game.duration,
                    age_rec: game.ageRec,
                    categories: game.categories
                })
            })
    }, [gameId])


    const handleControlledInputChange = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    // const handleCategoryInputChange = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState[event.target.cate] = event.target.value
    //     setCurrentGame(newGameState)
    // }


    return (
        <form className="gameForm">
            <h2 className="gameForm__name">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Cateogries: </label>
                    <select name="category" name="category" className="form-control" value={currentGame.categories} onChange={handleControlledInputChange}>
                        <option value="0">Select a type</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="duration">Estimated Time (in mins): </label>
                    <input type="text" name="duration" required autoFocus className="form-control"
                        value={currentGame.duration}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Recommended Age: </label>
                    <input type="text" name="age_recommendation" required autoFocus className="form-control"
                        value={currentGame.ageRec}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

 
            

            {
                (gameId)
                    ? <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()
                            editGame({
                                id: parseInt(gameId),
                                title: currentGame.title,
                                description: currentGame.description,
                                designer: currentGame.designer,
                                numberOfPlayers: currentGame.number_of_players,
                                duration: currentGame.duration,
                                age_rec: currentGame.ageRec,
                                categories: currentGame.categories
                            })
                                .then(() => history.push("/games"))
                        }}
                        className="btn btn-primary">Edit</button>

                    : <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const game = {
                                title: currentGame.title,
                                description: currentGame.description,
                                designer: currentGame.designer,
                                numberOfPlayers: currentGame.number_of_players,
                                duration: currentGame.duration,
                                age_rec: currentGame.ageRec,
                                categories: currentGame.categories
                            }

                            // Send POST request to your API
                            createGame(game)
                                .then(() => history.push("/games"))
                        }}
                        className="btn btn-primary">Create</button>
            }

        </form>
    )
}