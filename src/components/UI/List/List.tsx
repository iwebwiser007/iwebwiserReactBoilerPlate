import React from "react";

interface ListProps {
    items: any[];
    renderItem: (item: any, index: number) => React.ReactNode;
}

const List: React.FC<ListProps> = ({ items, renderItem }) => {
    return (
        <ul className="list-group">
            {items.map((item, index) => (
                <li key={index} className="list-group-item">
                    {renderItem(item, index)}
                </li>
            ))}
        </ul>
    );
};

export default List;
