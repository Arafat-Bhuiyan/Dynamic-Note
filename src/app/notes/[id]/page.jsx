import DetailsView from './Details';

const Page = async ({ params }) => {
    const pageId = (await params).id;
    console.log('PAGE ID - ', pageId);

    return <DetailsView noteId={pageId} />;
};

export default Page;
