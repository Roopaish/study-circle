migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("167dp7cseso04t9")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("167dp7cseso04t9")

  collection.listRule = null

  return dao.saveCollection(collection)
})
