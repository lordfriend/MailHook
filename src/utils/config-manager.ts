import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export class ConfigManager {
    config: any;

    constructor() {
        this.config = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../config/config.yml'), 'utf8'));
    }

    getConfig(key: string): any {
        return this.config[key];
    }
}

export const configManager = new ConfigManager();