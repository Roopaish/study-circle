migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnkltpga0wjq4wh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "csjx5vzb",
    "name": "rating",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnkltpga0wjq4wh")

  // remove
  collection.schema.removeField("csjx5vzb")

  return dao.saveCollection(collection)
})
