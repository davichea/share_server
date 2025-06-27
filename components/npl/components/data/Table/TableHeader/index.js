
const TableHeader = ({children}) => {
    return (
        <thead className="sticky top-0 z-[1] bg-gray-100">
            {children}
        </thead>
    )
}

export default TableHeader