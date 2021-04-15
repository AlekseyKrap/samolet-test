function genFetchData<T>(url: string): () => Promise<T> {
    return async function (): Promise<T> {
        try {
            const response = await fetch(url, {
                method: 'GET',
            });
            return (await response.json()) as Promise<T>;
        } catch (e) {
            console.error({ e });
            throw e;
        }
    };
}
export default genFetchData;
