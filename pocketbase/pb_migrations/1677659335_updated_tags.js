migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0arxdjov0f584g9")

  collection.createRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0arxdjov0f584g9")

  collection.createRule = null

  return dao.saveCollection(collection)
})
