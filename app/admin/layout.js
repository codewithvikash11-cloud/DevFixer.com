export const metadata = {
    title: 'DevFixer Admin',
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminLayout({ children }) {
    return (
        <>
            {children}
        </>
    );
}
