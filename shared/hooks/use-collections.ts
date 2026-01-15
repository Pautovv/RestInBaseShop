import { Collection } from "@prisma/client"
import React from "react"
import { Api } from "../services/api-client";

export const useCollections = () => {
    const [collections, setCollections] = React.useState<Collection[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchCollections() {
            try {
                setLoading(true);
                const collections = await Api.collections.getAll();
                setCollections(collections);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCollections();
    }, []);

    return {
        collections,
        loading,
    };
}