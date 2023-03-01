migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnkltpga0wjq4wh")

  // remove
  collection.schema.removeField("w5nlsqt7")

  // remove
  collection.schema.removeField("ivghfmig")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pocaxldg",
    "name": "rating_affiliation",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "xsua0z97ughfy0h",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnkltpga0wjq4wh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w5nlsqt7",
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
    "id": "ivghfmig",
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
  collection.schema.removeField("pocaxldg")

  return dao.saveCollection(collection)
})
