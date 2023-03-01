migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dcj89z58bsb78b2")

  collection.name = "resource"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dcj89z58bsb78b2")

  collection.name = "resourse"

  return dao.saveCollection(collection)
})
