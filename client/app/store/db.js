import Dexie from 'dexie';

const db = new Dexie(window.appConfig.dbName);
db.app = db.app ?? {};

db.version(1).stores({
    storeLists: "id",
    storeItems: "id, listId, [listId+id]"
});

db.app.deleteList = function(listId) {
  return db.transaction('rw', db.storeItems, db.storeLists, () => {
    db.storeItems.where({ listId }).delete();
    db.storeLists.delete(listId);
  });
};

export default db;