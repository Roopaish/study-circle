migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("msglvtn826ag6jd")

  // remove
  collection.schema.removeField("cmzlxqt2")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("msglvtn826ag6jd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cmzlxqt2",
    "name": "course_id",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
