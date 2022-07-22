import token from "./token"

export const logout = () => {
    token.deleteToken()
    localStorage.clear()
}