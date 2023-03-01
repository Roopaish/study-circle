migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("167dp7cseso04t9")

  collection.updateRule = ""

  // remove
  collection.schema.removeField("nqfrkakf")

  // remove
  collection.schema.removeField("g7ysmtsd")

  // update
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

  collection.updateRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nqfrkakf",
    "name": "rating",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g7ysmtsd",
    "name": "generated_ans",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dddhbd6m",
    "name": "tag_affiliation",
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
