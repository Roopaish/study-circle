migrate((db) => {
  const collection = new Collection({
    "id": "162ck0bvrtmrqp5",
    "created": "2023-02-23 04:40:26.889Z",
    "updated": "2023-02-23 04:40:26.889Z",
    "name": "department",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "aftlpzgb",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "tynn4sz4",
        "name": "hod",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("162ck0bvrtmrqp5");

  return dao.deleteCollection(collection);
})
