
import { useEffect, useState } from "react";
const Loading = () => {
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => setisLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div>
            {isLoading &&
                <div id="preloder">
                    <div className="loader" />
                </div>
            }
      </div>

    );
}

export default Loading;