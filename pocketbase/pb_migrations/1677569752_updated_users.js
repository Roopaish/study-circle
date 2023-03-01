migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tx5ifa7k",
    "name": "universityId",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "3a71p8y47x5s001",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": [
        "id"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r4zsyzwt",
    "name": "depId",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "162ck0bvrtmrqp5",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": [
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("tx5ifa7k")

  // remove
  collection.schema.removeField("r4zsyzwt")

  return dao.saveCollection(collection)
})
