migrate((db) => {
  const collection = new Collection({
    "id": "msglvtn826ag6jd",
    "created": "2023-02-23 04:40:59.963Z",
    "updated": "2023-02-23 04:40:59.963Z",
    "name": "subject",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vkdrkate",
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
        "id": "cmzlxqt2",
        "name": "course_id",
        "type": "text",
        "required": true,
        "unique": true,
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
  const collection = dao.findCollectionByNameOrId("msglvtn826ag6jd");

  return dao.deleteCollection(collection);
})
