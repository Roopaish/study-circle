migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dcj89z58bsb78b2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3kwpcqaf",
    "name": "user_affiliation",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dcj89z58bsb78b2")

  // remove
  collection.schema.removeField("3kwpcqaf")

  return dao.saveCollection(collection)
})
