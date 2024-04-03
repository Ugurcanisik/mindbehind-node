import { Repository, Sequelize } from 'sequelize-typescript';
import { SyncOptions, QueryOptions } from 'sequelize/types';
import * as entities from './entities';

interface Config {
    HOSTNAME: string;
    PORT: number;
    USERNAME: string;
    PASSWORD: string;
    SCHEMA: string;
    OPTIONS: {
        MAX_CONNECTION: number;
        MIN_CONNECTION: number;
        IDLE_TIME: number;
        LOGGING: boolean;
        BENCHMARK: boolean;
    };
}
interface Entities {
    user: Repository<entities.User>;
    userRole: Repository<entities.UserRole>;
    branch: Repository<entities.Branch>;
    branchUserMap: Repository<entities.BranchUserMap>;
}

export class MySQL {
    private static DB: Sequelize;
    private config: Config;
    public static entities: Entities;

    static getTransaction = () => MySQL.DB.transaction();
    static rawQuery = (query: string, options?: QueryOptions) => MySQL.DB.query(query, options);

    setConfig(config: Config) {
        this.config = config;
        return this;
    }

    private createDB = () =>
        new Sequelize({
            host: process.env.DB_HOST ? process.env.DB_HOST : this.config.HOSTNAME,
            username: this.config.USERNAME,
            password: this.config.PASSWORD,
            database: this.config.SCHEMA,
            dialect: 'mysql',
            pool: {
                max: this.config.OPTIONS.MAX_CONNECTION,
                min: this.config.OPTIONS.MIN_CONNECTION,
                idle: this.config.OPTIONS.IDLE_TIME
            },
            logging: this.config.OPTIONS.LOGGING,
            benchmark: this.config.OPTIONS.BENCHMARK,
            models: [__dirname + `/entities/*.entity.{js,ts}`],
            modelMatch: (filename, member) => {
                return filename.substring(0, filename.indexOf('.entity')).toLowerCase() === member.toLowerCase();
            },
            repositoryMode: true,
            timezone: '+03:00'
        });

    async initializeDB(sync?: boolean, syncOptions?: SyncOptions) {
        MySQL.DB = this.createDB();
        MySQL.DB.authenticate()
            .then(() => {
                this.setEntities();
                console.log('DB is authenticated!');
            })
            .catch((err) => {
                console.log('DB is cannot authenticated!', err);
            });

        if (sync) {
            await MySQL.DB.sync(syncOptions);
        }
    }

    private setEntities() {
        MySQL.entities = {
            user: MySQL.DB.getRepository(entities.User),
            userRole: MySQL.DB.getRepository(entities.UserRole),
            branch: MySQL.DB.getRepository(entities.Branch),
            branchUserMap: MySQL.DB.getRepository(entities.BranchUserMap)
        };
    }
}
