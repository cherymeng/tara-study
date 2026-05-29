import { WorldRegion } from "../types/world";

export const mockWorld: WorldRegion[] = [
    {
        id: "village",
        name: "新手村",
        requiredLevel: 1,
        unlocked: true,
    },
    {
        id: "forest",
        name: "森林",
        requiredLevel: 3,
        unlocked: false,
    },
];
