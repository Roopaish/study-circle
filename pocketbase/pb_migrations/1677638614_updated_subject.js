migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("msglvtn826ag6jd")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("msglvtn826ag6jd")

  collection.listRule = null

  return dao.saveCollection(collection)
})
