migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dcj89z58bsb78b2")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wxmiofgs",
    "name": "tag_affiliate",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "0arxdjov0f584g9",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": [
        "id",
        "tagname"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dcj89z58bsb78b2")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wxmiofgs",
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
})
