import React from 'react'
import { Link } from 'react-router-dom'
import { StyleObject } from '../MainMenu/MainMenu'

export class LevelCreator extends React.Component {
    public render(): JSX.Element {
        return <div style={styles.container}>
            <h1>Level Creator</h1>


            <Link to="/">
                <div style={styles.backButton}>X</div>
            </Link>
        </div>
    }
}

const styles: StyleObject = {
    container: {
        display: 'grid',
        gridTemplateColumns: `repeat(5, 1fr)`,
        gridTemplateRows: `repeat(15, 1fr)`,
        height: `100vh`,
        width: `100vw`,
        position: 'relative',
        gridAutoFlow: 'column',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        borderRadius: 24,
        height: 40, width: 40,
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        bottom: 10,
        right: 10,
    },
}