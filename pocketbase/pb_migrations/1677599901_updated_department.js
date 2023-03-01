migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("162ck0bvrtmrqp5")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("162ck0bvrtmrqp5")

  collection.listRule = null

  return dao.saveCollection(collection)
})
