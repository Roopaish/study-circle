migrate((db) => {
  const collection = new Collection({
    "id": "nz6pm2q637898c5",
    "created": "2023-02-23 04:44:53.302Z",
    "updated": "2023-02-23 04:44:53.302Z",
    "name": "badge",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kmaa0ad2",
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
        "id": "fvvxnb28",
        "name": "desc",
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
        "id": "g7lctj6t",
        "name": "amount",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("nz6pm2q637898c5");

  return dao.deleteCollection(collection);
})
