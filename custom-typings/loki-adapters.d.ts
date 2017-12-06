/// <reference path="./lokijs.d.ts" />

declare interface LokiFsStructuredAdapter extends LokiPersistenceInterface {
    fs: any; //require('fs');

    /** loadDatabase() - Load data from file, will throw an error if the file does not exist
     * @param {string} dbname - the filename of the database to load
     * @param {function} callback - the callback to handle the result
     */
    loadDatabase(dbname: string, callback: (err: Error, data: string) => void): void;

    /** saveDatabase() - save data to file, will throw an error if the file can't be saved
     * might want to expand this to avoid dataloss on partial save
     * @param {string} dbname - the filename of the database to load
     * @param {function} callback - the callback to handle the result
     */
    saveDatabase(dbname: string, dbstring: string, callback: (err: any) => void): void;

    /** deleteDatabase() - delete the database file, will throw an error if the
     * file can't be deleted
     * @param {string} dbname - the filename of the database to delete
     * @param {function} callback - the callback to handle the result
     */
    deleteDatabase(dbname: string, callback: (resOrErr: void | Error) => void): void;
}

declare var LokiFsStructuredAdapterConstructor: {
    new (): LokiFsStructuredAdapter;
}

declare module 'lokijs/src/loki-fs-structured-adapter' {
    export = LokiFsStructuredAdapterConstructor
}
