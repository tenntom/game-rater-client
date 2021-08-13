import React, { useState } from "react"

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setCategories)
    }

    const getCategoryById = (id) => {
        return fetch(`http://localhost:8000/categories/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    const createCategory = (game) => {
        return fetch("http://localhost:8000/categories", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
        .then(response => response.json())
        .then(getCategories)
    }

    const editCategory = (game) => {
        return fetch(`http://localhost:8000/categories/${game.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        }).then(getCategories)
    }


    return (
        <CategoryContext.Provider value={{ categories, getCategories, createCategory, editCategory, setCategories, getCategoryById }} >
            {props.children}
        </CategoryContext.Provider>
    )
}