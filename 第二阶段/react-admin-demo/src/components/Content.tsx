type ContentProps = {
    title: string;
};

function Content(props:ContentProps){
    return (
        <main className="content">
            <h1>{props.title}</h1>
            <p>This is the main content area.</p>
        </main>
    );
}

export default Content;