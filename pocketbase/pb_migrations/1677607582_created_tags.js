migrate((db) => {
  const collection = new Collection({
    "id": "0arxdjov0f584g9",
    "created": "2023-02-28 18:06:22.644Z",
    "updated": "2023-02-28 18:06:22.644Z",
    "name": "tags",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ezlua202",
        "name": "tagname",
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
  const collection = dao.findCollectionByNameOrId("0arxdjov0f584g9");

  return dao.deleteCollection(collection);
})
