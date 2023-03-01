migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("msglvtn826ag6jd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kmvgcllf",
    "name": "department_affiliation",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "162ck0bvrtmrqp5",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("msglvtn826ag6jd")

  // remove
  collection.schema.removeField("kmvgcllf")

  return dao.saveCollection(collection)
})
