import db from "../server/db";

export default async (data: { collectionName: string; indexName: string }) => {
  try {
    const mongo = db.mongo();
    const collection = mongo.collection(data.collectionName);
    await collection.dropIndex(data.indexName);
  } catch (error) {
    throw error;
  }
};
