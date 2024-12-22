import { Suspense } from "react";
import Profile from "./../profile/page";
import Loading from "./loading";

export default function Dashboard() {
    return (
        <section>
            <Suspense fallback={<Loading />}>
                <Profile />
            </Suspense>
        </section>
    )
}