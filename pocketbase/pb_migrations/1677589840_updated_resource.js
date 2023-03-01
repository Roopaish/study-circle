migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dcj89z58bsb78b2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zmturntq",
    "name": "subject_affiliation",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "msglvtn826ag6jd",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dcj89z58bsb78b2")

  // remove
  collection.schema.removeField("zmturntq")

  return dao.saveCollection(collection)
})
