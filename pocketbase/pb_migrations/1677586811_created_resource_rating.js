migrate((db) => {
  const collection = new Collection({
    "id": "71feyysong2xxs5",
    "created": "2023-02-28 12:20:11.391Z",
    "updated": "2023-02-28 12:20:11.391Z",
    "name": "resource_rating",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "miwlid6n",
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
        "id": "8duotgbk",
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
  const collection = dao.findCollectionByNameOrId("71feyysong2xxs5");

  return dao.deleteCollection(collection);
})
