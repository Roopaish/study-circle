migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("167dp7cseso04t9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xsp8y6vq",
    "name": "user_affiliation",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jpjab5uw",
    "name": "answer_affiliation",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "hnkltpga0wjq4wh",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pw3gwm1i",
    "name": "subject_affiliation",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "msglvtn826ag6jd",
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
  collection.schema.removeField("xsp8y6vq")

  // remove
  collection.schema.removeField("jpjab5uw")

  // remove
  collection.schema.removeField("pw3gwm1i")

  return dao.saveCollection(collection)
})
