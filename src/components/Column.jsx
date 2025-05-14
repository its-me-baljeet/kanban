import { useSelector } from "react-redux";

const Column = ({ colKey }) => {
    const items = useSelector(store => store.app.columns[colKey]);
    console.log(items.length)
    if (items.length == 0) {
        return (
            <div>
                <h2>{colKey}</h2>
            </div>
        )
    }
    return (
        <div>
            <h2>{colKey}</h2>
            <div className="flex flex-col gap-5 py-5">
                {
                    items.map((task, idx) => {
                        return <div key={idx} className="bg-white">
                            <p>{task.title}</p>
                            <p>{task.description}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
export default Column;