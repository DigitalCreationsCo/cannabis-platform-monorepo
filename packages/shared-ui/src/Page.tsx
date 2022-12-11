import { PropsWithChildren } from "react";

interface PageProps extends PropsWithChildren {
}

function Page({ children }: PageProps) {
    return (
        <div className="max-w-screen-xl px-10 py-20 mx-auto sm:px-20">
            { children }
        </div>
    );
};

export default Page;
