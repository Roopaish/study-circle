migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("msglvtn826ag6jd")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("msglvtn826ag6jd")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
