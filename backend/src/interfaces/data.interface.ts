interface Data {
    sector: string,
    profession: [
        name: string,
        description: string
    ],
    fileid?: string
}

interface RawData {
    id: number,
    name: string,
    description: string,
    imageUrl: string | null,
    created_at: string,
    updated_at: string,
}

export { Data, RawData };