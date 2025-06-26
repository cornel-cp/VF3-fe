export type User = {
    id: string,
    avatar: string,
    name: string,
    walletAddress: string,
    balance: number
}

export type UserUpdate = {
    avatar?: string,
    name?: string,
}

export interface ICharacter {
    _id: string;
    name: string;
    
    // Physical Build
    size: string;
    bodyType: string;
    height: string;
    notableFeatures: string;
    
    // Combat Abilities
    fightingStyle: string;
    weapons: string;
    specialTechnique: string;
    experience: string;
    
    // Attributes
    strength: number;
    speed: number;
    defense: number;
    intelligence: number;
    magicPower: number;
    
    // Special Abilities
    primaryPower: string;
    powerLimitation: string;
    defensiveAbility: string;
    
    // Weaknesses
    criticalWeakness: string;
    environmentalLimitation: string;
    
    // Appearance and Personality
    appearance: string;
    battlePersonality: string;

    // Camera View
    cameraView: string;
    
    // Existing fields
    taskId: string;
    video: string[];
    image: string[];
    prompt: string;
    owner: string;
    createdAt: Date;
    winNumber: number;
    loseNumber: number;
}