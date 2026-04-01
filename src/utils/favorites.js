const STORAGE_KEY = 'simpsons-favorites'

export function getFavorites() {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
}

export function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}

export function isFavorite(id) {
    const favorites = getFavorites()
    return favorites.includes(id)
}

export function toggleFavorite(id) {
    const favorites = getFavorites()

    if (favorites.includes(id)) {
        const updated = favorites.filter(favId => favId !== id)
        saveFavorites(updated)
        return updated
    }

    const updated = [...favorites, id]
    saveFavorites(updated)
    return updated
}