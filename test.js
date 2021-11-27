const { MongoClient } = require('mongodb');
async function main(){
    const uri = "mongodb+srv://kunic:crushthanhduyc1@cluster0.oimyc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        await listDatabases(client)
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client) {
    const databaseList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    databaseList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}

main().catch(console.error);