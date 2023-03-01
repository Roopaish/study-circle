migrate((db) => {
  const collection = new Collection({
    "id": "3a71p8y47x5s001",
    "created": "2023-02-22 16:52:43.438Z",
    "updated": "2023-02-22 16:52:43.438Z",
    "name": "university",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qtbobtbf",
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
        "id": "pgp4nbac",
        "name": "location",
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
  const collection = dao.findCollectionByNameOrId("3a71p8y47x5s001");

  return dao.deleteCollection(collection);
})
