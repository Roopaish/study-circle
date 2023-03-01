migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xsua0z97ughfy0h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jqucnejd",
    "name": "answer_affiliation",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "hnkltpga0wjq4wh",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xsua0z97ughfy0h")

  // remove
  collection.schema.removeField("jqucnejd")

  return dao.saveCollection(collection)
})
