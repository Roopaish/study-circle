migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("167dp7cseso04t9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g7ysmtsd",
    "name": "generated_ans",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("167dp7cseso04t9")

  // remove
  collection.schema.removeField("g7ysmtsd")

  return dao.saveCollection(collection)
})
