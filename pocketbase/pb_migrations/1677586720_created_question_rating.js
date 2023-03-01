migrate((db) => {
  const collection = new Collection({
    "id": "7cqaz5rkjroz04h",
    "created": "2023-02-28 12:18:40.943Z",
    "updated": "2023-02-28 12:18:40.943Z",
    "name": "question_rating",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "70zidanj",
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
        "id": "4azjzlaz",
        "name": "user_affiliation",
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
  const collection = dao.findCollectionByNameOrId("7cqaz5rkjroz04h");

  return dao.deleteCollection(collection);
})
