migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("162ck0bvrtmrqp5")

  // remove
  collection.schema.removeField("tynn4sz4")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("162ck0bvrtmrqp5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tynn4sz4",
    "name": "hod",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
