migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3a71p8y47x5s001")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3a71p8y47x5s001")

  collection.listRule = null

  return dao.saveCollection(collection)
})
