import React from 'react'

// function Header() {
export default function Header({ children }) {
    return(
        <header>
            <h1>{ children }</h1>
        </header>
    )
}

// export default Header