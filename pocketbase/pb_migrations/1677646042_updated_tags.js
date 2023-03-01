migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0arxdjov0f584g9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ezlua202",
    "name": "tagname",
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
  const collection = dao.findCollectionByNameOrId("0arxdjov0f584g9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ezlua202",
    "name": "tagname",
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
