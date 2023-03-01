migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dcj89z58bsb78b2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mv0sfgvt",
    "name": "file_url",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dcj89z58bsb78b2")

  // remove
  collection.schema.removeField("mv0sfgvt")

  return dao.saveCollection(collection)
})
