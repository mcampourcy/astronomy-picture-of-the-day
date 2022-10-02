import React, { useContext } from 'react'
import { ApiContext } from '../ApiProvider'
import { Loader } from '../Loader'
import { GridItem } from './GridItem'
import './Homepage.css'

export function Homepage() {
    const { loading, pictureOfTheDay, pictures } = useContext(ApiContext)
    console.log({ pictures })
    if (loading) return <Loader />

    return (
        <>
            <article>
                <figure>
                    <img src={pictureOfTheDay.url} alt="" />
                    {pictureOfTheDay.copyright && (
                        <figcaption>
                            Copyright {pictureOfTheDay.copyright}
                        </figcaption>
                    )}
                </figure>
                <span>
                    <h2>{pictureOfTheDay.title}</h2>
                    <p>{pictureOfTheDay.explanation}</p>
                    <p>
                        <a href={pictureOfTheDay.hdurl}>Download HD picture</a>
                    </p>
                </span>
            </article>
            <section className="grid">
                {pictures.map((item) => (
                    <GridItem key={item.id} item={item} />
                ))}
            </section>
        </>
    )
}
