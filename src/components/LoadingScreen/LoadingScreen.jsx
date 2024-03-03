import React from 'react'
import styles from './LoadingScreen.module.css'
export default function LoadingScreen() {
    return (
    <div className= {`${styles.holder}`}>
            <div className={`${styles.lds}`}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    )
}
