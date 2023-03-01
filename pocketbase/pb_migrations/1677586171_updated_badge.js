migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nz6pm2q637898c5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y62vhw3v",
    "name": "user_affiliation",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nz6pm2q637898c5")

  // remove
  collection.schema.removeField("y62vhw3v")

  return dao.saveCollection(collection)
})
