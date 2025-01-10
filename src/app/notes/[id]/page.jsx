import NoteDetail from './Details';

const Page = async ({ params }) => {
    const pageId = (await params).id;
    console.log('PAGE ID - ', pageId);

    return <NoteDetail noteId={pageId} />;
};

export default Page;
