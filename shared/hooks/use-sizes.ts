import React from "react"
import { Api } from "../services/api-client";

export const useSizes = () => {
    const [sizes, setSizes] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchSizes() {
            try {
                setLoading(true);
                const sizes = await Api.sizes.getAll();
                setSizes(sizes);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchSizes();
    }, []);

    return {
        sizes,
        loading,
    };
}