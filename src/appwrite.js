import { Client, Databases, Query, ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT; //ca sa avem acces la api

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(PROJECT_ID);

const database = new Databases(client);

export async function updateSearchCount(searchTerm, movie) {
  //verificam daca avem deja un document cu acelasi searchInput
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm.toLowerCase()),
    ]);

    //daca avem deja un document, il actualizam
    if (result.documents.length > 0) {
      const document = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, document.$id, {
        count: document.count + 1,
      });

      //daca nu avem, cream unul nou
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: searchTerm.toLowerCase(),
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Appwrite error:", JSON.stringify(error, null, 2));
  }
}

export async function getTrendingMovies() {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(6),
    ]);

    return result.documents;
  } catch (err) {
    console.log(err);
  }
}
