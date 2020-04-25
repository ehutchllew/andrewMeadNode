import { Query } from "express-serve-static-core";

export function hasQueryParams(query: Query): boolean {
    const queryKeys: string[] = Object.keys(query);
    return !!queryKeys.length;
}
