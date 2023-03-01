migrate((db) => {
  const collection = new Collection({
    "id": "dcj89z58bsb78b2",
    "created": "2023-02-23 04:38:54.092Z",
    "updated": "2023-02-23 04:38:54.092Z",
    "name": "public_Resourse",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fdh7fgyh",
        "name": "file_name",
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
  const collection = dao.findCollectionByNameOrId("dcj89z58bsb78b2");

  return dao.deleteCollection(collection);
})
