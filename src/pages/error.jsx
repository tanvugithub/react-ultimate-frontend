import { Link, useRouteError } from "react-router-dom";
import { Button, Result } from "antd";
export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <Result
                status="404"
                title="Oops!"
                subTitle={error.statusText || error.message}
                extra={
                    <Button type="primary" className="px-3 py-4">
                        <Link to="/" className="text-md">
                            Back to home page
                        </Link>
                    </Button>
                }
            />
        </div>
    );
}
