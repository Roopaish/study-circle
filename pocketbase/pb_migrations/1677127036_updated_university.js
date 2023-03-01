migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3a71p8y47x5s001")

  // remove
  collection.schema.removeField("1a95r8es")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3a71p8y47x5s001")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1a95r8es",
    "name": "created_at",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
