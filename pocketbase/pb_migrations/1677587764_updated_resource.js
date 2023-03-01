migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dcj89z58bsb78b2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vgcm2zzu",
    "name": "rating_affiliation",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "71feyysong2xxs5",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dcj89z58bsb78b2")

  // remove
  collection.schema.removeField("vgcm2zzu")

  return dao.saveCollection(collection)
})
