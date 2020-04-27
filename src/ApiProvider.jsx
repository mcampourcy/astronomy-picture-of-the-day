import React, { createContext, useEffect, useState } from 'react'
import { element } from 'prop-types'
import { isEmpty } from 'lodash'
import { format, subMonths } from 'date-fns'
import { getApodDataSinceDate } from './helpers'
import { db, bulkUpdate } from './helpers/db'

ApiProvider.propTypes = {
  children: element.isRequired,
}

export const ApiContext = createContext()

export function ApiProvider({ children }) {
  const [pictures, setPictures] = useState([])
  const [pictureOfTheDay, setPictureOfTheDay] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initDatabase()
  }, [])

  const getPictureByDate = date => pictures.find(picture => picture.date === date)

  async function initDatabase() {
    const collection = await db.table('pictures').toCollection()
    const picturesInDB = await collection.toArray()
    const lastPictureSaved = await collection.last(d => d)

    if (isEmpty(picturesInDB)) {
    //   If no data in DB, get all pictures of last 3 months
      const defaultStartDate = format(subMonths(new Date(), 3), 'yyyy-M-d')
      const apodData = await getApodDataSinceDate(defaultStartDate)
      await bulkUpdate(apodData)
    } else {
      const formattedToday = format(new Date(), 'yyyy-MM-d')
      const dbIsUpToDate = Boolean(picturesInDB.find(picture => picture.date === formattedToday))
      if (!dbIsUpToDate) {
        const newPictures = await getApodDataSinceDate(lastPictureSaved.date)
        await bulkUpdate(newPictures)
      }
    }

    setPictureOfTheDay(lastPictureSaved)
    setPictures(picturesInDB)
    setLoading(false)
  }

  return (
    <ApiContext.Provider value={{ loading, pictureOfTheDay, pictures, getPictureByDate }}>
      {children}
    </ApiContext.Provider>
  )
}
