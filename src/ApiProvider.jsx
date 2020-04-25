import React, { createContext, useEffect, useState } from 'react'
import { element } from 'prop-types'
import { isEmpty } from 'lodash'
import { format, isEqual, parse, subMonths } from 'date-fns'
import { getApodDataSinceDate } from './helpers'
import { db, initDB } from './helpers/db'

ApiProvider.propTypes = {
  children: element.isRequired,
}

export const ApiContext = createContext()

export function ApiProvider({ children }) {
  const [pictures, setPictures] = useState([])
  const [pictureOfTheDay, setPictureOfTheDay] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!pictures.length) initPictures()
  }, [pictures])

  async function initPictures() {
    const getPicturesInDB = await db.table('pictures').toArray()
    const today = new Date()

    if (isEmpty(getPicturesInDB)) {
      const defaultStartDate = format(subMonths(today, 3), 'yyyy-M-d')
      const apodData = await getApodDataSinceDate(defaultStartDate)
      await initDB(apodData)
    } else {
      const lastPictureSaved = getPicturesInDB[0]
      const dbIsUpToDate = isEqual(today, parse(lastPictureSaved.date, 'yyyy-M-d', today))
      if (!dbIsUpToDate) {
        await getApodDataSinceDate(getPicturesInDB[0])
      }
    }

    await setPictureOfTheDay(getPicturesInDB.shift())
    await setPictures(getPicturesInDB)
    setLoading(false)
  }

  return (
    <ApiContext.Provider value={{ loading, pictureOfTheDay, pictures }}>
      {children}
    </ApiContext.Provider>
  )
}
