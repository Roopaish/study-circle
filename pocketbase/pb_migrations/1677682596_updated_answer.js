migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnkltpga0wjq4wh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ggofaq5m",
    "name": "user_affiliation",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7w3fnldk",
    "name": "question_affiliation",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "167dp7cseso04t9",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnkltpga0wjq4wh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ggofaq5m",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7w3fnldk",
    "name": "question_affiliation",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "167dp7cseso04t9",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
