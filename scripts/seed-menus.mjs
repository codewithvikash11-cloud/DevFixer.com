import { Client, Databases, ID, Query } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

async function getCollectionId(name) {
    const { collections } = await databases.listCollections(DATABASE_ID, [
        Query.equal('name', name)
    ]);
    if (collections.length > 0) return collections[0].$id;

    // Fallback: search case insensitive or create new
    const { collections: collections2 } = await databases.listCollections(DATABASE_ID);
    const found = collections2.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (found) return found.$id;

    throw new Error(`Collection ${name} not found`);
}

async function seedMenus() {
    try {
        console.log("Starting Menu Seeding (DEBUG)...");
        const COLLECTION_ID = await getCollectionId('Menus');
        console.log(`Found Menus Collection: ${COLLECTION_ID}`);

        // Check if empty
        const { total } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.limit(1)]);
        if (total > 0) {
            console.log("Menus collection is not empty. Skipping seed.");
            return;
        }

        const structure = [
            {
                label: "Platform", order: 1, children: [
                    { label: "Fix Error", path: "/fix-error", order: 1 },
                    { label: "Categories", path: "/categories", order: 2 },
                    { label: "Search", path: "/search", order: 3 },
                    { label: "Browse Solutions", path: "/errors", order: 4 }
                ]
            },
            {
                label: "Resources", order: 2, children: [
                    { label: "Engineering Blog", path: "/blog", order: 1 },
                    { label: "Snippets", path: "/snippets", order: 2 },
                    { label: "Developer Tools", path: "/tools", order: 3 }
                ]
            },
            {
                label: "Legal & Company", order: 3, children: [
                    { label: "About Us", path: "/about", order: 1 },
                    { label: "Contact Us", path: "/contact", order: 2 },
                    { label: "Terms of Service", path: "/terms", order: 3 },
                    { label: "Privacy Policy", path: "/privacy-policy", order: 4 }
                ]
            }
        ];

        for (const root of structure) {
            console.log(`Creating Root: ${root.label}`);

            // Build root payload
            const rootPayload = {
                label: root.label,
                path: '#',
                type: 'footer',
                order: root.order,
                isExternal: false,
                isOpenNewTab: false
                // parentId omitted
            };

            console.log("Root Payload:", JSON.stringify(rootPayload));
            let rootDoc;
            try {
                rootDoc = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), rootPayload);
                console.log(`   > Created Root ID: ${rootDoc.$id}`);
            } catch (e) {
                console.error("Failed to create root:", e);
                if (e.response) console.error("Response:", JSON.stringify(e.response, null, 2));
                continue;
            }

            for (const child of root.children) {
                console.log(`   - Creating Child: ${child.label}`);
                const childPayload = {
                    label: child.label,
                    path: child.path,
                    type: 'footer',
                    order: child.order,
                    parentId: rootDoc.$id, // Valid string ID
                    isExternal: false,
                    isOpenNewTab: false
                };
                try {
                    await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), childPayload);
                } catch (e) {
                    console.error("Failed to create child:", e);
                    if (e.response) console.error("Response:", JSON.stringify(e.response, null, 2));
                }
            }
        }

        console.log("Seeding Complete!");

    } catch (error) {
        console.error("Seeding Failed:", error);
    }
}

seedMenus();
