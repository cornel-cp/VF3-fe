export type User = {
    avatar: string,
    name: string,
    walletAddress: string,
    balance: number
}

export type UserUpdate = {
    avatar?: string,
    name?: string,
}