migrate((db) => {
  const collection = new Collection({
    "id": "xsua0z97ughfy0h",
    "created": "2023-02-28 12:17:51.947Z",
    "updated": "2023-02-28 12:17:51.947Z",
    "name": "answer_rating",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yijmgrzi",
        "name": "value",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": -1,
          "max": 1
        }
      },
      {
        "system": false,
        "id": "b6d6j8ja",
        "name": "field",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "maxSelect": null,
          "displayFields": []
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("xsua0z97ughfy0h");

  return dao.deleteCollection(collection);
})
