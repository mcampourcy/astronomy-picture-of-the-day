import Dexie from 'dexie'

export const db = new Dexie('apod')

db.version(1).stores({
    pictures: 'date, explanation, hdurl, media_type, title, url',
})

export async function bulkUpdate(data) {
    await db.pictures.bulkPut(data).catch((error) => {
        console.error(error)
    })
}
