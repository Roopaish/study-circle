migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0arxdjov0f584g9")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0arxdjov0f584g9")

  collection.listRule = null

  return dao.saveCollection(collection)
})
