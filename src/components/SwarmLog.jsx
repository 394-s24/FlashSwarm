import { getSwarms } from "../utils/DatabaseFuncs";

const SwarmLog = () => {
    // console.log(getSwarms("coral"));
    const [data, error] = getSwarms("coral");
    if (data === undefined) {
        return (<h1>loading data</h1>)
    }

    console.log(data);
    return (
        <div>
            {data.map()}
        </div>
    )
};

export default SwarmLog;