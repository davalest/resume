import {execFileSync} from "node:child_process";

const lastCommitDate = (): string => {
    try {
        return execFileSync("git", ["log", "-1", "--format=%cI"], {
            encoding: "utf-8",
            stdio: ["ignore", "pipe", "ignore"],
        }).trim();
    } catch {
        return new Date().toISOString();
    }
};

let cached: string | undefined;

export const lastModified = (): string => (cached ??= lastCommitDate());
