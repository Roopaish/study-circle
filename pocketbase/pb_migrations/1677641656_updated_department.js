migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("162ck0bvrtmrqp5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "09bi5gfx",
    "name": "university_affiliation",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "3a71p8y47x5s001",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": [
        "id",
        "name"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("162ck0bvrtmrqp5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "09bi5gfx",
    "name": "university_affiliation",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "3a71p8y47x5s001",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
