export interface ConnexionResponse{
    authenticationToken: string,
    refreshToken: string,
    expiresAt: Date,
    email:string
}