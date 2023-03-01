migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3a71p8y47x5s001")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "owhnqqex",
    "name": "image_url",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3a71p8y47x5s001")

  // remove
  collection.schema.removeField("owhnqqex")

  return dao.saveCollection(collection)
})
