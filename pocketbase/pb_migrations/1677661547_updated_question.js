migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("167dp7cseso04t9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "igi2iate",
    "name": "test",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("167dp7cseso04t9")

  // remove
  collection.schema.removeField("igi2iate")

  return dao.saveCollection(collection)
})
