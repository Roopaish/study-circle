migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xsua0z97ughfy0h")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b6d6j8ja",
    "name": "user_affiliation",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
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
  const collection = dao.findCollectionByNameOrId("xsua0z97ughfy0h")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b6d6j8ja",
    "name": "user_affiliation",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
