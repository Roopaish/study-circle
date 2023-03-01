migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("167dp7cseso04t9")

  // remove
  collection.schema.removeField("t5lysf5k")

  // remove
  collection.schema.removeField("uybwp8h9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x3kbblrz",
    "name": "rating_affiliation",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "7cqaz5rkjroz04h",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("167dp7cseso04t9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t5lysf5k",
    "name": "upvote",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uybwp8h9",
    "name": "downvote",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("x3kbblrz")

  return dao.saveCollection(collection)
})
