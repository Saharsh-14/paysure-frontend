import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

export interface DbData {
    projects: any[];
    milestones: any[];
    transactions: any[];
    disputes: any[];
    wallet: {
        totalBalance: number;
        escrowLocked: number;
        availableBalance: number;
        totalEarnings: number;
        pendingRelease: number;
    };
}

export function readDb(): DbData {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
}

export function writeDb(data: DbData): void {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 4), "utf-8");
}

export function generateId(prefix: string, items: { id: string }[]): string {
    const maxNum = items.reduce((max, item) => {
        const num = parseInt(item.id.replace(prefix, ""), 10);
        return isNaN(num) ? max : Math.max(max, num);
    }, 0);
    return `${prefix}${maxNum + 1}`;
}
