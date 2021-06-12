import { createConnection } from 'typeorm'


// This will search for ormconfig.json
// and apply the configurations 
createConnection()
    .then(() => console.log('Database connected successfully'))