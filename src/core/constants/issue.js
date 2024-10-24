const treeData = [
    {
        title: "UAE",
        value: "uae",
        children: [
            {
                title: "Dubai",
                value: "dubai"
            },
            {
                title: "Abu Dhabi",
                value: "abuDhabi"
            },
            {
                title: "Sharjah",
                value: "sharjah"
            },
            {
                title: "Fujeirah",
                value: "fujeirah"
            },
            {
                title: "Ras Al-Khamimah",
                value: "rasAlKhaimah"
            },
        ]
    },
    {
        title: "Egypt",
        value: "egypt",
        children: [
            {
                title: "Sharm El-Sheikh",
                value: "sharmElSheikh"
            },
            {
                title: "Hurgada",
                value: "hurgada"
            },
            {
                title: "Alexandria",
                value: "alexandria"
            },
            {
                title: "El Alamain",
                value: "elAlamain"
            },
        ]
    },
]

const hotels = [
    {
        value: "rixos_marina",
        label: "Rixos Marina Abu Dhabi",
        parent: "abuDhabi"
    },
    {
        value: "centara_mirage",
        label: "Centara Mirage",
        parent: "dubai"
    },
    {
        value: "royal_central",
        label: "Royal Central The Palm",
        parent: "dubai"
    },
    {
        value: "address_beach",
        label: "Address Beach Resort",
        parent: "dubai"
    },
    {
        value: "jumeira_atsaadiyat",
        label: "Jumeirah At Saadiyat island",
        parent: "abuDhabi"
    },
    {
        value: "khalidiah_palace",
        label: "Khalidiah Palace Abu Dhabi",
        parent: "abuDhabi"
    },
    {
        value: "sheraton",
        label: "Sheraton Resort & Spa",
        parent: "sharjah"
    },
]

const staticChildrenCount = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
];

const childrenAge = [
    { value: 0, label: 0 },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
    { value: 11, label: 11 },
    { value: 12, label: 12 },
    { value: 13, label: 13 },
    { value: 14, label: 14 },
    { value: 15, label: 15 },
    { value: 16, label: 16 }
];



export {
    treeData, hotels, staticChildrenCount, childrenAge
}