migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xsua0z97ughfy0h")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xsua0z97ughfy0h")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
