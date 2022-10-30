import React, { useEffect, } from 'react'

export default function Modle(props) {
    console.log("--o", props)
    useEffect(() => {
        setTimeout(() => {
            props.closeModle()
        }, 2000);
    })
    return (
        <div
            style={{ background: props.color }}
        >{props.content}</div>
    )
}
