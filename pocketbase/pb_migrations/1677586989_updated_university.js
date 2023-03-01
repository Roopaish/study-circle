migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3a71p8y47x5s001")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hfieqijg",
    "name": "code",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": 1,
      "max": 3,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3a71p8y47x5s001")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hfieqijg",
    "name": "code",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": 1,
      "max": 2,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
