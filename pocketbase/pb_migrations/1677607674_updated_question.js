migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("167dp7cseso04t9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dddhbd6m",
    "name": "tag_affiliate",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "0arxdjov0f584g9",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("167dp7cseso04t9")

  // remove
  collection.schema.removeField("dddhbd6m")

  return dao.saveCollection(collection)
})
