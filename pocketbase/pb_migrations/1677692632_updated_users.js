migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uxknwoku",
    "name": "tag_affiliation",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "0arxdjov0f584g9",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": [
        "tagname"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("uxknwoku")

  return dao.saveCollection(collection)
})
